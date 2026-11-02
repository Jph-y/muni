import type {
  CategoriaFaq,
  CategoriaNoticia,
  CategoriaServicio,
  CategoriaTramite,
  EstadoCampana,
  ModalidadAtencion,
  NivelOrganizacional,
  TipoDocumentoGestion,
  TipoNorma,
  TipoPuntoEmergencia,
  TipoPublicacion,
} from "@/lib/api/types";

export const etiquetasCategoriaNoticia: Record<CategoriaNoticia, string> = {
  seguridad: "Seguridad",
  salud: "Salud",
  obras: "Obras",
  educacion: "Educación",
  cultura: "Cultura",
  emprendimiento: "Emprendimiento",
};

export const descripcionesCategoriaNoticia: Record<CategoriaNoticia, string> = {
  seguridad:
    "Operativos, patrullaje, videovigilancia y acciones de prevención en el distrito.",
  salud:
    "Campañas de vacunación, atención primaria, veterinaria municipal y vida saludable.",
  obras:
    "Parques, vías, espacios públicos e infraestructura ejecutada por la municipalidad.",
  educacion:
    "Apoyo a instituciones educativas, becas, talleres y actividades formativas.",
  cultura:
    "Festivales, actividades artísticas, biblioteca y fechas emblemáticas del distrito.",
  emprendimiento: "Ferias, formalización, capacitación y apoyo a los negocios locales.",
};

export const etiquetasEstadoCampana: Record<EstadoCampana, string> = {
  vigente: "Vigente",
  proxima: "Próxima",
  finalizada: "Finalizada",
};

export const descripcionesEstadoCampana: Record<EstadoCampana, string> = {
  vigente: "Campañas y eventos que puedes aprovechar en este momento.",
  proxima: "Actividades programadas que comenzarán en los próximos días.",
  finalizada: "Campañas y eventos que ya concluyeron, disponibles para consulta.",
};

export const etiquetasTipoNorma: Record<TipoNorma, string> = {
  ordenanza: "Ordenanza",
  "decreto-de-alcaldia": "Decreto de alcaldía",
  "acuerdo-de-concejo": "Acuerdo de concejo",
  resolucion: "Resolución",
};

export const descripcionesTipoNorma: Record<TipoNorma, string> = {
  ordenanza:
    "Normas de alcance distrital aprobadas por el Concejo Municipal y publicadas para conocimiento de la ciudadanía.",
  "decreto-de-alcaldia":
    "Disposiciones emitidas por la alcaldía para reglamentar ordenanzas o atender situaciones administrativas.",
  "acuerdo-de-concejo":
    "Decisiones del Concejo Municipal sobre asuntos de interés institucional y distrital.",
  resolucion:
    "Actos administrativos que resuelven situaciones concretas de la gestión municipal.",
};

export const etiquetasTipoPublicacion: Record<TipoPublicacion, string> = {
  formato: "Formato",
  formulario: "Formulario",
  informe: "Informe",
};

export const descripcionesTipoPublicacion: Record<TipoPublicacion, string> = {
  formato:
    "Documentos descargables que la municipalidad solicita para iniciar un trámite.",
  formulario:
    "Fichas de registro e inscripción para programas y actividades municipales.",
  informe: "Resultados, avances y rendición de cuentas de la gestión municipal.",
};

export const etiquetasCategoriaTramite: Record<CategoriaTramite, string> = {
  tributos: "Tributos",
  "licencias-de-funcionamiento": "Licencias de funcionamiento",
  "matrimonio-y-divorcio": "Matrimonio y divorcio",
  certificados: "Certificados",
  "desarrollo-urbano": "Desarrollo urbano",
  "servicios-sociales": "Servicios sociales",
  "mesa-de-partes": "Mesa de partes",
};

export const descripcionesCategoriaTramite: Record<CategoriaTramite, string> = {
  tributos:
    "Declaraciones, fraccionamientos y constancias vinculadas a tus obligaciones municipales.",
  "licencias-de-funcionamiento":
    "Autorizaciones para abrir o regularizar un negocio en el distrito.",
  "matrimonio-y-divorcio":
    "Matrimonio civil, separación convencional y divorcio ulterior.",
  certificados:
    "Documentos que acreditan domicilio, identidad, numeración o encontrarse al día.",
  "desarrollo-urbano":
    "Autorizaciones de anuncios, compatibilidad de uso y habilitaciones urbanas.",
  "servicios-sociales":
    "Programas de apoyo a la primera infancia, adultos mayores y familias.",
  "mesa-de-partes": "Presentación de documentos y solicitudes con seguimiento en línea.",
};

export const etiquetasModalidad: Record<ModalidadAtencion, string> = {
  virtual: "En línea",
  presencial: "Presencial",
  mixto: "Mixto",
};

export const etiquetasCategoriaServicio: Record<CategoriaServicio, string> = {
  "limpieza-publica": "Limpieza pública",
  "seguridad-ciudadana": "Seguridad ciudadana",
  salud: "Salud",
  "programas-sociales": "Programas sociales",
  "medio-ambiente": "Medio ambiente",
  "cultura-y-deporte": "Cultura y deporte",
};

export const descripcionesCategoriaServicio: Record<CategoriaServicio, string> = {
  "limpieza-publica": "Recojo de residuos, barrido de calles y puntos críticos.",
  "seguridad-ciudadana": "Serenazgo, videovigilancia y atención de emergencias.",
  salud: "Campañas preventivas y atención primaria en la jurisdicción.",
  "programas-sociales": "Apoyo alimentario, protección y acompañamiento familiar.",
  "medio-ambiente": "Áreas verdes, tenencia responsable y educación ambiental.",
  "cultura-y-deporte": "Talleres, biblioteca y actividades recreativas gratuitas.",
};

export const etiquetasCategoriaFaq: Record<CategoriaFaq, string> = {
  tramites: "Trámites",
  tributos: "Tributos",
  "mesa-de-partes": "Mesa de partes",
  cuenta: "Cuenta digital",
  servicios: "Servicios",
  institucional: "Institucional",
};

export const etiquetasTipoPuntoEmergencia: Record<TipoPuntoEmergencia, string> = {
  comisaria: "Comisaría",
  serenazgo: "Serenazgo",
  bomberos: "Bomberos",
  salud: "Salud",
  central: "Central de emergencias",
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
