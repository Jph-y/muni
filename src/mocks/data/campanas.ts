import type { Campana } from "@/lib/api/types";

const cdn = "https://cdn.www.gob.pe/uploads/campaign/photo";

export const campanas: Campana[] = [
  {
    id: "90202",
    slug: "campana-navidena-2026",
    titulo: "Campaña Navideña 2026",
    descripcion:
      "Actividades gratuitas para las familias del distrito: chocolatada, show infantil y feria de emprendedores navideños.",
    inicio: "2026-12-01",
    fin: "2026-12-24",
    imagen: `${cdn}/000/082/823/campaign_MARZO_OK.jpg`,
    enlace: "/noticias",
    lugar: "Plaza de Armas de Los Olivos",
    horario: "De 4:00 p. m. a 9:00 p. m.",
    organiza: "Gerencia de Desarrollo Social",
  },
  {
    id: "90201",
    slug: "campana-de-vacunacion-antirrabica-2026",
    titulo: "Campaña de vacunación antirrábica 2026",
    descripcion:
      "Acerca a tu perro o gato a los puntos de vacunación gratuita instalados en el distrito. La atención es por orden de llegada.",
    inicio: "2026-10-15",
    fin: "2026-11-30",
    imagen: `${cdn}/000/087/645/campaign_DICIEMBRE.jpg`,
    enlace: "/servicios/tenencia-responsable-de-mascotas",
    lugar: "Veterinaria Municipal Patitas Olivenses y puntos itinerantes",
    horario: "Lunes a sábado, de 9:00 a. m. a 4:00 p. m.",
    organiza: "Subgerencia de Salud y Sanidad",
  },
  {
    id: "90200",
    slug: "beneficio-tributario-2026",
    titulo: "Beneficio Tributario 2026",
    descripcion:
      "Cancela tu impuesto predial y arbitrios con descuento antes del 31 de diciembre. También puedes pagar en línea.",
    inicio: "2026-10-01",
    fin: "2026-12-31",
    imagen: `${cdn}/000/087/644/campaign_NOVIEMBRE.jpg`,
    enlace: "/tramites/categoria/tributos",
    lugar: "Palacio Municipal y agencias autorizadas",
    horario:
      "Lunes a viernes, de 8:30 a. m. a 6:00 p. m. · Sábados, de 8:00 a. m. a 1:00 p. m.",
    organiza: "Gerencia de Administración Tributaria",
  },
  {
    id: "90199",
    slug: "feria-del-emprendedor-olivenses-2026",
    titulo: "Feria del Emprendedor Olivenses 2026",
    descripcion:
      "Más de 200 negocios locales exhibieron sus productos y recibieron orientación para formalizarse.",
    inicio: "2026-08-20",
    fin: "2026-09-05",
    imagen: `${cdn}/000/082/823/campaign_MARZO_OK.jpg`,
    enlace:
      "/noticias/feria-del-emprendedor-olivenses-reunio-a-mas-de-200-negocios-locales",
    lugar: "Plaza de Armas de Los Olivos",
    horario: "De 10:00 a. m. a 8:00 p. m.",
    organiza: "Gerencia de Desarrollo Económico",
  },
  {
    id: "90198",
    slug: "verano-saludable-2026",
    titulo: "Verano Saludable 2026",
    descripcion:
      "Jornadas de control de peso, presión arterial y orientación nutricional gratuita en los parques del distrito.",
    inicio: "2026-01-10",
    fin: "2026-02-28",
    imagen: `${cdn}/000/054/398/campaign_Slider_003%282%29.jpg`,
    enlace: "/servicios",
    lugar: "Parques zonales y losas deportivas del distrito",
    horario: "Sábados y domingos, de 8:00 a. m. a 1:00 p. m.",
    organiza: "Subgerencia de Salud y Sanidad",
  },
  {
    id: "87645",
    slug: "beneficio-tributario-diciembre-2024",
    titulo: "Beneficio Tributario 2024",
    descripcion:
      "Vecino, recuerda que el beneficio tributario vence el 30 de diciembre. Acércate a cancelar tu predial y arbitrios con descuento.",
    inicio: "2024-12-01",
    fin: "2024-12-30",
    imagen: `${cdn}/000/087/645/campaign_DICIEMBRE.jpg`,
    enlace: "/tramites/categoria/tributos",
    lugar: "Palacio Municipal",
    organiza: "Gerencia de Administración Tributaria",
  },
  {
    id: "87644",
    slug: "beneficio-tributario-noviembre-2024",
    titulo: "Beneficio Tributario 2024",
    descripcion:
      "El beneficio tributario vence el 30 de noviembre. Paga en línea y evita las colas.",
    inicio: "2024-11-01",
    fin: "2024-11-30",
    imagen: `${cdn}/000/087/644/campaign_NOVIEMBRE.jpg`,
    enlace: "/tramites/categoria/tributos",
    lugar: "Palacio Municipal",
    organiza: "Gerencia de Administración Tributaria",
  },
  {
    id: "82823",
    slug: "pronto-pago-2024",
    titulo: "Pronto Pago 2024",
    descripcion:
      "Aprovecha el descuento por pronto pago del impuesto predial y arbitrios municipales.",
    inicio: "2024-03-01",
    fin: "2024-03-30",
    imagen: `${cdn}/000/082/823/campaign_MARZO_OK.jpg`,
    enlace: "/tramites/categoria/tributos",
    lugar: "Palacio Municipal",
    organiza: "Gerencia de Administración Tributaria",
  },
  {
    id: "54398",
    slug: "prorroga-2024",
    titulo: "Prórroga 2024",
    descripcion:
      "La amnistía tributaria se prorroga hasta el 30 de marzo del 2024. Regulariza tu deuda.",
    inicio: "2024-02-28",
    fin: "2024-03-30",
    imagen: `${cdn}/000/054/398/campaign_Slider_003%282%29.jpg`,
    enlace: "/tramites/categoria/tributos",
    lugar: "Palacio Municipal",
    organiza: "Gerencia de Administración Tributaria",
  },
];
