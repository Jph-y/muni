import type {
  CategoriaPrograma,
  Convocatoria,
  EstadoConvocatoria,
  EstadoProyectoParticipativo,
  Programa,
  ProyectoPresupuestoParticipativo,
  TipoConvocatoria,
} from "@/lib/api/types";
import { obtenerAnio } from "@/lib/normas/filtros";
import { normalizarTexto } from "@/lib/texto";

function aFechaIso(referencia: string | Date): string {
  return typeof referencia === "string"
    ? referencia.slice(0, 10)
    : referencia.toISOString().slice(0, 10);
}

export type ConvocatoriaConEstado = Convocatoria & { estado: EstadoConvocatoria };
export type FiltroEstadoConvocatoria = EstadoConvocatoria | "todas";
export type FiltroTipoConvocatoria = TipoConvocatoria | "todos";
export type FiltroAnioConvocatoria = number | "todos";
export type FiltroCategoriaPrograma = CategoriaPrograma | "todas";

export function obtenerEstadoConvocatoria(
  convocatoria: Pick<Convocatoria, "publicacion" | "cierre">,
  referencia: string | Date,
): EstadoConvocatoria {
  const hoy = aFechaIso(referencia);

  if (hoy < convocatoria.publicacion) return "proxima";
  if (hoy > convocatoria.cierre) return "cerrada";
  return "vigente";
}

export function agregarEstadoConvocatorias(
  convocatorias: Convocatoria[],
  referencia: string | Date,
): ConvocatoriaConEstado[] {
  return convocatorias.map((convocatoria) => ({
    ...convocatoria,
    estado: obtenerEstadoConvocatoria(convocatoria, referencia),
  }));
}

export function filtrarConvocatorias(
  convocatorias: ConvocatoriaConEstado[],
  {
    texto = "",
    tipo = "todos",
    estado = "todas",
    anio = "todos",
  }: {
    texto?: string;
    tipo?: FiltroTipoConvocatoria;
    estado?: FiltroEstadoConvocatoria;
    anio?: FiltroAnioConvocatoria;
  } = {},
): ConvocatoriaConEstado[] {
  const busqueda = normalizarTexto(texto);

  return convocatorias.filter((convocatoria) => {
    if (tipo !== "todos" && convocatoria.tipo !== tipo) return false;
    if (estado !== "todas" && convocatoria.estado !== estado) return false;
    if (anio !== "todos" && obtenerAnio(convocatoria.publicacion) !== anio) return false;
    if (!busqueda) return true;

    return normalizarTexto(
      `${convocatoria.titulo} ${convocatoria.area} ${convocatoria.descripcion}`,
    ).includes(busqueda);
  });
}

export function obtenerAniosConvocatorias(convocatorias: Convocatoria[]): number[] {
  return [
    ...new Set(
      convocatorias.map((convocatoria) => obtenerAnio(convocatoria.publicacion)),
    ),
  ].sort((a, b) => b - a);
}

export function contarConvocatoriasPorEstado(
  convocatorias: ConvocatoriaConEstado[],
): Record<EstadoConvocatoria, number> {
  const conteo: Record<EstadoConvocatoria, number> = {
    proxima: 0,
    vigente: 0,
    cerrada: 0,
  };

  for (const convocatoria of convocatorias) {
    conteo[convocatoria.estado] += 1;
  }

  return conteo;
}

export function filtrarProgramas(
  programas: Programa[],
  {
    texto = "",
    categoria = "todas",
  }: {
    texto?: string;
    categoria?: FiltroCategoriaPrograma;
  } = {},
): Programa[] {
  const busqueda = normalizarTexto(texto);

  return programas.filter((programa) => {
    if (categoria !== "todas" && programa.categoria !== categoria) return false;
    if (!busqueda) return true;

    return normalizarTexto(
      `${programa.nombre} ${programa.descripcion} ${programa.dirigidoA}`,
    ).includes(busqueda);
  });
}

export function contarProgramasPorCategoria(
  programas: Programa[],
): Record<CategoriaPrograma, number> {
  const conteo: Record<CategoriaPrograma, number> = {
    alimentacion: 0,
    proteccion: 0,
    discapacidad: 0,
    "adulto-mayor": 0,
    "cultura-y-deporte": 0,
    salud: 0,
  };

  for (const programa of programas) {
    conteo[programa.categoria] += 1;
  }

  return conteo;
}

export function obtenerAniosProyectos(
  proyectos: ProyectoPresupuestoParticipativo[],
): number[] {
  return [...new Set(proyectos.map((proyecto) => proyecto.anio))].sort((a, b) => b - a);
}

export function filtrarProyectosPorAnio(
  proyectos: ProyectoPresupuestoParticipativo[],
  anio: number,
): ProyectoPresupuestoParticipativo[] {
  return proyectos.filter((proyecto) => proyecto.anio === anio);
}

export function contarProyectosPorEstado(
  proyectos: ProyectoPresupuestoParticipativo[],
): Record<EstadoProyectoParticipativo, number> {
  const conteo: Record<EstadoProyectoParticipativo, number> = {
    priorizado: 0,
    "en-ejecucion": 0,
    culminado: 0,
  };

  for (const proyecto of proyectos) {
    conteo[proyecto.estado] += 1;
  }

  return conteo;
}

export function sumarMontoProyectos(
  proyectos: ProyectoPresupuestoParticipativo[],
): number {
  return proyectos.reduce((suma, proyecto) => suma + proyecto.monto, 0);
}
