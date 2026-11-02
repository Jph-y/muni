import type { Norma, TipoNorma } from "@/lib/api/types";
import { normalizarTexto } from "@/lib/texto";

export type FiltroTipoNorma = TipoNorma | "todas";
export type FiltroAnioNorma = number | "todos";

export type FiltrosNorma = {
  texto?: string;
  tipo?: FiltroTipoNorma;
  anio?: FiltroAnioNorma;
};

export function filtrarNormas(
  normas: Norma[],
  { texto = "", tipo = "todas", anio = "todos" }: FiltrosNorma = {},
): Norma[] {
  const busqueda = normalizarTexto(texto);

  return normas.filter((norma) => {
    if (tipo !== "todas" && norma.tipo !== tipo) return false;
    if (anio !== "todos" && obtenerAnio(norma.fecha) !== anio) return false;
    if (!busqueda) return true;

    return normalizarTexto(`${norma.titulo} ${norma.numero} ${norma.resumen}`).includes(
      busqueda,
    );
  });
}

export function obtenerAnio(fecha: string): number {
  return Number(fecha.slice(0, 4));
}

export function obtenerAniosNormas(normas: Norma[]): number[] {
  return [...new Set(normas.map((norma) => obtenerAnio(norma.fecha)))].sort(
    (a, b) => b - a,
  );
}

export function contarNormasPorTipo(normas: Norma[]): Record<TipoNorma, number> {
  const conteo: Record<TipoNorma, number> = {
    ordenanza: 0,
    "decreto-de-alcaldia": 0,
    "acuerdo-de-concejo": 0,
    resolucion: 0,
  };

  for (const norma of normas) {
    conteo[norma.tipo] += 1;
  }

  return conteo;
}

export function agruparNormasPorAnio(
  normas: Norma[],
): { anio: number; normas: Norma[] }[] {
  const grupos = new Map<number, Norma[]>();

  for (const norma of normas) {
    const anio = obtenerAnio(norma.fecha);
    grupos.set(anio, [...(grupos.get(anio) ?? []), norma]);
  }

  return [...grupos.entries()]
    .sort(([a], [b]) => b - a)
    .map(([anio, items]) => ({ anio, normas: items }));
}
