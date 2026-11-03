import { describe, expect, it } from "vitest";
import { convocatorias } from "@/mocks/data/convocatorias";
import { participacionVecinal } from "@/mocks/data/participacion";
import { programas } from "@/mocks/data/programas";
import {
  agregarEstadoConvocatorias,
  contarConvocatoriasPorEstado,
  contarProgramasPorCategoria,
  contarProyectosPorEstado,
  filtrarConvocatorias,
  filtrarProgramas,
  filtrarProyectosPorAnio,
  obtenerAniosConvocatorias,
  obtenerAniosProyectos,
  obtenerEstadoConvocatoria,
  sumarMontoProyectos,
} from "@/lib/participacion/filtros";

const REFERENCIA = "2026-11-03";

describe("obtenerEstadoConvocatoria", () => {
  const convocatoria = { publicacion: "2026-10-28", cierre: "2026-11-10" };

  it("marca como próxima antes de la publicación", () => {
    expect(obtenerEstadoConvocatoria(convocatoria, "2026-10-27")).toBe("proxima");
  });

  it("marca como vigente el día de publicación", () => {
    expect(obtenerEstadoConvocatoria(convocatoria, "2026-10-28")).toBe("vigente");
  });

  it("marca como vigente el día de cierre", () => {
    expect(obtenerEstadoConvocatoria(convocatoria, "2026-11-10")).toBe("vigente");
  });

  it("marca como cerrada después del cierre", () => {
    expect(obtenerEstadoConvocatoria(convocatoria, "2026-11-11")).toBe("cerrada");
  });

  it("acepta una fecha como Date", () => {
    expect(
      obtenerEstadoConvocatoria(convocatoria, new Date("2026-11-03T12:00:00Z")),
    ).toBe("vigente");
  });
});

describe("agregarEstadoConvocatorias", () => {
  it("agrega el estado a cada convocatoria", () => {
    const conEstado = agregarEstadoConvocatorias(convocatorias, REFERENCIA);

    expect(conEstado).toHaveLength(convocatorias.length);
    expect(conEstado.every((convocatoria) => convocatoria.estado)).toBe(true);
  });
});

describe("filtrarConvocatorias", () => {
  const conEstado = agregarEstadoConvocatorias(convocatorias, REFERENCIA);

  it("devuelve todas las convocatorias sin filtros", () => {
    expect(filtrarConvocatorias(conEstado)).toHaveLength(convocatorias.length);
  });

  it("filtra por tipo", () => {
    const resultado = filtrarConvocatorias(conEstado, { tipo: "cas" });

    expect(resultado.length).toBe(4);
    expect(resultado.every((convocatoria) => convocatoria.tipo === "cas")).toBe(true);
  });

  it("filtra por estado cerrada", () => {
    const resultado = filtrarConvocatorias(conEstado, { estado: "cerrada" });

    expect(resultado.length).toBe(3);
  });

  it("filtra por año", () => {
    const resultado = filtrarConvocatorias(conEstado, { anio: 2026 });
    expect(resultado.length).toBe(convocatorias.length);
  });

  it("busca por texto ignorando tildes", () => {
    expect(
      filtrarConvocatorias(conEstado, { texto: "serenazgo" }).map(
        (convocatoria) => convocatoria.slug,
      ),
    ).toContain("cas-2026-14-tecnico-serenazgo");
  });
});

describe("resúmenes de convocatorias", () => {
  it("obtiene los años disponibles", () => {
    expect(obtenerAniosConvocatorias(convocatorias)).toEqual([2026]);
  });

  it("cuenta por estado y suma el total", () => {
    const conteo = contarConvocatoriasPorEstado(
      agregarEstadoConvocatorias(convocatorias, REFERENCIA),
    );
    const total = Object.values(conteo).reduce((suma, valor) => suma + valor, 0);

    expect(total).toBe(convocatorias.length);
    expect(conteo.vigente).toBe(3);
    expect(conteo.proxima).toBe(2);
    expect(conteo.cerrada).toBe(3);
  });
});

describe("filtrarProgramas", () => {
  it("devuelve todos los programas sin filtros", () => {
    expect(filtrarProgramas(programas)).toHaveLength(programas.length);
  });

  it("filtra por categoría", () => {
    const resultado = filtrarProgramas(programas, { categoria: "alimentacion" });

    expect(resultado.length).toBe(2);
    expect(resultado.every((programa) => programa.categoria === "alimentacion")).toBe(
      true,
    );
  });

  it("busca por nombre ignorando tildes", () => {
    const resultado = filtrarProgramas(programas, { texto: "demuna" });
    expect(resultado.map((programa) => programa.slug)).toContain("demuna");
  });

  it("busca por población objetivo", () => {
    const resultado = filtrarProgramas(programas, { texto: "mascotas" });
    expect(resultado.map((programa) => programa.slug)).toContain("patitas-olivenses");
  });
});

describe("contarProgramasPorCategoria", () => {
  it("suma el total y contiene todas las categorías", () => {
    const conteo = contarProgramasPorCategoria(programas);
    const total = Object.values(conteo).reduce((suma, valor) => suma + valor, 0);

    expect(total).toBe(programas.length);
    expect(conteo.alimentacion).toBe(2);
    expect(conteo["cultura-y-deporte"]).toBe(2);
  });
});

describe("proyectos del presupuesto participativo", () => {
  const proyectos = participacionVecinal.proyectos;

  it("obtiene los años en orden descendente", () => {
    expect(obtenerAniosProyectos(proyectos)).toEqual([2026, 2025]);
  });

  it("filtra por año", () => {
    expect(filtrarProyectosPorAnio(proyectos, 2026)).toHaveLength(4);
    expect(filtrarProyectosPorAnio(proyectos, 2025)).toHaveLength(4);
  });

  it("cuenta por estado", () => {
    const conteo = contarProyectosPorEstado(filtrarProyectosPorAnio(proyectos, 2026));

    expect(conteo["en-ejecucion"]).toBe(2);
    expect(conteo.priorizado).toBe(2);
    expect(conteo.culminado).toBe(0);
  });

  it("suma el monto priorizado", () => {
    expect(sumarMontoProyectos(filtrarProyectosPorAnio(proyectos, 2026))).toBe(5_680_000);
  });
});
