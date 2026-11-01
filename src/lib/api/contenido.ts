import { apiFetch, USAR_MOCKS } from "@/lib/api/client";
import type {
  Campana,
  Funcionario,
  Norma,
  Noticia,
  Sede,
  Tramite,
  TipoNorma,
} from "@/lib/api/types";
import { campanas as campanasMock } from "@/mocks/data/campanas";
import {
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

export async function obtenerFuncionarios(): Promise<Funcionario[]> {
  return USAR_MOCKS
    ? funcionariosMock
    : apiFetch<Funcionario[]>("/contenido/funcionarios");
}
