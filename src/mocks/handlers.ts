import { http, HttpResponse } from "msw";
import { campanas } from "@/mocks/data/campanas";
import {
  areasOrganizacionales,
  autoridades,
  documentosGestion,
  funcionarios,
  sedes,
} from "@/mocks/data/institucional";
import { normas } from "@/mocks/data/normas";
import { noticias } from "@/mocks/data/noticias";
import { tramites } from "@/mocks/data/tramites";

const contenido = [
  http.get("*/contenido/noticias", () => HttpResponse.json(noticias)),
  http.get("*/contenido/normas", () => HttpResponse.json(normas)),
  http.get("*/contenido/campanas", () => HttpResponse.json(campanas)),
  http.get("*/contenido/tramites", () => HttpResponse.json(tramites)),
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
