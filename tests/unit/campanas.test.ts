import { describe, expect, it } from "vitest";
import { campanas } from "@/mocks/data/campanas";
import {
  agregarEstadoCampanas,
  contarCampanasPorEstado,
  filtrarCampanas,
  obtenerAniosCampanas,
  obtenerEstadoCampana,
} from "@/lib/campanas/filtros";

const REFERENCIA = "2026-11-01";

describe("obtenerEstadoCampana", () => {
  const campana = { inicio: "2026-10-15", fin: "2026-11-30" };

  it("marca como próxima antes del inicio", () => {
    expect(obtenerEstadoCampana(campana, "2026-10-14")).toBe("proxima");
  });

  it("marca como vigente el día de inicio", () => {
    expect(obtenerEstadoCampana(campana, "2026-10-15")).toBe("vigente");
  });

  it("marca como vigente el día de fin", () => {
    expect(obtenerEstadoCampana(campana, "2026-11-30")).toBe("vigente");
  });

  it("marca como finalizada después del fin", () => {
    expect(obtenerEstadoCampana(campana, "2026-12-01")).toBe("finalizada");
  });

  it("acepta una fecha como Date", () => {
    expect(obtenerEstadoCampana(campana, new Date("2026-11-01T12:00:00Z"))).toBe(
      "vigente",
    );
  });
});

describe("agregarEstadoCampanas", () => {
  it("agrega el estado a cada campaña", () => {
    const conEstado = agregarEstadoCampanas(campanas, REFERENCIA);

    expect(conEstado).toHaveLength(campanas.length);
    expect(conEstado.every((campana) => campana.estado)).toBe(true);
  });
});

describe("filtrarCampanas", () => {
  const conEstado = agregarEstadoCampanas(campanas, REFERENCIA);

  it("devuelve todas las campañas sin filtros", () => {
    expect(filtrarCampanas(conEstado)).toHaveLength(campanas.length);
  });

  it("filtra por estado vigente", () => {
    const resultado = filtrarCampanas(conEstado, { estado: "vigente" });

    expect(resultado.length).toBeGreaterThan(0);
    expect(resultado.every((campana) => campana.estado === "vigente")).toBe(true);
  });

  it("filtra por estado próxima", () => {
    const resultado = filtrarCampanas(conEstado, { estado: "proxima" });

    expect(resultado.length).toBeGreaterThan(0);
    expect(resultado.every((campana) => campana.estado === "proxima")).toBe(true);
  });

  it("filtra por estado finalizada", () => {
    const resultado = filtrarCampanas(conEstado, { estado: "finalizada" });

    expect(resultado.length).toBeGreaterThan(0);
    expect(resultado.every((campana) => campana.estado === "finalizada")).toBe(true);
  });

  it("busca por título ignorando tildes", () => {
    const resultado = filtrarCampanas(conEstado, { texto: "navidena" });
    expect(resultado.map((campana) => campana.slug)).toContain("campana-navidena-2026");
  });

  it("filtra por año", () => {
    const resultado = filtrarCampanas(conEstado, { anio: 2024 });
    expect(resultado.length).toBeGreaterThan(0);
    expect(resultado.every((campana) => campana.inicio.startsWith("2024"))).toBe(true);
  });
});

describe("obtenerAniosCampanas", () => {
  it("devuelve años únicos en orden descendente", () => {
    const anios = obtenerAniosCampanas(campanas);
    expect(anios).toEqual([...anios].sort((a, b) => b - a));
    expect(new Set(anios).size).toBe(anios.length);
  });
});

describe("contarCampanasPorEstado", () => {
  it("suma el total y contiene todas las claves", () => {
    const conteo = contarCampanasPorEstado(agregarEstadoCampanas(campanas, REFERENCIA));
    const total = Object.values(conteo).reduce((suma, valor) => suma + valor, 0);

    expect(total).toBe(campanas.length);
    expect(conteo.vigente).toBeGreaterThan(0);
    expect(conteo.proxima).toBeGreaterThan(0);
    expect(conteo.finalizada).toBeGreaterThan(0);
  });
});
