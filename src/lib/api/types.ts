export type CategoriaNoticia =
  "seguridad" | "salud" | "obras" | "educacion" | "cultura" | "emprendimiento";

export type Noticia = {
  id: string;
  slug: string;
  titulo: string;
  resumen: string;
  contenido: string[];
  categoria: CategoriaNoticia;
  fecha: string;
  imagen: string;
  destacada?: boolean;
};

export type TipoNorma =
  "ordenanza" | "decreto-de-alcaldia" | "acuerdo-de-concejo" | "resolucion";

export type Norma = {
  id: string;
  slug: string;
  tipo: TipoNorma;
  numero: string;
  titulo: string;
  resumen: string;
  fecha: string;
  archivoUrl?: string;
};

export type Campana = {
  id: string;
  slug: string;
  titulo: string;
  descripcion: string;
  inicio: string;
  fin: string;
  imagen: string;
  enlace?: string;
};

export type CategoriaTramite =
  | "tributos"
  | "licencias-de-funcionamiento"
  | "matrimonio-y-divorcio"
  | "certificados"
  | "desarrollo-urbano"
  | "servicios-sociales"
  | "mesa-de-partes";

export type ModalidadAtencion = "virtual" | "presencial" | "mixto";

export type PasoTramite = {
  titulo: string;
  descripcion: string;
};

export type Tramite = {
  id: string;
  slug: string;
  nombre: string;
  categoria: CategoriaTramite;
  descripcion: string;
  requisitos: string[];
  costo: number;
  plazoDias: number;
  oficina: string;
  enLinea: boolean;
  modalidad: ModalidadAtencion;
  codigoTupa?: string;
  pasos: PasoTramite[];
  formatoUrl?: string;
  formatoNombre?: string;
  baseLegal?: string[];
};

export type Sede = {
  id: string;
  slug: string;
  nombre: string;
  direccion: string;
  referencia?: string;
  horario: string;
  telefono: string;
  correo?: string;
  servicios: string[];
  coordenadas?: { lat: number; lng: number };
  principal?: boolean;
};

export type Funcionario = {
  id: string;
  slug: string;
  nombre: string;
  cargo: string;
  area: string;
  correo: string;
  telefono: string;
  dependencia?: string;
  atencion?: string;
};

export type Autoridad = {
  id: string;
  slug: string;
  nombre: string;
  cargo: "Alcalde" | "Regidor" | "Regidora";
  periodo: string;
  tipo: "alcalde" | "regidor";
  orden: number;
};

export type NivelOrganizacional =
  "alta-direccion" | "organo-asesor" | "gerencia" | "subgerencia";

export type AreaOrganizacional = {
  id: string;
  slug: string;
  nombre: string;
  siglas?: string;
  nivel: NivelOrganizacional;
  dependeDe?: string;
  responsable?: string;
  funciones: string[];
};

export type TipoDocumentoGestion =
  "rof" | "mof" | "pei" | "poi" | "cap" | "pap" | "manual";

export type DocumentoGestion = {
  id: string;
  slug: string;
  titulo: string;
  tipo: TipoDocumentoGestion;
  anio: number;
  descripcion: string;
  archivoUrl: string;
  actualizado: string;
};

export type CategoriaServicio =
  | "limpieza-publica"
  | "seguridad-ciudadana"
  | "salud"
  | "programas-sociales"
  | "medio-ambiente"
  | "cultura-y-deporte";

export type Servicio = {
  id: string;
  slug: string;
  nombre: string;
  categoria: CategoriaServicio;
  descripcion: string;
  dirigidoA: string;
  requisitos: string[];
  costo: number;
  modalidad: ModalidadAtencion;
  horario?: string;
  sede: string;
  sedeSlug?: string;
  contacto?: string;
  enLinea: boolean;
  incluye: string[];
};

export type CategoriaFaq =
  "tramites" | "tributos" | "mesa-de-partes" | "cuenta" | "servicios" | "institucional";

export type PreguntaFrecuente = {
  id: string;
  slug: string;
  categoria: CategoriaFaq;
  pregunta: string;
  respuesta: string[];
  enlaces?: { nombre: string; href: string }[];
};

export type TipoPuntoEmergencia =
  "comisaria" | "serenazgo" | "bomberos" | "salud" | "central";

export type PuntoEmergencia = {
  id: string;
  nombre: string;
  tipo: TipoPuntoEmergencia;
  telefono: string;
  telefonoAlterno?: string;
  direccion?: string;
  horario?: string;
  nota?: string;
};
