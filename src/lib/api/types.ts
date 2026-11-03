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
  galeria?: string[];
  etiquetas?: string[];
  autor?: string;
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
  archivoUrl: string;
  archivoNombre?: string;
};

export type TipoPublicacion = "formato" | "formulario" | "informe";

export type Publicacion = {
  id: string;
  slug: string;
  tipo: TipoPublicacion;
  titulo: string;
  descripcion: string;
  fecha: string;
  oficina: string;
  archivoUrl: string;
  archivoNombre?: string;
};

export type EstadoCampana = "vigente" | "proxima" | "finalizada";

export type Campana = {
  id: string;
  slug: string;
  titulo: string;
  descripcion: string;
  inicio: string;
  fin: string;
  imagen: string;
  enlace?: string;
  lugar?: string;
  horario?: string;
  organiza?: string;
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

export type TipoContratacion = "bien" | "servicio" | "obra" | "consultoria";

export type ModalidadContratacion =
  | "licitacion-publica"
  | "concurso-publico"
  | "adjudicacion-simplificada"
  | "seleccion-abreviada"
  | "comparacion-de-precios"
  | "contratacion-directa";

export type EstadoContratacion =
  "convocado" | "buena-pro" | "ejecucion" | "culminado" | "desierto";

export type Contratacion = {
  id: string;
  codigo: string;
  objeto: string;
  tipo: TipoContratacion;
  modalidad: ModalidadContratacion;
  monto: number;
  fecha: string;
  estado: EstadoContratacion;
  proveedor?: string;
  archivoUrl?: string;
};

export type RubroPresupuesto = {
  nombre: string;
  monto: number;
  ejecutado: number;
};

export type PresupuestoAnual = {
  anio: number;
  actualizado: string;
  ingresos: { monto: number; ejecutado: number };
  gastos: { monto: number; ejecutado: number };
  rubros: RubroPresupuesto[];
};

export type PoiActividad = {
  id: string;
  anio: number;
  eje: string;
  objetivo: string;
  actividad: string;
  meta: number;
  unidad: string;
  avance: number;
  presupuesto: number;
  ejecutado: number;
};

export type RegimenPlanilla = "276" | "728" | "cas" | "locacion";

export type ResumenPlanilla = {
  regimen: RegimenPlanilla;
  cantidad: number;
  remuneracionPromedio: number;
};

export type PlanillaArea = {
  area: string;
  cantidad: number;
};

export type Planilla = {
  anio: number;
  actualizado: string;
  resumen: ResumenPlanilla[];
  areas?: PlanillaArea[];
};

export type CategoriaPrograma =
  | "alimentacion"
  | "proteccion"
  | "discapacidad"
  | "adulto-mayor"
  | "cultura-y-deporte"
  | "salud";

export type Programa = {
  id: string;
  slug: string;
  nombre: string;
  categoria: CategoriaPrograma;
  descripcion: string;
  dirigidoA: string;
  objetivos: string[];
  beneficios: string[];
  requisitos: string[];
  horario: string;
  sede: string;
  sedeSlug?: string;
  contacto: string;
  enLinea?: boolean;
};

export type TipoConvocatoria = "cas" | "practicas" | "locacion" | "consultoria";

export type EstadoConvocatoria = "proxima" | "vigente" | "cerrada";

export type Convocatoria = {
  id: string;
  slug: string;
  titulo: string;
  tipo: TipoConvocatoria;
  area: string;
  descripcion: string;
  requisitos: string[];
  funciones: string[];
  vacantes: number;
  remuneracion?: number;
  publicacion: string;
  cierre: string;
  evaluacion?: string;
  resultado?: string;
  basesUrl: string;
  resultadoUrl?: string;
};

export type EtapaPresupuestoParticipativo = {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: string;
};

export type EstadoProyectoParticipativo = "priorizado" | "en-ejecucion" | "culminado";

export type ProyectoPresupuestoParticipativo = {
  id: string;
  nombre: string;
  anio: number;
  zona: string;
  monto: number;
  estado: EstadoProyectoParticipativo;
};

export type MiembroCodisec = {
  id: string;
  nombre: string;
  organizacion: string;
  cargo: string;
  tipo: "municipal" | "vecinal" | "social";
};

export type DocumentoParticipacion = {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: string;
  archivoUrl: string;
};

export type ParticipacionVecinal = {
  etapas: EtapaPresupuestoParticipativo[];
  proyectos: ProyectoPresupuestoParticipativo[];
  miembrosCodisec: MiembroCodisec[];
  funcionesCodisec: string[];
  documentos: DocumentoParticipacion[];
};
