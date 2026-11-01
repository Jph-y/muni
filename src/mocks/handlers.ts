import { http, HttpResponse } from "msw";
import { campanas } from "@/mocks/data/campanas";
import { funcionarios, sedes } from "@/mocks/data/institucional";
import { normas } from "@/mocks/data/normas";
import { noticias } from "@/mocks/data/noticias";
import { tramites } from "@/mocks/data/tramites";

const contenido = [
  http.get("*/contenido/noticias", () => HttpResponse.json(noticias)),
  http.get("*/contenido/normas", () => HttpResponse.json(normas)),
  http.get("*/contenido/campanas", () => HttpResponse.json(campanas)),
  http.get("*/contenido/tramites", () => HttpResponse.json(tramites)),
  http.get("*/contenido/sedes", () => HttpResponse.json(sedes)),
  http.get("*/contenido/funcionarios", () => HttpResponse.json(funcionarios)),
];

export const handlers = [...contenido];
