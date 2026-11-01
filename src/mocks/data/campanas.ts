import type { Campana } from "@/lib/api/types";

const cdn = "https://cdn.www.gob.pe/uploads/campaign/photo";

export const campanas: Campana[] = [
  {
    id: "87645",
    slug: "beneficio-tributario-diciembre-2024",
    titulo: "Beneficio Tributario 2024",
    descripcion:
      "Vecino, recuerda que el beneficio tributario vence el 30 de diciembre. Acércate a cancelar tu predial y arbitrios con descuento.",
    inicio: "2024-12-01",
    fin: "2024-12-30",
    imagen: `${cdn}/000/087/645/campaign_DICIEMBRE.jpg`,
    enlace: "/tributos",
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
    enlace: "/tributos",
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
    enlace: "/tributos",
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
    enlace: "/tributos",
  },
];
