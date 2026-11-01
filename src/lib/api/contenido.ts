import { apiFetch, USAR_MOCKS } from "@/lib/api/client";
import type {
  AreaOrganizacional,
  Autoridad,
  Campana,
  DocumentoGestion,
  Funcionario,
  Norma,
  Noticia,
  Sede,
  Tramite,
  TipoNorma,
} from "@/lib/api/types";
import { campanas as campanasMock } from "@/mocks/data/campanas";
import {
  areasOrganizacionales as areasMock,
  autoridades as autoridadesMock,
  documentosGestion as documentosMock,
  funcionarios as funcionariosMock,
  sedes as sedesMock,
} from "@/mocks/data/institucional";
import { normas as normasMock } from "@/mocks/data/normas";
import { noticias as noticiasMock } from "@/mocks/data/noticias";
import { tramites as tramitesMock } from "@/mocks/data/tramites";

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

export async function obtenerNormas(tipo?: TipoNorma): Promise<Norma[]> {
  const normas = USAR_MOCKS ? normasMock : await apiFetch<Norma[]>("/contenido/normas");

  const filtradas = tipo ? normas.filter((norma) => norma.tipo === tipo) : normas;

  return ordenarPorFecha(filtradas);
}

export async function obtenerCampanas(): Promise<Campana[]> {
  const campanas = USAR_MOCKS
    ? campanasMock
    : await apiFetch<Campana[]>("/contenido/campanas");

  return [...campanas].sort((a, b) => b.inicio.localeCompare(a.inicio));
}

export async function obtenerCampanaVigente(): Promise<Campana | null> {
  const campanas = await obtenerCampanas();
  return campanas[0] ?? null;
}

export async function obtenerTramites(): Promise<Tramite[]> {
  return USAR_MOCKS ? tramitesMock : apiFetch<Tramite[]>("/contenido/tramites");
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
