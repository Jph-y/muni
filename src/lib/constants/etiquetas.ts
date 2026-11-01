import type { CategoriaNoticia, CategoriaTramite, TipoNorma } from "@/lib/api/types";

export const etiquetasCategoriaNoticia: Record<CategoriaNoticia, string> = {
  seguridad: "Seguridad",
  salud: "Salud",
  obras: "Obras",
  educacion: "Educación",
  cultura: "Cultura",
  emprendimiento: "Emprendimiento",
};

export const etiquetasTipoNorma: Record<TipoNorma, string> = {
  ordenanza: "Ordenanza",
  "decreto-de-alcaldia": "Decreto de alcaldía",
  "acuerdo-de-concejo": "Acuerdo de concejo",
  resolucion: "Resolución",
};

export const etiquetasCategoriaTramite: Record<CategoriaTramite, string> = {
  tributos: "Tributos",
  "licencias-de-funcionamiento": "Licencias de funcionamiento",
  "matrimonio-y-divorcio": "Matrimonio y divorcio",
  certificados: "Certificados",
  "desarrollo-urbano": "Desarrollo urbano",
  "servicios-sociales": "Servicios sociales",
};
