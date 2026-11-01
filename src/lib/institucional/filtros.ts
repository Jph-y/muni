import type {
  AreaOrganizacional,
  DocumentoGestion,
  Funcionario,
  NivelOrganizacional,
  TipoDocumentoGestion,
} from "@/lib/api/types";

const ordenNiveles: NivelOrganizacional[] = [
  "alta-direccion",
  "organo-asesor",
  "gerencia",
  "subgerencia",
];

export function normalizarTexto(valor: string): string {
  return valor
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export function obtenerIniciales(nombre: string): string {
  const palabras = nombre
    .replace(/[^\p{L}\s]/gu, "")
    .split(/\s+/)
    .filter((palabra) => palabra.length > 2);

  if (palabras.length === 0) {
    return nombre.slice(0, 2).toUpperCase();
  }

  if (palabras.length === 1) {
    return palabras[0]!.slice(0, 2).toUpperCase();
  }

  return `${palabras[0]![0]}${palabras[1]![0]}`.toUpperCase();
}

export function filtrarFuncionarios(
  funcionarios: Funcionario[],
  { texto = "", area = "todas" }: { texto?: string; area?: string } = {},
): Funcionario[] {
  const busqueda = normalizarTexto(texto);
  const areaNormalizada = normalizarTexto(area);

  return funcionarios.filter((funcionario) => {
    const coincideArea =
      areaNormalizada === "todas" ||
      normalizarTexto(funcionario.area) === areaNormalizada;

    if (!coincideArea) return false;
    if (busqueda.length === 0) return true;

    return [
      funcionario.nombre,
      funcionario.cargo,
      funcionario.area,
      funcionario.dependencia ?? "",
    ].some((campo) => normalizarTexto(campo).includes(busqueda));
  });
}

export function obtenerAreasDeFuncionarios(funcionarios: Funcionario[]): string[] {
  return [...new Set(funcionarios.map((funcionario) => funcionario.area))].sort((a, b) =>
    a.localeCompare(b, "es"),
  );
}

export function agruparAreasPorNivel(
  areas: AreaOrganizacional[],
): { nivel: NivelOrganizacional; areas: AreaOrganizacional[] }[] {
  return ordenNiveles
    .map((nivel) => ({
      nivel,
      areas: areas.filter((area) => area.nivel === nivel),
    }))
    .filter((grupo) => grupo.areas.length > 0);
}

export function filtrarDocumentos(
  documentos: DocumentoGestion[],
  tipo: TipoDocumentoGestion | "todos" = "todos",
): DocumentoGestion[] {
  if (tipo === "todos") return documentos;
  return documentos.filter((documento) => documento.tipo === tipo);
}
