import type { Campana, EstadoCampana } from "@/lib/api/types";
import { obtenerAnio } from "@/lib/normas/filtros";
import { normalizarTexto } from "@/lib/texto";

export type CampanaConEstado = Campana & { estado: EstadoCampana };
export type FiltroEstadoCampana = EstadoCampana | "todas";
export type FiltroAnioCampana = number | "todos";

function aFechaIso(referencia: string | Date): string {
  return typeof referencia === "string"
    ? referencia.slice(0, 10)
    : referencia.toISOString().slice(0, 10);
}

export function obtenerEstadoCampana(
  campana: Pick<Campana, "inicio" | "fin">,
  referencia: string | Date,
): EstadoCampana {
  const hoy = aFechaIso(referencia);

  if (hoy < campana.inicio) return "proxima";
  if (hoy > campana.fin) return "finalizada";
  return "vigente";
}

export function agregarEstadoCampanas(
  campanas: Campana[],
  referencia: string | Date,
): CampanaConEstado[] {
  return campanas.map((campana) => ({
    ...campana,
    estado: obtenerEstadoCampana(campana, referencia),
  }));
}

export function filtrarCampanas(
  campanas: CampanaConEstado[],
  {
    texto = "",
    estado = "todas",
    anio = "todos",
  }: {
    texto?: string;
    estado?: FiltroEstadoCampana;
    anio?: FiltroAnioCampana;
  } = {},
): CampanaConEstado[] {
  const busqueda = normalizarTexto(texto);

  return campanas.filter((campana) => {
    if (estado !== "todas" && campana.estado !== estado) return false;
    if (anio !== "todos" && obtenerAnio(campana.inicio) !== anio) return false;
    if (!busqueda) return true;

    return normalizarTexto(
      `${campana.titulo} ${campana.descripcion} ${campana.lugar ?? ""} ${
        campana.organiza ?? ""
      }`,
    ).includes(busqueda);
  });
}

export function obtenerAniosCampanas(campanas: Campana[]): number[] {
  return [...new Set(campanas.map((campana) => obtenerAnio(campana.inicio)))].sort(
    (a, b) => b - a,
  );
}

export function contarCampanasPorEstado(
  campanas: CampanaConEstado[],
): Record<EstadoCampana, number> {
  const conteo: Record<EstadoCampana, number> = {
    vigente: 0,
    proxima: 0,
    finalizada: 0,
  };

  for (const campana of campanas) {
    conteo[campana.estado] += 1;
  }

  return conteo;
}
