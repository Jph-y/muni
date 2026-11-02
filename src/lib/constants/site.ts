export const siteConfig = {
  nombre: "Municipalidad Distrital de Los Olivos",
  siglas: "MDLO",
  nombreCorto: "Los Olivos",
  descripcion:
    "Portal web oficial de la Municipalidad Distrital de Los Olivos. Consulta trámites, servicios, normas, noticias y realiza tus pagos en línea.",
  url: "https://www.munilosolivos.gob.pe",
  direccion: "Av. Carlos Izaguirre 813, Urb. Mercurio, Los Olivos, Lima",
  horario: "Lunes a viernes, 8:30 a. m. a 6:00 p. m. · Sábados, 8:00 a. m. a 1:00 p. m.",
  telefonoCentral: "(01) 321-4547",
  whatsappSerenazgo: "937 016 501",
  redes: {
    facebook: "https://facebook.com/munilosolivos",
    x: "https://twitter.com/munilosolivos",
    instagram: "https://instagram.com/municipalidaddelosolivos",
  },
} as const;

export const emergencias = [
  { nombre: "Comisaría Laura Caller Ibérico", telefono: "01 528-7274" },
  { nombre: "Comisaría Sol de Oro", telefono: "01 540-1190" },
  { nombre: "Comisaría de Pro", telefono: "01 533-3327" },
  { nombre: "Seguridad Ciudadana", telefono: "01 510-4230" },
  { nombre: "Central de Cámaras", telefono: "01 510-4222" },
] as const;

export const enlacesExternos = [
  {
    nombre: "Mesa de partes virtual",
    href: "https://mesadepartes.munilosolivos.gob.pe/",
    descripcion: "Envía documentos y solicitudes sin acudir a la sede.",
  },
  {
    nombre: "Tributos municipales",
    href: "https://servicios.munilosolivos.gob.pe/pagosenlinea/public/",
    descripcion: "Consulta y paga tu impuesto predial y arbitrios.",
  },
  {
    nombre: "Seguimiento de trámites",
    href: "https://tramiteconsulta.munilosolivos.gob.pe/tramiteconsul",
    descripcion: "Revisa el estado de tu expediente con tu código.",
  },
  {
    nombre: "Libro de reclamaciones",
    href: "https://reclamos.servicios.gob.pe/?institution_id=127",
    descripcion: "Registra un reclamo o sugerencia sobre la atención.",
  },
  {
    nombre: "Portal de Transparencia",
    href: "https://www.transparencia.gob.pe/enlaces/pte_transparencia_enlaces.aspx?id_entidad=10064",
    descripcion: "Información pública, presupuesto y contrataciones.",
  },
  {
    nombre: "Sistema de Control Interno",
    href: "https://www.munilosolivos.gob.pe/sisce/",
    descripcion: "Consulta el avance del control interno institucional.",
  },
] as const;
