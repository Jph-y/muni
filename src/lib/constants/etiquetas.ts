import type {
  CategoriaNoticia,
  CategoriaTramite,
  NivelOrganizacional,
  TipoDocumentoGestion,
  TipoNorma,
} from "@/lib/api/types";

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

export const etiquetasNivelOrganizacional: Record<NivelOrganizacional, string> = {
  "alta-direccion": "Alta dirección",
  "organo-asesor": "Órganos de asesoría",
  gerencia: "Gerencias",
  subgerencia: "Subgerencias",
};

export const etiquetasTipoDocumentoGestion: Record<TipoDocumentoGestion, string> = {
  rof: "ROF",
  mof: "MOF",
  pei: "PEI",
  poi: "POI",
  cap: "CAP",
  pap: "PAP",
  manual: "Manual",
};

export const descripcionesTipoDocumentoGestion: Record<TipoDocumentoGestion, string> = {
  rof: "Reglamento de Organización y Funciones",
  mof: "Manual de Organización y Funciones",
  pei: "Plan Estratégico Institucional",
  poi: "Plan Operativo Institucional",
  cap: "Cuadro de Asignación de Personal",
  pap: "Presupuesto Analítico de Personal",
  manual: "Manual de procedimientos",
};
