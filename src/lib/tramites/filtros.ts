import type {
  CategoriaFaq,
  CategoriaServicio,
  CategoriaTramite,
  PreguntaFrecuente,
  Servicio,
  Tramite,
} from "@/lib/api/types";
import { normalizarTexto } from "@/lib/texto";

const ordenCategoriasTramite: CategoriaTramite[] = [
  "certificados",
  "tributos",
  "licencias-de-funcionamiento",
  "matrimonio-y-divorcio",
  "desarrollo-urbano",
  "servicios-sociales",
  "mesa-de-partes",
];

const ordenCategoriasFaq: CategoriaFaq[] = [
  "tramites",
  "tributos",
  "mesa-de-partes",
  "cuenta",
  "servicios",
  "institucional",
];

export function filtrarTramites(
  tramites: Tramite[],
  {
    texto = "",
    categoria = "todas",
  }: { texto?: string; categoria?: CategoriaTramite | "todas" } = {},
): Tramite[] {
  const busqueda = normalizarTexto(texto);

  return tramites.filter((tramite) => {
    const coincideCategoria = categoria === "todas" || tramite.categoria === categoria;

    if (!coincideCategoria) return false;
    if (busqueda.length === 0) return true;

    return [
      tramite.nombre,
      tramite.descripcion,
      tramite.oficina,
      tramite.codigoTupa ?? "",
      ...tramite.requisitos,
    ].some((campo) => normalizarTexto(campo).includes(busqueda));
  });
}

export function contarTramitesPorCategoria(
  tramites: Tramite[],
): Record<CategoriaTramite, number> {
  const conteo = Object.fromEntries(
    ordenCategoriasTramite.map((categoria) => [categoria, 0]),
  ) as Record<CategoriaTramite, number>;

  for (const tramite of tramites) {
    conteo[tramite.categoria] += 1;
  }

  return conteo;
}

export function agruparTramitesPorCategoria(
  tramites: Tramite[],
): { categoria: CategoriaTramite; tramites: Tramite[] }[] {
  return ordenCategoriasTramite
    .map((categoria) => ({
      categoria,
      tramites: tramites.filter((tramite) => tramite.categoria === categoria),
    }))
    .filter((grupo) => grupo.tramites.length > 0);
}

export function filtrarServicios(
  servicios: Servicio[],
  {
    texto = "",
    categoria = "todas",
  }: { texto?: string; categoria?: CategoriaServicio | "todas" } = {},
): Servicio[] {
  const busqueda = normalizarTexto(texto);

  return servicios.filter((servicio) => {
    const coincideCategoria = categoria === "todas" || servicio.categoria === categoria;

    if (!coincideCategoria) return false;
    if (busqueda.length === 0) return true;

    return [
      servicio.nombre,
      servicio.descripcion,
      servicio.dirigidoA,
      servicio.sede,
      ...servicio.incluye,
    ].some((campo) => normalizarTexto(campo).includes(busqueda));
  });
}

export function filtrarPreguntas(
  preguntas: PreguntaFrecuente[],
  texto = "",
): PreguntaFrecuente[] {
  const busqueda = normalizarTexto(texto);

  if (busqueda.length === 0) return preguntas;

  return preguntas.filter((pregunta) =>
    [pregunta.pregunta, ...pregunta.respuesta].some((campo) =>
      normalizarTexto(campo).includes(busqueda),
    ),
  );
}

export function agruparPreguntasPorCategoria(
  preguntas: PreguntaFrecuente[],
): { categoria: CategoriaFaq; preguntas: PreguntaFrecuente[] }[] {
  return ordenCategoriasFaq
    .map((categoria) => ({
      categoria,
      preguntas: preguntas.filter((pregunta) => pregunta.categoria === categoria),
    }))
    .filter((grupo) => grupo.preguntas.length > 0);
}
