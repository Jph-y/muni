import type { MetadataRoute } from "next";
import {
  obtenerFuncionarios,
  obtenerNormas,
  obtenerPublicaciones,
  obtenerSedes,
  obtenerServicios,
  obtenerTramites,
} from "@/lib/api/contenido";
import type { CategoriaTramite, TipoNorma, TipoPublicacion } from "@/lib/api/types";
import {
  etiquetasCategoriaTramite,
  etiquetasTipoNorma,
  etiquetasTipoPublicacion,
} from "@/lib/constants/etiquetas";
import { siteConfig } from "@/lib/constants/site";

const rutasPublicas = [
  "",
  "/institucional",
  "/institucional/organizacion",
  "/institucional/organigrama",
  "/institucional/autoridades",
  "/institucional/directorio-funcionarios",
  "/institucional/sedes",
  "/institucional/documentos-de-gestion",
  "/tramites",
  "/tramites/tupa",
  "/servicios",
  "/normas",
  "/informes-publicaciones",
  "/noticias",
  "/campanas",
  "/transparencia",
  "/transparencia/presupuesto",
  "/transparencia/contrataciones",
  "/transparencia/poi",
  "/transparencia/planilla",
  "/transparencia/acceso-a-la-informacion",
  "/participacion-vecinal",
  "/participacion-vecinal/presupuesto-participativo",
  "/participacion-vecinal/codisec",
  "/programas",
  "/convocatorias",
  "/contacto",
  "/emergencias",
  "/preguntas-frecuentes",
  "/libro-de-reclamaciones",
  "/libro-de-reclamaciones/consulta",
  "/buscar",
  "/mapa-del-sitio",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const ahora = new Date();
  const [sedes, funcionarios, tramites, servicios, normas, publicaciones] =
    await Promise.all([
      obtenerSedes(),
      obtenerFuncionarios(),
      obtenerTramites(),
      obtenerServicios(),
      obtenerNormas(),
      obtenerPublicaciones(),
    ]);

  const categorias = Object.keys(etiquetasCategoriaTramite) as CategoriaTramite[];
  const tiposNorma = Object.keys(etiquetasTipoNorma) as TipoNorma[];
  const tiposPublicacion = Object.keys(etiquetasTipoPublicacion) as TipoPublicacion[];

  const rutasDinamicas = [
    ...sedes.map((sede) => `/institucional/sedes/${sede.slug}`),
    ...funcionarios.map(
      (funcionario) => `/institucional/directorio-funcionarios/${funcionario.slug}`,
    ),
    ...tramites.map((tramite) => `/tramites/${tramite.slug}`),
    ...categorias.map((categoria) => `/tramites/categoria/${categoria}`),
    ...servicios.map((servicio) => `/servicios/${servicio.slug}`),
    ...normas.map((norma) => `/normas/${norma.slug}`),
    ...tiposNorma.map((tipo) => `/normas/tipo/${tipo}`),
    ...publicaciones.map((publicacion) => `/informes-publicaciones/${publicacion.slug}`),
    ...tiposPublicacion.map((tipo) => `/informes-publicaciones/tipo/${tipo}`),
  ];

  return [...rutasPublicas, ...rutasDinamicas].map((ruta) => ({
    url: `${siteConfig.url}${ruta}`,
    lastModified: ahora,
    changeFrequency: ruta === "" || ruta === "/noticias" ? "daily" : "weekly",
    priority: ruta === "" ? 1 : ruta.startsWith("/tramites") ? 0.9 : 0.7,
  }));
}
