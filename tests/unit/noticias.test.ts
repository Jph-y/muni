import { describe, expect, it } from "vitest";
import { noticias } from "@/mocks/data/noticias";
import {
  contarNoticiasPorCategoria,
  filtrarNoticias,
  obtenerAniosNoticias,
  obtenerNoticiasRelacionadas,
  paginarNoticias,
} from "@/lib/noticias/filtros";

describe("filtrarNoticias", () => {
  it("devuelve todas las noticias sin filtros", () => {
    expect(filtrarNoticias(noticias)).toHaveLength(noticias.length);
  });

  it("busca por título ignorando tildes y mayúsculas", () => {
    const resultado = filtrarNoticias(noticias, { texto: "HUANDOY" });
    expect(resultado).toHaveLength(1);
    expect(resultado[0]?.categoria).toBe("obras");
  });

  it("busca por etiquetas de la noticia", () => {
    const resultado = filtrarNoticias(noticias, { texto: "tenencia responsable" });
    expect(resultado.length).toBeGreaterThan(0);
    expect(
      resultado.every((noticia) =>
        (noticia.etiquetas ?? []).some((etiqueta) =>
          etiqueta.includes("tenencia responsable"),
        ),
      ),
    ).toBe(true);
  });

  it("filtra por categoría", () => {
    const resultado = filtrarNoticias(noticias, { categoria: "seguridad" });
    expect(resultado.length).toBeGreaterThan(0);
    expect(resultado.every((noticia) => noticia.categoria === "seguridad")).toBe(true);
  });

  it("filtra por año", () => {
    const resultado = filtrarNoticias(noticias, { anio: 2026 });
    expect(resultado.length).toBeGreaterThan(0);
    expect(resultado.every((noticia) => noticia.fecha.startsWith("2026"))).toBe(true);
  });

  it("combina texto, categoría y año", () => {
    expect(
      filtrarNoticias(noticias, {
        texto: "vacunación",
        categoria: "seguridad",
        anio: 2026,
      }),
    ).toEqual([]);
  });
});

describe("obtenerAniosNoticias", () => {
  it("devuelve años únicos en orden descendente", () => {
    const anios = obtenerAniosNoticias(noticias);
    expect(anios).toEqual([...anios].sort((a, b) => b - a));
    expect(new Set(anios).size).toBe(anios.length);
  });
});

describe("contarNoticiasPorCategoria", () => {
  it("suma el total y contiene todas las claves", () => {
    const conteo = contarNoticiasPorCategoria(noticias);
    const total = Object.values(conteo).reduce((suma, valor) => suma + valor, 0);

    expect(total).toBe(noticias.length);
    expect(Object.keys(conteo)).toHaveLength(6);
    expect(conteo.seguridad).toBeGreaterThan(0);
  });
});

describe("paginarNoticias", () => {
  it("devuelve la primera página con el rango correcto", () => {
    const pagina = paginarNoticias(noticias, 1, 6);

    expect(pagina.items).toHaveLength(6);
    expect(pagina.desde).toBe(1);
    expect(pagina.hasta).toBe(6);
    expect(pagina.total).toBe(noticias.length);
    expect(pagina.totalPaginas).toBe(Math.ceil(noticias.length / 6));
  });

  it("devuelve la última página con los elementos restantes", () => {
    const totalPaginas = Math.ceil(noticias.length / 6);
    const pagina = paginarNoticias(noticias, totalPaginas, 6);

    expect(pagina.items).toHaveLength(noticias.length - (totalPaginas - 1) * 6);
    expect(pagina.hasta).toBe(noticias.length);
  });

  it("ajusta una página fuera de rango a la última disponible", () => {
    const pagina = paginarNoticias(noticias, 99, 6);
    expect(pagina.pagina).toBe(Math.ceil(noticias.length / 6));
  });

  it("maneja una lista vacía", () => {
    const pagina = paginarNoticias([], 1, 6);

    expect(pagina.items).toEqual([]);
    expect(pagina.totalPaginas).toBe(1);
    expect(pagina.desde).toBe(0);
    expect(pagina.hasta).toBe(0);
  });
});

describe("obtenerNoticiasRelacionadas", () => {
  it("excluye la noticia actual y prioriza la misma categoría", () => {
    const actual = noticias.find((noticia) => noticia.categoria === "obras");
    expect(actual).toBeDefined();

    const relacionadas = obtenerNoticiasRelacionadas(noticias, actual!, 3);

    expect(relacionadas).toHaveLength(3);
    expect(relacionadas.some((noticia) => noticia.id === actual!.id)).toBe(false);
    expect(relacionadas[0]?.categoria).toBe(actual!.categoria);
  });
});
