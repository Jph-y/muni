import type { Noticia } from "@/lib/api/types";

const cdn = "https://cdn.www.gob.pe/uploads/document/file";

export const noticias: Noticia[] = [
  {
    id: "1134533",
    slug: "municipalidad-de-los-olivos-previene-robo-de-vehiculos-con-la-diprove-norte",
    titulo: "Municipalidad de Los Olivos previene robo de vehículos con la DIPROVE Norte",
    resumen:
      "Serenos y efectivos policiales reforzaron el patrullaje en puntos críticos del distrito para reducir el robo de vehículos.",
    contenido: [
      "La Municipalidad Distrital de Los Olivos, a través de la Gerencia de Seguridad Ciudadana, articuló acciones con la División de Prevención e Investigación de Robo de Vehículos (DIPROVE Norte) para intensificar el patrullaje en las zonas con mayor incidencia.",
      "El operativo incluyó la instalación de puntos de control y la verificación de placas en tiempo real mediante las cámaras de videovigilancia del distrito.",
      "La comuna invoca a la ciudadanía a denunciar cualquier hecho sospechoso a la central de Serenazgo al 01 510-4230 o al WhatsApp 937 016 501.",
    ],
    categoria: "seguridad",
    fecha: "2025-02-17T14:20:00-05:00",
    imagen: `${cdn}/7839262/standard_1134533-019.jpg`,
    destacada: true,
  },
  {
    id: "1134523",
    slug: "los-olivos-ya-cuenta-con-veterinaria-municipal-patitas-olivenses",
    titulo: 'Los Olivos ya cuenta con Veterinaria Municipal "Patitas Olivenses"',
    resumen:
      "Nuevo servicio brinda atención veterinaria a bajo costo para las mascotas del distrito.",
    contenido: [
      "La Veterinaria Municipal Patitas Olivenses atiende consultas generales, vacunación antirrábica, desparasitación y campañas de esterilización.",
      "El servicio busca promover la tenencia responsable de animales de compañía y reducir la población de animales en situación de abandono.",
    ],
    categoria: "salud",
    fecha: "2025-02-14T18:30:00-05:00",
    imagen: `${cdn}/7839168/standard_1134523-018.jpg`,
    destacada: true,
  },
  {
    id: "1134520",
    slug: "inauguran-remodelado-parque-leon-dormido",
    titulo: "Inauguran remodelado parque León Dormido",
    resumen:
      "Espacio público recuperado incluye áreas verdes, juegos infantiles y zona de ejercicios.",
    contenido: [
      "El parque León Dormido fue recuperado con nuevo mobiliario urbano, iluminación LED, juegos infantiles y una zona de máquinas de ejercicio para adultos mayores.",
      "La obra forma parte del plan de recuperación de espacios públicos del distrito.",
    ],
    categoria: "obras",
    fecha: "2025-02-14T15:30:00-05:00",
    imagen: `${cdn}/7839140/standard_1134520-017.jpg`,
    destacada: true,
  },
  {
    id: "1134508",
    slug: "distritos-de-lima-norte-se-unen-para-combatir-la-criminalidad",
    titulo: "Distritos de Lima Norte se unen para combatir la criminalidad",
    resumen:
      "Alcaldes acordaron coordinar operativos conjuntos y compartir información de videovigilancia.",
    contenido: [
      "Los distritos de Lima Norte suscribieron un acuerdo de cooperación interdistrital para el intercambio de información y la ejecución de operativos conjuntos.",
    ],
    categoria: "seguridad",
    fecha: "2025-02-12T17:10:00-05:00",
    imagen: `${cdn}/7839045/standard_1134508-016.jpg`,
  },
  {
    id: "1134500",
    slug: "llego-maquinaria-pesada-recientemente-adquirida-por-la-municipalidad",
    titulo: "Llegó maquinaria pesada recientemente adquirida por la municipalidad",
    resumen:
      "Nuevos equipos permitirán atender con mayor rapidez la limpieza pública y el mantenimiento de vías.",
    contenido: [
      "La municipalidad incorporó cargadores frontales, volquetes y una motoniveladora para reforzar los trabajos de mantenimiento vial y limpieza pública.",
    ],
    categoria: "obras",
    fecha: "2025-02-07T20:00:00-05:00",
    imagen: `${cdn}/7839009/standard_1134500-015.jpg`,
  },
  {
    id: "1134487",
    slug: "entrega-de-autorizaciones-temporales-para-comercio-ambulatorio-formal",
    titulo: "Entrega de autorizaciones temporales para comercio ambulatorio formal",
    resumen:
      "Comerciantes empadronados recibieron autorizaciones para operar en espacios ordenados.",
    contenido: [
      "La Gerencia de Desarrollo Económico entregó autorizaciones temporales a comerciantes ambulatorios empadronados, en el marco del ordenamiento del espacio público.",
    ],
    categoria: "emprendimiento",
    fecha: "2025-02-04T17:00:00-05:00",
    imagen: `${cdn}/7838922/standard_1134487-014.jpg`,
  },
  {
    id: "1134476",
    slug: "municipalidad-de-los-olivos-apoya-construyendo-pabellon-de-tres-pisos",
    titulo:
      "Municipalidad de Los Olivos apoya construyendo pabellón de tres pisos con aulas",
    resumen:
      "La comuna financió la construcción de un pabellón de tres pisos en una institución educativa del distrito.",
    contenido: [
      "La obra beneficiará a cientos de estudiantes y forma parte del apoyo municipal a la infraestructura educativa local.",
    ],
    categoria: "educacion",
    fecha: "2025-01-31T14:00:00-05:00",
    imagen: `${cdn}/7838672/standard_1134476-013.jpg`,
  },
  {
    id: "1134471",
    slug: "entregan-indumentaria-a-serenos-de-los-olivos",
    titulo: "Entregan indumentaria a serenos de Los Olivos",
    resumen:
      "El personal de Serenazgo recibió uniformes y equipos para reforzar el patrullaje.",
    contenido: [
      "La entrega busca mejorar las condiciones de trabajo del personal de seguridad ciudadana del distrito.",
    ],
    categoria: "seguridad",
    fecha: "2025-01-27T13:59:00-05:00",
    imagen: `${cdn}/7838581/standard_1134471-011.jpg`,
  },
  {
    id: "1134465",
    slug: "asentamiento-humano-virgen-del-fatima-ya-cuenta-con-puesto-de-auxilio-rapido",
    titulo:
      "Asentamiento Humano Virgen del Fátima ya cuenta con puesto de auxilio rápido",
    resumen: "Nueva caseta de seguridad mejora la respuesta ante emergencias en la zona.",
    contenido: [
      "El puesto de auxilio rápido cuenta con personal de Serenazgo y conexión directa con la central de cámaras.",
    ],
    categoria: "seguridad",
    fecha: "2025-01-25T16:00:00-05:00",
    imagen: `${cdn}/7838533/standard_1134465-012.jpg`,
  },
  {
    id: "1200006",
    slug: "festival-de-danzas-olivenses-celebro-un-nuevo-aniversario-del-distrito",
    titulo: "Festival de Danzas Olivenses celebró un nuevo aniversario del distrito",
    resumen:
      "Más de 30 agrupaciones artísticas participaron en el festival organizado por la Municipalidad de Los Olivos.",
    contenido: [
      "El Festival de Danzas Olivenses reunió a más de 30 agrupaciones de danza folclórica y contemporánea en la explanada del Palacio Municipal.",
      "La actividad forma parte del calendario por el aniversario del distrito y contó con la participación de elencos de todas las edades.",
      "La municipalidad agradeció la participación de las familias olivenses y anunció nuevas actividades culturales para el cierre del año.",
    ],
    categoria: "cultura",
    fecha: "2026-10-12T19:00:00-05:00",
    imagen: `${cdn}/7839045/standard_1134508-016.jpg`,
    galeria: [
      `${cdn}/7839045/standard_1134508-016.jpg`,
      `${cdn}/7839140/standard_1134520-017.jpg`,
      `${cdn}/7838672/standard_1134476-013.jpg`,
    ],
    etiquetas: ["cultura", "aniversario", "danzas", "familias"],
    autor: "Oficina de Comunicaciones e Imagen Institucional",
    destacada: true,
  },
  {
    id: "1200005",
    slug: "reabren-el-parque-huandoy-con-nuevos-juegos-y-areas-verdes",
    titulo: "Reabren el parque Huandoy con nuevos juegos y áreas verdes",
    resumen:
      "La obra incluyó la renovación de veredas, iluminación LED, mobiliario urbano y una zona de ejercicios.",
    contenido: [
      "El parque Huandoy reabrió sus puertas tras concluir los trabajos de recuperación de espacios públicos ejecutados por la comuna.",
      "La intervención contempló la renovación de veredas, la instalación de iluminación LED, nuevos juegos infantiles y una zona de ejercicios para adultos.",
      "Con esta obra, la municipalidad suma nuevos espacios de encuentro para las familias del distrito y refuerza la seguridad en la zona.",
    ],
    categoria: "obras",
    fecha: "2026-08-30T11:00:00-05:00",
    imagen: `${cdn}/7839140/standard_1134520-017.jpg`,
    galeria: [
      `${cdn}/7839140/standard_1134520-017.jpg`,
      `${cdn}/7839009/standard_1134500-015.jpg`,
    ],
    etiquetas: ["obras", "parques", "espacios públicos", "Huandoy"],
    autor: "Gerencia de Desarrollo Urbano",
    destacada: true,
  },
  {
    id: "1200004",
    slug: "feria-del-emprendedor-olivenses-reunio-a-mas-de-200-negocios-locales",
    titulo: "Feria del Emprendedor Olivenses reunió a más de 200 negocios locales",
    resumen:
      "Emprendedores del distrito exhibieron sus productos y recibieron orientación para formalizar sus negocios.",
    contenido: [
      "La Feria del Emprendedor Olivenses congregó a más de 200 negocios locales en la plaza de armas del distrito.",
      "Durante la jornada, la Gerencia de Desarrollo Económico brindó orientación gratuita sobre formalización, licencias de funcionamiento y acceso a créditos.",
      "La actividad busca impulsar la reactivación económica y visibilizar el talento de las y los emprendedores del distrito.",
    ],
    categoria: "emprendimiento",
    fecha: "2026-07-19T10:00:00-05:00",
    imagen: `${cdn}/7838922/standard_1134487-014.jpg`,
    etiquetas: ["emprendimiento", "feria", "formalización", "negocios"],
    autor: "Gerencia de Desarrollo Económico",
  },
  {
    id: "1200003",
    slug: "municipalidad-amplia-la-videovigilancia-con-20-nuevas-camaras",
    titulo: "Municipalidad amplía la videovigilancia con 20 nuevas cámaras",
    resumen:
      "Los equipos fueron instalados en puntos críticos de Lima Norte y se integran a la central de monitoreo del distrito.",
    contenido: [
      "La Municipalidad de Los Olivos instaló 20 nuevas cámaras de videovigilancia en avenidas y puntos críticos del distrito.",
      "Los equipos se integran a la central de monitoreo de Serenazgo y permiten una respuesta más rápida ante emergencias.",
      "La medida complementa el patrullaje articulado con la Policía Nacional y las acciones de prevención desarrolladas en Lima Norte.",
    ],
    categoria: "seguridad",
    fecha: "2026-06-10T16:30:00-05:00",
    imagen: `${cdn}/7839262/standard_1134533-019.jpg`,
    etiquetas: ["seguridad", "videovigilancia", "Serenazgo", "Lima Norte"],
    autor: "Gerencia de Seguridad Ciudadana",
    destacada: true,
  },
  {
    id: "1200002",
    slug: "campana-gratuita-de-esterilizacion-y-vacunacion-para-mascotas",
    titulo: "Campaña gratuita de esterilización y vacunación para mascotas",
    resumen:
      "La Veterinaria Municipal Patitas Olivenses atenderá a las mascotas del distrito previa inscripción.",
    contenido: [
      "La Veterinaria Municipal Patitas Olivenses inició una campaña gratuita de esterilización y vacunación antirrábica para perros y gatos.",
      "Las atenciones se realizan previa inscripción en la sede de la veterinaria municipal y están a cargo de médicos veterinarios acreditados.",
      "La campaña busca promover la tenencia responsable y reducir la población de animales en situación de abandono.",
    ],
    categoria: "salud",
    fecha: "2026-04-22T09:00:00-05:00",
    imagen: `${cdn}/7839168/standard_1134523-018.jpg`,
    etiquetas: ["salud", "mascotas", "vacunación", "tenencia responsable"],
    autor: "Subgerencia de Salud y Sanidad",
  },
  {
    id: "1200001",
    slug: "los-olivos-inicia-el-ano-escolar-con-mejoras-en-12-instituciones-educativas",
    titulo: "Los Olivos inicia el año escolar con mejoras en 12 instituciones educativas",
    resumen:
      "La municipalidad ejecutó trabajos de pintura, reparación de aulas y habilitación de áreas recreativas.",
    contenido: [
      "Con el inicio del año escolar, la Municipalidad de Los Olivos culminó mejoras en 12 instituciones educativas del distrito.",
      "Los trabajos incluyeron pintura general, reparación de aulas, mantenimiento de servicios higiénicos y habilitación de áreas recreativas.",
      "La comuna reafirmó su compromiso con la educación y anunció que continuará coordinando con las instituciones educativas para atender sus necesidades prioritarias.",
    ],
    categoria: "educacion",
    fecha: "2026-03-16T08:00:00-05:00",
    imagen: `${cdn}/7838672/standard_1134476-013.jpg`,
    etiquetas: ["educación", "colegios", "año escolar", "infraestructura"],
    autor: "Gerencia de Desarrollo Social",
  },
];
