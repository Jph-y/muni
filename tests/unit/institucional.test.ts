import { describe, expect, it } from "vitest";
import type { AreaOrganizacional, Funcionario } from "@/lib/api/types";
import {
  agruparAreasPorNivel,
  filtrarDocumentos,
  filtrarFuncionarios,
  normalizarTexto,
  obtenerAreasDeFuncionarios,
  obtenerIniciales,
} from "@/lib/institucional/filtros";
import { documentosGestion, funcionarios } from "@/mocks/data/institucional";

describe("normalizarTexto", () => {
  it("elimina tildes y convierte a minúsculas", () => {
    expect(normalizarTexto("  Gestión TRIBUTARIA ")).toBe("gestion tributaria");
  });
});

describe("obtenerIniciales", () => {
  it("usa las dos primeras palabras significativas", () => {
    expect(obtenerIniciales("Luis Felipe Castillo Oliva")).toBe("LF");
  });

  it("ignora palabras cortas como preposiciones", () => {
    expect(obtenerIniciales("Elizabeth Sonia Canchari De Lino")).toBe("ES");
  });

  it("retorna dos letras cuando el nombre tiene una sola palabra", () => {
    expect(obtenerIniciales("Municipalidad")).toBe("MU");
  });
});

describe("filtrarFuncionarios", () => {
  const lista: Funcionario[] = [
    {
      id: "a",
      slug: "gerencia-municipal",
      nombre: "José Carlos Salas Reátegui",
      cargo: "Gerente Municipal",
      area: "Gerencia Municipal",
      correo: "gerencia@munilosolivos.gob.pe",
      telefono: "(01) 321-4547",
    },
    {
      id: "b",
      slug: "seguridad",
      nombre: "William Valladares Escobedo",
      cargo: "Gerente de Seguridad Ciudadana",
      area: "Seguridad ciudadana",
      correo: "seguridad@munilosolivos.gob.pe",
      telefono: "(01) 510-4230",
    },
  ];

  it("sin filtros devuelve todos los registros", () => {
    expect(filtrarFuncionarios(lista)).toHaveLength(2);
  });

  it("busca ignorando tildes y mayúsculas", () => {
    const resultado = filtrarFuncionarios(lista, { texto: "jose" });
    expect(resultado.map((item) => item.id)).toEqual(["a"]);
  });

  it("busca por cargo", () => {
    const resultado = filtrarFuncionarios(lista, { texto: "seguridad" });
    expect(resultado.map((item) => item.id)).toEqual(["b"]);
  });

  it("filtra por área exacta", () => {
    const resultado = filtrarFuncionarios(lista, { area: "Seguridad ciudadana" });
    expect(resultado.map((item) => item.id)).toEqual(["b"]);
  });

  it("combina búsqueda y área", () => {
    expect(
      filtrarFuncionarios(lista, { texto: "william", area: "Gerencia Municipal" }),
    ).toEqual([]);
  });

  it("devuelve vacío cuando no hay coincidencias", () => {
    expect(filtrarFuncionarios(lista, { texto: "inexistente" })).toEqual([]);
  });
});

describe("obtenerAreasDeFuncionarios", () => {
  it("devuelve áreas únicas y ordenadas alfabéticamente", () => {
    const areas = obtenerAreasDeFuncionarios(funcionarios);
    expect(new Set(areas).size).toBe(areas.length);
    expect(areas).toEqual([...areas].sort((a, b) => a.localeCompare(b, "es")));
  });
});

describe("agruparAreasPorNivel", () => {
  it("respeta el orden jerárquico y omite niveles vacíos", () => {
    const areas: AreaOrganizacional[] = [
      {
        id: "1",
        slug: "sub",
        nombre: "Subgerencia",
        nivel: "subgerencia",
        funciones: [],
      },
      {
        id: "2",
        slug: "alta",
        nombre: "Alcaldía",
        nivel: "alta-direccion",
        funciones: [],
      },
    ];

    const grupos = agruparAreasPorNivel(areas);
    expect(grupos.map((grupo) => grupo.nivel)).toEqual(["alta-direccion", "subgerencia"]);
  });
});

describe("filtrarDocumentos", () => {
  it("devuelve todos con el filtro 'todos'", () => {
    expect(filtrarDocumentos(documentosGestion, "todos")).toHaveLength(
      documentosGestion.length,
    );
  });

  it("filtra por tipo de documento", () => {
    const resultado = filtrarDocumentos(documentosGestion, "pei");
    expect(resultado.every((documento) => documento.tipo === "pei")).toBe(true);
    expect(resultado.length).toBeGreaterThan(0);
  });

  it("devuelve vacío para un tipo sin documentos", () => {
    expect(filtrarDocumentos([], "rof")).toEqual([]);
  });
});
