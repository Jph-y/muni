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
  | "servicios-sociales";

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
};

export type Sede = {
  id: string;
  slug: string;
  nombre: string;
  direccion: string;
  horario: string;
  telefono: string;
  servicios: string[];
};

export type Funcionario = {
  id: string;
  slug: string;
  nombre: string;
  cargo: string;
  area: string;
  correo: string;
  telefono: string;
};
