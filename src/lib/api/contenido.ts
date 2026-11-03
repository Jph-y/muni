import { apiFetch, USAR_MOCKS } from "@/lib/api/client";
import { obtenerEstadoCampana } from "@/lib/campanas/filtros";
import { obtenerFechaActual } from "@/lib/fechas";
import type {
  AreaOrganizacional,
  Autoridad,
  Campana,
  CategoriaServicio,
  CategoriaTramite,
  Contratacion,
  Convocatoria,
  DocumentoGestion,
  Funcionario,
  Norma,
  Noticia,
  ParticipacionVecinal,
  Planilla,
  PoiActividad,
  PreguntaFrecuente,
  PuntoEmergencia,
  PresupuestoAnual,
  Programa,
  Publicacion,
  Sede,
  Servicio,
  Tramite,
  TipoNorma,
  TipoPublicacion,
} from "@/lib/api/types";
import { campanas as campanasMock } from "@/mocks/data/campanas";
import { convocatorias as convocatoriasMock } from "@/mocks/data/convocatorias";
import { puntosEmergencia as emergenciasMock } from "@/mocks/data/emergencias";
import {
  areasOrganizacionales as areasMock,
  autoridades as autoridadesMock,
  documentosGestion as documentosMock,
  funcionarios as funcionariosMock,
  sedes as sedesMock,
} from "@/mocks/data/institucional";
import { normas as normasMock } from "@/mocks/data/normas";
import { noticias as noticiasMock } from "@/mocks/data/noticias";
import { participacionVecinal as participacionMock } from "@/mocks/data/participacion";
import { preguntasFrecuentes as preguntasMock } from "@/mocks/data/preguntas-frecuentes";
import { programas as programasMock } from "@/mocks/data/programas";
import { publicaciones as publicacionesMock } from "@/mocks/data/publicaciones";
import { servicios as serviciosMock } from "@/mocks/data/servicios";
import { tramites as tramitesMock } from "@/mocks/data/tramites";
import {
  contrataciones as contratacionesMock,
  planillas as planillasMock,
  poi as poiMock,
  presupuestos as presupuestosMock,
} from "@/mocks/data/transparencia";

function ordenarPorFecha<T extends { fecha: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => b.fecha.localeCompare(a.fecha));
}

export async function obtenerNoticias(): Promise<Noticia[]> {
  const noticias = USAR_MOCKS
    ? noticiasMock
    : await apiFetch<Noticia[]>("/contenido/noticias");

  return ordenarPorFecha(noticias);
}

export async function obtenerNoticiasDestacadas(limite = 3): Promise<Noticia[]> {
  const noticias = await obtenerNoticias();
  const destacadas = noticias.filter((noticia) => noticia.destacada);

  return (destacadas.length > 0 ? destacadas : noticias).slice(0, limite);
}

export async function obtenerNoticiaPorSlug(slug: string): Promise<Noticia | null> {
  if (USAR_MOCKS) {
    return noticiasMock.find((noticia) => noticia.slug === slug) ?? null;
  }

  return apiFetch<Noticia | null>(`/contenido/noticias/${slug}`);
}

export async function obtenerNormas(tipo?: TipoNorma): Promise<Norma[]> {
  const normas = USAR_MOCKS ? normasMock : await apiFetch<Norma[]>("/contenido/normas");

  const filtradas = tipo ? normas.filter((norma) => norma.tipo === tipo) : normas;

  return ordenarPorFecha(filtradas);
}

export async function obtenerNormaPorSlug(slug: string): Promise<Norma | null> {
  if (USAR_MOCKS) {
    return normasMock.find((norma) => norma.slug === slug) ?? null;
  }

  return apiFetch<Norma | null>(`/contenido/normas/${slug}`);
}

export async function obtenerPublicaciones(
  tipo?: TipoPublicacion,
): Promise<Publicacion[]> {
  const publicaciones = USAR_MOCKS
    ? publicacionesMock
    : await apiFetch<Publicacion[]>("/contenido/publicaciones");

  const filtradas = tipo
    ? publicaciones.filter((publicacion) => publicacion.tipo === tipo)
    : publicaciones;

  return ordenarPorFecha(filtradas);
}

export async function obtenerPublicacionPorSlug(
  slug: string,
): Promise<Publicacion | null> {
  if (USAR_MOCKS) {
    return publicacionesMock.find((publicacion) => publicacion.slug === slug) ?? null;
  }

  return apiFetch<Publicacion | null>(`/contenido/publicaciones/${slug}`);
}

export async function obtenerCampanas(): Promise<Campana[]> {
  const campanas = USAR_MOCKS
    ? campanasMock
    : await apiFetch<Campana[]>("/contenido/campanas");

  return [...campanas].sort((a, b) => b.inicio.localeCompare(a.inicio));
}

export async function obtenerCampanaVigente(): Promise<Campana | null> {
  const [campanas, hoy] = await Promise.all([obtenerCampanas(), obtenerFechaActual()]);
  const vigente = campanas.find(
    (campana) => obtenerEstadoCampana(campana, hoy) === "vigente",
  );

  return vigente ?? campanas[0] ?? null;
}

export async function obtenerCampanaPorSlug(slug: string): Promise<Campana | null> {
  if (USAR_MOCKS) {
    return campanasMock.find((campana) => campana.slug === slug) ?? null;
  }

  return apiFetch<Campana | null>(`/contenido/campanas/${slug}`);
}

export async function obtenerTramites(categoria?: CategoriaTramite): Promise<Tramite[]> {
  const tramites = USAR_MOCKS
    ? tramitesMock
    : await apiFetch<Tramite[]>("/contenido/tramites");

  const filtrados = categoria
    ? tramites.filter((tramite) => tramite.categoria === categoria)
    : tramites;

  return [...filtrados].sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
}

export async function obtenerTramitePorSlug(slug: string): Promise<Tramite | null> {
  if (USAR_MOCKS) {
    return tramitesMock.find((tramite) => tramite.slug === slug) ?? null;
  }

  return apiFetch<Tramite | null>(`/contenido/tramites/${slug}`);
}

export async function obtenerServicios(
  categoria?: CategoriaServicio,
): Promise<Servicio[]> {
  const servicios = USAR_MOCKS
    ? serviciosMock
    : await apiFetch<Servicio[]>("/contenido/servicios");

  const filtrados = categoria
    ? servicios.filter((servicio) => servicio.categoria === categoria)
    : servicios;

  return [...filtrados].sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
}

export async function obtenerServicioPorSlug(slug: string): Promise<Servicio | null> {
  if (USAR_MOCKS) {
    return serviciosMock.find((servicio) => servicio.slug === slug) ?? null;
  }

  return apiFetch<Servicio | null>(`/contenido/servicios/${slug}`);
}

export async function obtenerPreguntasFrecuentes(): Promise<PreguntaFrecuente[]> {
  return USAR_MOCKS
    ? preguntasMock
    : apiFetch<PreguntaFrecuente[]>("/contenido/preguntas-frecuentes");
}

export async function obtenerPuntosEmergencia(): Promise<PuntoEmergencia[]> {
  return USAR_MOCKS
    ? emergenciasMock
    : apiFetch<PuntoEmergencia[]>("/contenido/emergencias");
}

export async function obtenerSedes(): Promise<Sede[]> {
  return USAR_MOCKS ? sedesMock : apiFetch<Sede[]>("/contenido/sedes");
}

export async function obtenerSedePorSlug(slug: string): Promise<Sede | null> {
  if (USAR_MOCKS) {
    return sedesMock.find((sede) => sede.slug === slug) ?? null;
  }

  return apiFetch<Sede | null>(`/contenido/sedes/${slug}`);
}

export async function obtenerFuncionarios(): Promise<Funcionario[]> {
  return USAR_MOCKS
    ? funcionariosMock
    : apiFetch<Funcionario[]>("/contenido/funcionarios");
}

export async function obtenerFuncionarioPorSlug(
  slug: string,
): Promise<Funcionario | null> {
  if (USAR_MOCKS) {
    return funcionariosMock.find((funcionario) => funcionario.slug === slug) ?? null;
  }

  return apiFetch<Funcionario | null>(`/contenido/funcionarios/${slug}`);
}

export async function obtenerAutoridades(): Promise<Autoridad[]> {
  const autoridades = USAR_MOCKS
    ? autoridadesMock
    : await apiFetch<Autoridad[]>("/contenido/autoridades");

  return [...autoridades].sort((a, b) => a.orden - b.orden);
}

export async function obtenerAreasOrganizacionales(): Promise<AreaOrganizacional[]> {
  return USAR_MOCKS
    ? areasMock
    : apiFetch<AreaOrganizacional[]>("/contenido/organizacion");
}

export async function obtenerDocumentosGestion(): Promise<DocumentoGestion[]> {
  const documentos = USAR_MOCKS
    ? documentosMock
    : await apiFetch<DocumentoGestion[]>("/contenido/documentos-de-gestion");

  return [...documentos].sort((a, b) => b.anio - a.anio);
}

export async function obtenerPresupuestos(): Promise<PresupuestoAnual[]> {
  const presupuestos = USAR_MOCKS
    ? presupuestosMock
    : await apiFetch<PresupuestoAnual[]>("/contenido/presupuesto");

  return [...presupuestos].sort((a, b) => b.anio - a.anio);
}

export async function obtenerContrataciones(): Promise<Contratacion[]> {
  const contrataciones = USAR_MOCKS
    ? contratacionesMock
    : await apiFetch<Contratacion[]>("/contenido/contrataciones");

  return [...contrataciones].sort((a, b) => b.fecha.localeCompare(a.fecha));
}

export async function obtenerPoi(): Promise<PoiActividad[]> {
  return USAR_MOCKS ? poiMock : apiFetch<PoiActividad[]>("/contenido/poi");
}

export async function obtenerPlanillas(): Promise<Planilla[]> {
  const planillas = USAR_MOCKS
    ? planillasMock
    : await apiFetch<Planilla[]>("/contenido/planilla");

  return [...planillas].sort((a, b) => b.anio - a.anio);
}

export async function obtenerProgramas(): Promise<Programa[]> {
  const programas = USAR_MOCKS
    ? programasMock
    : await apiFetch<Programa[]>("/contenido/programas");

  return [...programas].sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
}

export async function obtenerProgramaPorSlug(slug: string): Promise<Programa | null> {
  if (USAR_MOCKS) {
    return programasMock.find((programa) => programa.slug === slug) ?? null;
  }

  return apiFetch<Programa | null>(`/contenido/programas/${slug}`);
}

export async function obtenerConvocatorias(): Promise<Convocatoria[]> {
  const convocatorias = USAR_MOCKS
    ? convocatoriasMock
    : await apiFetch<Convocatoria[]>("/contenido/convocatorias");

  return [...convocatorias].sort((a, b) => b.publicacion.localeCompare(a.publicacion));
}

export async function obtenerConvocatoriaPorSlug(
  slug: string,
): Promise<Convocatoria | null> {
  if (USAR_MOCKS) {
    return convocatoriasMock.find((convocatoria) => convocatoria.slug === slug) ?? null;
  }

  return apiFetch<Convocatoria | null>(`/contenido/convocatorias/${slug}`);
}

export async function obtenerParticipacionVecinal(): Promise<ParticipacionVecinal> {
  return USAR_MOCKS
    ? participacionMock
    : apiFetch<ParticipacionVecinal>("/contenido/participacion");
}
