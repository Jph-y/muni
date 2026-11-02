import type { Publicacion, TipoPublicacion } from "@/lib/api/types";
import { normalizarTexto } from "@/lib/texto";
import { obtenerAnio } from "@/lib/normas/filtros";

export type FiltroTipoPublicacion = TipoPublicacion | "todas";
export type FiltroAnioPublicacion = number | "todos";

export type FiltrosPublicacion = {
  texto?: string;
  tipo?: FiltroTipoPublicacion;
  anio?: FiltroAnioPublicacion;
};

export function filtrarPublicaciones(
  publicaciones: Publicacion[],
  { texto = "", tipo = "todas", anio = "todos" }: FiltrosPublicacion = {},
): Publicacion[] {
  const busqueda = normalizarTexto(texto);

  return publicaciones.filter((publicacion) => {
    if (tipo !== "todas" && publicacion.tipo !== tipo) return false;
    if (anio !== "todos" && obtenerAnio(publicacion.fecha) !== anio) return false;
    if (!busqueda) return true;

    return normalizarTexto(
      `${publicacion.titulo} ${publicacion.descripcion} ${publicacion.oficina}`,
    ).includes(busqueda);
  });
}

export function obtenerAniosPublicaciones(publicaciones: Publicacion[]): number[] {
  return [
    ...new Set(publicaciones.map((publicacion) => obtenerAnio(publicacion.fecha))),
  ].sort((a, b) => b - a);
}

export function contarPublicacionesPorTipo(
  publicaciones: Publicacion[],
): Record<TipoPublicacion, number> {
  const conteo: Record<TipoPublicacion, number> = {
    formato: 0,
    formulario: 0,
    informe: 0,
  };

  for (const publicacion of publicaciones) {
    conteo[publicacion.tipo] += 1;
  }

  return conteo;
}
