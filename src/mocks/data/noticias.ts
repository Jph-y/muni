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
];
