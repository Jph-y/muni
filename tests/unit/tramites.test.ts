import { describe, expect, it } from "vitest";
import {
  agruparPreguntasPorCategoria,
  agruparTramitesPorCategoria,
  contarTramitesPorCategoria,
  filtrarPreguntas,
  filtrarServicios,
  filtrarTramites,
} from "@/lib/tramites/filtros";
import { preguntasFrecuentes } from "@/mocks/data/preguntas-frecuentes";
import { servicios } from "@/mocks/data/servicios";
import { tramites } from "@/mocks/data/tramites";

describe("filtrarTramites", () => {
  it("devuelve todos los trámites sin filtros", () => {
    expect(filtrarTramites(tramites)).toHaveLength(tramites.length);
  });

  it("busca ignorando tildes y mayúsculas", () => {
    const resultado = filtrarTramites(tramites, { texto: "MATRIMONIO" });
    expect(resultado.length).toBeGreaterThan(0);
    expect(
      resultado.every((tramite) =>
        [tramite.nombre, tramite.descripcion, ...tramite.requisitos]
          .join(" ")
          .toLowerCase()
          .includes("matrimonio"),
      ),
    ).toBe(true);
  });

  it("busca por código TUPA", () => {
    const resultado = filtrarTramites(tramites, { texto: "21198" });
    expect(resultado.map((tramite) => tramite.id)).toEqual(["21198"]);
  });

  it("busca dentro de los requisitos", () => {
    const resultado = filtrarTramites(tramites, { texto: "partida de matrimonio" });
    expect(resultado.length).toBeGreaterThan(0);
  });

  it("filtra por categoría", () => {
    const resultado = filtrarTramites(tramites, { categoria: "tributos" });
    expect(resultado.length).toBeGreaterThan(0);
    expect(resultado.every((tramite) => tramite.categoria === "tributos")).toBe(true);
  });

  it("combina texto y categoría", () => {
    const resultado = filtrarTramites(tramites, {
      texto: "licencia",
      categoria: "tributos",
    });
    expect(resultado).toEqual([]);
  });
});

describe("contarTramitesPorCategoria", () => {
  it("cuenta todos los trámites y no deja categorías sin clave", () => {
    const conteo = contarTramitesPorCategoria(tramites);
    const total = Object.values(conteo).reduce((suma, valor) => suma + valor, 0);

    expect(total).toBe(tramites.length);
    expect(conteo).toHaveProperty("mesa-de-partes");
  });
});

describe("agruparTramitesPorCategoria", () => {
  it("respeta el orden y omite grupos vacíos", () => {
    const grupos = agruparTramitesPorCategoria(tramites);

    expect(grupos[0]?.categoria).toBe("certificados");
    expect(grupos.every((grupo) => grupo.tramites.length > 0)).toBe(true);
  });
});

describe("filtrarServicios", () => {
  it("devuelve todos sin filtros", () => {
    expect(filtrarServicios(servicios)).toHaveLength(servicios.length);
  });

  it("busca por nombre sin distinguir tildes", () => {
    const resultado = filtrarServicios(servicios, { texto: "serenazgo" });
    expect(resultado.map((servicio) => servicio.slug)).toContain("serenazgo-municipal");
  });

  it("filtra por categoría", () => {
    const resultado = filtrarServicios(servicios, {
      categoria: "programas-sociales",
    });
    expect(resultado.length).toBeGreaterThan(0);
    expect(
      resultado.every((servicio) => servicio.categoria === "programas-sociales"),
    ).toBe(true);
  });
});

describe("filtrarPreguntas", () => {
  it("devuelve todas las preguntas sin texto", () => {
    expect(filtrarPreguntas(preguntasFrecuentes)).toHaveLength(
      preguntasFrecuentes.length,
    );
  });

  it("busca en pregunta y respuestas", () => {
    const resultado = filtrarPreguntas(preguntasFrecuentes, "predial");
    expect(resultado.length).toBeGreaterThan(0);
    expect(
      resultado.some((pregunta) =>
        pregunta.respuesta.join(" ").toLowerCase().includes("predial"),
      ),
    ).toBe(true);
  });

  it("devuelve vacío cuando no hay coincidencias", () => {
    expect(filtrarPreguntas(preguntasFrecuentes, "zzzz")).toEqual([]);
  });
});

describe("agruparPreguntasPorCategoria", () => {
  it("ordena las categorías y omite grupos vacíos", () => {
    const grupos = agruparPreguntasPorCategoria(preguntasFrecuentes);

    expect(grupos[0]?.categoria).toBe("tramites");
    expect(grupos.every((grupo) => grupo.preguntas.length > 0)).toBe(true);
  });
});
