import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { normas } from "@/mocks/data/normas";
import { publicaciones } from "@/mocks/data/publicaciones";
import {
  agruparNormasPorAnio,
  contarNormasPorTipo,
  filtrarNormas,
  obtenerAniosNormas,
} from "@/lib/normas/filtros";
import {
  contarPublicacionesPorTipo,
  filtrarPublicaciones,
  obtenerAniosPublicaciones,
} from "@/lib/publicaciones/filtros";

describe("filtrarNormas", () => {
  it("devuelve todas las normas sin filtros", () => {
    expect(filtrarNormas(normas)).toHaveLength(normas.length);
  });

  it("busca por título ignorando tildes y mayúsculas", () => {
    const resultado = filtrarNormas(normas, { texto: "TUPA" });
    expect(resultado.map((norma) => norma.numero)).toContain("682-2025-MDLO");
  });

  it("busca por número de norma", () => {
    const resultado = filtrarNormas(normas, { texto: "682-2025" });
    expect(resultado).toHaveLength(1);
    expect(resultado[0]?.tipo).toBe("ordenanza");
  });

  it("filtra por tipo", () => {
    const resultado = filtrarNormas(normas, { tipo: "resolucion" });
    expect(resultado.length).toBeGreaterThan(0);
    expect(resultado.every((norma) => norma.tipo === "resolucion")).toBe(true);
  });

  it("filtra por año", () => {
    const resultado = filtrarNormas(normas, { anio: 2026 });
    expect(resultado.length).toBeGreaterThan(0);
    expect(resultado.every((norma) => norma.fecha.startsWith("2026"))).toBe(true);
  });

  it("combina tipo, año y texto", () => {
    expect(filtrarNormas(normas, { texto: "resolucion", tipo: "ordenanza" })).toEqual([]);
  });
});

describe("obtenerAniosNormas", () => {
  it("devuelve los años únicos en orden descendente", () => {
    const anios = obtenerAniosNormas(normas);
    expect(anios).toEqual([...anios].sort((a, b) => b - a));
    expect(new Set(anios).size).toBe(anios.length);
  });
});

describe("contarNormasPorTipo", () => {
  it("suma el total y contiene todas las claves", () => {
    const conteo = contarNormasPorTipo(normas);
    const total = Object.values(conteo).reduce((suma, valor) => suma + valor, 0);

    expect(total).toBe(normas.length);
    expect(Object.keys(conteo)).toHaveLength(4);
    expect(conteo.ordenanza).toBeGreaterThan(0);
  });
});

describe("agruparNormasPorAnio", () => {
  it("agrupa por año en orden descendente sin grupos vacíos", () => {
    const grupos = agruparNormasPorAnio(normas);
    const anios = grupos.map((grupo) => grupo.anio);

    expect(anios).toEqual([...anios].sort((a, b) => b - a));
    expect(grupos.every((grupo) => grupo.normas.length > 0)).toBe(true);
    expect(grupos.reduce((total, grupo) => total + grupo.normas.length, 0)).toBe(
      normas.length,
    );
  });
});

describe("filtrarPublicaciones", () => {
  it("devuelve todas las publicaciones sin filtros", () => {
    expect(filtrarPublicaciones(publicaciones)).toHaveLength(publicaciones.length);
  });

  it("busca por título y descripción sin tildes", () => {
    const resultado = filtrarPublicaciones(publicaciones, { texto: "VASO DE LECHE" });
    expect(resultado.map((publicacion) => publicacion.tipo)).toEqual(["formulario"]);
  });

  it("busca en la oficina responsable", () => {
    const resultado = filtrarPublicaciones(publicaciones, { texto: "transparencia" });
    expect(resultado.length).toBeGreaterThan(0);
    expect(
      resultado.every((publicacion) => /transparencia/i.test(publicacion.oficina)),
    ).toBe(true);
  });

  it("filtra por tipo y año", () => {
    const resultado = filtrarPublicaciones(publicaciones, {
      tipo: "informe",
      anio: 2024,
    });

    expect(resultado.length).toBeGreaterThan(0);
    expect(
      resultado.every(
        (publicacion) =>
          publicacion.tipo === "informe" && publicacion.fecha.startsWith("2024"),
      ),
    ).toBe(true);
  });
});

describe("obtenerAniosPublicaciones", () => {
  it("devuelve años únicos en orden descendente", () => {
    const anios = obtenerAniosPublicaciones(publicaciones);
    expect(anios).toEqual([...anios].sort((a, b) => b - a));
    expect(new Set(anios).size).toBe(anios.length);
  });
});

describe("contarPublicacionesPorTipo", () => {
  it("suma el total y contiene todas las claves", () => {
    const conteo = contarPublicacionesPorTipo(publicaciones);
    const total = Object.values(conteo).reduce((suma, valor) => suma + valor, 0);

    expect(total).toBe(publicaciones.length);
    expect(conteo.informe).toBeGreaterThan(0);
    expect(conteo.formato).toBeGreaterThan(0);
    expect(conteo.formulario).toBeGreaterThan(0);
  });
});

describe("archivos PDF de normas y publicaciones", () => {
  const archivos = [
    ...normas.map((norma) => norma.archivoUrl),
    ...publicaciones.map((publicacion) => publicacion.archivoUrl),
  ];

  it("todas las rutas apuntan a un archivo existente", () => {
    const faltantes = archivos.filter(
      (url) => !fs.existsSync(path.join(process.cwd(), "public", url)),
    );

    expect(faltantes).toEqual([]);
  });

  it("todos los archivos son PDF válidos", () => {
    const invalidos = archivos.filter((url) => {
      const contenido = fs.readFileSync(path.join(process.cwd(), "public", url));
      return contenido.subarray(0, 5).toString("latin1") !== "%PDF-";
    });

    expect(invalidos).toEqual([]);
  });
});
