import type {
  Contratacion,
  EstadoContratacion,
  PoiActividad,
  PresupuestoAnual,
  ResumenPlanilla,
  TipoContratacion,
} from "@/lib/api/types";
import { normalizarTexto } from "@/lib/texto";

export function calcularPorcentaje(ejecutado: number, monto: number): number {
  if (monto <= 0) return 0;
  return Math.min(100, Math.max(0, Math.round((ejecutado / monto) * 100)));
}

export function obtenerPresupuestoPorAnio(
  presupuestos: PresupuestoAnual[],
  anio: number,
): PresupuestoAnual | null {
  return presupuestos.find((presupuesto) => presupuesto.anio === anio) ?? null;
}

export function obtenerAniosPresupuesto(presupuestos: PresupuestoAnual[]): number[] {
  return [...new Set(presupuestos.map((presupuesto) => presupuesto.anio))].sort(
    (a, b) => b - a,
  );
}

export function obtenerPoiDelAnio(poi: PoiActividad[], anio: number): PoiActividad[] {
  return poi.filter((actividad) => actividad.anio === anio);
}

export type GrupoPoi = {
  eje: string;
  actividades: PoiActividad[];
  presupuesto: number;
  ejecutado: number;
  avance: number;
};

export function agruparPoiPorEje(actividades: PoiActividad[]): GrupoPoi[] {
  const grupos = new Map<string, PoiActividad[]>();

  for (const actividad of actividades) {
    const existentes = grupos.get(actividad.eje) ?? [];
    existentes.push(actividad);
    grupos.set(actividad.eje, existentes);
  }

  return [...grupos.entries()].map(([eje, items]) => {
    const presupuesto = items.reduce((suma, item) => suma + item.presupuesto, 0);
    const ejecutado = items.reduce((suma, item) => suma + item.ejecutado, 0);
    const avance = Math.round(
      items.reduce((suma, item) => suma + item.avance, 0) / items.length,
    );

    return { eje, actividades: items, presupuesto, ejecutado, avance };
  });
}

export type FiltroTipoContratacion = TipoContratacion | "todos";
export type FiltroEstadoContratacion = EstadoContratacion | "todos";
export type FiltroAnioContratacion = number | "todos";

export type FiltrosContrataciones = {
  texto?: string;
  tipo?: FiltroTipoContratacion;
  estado?: FiltroEstadoContratacion;
  anio?: FiltroAnioContratacion;
};

export function filtrarContrataciones(
  contrataciones: Contratacion[],
  filtros: FiltrosContrataciones = {},
): Contratacion[] {
  const { texto = "", tipo = "todos", estado = "todos", anio = "todos" } = filtros;
  const busqueda = normalizarTexto(texto);

  return contrataciones.filter((contratacion) => {
    if (tipo !== "todos" && contratacion.tipo !== tipo) return false;
    if (estado !== "todos" && contratacion.estado !== estado) return false;
    if (anio !== "todos" && !contratacion.fecha.startsWith(String(anio))) return false;
    if (busqueda.length === 0) return true;

    return normalizarTexto(
      `${contratacion.codigo} ${contratacion.objeto} ${contratacion.proveedor ?? ""}`,
    ).includes(busqueda);
  });
}

export function obtenerAniosContrataciones(contrataciones: Contratacion[]): number[] {
  return [
    ...new Set(
      contrataciones.map((contratacion) => Number(contratacion.fecha.slice(0, 4))),
    ),
  ].sort((a, b) => b - a);
}

export function contarContratacionesPorEstado(
  contrataciones: Contratacion[],
): Record<EstadoContratacion, number> {
  const conteo: Record<EstadoContratacion, number> = {
    convocado: 0,
    "buena-pro": 0,
    ejecucion: 0,
    culminado: 0,
    desierto: 0,
  };

  for (const contratacion of contrataciones) {
    conteo[contratacion.estado] += 1;
  }

  return conteo;
}

export function sumarMontosContrataciones(
  contrataciones: Contratacion[],
  estados?: EstadoContratacion[],
): number {
  return contrataciones
    .filter((contratacion) => !estados || estados.includes(contratacion.estado))
    .reduce((suma, contratacion) => suma + contratacion.monto, 0);
}

export function calcularTotalTrabajadores(resumen: ResumenPlanilla[]): number {
  return resumen.reduce((suma, item) => suma + item.cantidad, 0);
}

export function calcularTotalPlanillaMensual(resumen: ResumenPlanilla[]): number {
  return resumen.reduce(
    (suma, item) => suma + item.cantidad * item.remuneracionPromedio,
    0,
  );
}
