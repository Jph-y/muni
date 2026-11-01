import type { MetadataRoute } from "next";
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

export default function sitemap(): MetadataRoute.Sitemap {
  const ahora = new Date();

  return rutasPublicas.map((ruta) => ({
    url: `${siteConfig.url}${ruta}`,
    lastModified: ahora,
    changeFrequency: ruta === "" || ruta === "/noticias" ? "daily" : "weekly",
    priority: ruta === "" ? 1 : ruta.startsWith("/tramites") ? 0.9 : 0.7,
  }));
}
