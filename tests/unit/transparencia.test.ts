import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { contrataciones, planillas, poi, presupuestos } from "@/mocks/data/transparencia";
import { convocatorias } from "@/mocks/data/convocatorias";
import { participacionVecinal } from "@/mocks/data/participacion";
import {
  agruparPoiPorEje,
  calcularPorcentaje,
  calcularTotalPlanillaMensual,
  calcularTotalTrabajadores,
  contarContratacionesPorEstado,
  filtrarContrataciones,
  obtenerAniosContrataciones,
  obtenerAniosPresupuesto,
  obtenerPoiDelAnio,
  obtenerPresupuestoPorAnio,
  sumarMontosContrataciones,
} from "@/lib/transparencia/filtros";

const documentosTransparencia = [
  "/documents/transparencia/presupuesto-2026-resumen.pdf",
  "/documents/transparencia/poi-2026-resumen.pdf",
  "/documents/transparencia/planilla-2026-resumen.pdf",
  "/documents/transparencia/formato-solicitud-acceso-informacion-publica.pdf",
];

function esPdfValido(ruta: string): boolean {
  const archivo = path.join(process.cwd(), "public", ruta.replace(/^\//, ""));
  if (!existsSync(archivo)) return false;
  return readFileSync(archivo).subarray(0, 5).toString("latin1") === "%PDF-";
}

describe("calcularPorcentaje", () => {
  it("devuelve 0 cuando el monto es cero", () => {
    expect(calcularPorcentaje(100, 0)).toBe(0);
  });

  it("calcula el porcentaje redondeado", () => {
    expect(calcularPorcentaje(50, 100)).toBe(50);
    expect(calcularPorcentaje(1, 3)).toBe(33);
  });

  it("limita el resultado entre 0 y 100", () => {
    expect(calcularPorcentaje(120, 100)).toBe(100);
    expect(calcularPorcentaje(-10, 100)).toBe(0);
  });
});

describe("presupuesto", () => {
  it("ordena los años de forma descendente", () => {
    expect(obtenerAniosPresupuesto(presupuestos)).toEqual([2026, 2025, 2024]);
  });

  it("encuentra el presupuesto por año", () => {
    expect(obtenerPresupuestoPorAnio(presupuestos, 2026)?.anio).toBe(2026);
    expect(obtenerPresupuestoPorAnio(presupuestos, 2030)).toBeNull();
  });

  it("mantiene coherencia entre rubros y total de gastos", () => {
    for (const presupuesto of presupuestos) {
      const totalRubros = presupuesto.rubros.reduce(
        (suma, rubro) => suma + rubro.monto,
        0,
      );
      const ejecutadoRubros = presupuesto.rubros.reduce(
        (suma, rubro) => suma + rubro.ejecutado,
        0,
      );

      expect(totalRubros).toBe(presupuesto.gastos.monto);
      expect(ejecutadoRubros).toBe(presupuesto.gastos.ejecutado);
    }
  });
});

describe("POI", () => {
  it("filtra las actividades del año", () => {
    expect(obtenerPoiDelAnio(poi, 2026)).toHaveLength(12);
    expect(obtenerPoiDelAnio(poi, 2025)).toHaveLength(0);
  });

  it("agrupa por eje y conserva los totales", () => {
    const grupos = agruparPoiPorEje(poi);
    const totalPresupuesto = grupos.reduce((suma, grupo) => suma + grupo.presupuesto, 0);
    const totalPoi = poi.reduce((suma, actividad) => suma + actividad.presupuesto, 0);

    expect(grupos).toHaveLength(5);
    expect(totalPresupuesto).toBe(totalPoi);
    expect(grupos.every((grupo) => grupo.avance >= 0 && grupo.avance <= 100)).toBe(true);
  });
});

describe("filtrarContrataciones", () => {
  it("devuelve todos los procesos sin filtros", () => {
    expect(filtrarContrataciones(contrataciones)).toHaveLength(contrataciones.length);
  });

  it("filtra por tipo", () => {
    const obras = filtrarContrataciones(contrataciones, { tipo: "obra" });
    expect(obras.length).toBe(3);
    expect(obras.every((contratacion) => contratacion.tipo === "obra")).toBe(true);
  });

  it("filtra por estado", () => {
    const culminados = filtrarContrataciones(contrataciones, { estado: "culminado" });
    expect(culminados.length).toBe(6);
  });

  it("filtra por año", () => {
    const del2025 = filtrarContrataciones(contrataciones, { anio: 2025 });
    expect(del2025.length).toBe(3);
    expect(del2025.every((contratacion) => contratacion.fecha.startsWith("2025"))).toBe(
      true,
    );
  });

  it("busca por texto ignorando tildes", () => {
    const resultado = filtrarContrataciones(contrataciones, { texto: "consultoria" });
    expect(resultado.length).toBe(2);
  });

  it("combina varios filtros", () => {
    const resultado = filtrarContrataciones(contrataciones, {
      tipo: "bien",
      estado: "culminado",
    });
    expect(resultado.length).toBe(2);
  });
});

describe("resúmenes de contrataciones", () => {
  it("obtiene los años únicos en orden descendente", () => {
    expect(obtenerAniosContrataciones(contrataciones)).toEqual([2026, 2025, 2024]);
  });

  it("cuenta los procesos por estado", () => {
    const conteo = contarContratacionesPorEstado(contrataciones);
    const total = Object.values(conteo).reduce((suma, valor) => suma + valor, 0);

    expect(total).toBe(contrataciones.length);
    expect(conteo.culminado).toBe(6);
    expect(conteo.ejecucion).toBe(3);
    expect(conteo.desierto).toBe(1);
  });

  it("suma los montos y permite filtrar por estado", () => {
    const total = contrataciones.reduce((suma, item) => suma + item.monto, 0);
    const culminados = contrataciones
      .filter((item) => item.estado === "culminado")
      .reduce((suma, item) => suma + item.monto, 0);

    expect(sumarMontosContrataciones(contrataciones)).toBe(total);
    expect(sumarMontosContrataciones(contrataciones, ["culminado"])).toBe(culminados);
  });
});

describe("planilla", () => {
  const actual = planillas[0];

  it("suma trabajadores y remuneración mensual", () => {
    expect(calcularTotalTrabajadores(actual.resumen)).toBe(500);
    expect(calcularTotalPlanillaMensual(actual.resumen)).toBe(1_552_780);
  });

  it("coincide con la suma de trabajadores por área", () => {
    const totalAreas = (actual.areas ?? []).reduce(
      (suma, area) => suma + area.cantidad,
      0,
    );
    expect(totalAreas).toBe(calcularTotalTrabajadores(actual.resumen));
  });
});

describe("documentos descargables", () => {
  it("genera PDF válidos para contrataciones", () => {
    for (const contratacion of contrataciones) {
      expect(contratacion.archivoUrl).toBeTruthy();
      expect(esPdfValido(contratacion.archivoUrl!)).toBe(true);
    }
  });

  it("genera PDF válidos para convocatorias", () => {
    for (const convocatoria of convocatorias) {
      expect(esPdfValido(convocatoria.basesUrl)).toBe(true);
      if (convocatoria.resultadoUrl) {
        expect(esPdfValido(convocatoria.resultadoUrl)).toBe(true);
      }
    }
  });

  it("genera PDF válidos para participación y transparencia", () => {
    for (const documento of participacionVecinal.documentos) {
      expect(esPdfValido(documento.archivoUrl)).toBe(true);
    }
    for (const documento of documentosTransparencia) {
      expect(esPdfValido(documento)).toBe(true);
    }
  });
});
