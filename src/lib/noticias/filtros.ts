import type { CategoriaNoticia, Noticia } from "@/lib/api/types";
import { obtenerAnio } from "@/lib/normas/filtros";
import { normalizarTexto } from "@/lib/texto";

export type FiltroCategoriaNoticia = CategoriaNoticia | "todas";
export type FiltroAnioNoticia = number | "todos";

export type FiltrosNoticia = {
  texto?: string;
  categoria?: FiltroCategoriaNoticia;
  anio?: FiltroAnioNoticia;
};

export function filtrarNoticias(
  noticias: Noticia[],
  { texto = "", categoria = "todas", anio = "todos" }: FiltrosNoticia = {},
): Noticia[] {
  const busqueda = normalizarTexto(texto);

  return noticias.filter((noticia) => {
    if (categoria !== "todas" && noticia.categoria !== categoria) return false;
    if (anio !== "todos" && obtenerAnio(noticia.fecha) !== anio) return false;
    if (!busqueda) return true;

    const etiquetas = noticia.etiquetas?.join(" ") ?? "";
    return normalizarTexto(
      `${noticia.titulo} ${noticia.resumen} ${noticia.autor ?? ""} ${etiquetas}`,
    ).includes(busqueda);
  });
}

export function obtenerAniosNoticias(noticias: Noticia[]): number[] {
  return [...new Set(noticias.map((noticia) => obtenerAnio(noticia.fecha)))].sort(
    (a, b) => b - a,
  );
}

export function contarNoticiasPorCategoria(
  noticias: Noticia[],
): Record<CategoriaNoticia, number> {
  const conteo: Record<CategoriaNoticia, number> = {
    seguridad: 0,
    salud: 0,
    obras: 0,
    educacion: 0,
    cultura: 0,
    emprendimiento: 0,
  };

  for (const noticia of noticias) {
    conteo[noticia.categoria] += 1;
  }

  return conteo;
}

export type PaginaNoticias = {
  items: Noticia[];
  pagina: number;
  totalPaginas: number;
  total: number;
  desde: number;
  hasta: number;
};

export function paginarNoticias(
  noticias: Noticia[],
  pagina = 1,
  porPagina = 6,
): PaginaNoticias {
  const total = noticias.length;
  const totalPaginas = Math.max(1, Math.ceil(total / porPagina));
  const paginaActual = Math.min(Math.max(1, Math.trunc(pagina) || 1), totalPaginas);
  const inicio = (paginaActual - 1) * porPagina;
  const items = noticias.slice(inicio, inicio + porPagina);

  return {
    items,
    pagina: paginaActual,
    totalPaginas,
    total,
    desde: total === 0 ? 0 : inicio + 1,
    hasta: inicio + items.length,
  };
}

export function obtenerNoticiasRelacionadas(
  noticias: Noticia[],
  noticia: Noticia,
  limite = 3,
): Noticia[] {
  const otras = noticias.filter((item) => item.id !== noticia.id);
  const mismaCategoria = otras.filter((item) => item.categoria === noticia.categoria);
  const resto = otras.filter((item) => item.categoria !== noticia.categoria);

  return [...mismaCategoria, ...resto].slice(0, limite);
}
