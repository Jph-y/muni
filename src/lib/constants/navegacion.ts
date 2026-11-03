export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

export type NavSection = {
  label: string;
  href: string;
  columns: {
    title: string;
    items: NavLink[];
  }[];
};

export const navegacionPrincipal: NavSection[] = [
  {
    label: "Trámites y servicios",
    href: "/tramites",
    columns: [
      {
        title: "Trámites",
        items: [
          {
            label: "Todos los trámites y servicios",
            href: "/tramites",
            description: "Catálogo completo con requisitos y costos.",
          },
          {
            label: "Texto Único de Procedimientos (TUPA)",
            href: "/tramites/tupa",
            description: "Procedimientos administrativos vigentes.",
          },
          {
            label: "Licencias de funcionamiento",
            href: "/tramites/categoria/licencias-de-funcionamiento",
            description: "Apertura de negocios y establecimientos.",
          },
          {
            label: "Matrimonio civil y divorcio",
            href: "/tramites/categoria/matrimonio-y-divorcio",
            description: "Separación convencional y divorcio ulterior.",
          },
        ],
      },
      {
        title: "Servicios en línea",
        items: [
          {
            label: "Mesa de partes virtual",
            href: "/mesa-de-partes",
            description: "Presenta documentos con validez legal.",
          },
          {
            label: "Seguimiento de trámites",
            href: "/mesa-de-partes/seguimiento",
            description: "Consulta el estado de tu expediente.",
          },
          {
            label: "Pago de tributos",
            href: "/tributos",
            description: "Predial, arbitrios y multas con Yape o Plin.",
          },
          {
            label: "Reserva de citas",
            href: "/citas",
            description: "Agenda tu atención en sede.",
          },
        ],
      },
    ],
  },
  {
    label: "Normas y documentos",
    href: "/normas",
    columns: [
      {
        title: "Normas legales",
        items: [
          {
            label: "Todas las normas",
            href: "/normas",
            description: "Busca por número, tipo o año.",
          },
          {
            label: "Ordenanzas",
            href: "/normas/tipo/ordenanza",
            description: "Normas de alcance distrital.",
          },
          {
            label: "Decretos de alcaldía",
            href: "/normas/tipo/decreto-de-alcaldia",
            description: "Disposiciones del despacho de alcaldía.",
          },
          {
            label: "Acuerdos de concejo",
            href: "/normas/tipo/acuerdo-de-concejo",
            description: "Decisiones del concejo municipal.",
          },
        ],
      },
      {
        title: "Documentos",
        items: [
          {
            label: "Informes y publicaciones",
            href: "/informes-publicaciones",
            description: "Formatos, formularios e informes.",
          },
          {
            label: "Documentos de gestión",
            href: "/institucional/documentos-de-gestion",
            description: "ROF, MOF, PEI, POI y CAP.",
          },
          {
            label: "Transparencia",
            href: "/transparencia",
            description: "Presupuesto, contrataciones y planilla.",
          },
          {
            label: "Acceso a la información pública",
            href: "/transparencia/acceso-a-la-informacion",
            description: "Solicita información en el marco de la Ley 27806.",
          },
        ],
      },
    ],
  },
  {
    label: "Noticias y campañas",
    href: "/noticias",
    columns: [
      {
        title: "Actualidad",
        items: [
          {
            label: "Noticias",
            href: "/noticias",
            description: "Últimas acciones de la gestión municipal.",
          },
          {
            label: "Campañas y eventos",
            href: "/campanas",
            description: "Campañas tributarias y actividades vecinales.",
          },
          {
            label: "Convocatorias",
            href: "/convocatorias",
            description: "Procesos CAS y convocatorias públicas.",
          },
        ],
      },
      {
        title: "Comunidad",
        items: [
          {
            label: "Programas sociales",
            href: "/programas",
            description: "Vaso de Leche, DEMUNA, OMAPED y más.",
          },
          {
            label: "Participación vecinal",
            href: "/participacion-vecinal",
            description: "Presupuesto participativo y CODISE.",
          },
          {
            label: "Preguntas frecuentes",
            href: "/preguntas-frecuentes",
            description: "Respuestas a las dudas más comunes.",
          },
        ],
      },
    ],
  },
  {
    label: "Institucional",
    href: "/institucional",
    columns: [
      {
        title: "La institución",
        items: [
          {
            label: "¿Qué hacemos?",
            href: "/institucional",
            description: "Misión, visión y funciones municipales.",
          },
          {
            label: "Organización",
            href: "/institucional/organizacion",
            description: "Gerencias y subgerencias.",
          },
          {
            label: "Autoridades",
            href: "/institucional/autoridades",
            description: "Alcalde y concejo municipal.",
          },
          {
            label: "Organigrama",
            href: "/institucional/organigrama",
            description: "Estructura orgánica vigente.",
          },
        ],
      },
      {
        title: "Directorio y sedes",
        items: [
          {
            label: "Directorio de funcionarios",
            href: "/institucional/directorio-funcionarios",
            description: "Contacto por área y responsable.",
          },
          {
            label: "Sedes municipales",
            href: "/institucional/sedes",
            description: "Palacio municipal y sedes descentralizadas.",
          },
          {
            label: "Contacto y emergencias",
            href: "/contacto",
            description: "Canales de atención y números de emergencia.",
          },
        ],
      },
    ],
  },
];

export const enlacesRapidos = [
  {
    label: "Pago de tributos",
    href: "/tributos",
    icono: "wallet",
    descripcion: "Predial, arbitrios y multas en línea.",
  },
  {
    label: "Mesa de partes",
    href: "/mesa-de-partes",
    icono: "file-text",
    descripcion: "Presenta documentos sin hacer colas.",
  },
  {
    label: "Seguimiento",
    href: "/mesa-de-partes/seguimiento",
    icono: "search",
    descripcion: "Consulta el estado de tu expediente.",
  },
  {
    label: "Libro de reclamaciones",
    href: "/libro-de-reclamaciones",
    icono: "message-square-warning",
    descripcion: "Registra un reclamo o sugerencia.",
  },
  {
    label: "Licencias de funcionamiento",
    href: "/tramites/categoria/licencias-de-funcionamiento",
    icono: "store",
    descripcion: "Abre tu negocio formalmente.",
  },
  {
    label: "Transparencia",
    href: "/transparencia",
    icono: "landmark",
    descripcion: "Presupuesto y gestión institucional.",
  },
] as const;

export const enlacesPieDePagina = [
  {
    titulo: "Atención al ciudadano",
    enlaces: [
      { label: "Mesa de partes virtual", href: "/mesa-de-partes" },
      { label: "Seguimiento de trámites", href: "/mesa-de-partes/seguimiento" },
      { label: "Libro de reclamaciones", href: "/libro-de-reclamaciones" },
      { label: "Preguntas frecuentes", href: "/preguntas-frecuentes" },
      { label: "Programas sociales", href: "/programas" },
      { label: "Participación vecinal", href: "/participacion-vecinal" },
      { label: "Contacto y emergencias", href: "/emergencias" },
    ],
  },
  {
    titulo: "Trámites",
    enlaces: [
      { label: "Catálogo de trámites", href: "/tramites" },
      { label: "TUPA", href: "/tramites/tupa" },
      {
        label: "Licencias de funcionamiento",
        href: "/tramites/categoria/licencias-de-funcionamiento",
      },
      {
        label: "Matrimonio civil y divorcio",
        href: "/tramites/categoria/matrimonio-y-divorcio",
      },
      { label: "Pago de tributos", href: "/tributos" },
    ],
  },
  {
    titulo: "Transparencia",
    enlaces: [
      { label: "Portal de transparencia", href: "/transparencia" },
      { label: "Presupuesto", href: "/transparencia/presupuesto" },
      { label: "Contrataciones", href: "/transparencia/contrataciones" },
      { label: "POI", href: "/transparencia/poi" },
      { label: "Planilla", href: "/transparencia/planilla" },
      {
        label: "Acceso a la información",
        href: "/transparencia/acceso-a-la-informacion",
      },
    ],
  },
  {
    titulo: "Institucional",
    enlaces: [
      { label: "¿Qué hacemos?", href: "/institucional" },
      { label: "Autoridades", href: "/institucional/autoridades" },
      {
        label: "Directorio de funcionarios",
        href: "/institucional/directorio-funcionarios",
      },
      { label: "Sedes", href: "/institucional/sedes" },
      { label: "Convocatorias", href: "/convocatorias" },
    ],
  },
] as const;
