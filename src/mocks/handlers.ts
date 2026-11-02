import { http, HttpResponse } from "msw";
import { campanas } from "@/mocks/data/campanas";
import { puntosEmergencia } from "@/mocks/data/emergencias";
import {
  areasOrganizacionales,
  autoridades,
  documentosGestion,
  funcionarios,
  sedes,
} from "@/mocks/data/institucional";
import { normas } from "@/mocks/data/normas";
import { noticias } from "@/mocks/data/noticias";
import { preguntasFrecuentes } from "@/mocks/data/preguntas-frecuentes";
import { publicaciones } from "@/mocks/data/publicaciones";
import { servicios } from "@/mocks/data/servicios";
import { tramites } from "@/mocks/data/tramites";

const contenido = [
  http.get("*/contenido/noticias", () => HttpResponse.json(noticias)),
  http.get("*/contenido/noticias/:slug", ({ params }) => {
    const noticia = noticias.find((item) => item.slug === params.slug);
    return noticia
      ? HttpResponse.json(noticia)
      : HttpResponse.json({ message: "Noticia no encontrada" }, { status: 404 });
  }),
  http.get("*/contenido/normas", () => HttpResponse.json(normas)),
  http.get("*/contenido/normas/:slug", ({ params }) => {
    const norma = normas.find((item) => item.slug === params.slug);
    return norma
      ? HttpResponse.json(norma)
      : HttpResponse.json({ message: "Norma no encontrada" }, { status: 404 });
  }),
  http.get("*/contenido/publicaciones", () => HttpResponse.json(publicaciones)),
  http.get("*/contenido/publicaciones/:slug", ({ params }) => {
    const publicacion = publicaciones.find((item) => item.slug === params.slug);
    return publicacion
      ? HttpResponse.json(publicacion)
      : HttpResponse.json({ message: "Publicación no encontrada" }, { status: 404 });
  }),
  http.get("*/contenido/campanas", () => HttpResponse.json(campanas)),
  http.get("*/contenido/campanas/:slug", ({ params }) => {
    const campana = campanas.find((item) => item.slug === params.slug);
    return campana
      ? HttpResponse.json(campana)
      : HttpResponse.json({ message: "Campaña no encontrada" }, { status: 404 });
  }),
  http.get("*/contenido/tramites", () => HttpResponse.json(tramites)),
  http.get("*/contenido/tramites/:slug", ({ params }) => {
    const tramite = tramites.find((item) => item.slug === params.slug);
    return tramite
      ? HttpResponse.json(tramite)
      : HttpResponse.json({ message: "Trámite no encontrado" }, { status: 404 });
  }),
  http.get("*/contenido/servicios", () => HttpResponse.json(servicios)),
  http.get("*/contenido/servicios/:slug", ({ params }) => {
    const servicio = servicios.find((item) => item.slug === params.slug);
    return servicio
      ? HttpResponse.json(servicio)
      : HttpResponse.json({ message: "Servicio no encontrado" }, { status: 404 });
  }),
  http.get("*/contenido/preguntas-frecuentes", () =>
    HttpResponse.json(preguntasFrecuentes),
  ),
  http.get("*/contenido/emergencias", () => HttpResponse.json(puntosEmergencia)),
  http.get("*/contenido/sedes", () => HttpResponse.json(sedes)),
  http.get("*/contenido/sedes/:slug", ({ params }) => {
    const sede = sedes.find((item) => item.slug === params.slug);
    return sede
      ? HttpResponse.json(sede)
      : HttpResponse.json({ message: "Sede no encontrada" }, { status: 404 });
  }),
  http.get("*/contenido/funcionarios", () => HttpResponse.json(funcionarios)),
  http.get("*/contenido/funcionarios/:slug", ({ params }) => {
    const funcionario = funcionarios.find((item) => item.slug === params.slug);
    return funcionario
      ? HttpResponse.json(funcionario)
      : HttpResponse.json({ message: "Funcionario no encontrado" }, { status: 404 });
  }),
  http.get("*/contenido/autoridades", () => HttpResponse.json(autoridades)),
  http.get("*/contenido/organizacion", () => HttpResponse.json(areasOrganizacionales)),
  http.get("*/contenido/documentos-de-gestion", () =>
    HttpResponse.json(documentosGestion),
  ),
];

export const handlers = [...contenido];
