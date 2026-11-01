import { format, formatDistanceToNowStrict, parseISO } from "date-fns";
import { es } from "date-fns/locale";

const moneda = new Intl.NumberFormat("es-PE", {
  style: "currency",
  currency: "PEN",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatearMoneda(valor: number): string {
  return moneda.format(valor);
}

export function formatearFecha(valor: string | Date): string {
  const fecha = typeof valor === "string" ? parseISO(valor) : valor;
  return format(fecha, "dd/MM/yyyy", { locale: es });
}

export function formatearFechaLarga(valor: string | Date): string {
  const fecha = typeof valor === "string" ? parseISO(valor) : valor;
  return format(fecha, "d 'de' MMMM 'de' yyyy", { locale: es });
}

export function formatearFechaHora(valor: string | Date): string {
  const fecha = typeof valor === "string" ? parseISO(valor) : valor;
  return format(fecha, "dd/MM/yyyy HH:mm", { locale: es });
}

export function formatearTiempoRelativo(valor: string | Date): string {
  const fecha = typeof valor === "string" ? parseISO(valor) : valor;
  return formatDistanceToNowStrict(fecha, { addSuffix: true, locale: es });
}

export function formatearDocumento(documento: string): string {
  const limpio = documento.replace(/\D/g, "");
  if (limpio.length === 8) return limpio;
  if (limpio.length === 11) {
    return `${limpio.slice(0, 2)}-${limpio.slice(2, 10)}-${limpio.slice(10)}`;
  }
  return documento;
}

export function formatearTelefono(telefono: string): string {
  const limpio = telefono.replace(/[^\d+]/g, "");
  if (limpio.startsWith("+51")) return limpio;
  return limpio;
}

export function truncar(texto: string, maximo = 160): string {
  if (texto.length <= maximo) return texto;
  return `${texto.slice(0, maximo).trimEnd()}…`;
}

export function esDniValido(dni: string): boolean {
  return /^\d{8}$/.test(dni.trim());
}

export function esRucValido(ruc: string): boolean {
  return /^\d{11}$/.test(ruc.trim());
}

export function esPlacaValida(placa: string): boolean {
  return /^[A-Z0-9]{6,8}$/i.test(placa.trim());
}
