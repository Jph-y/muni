import { describe, expect, it } from "vitest";
import {
  esDniValido,
  esPlacaValida,
  esRucValido,
  formatearDocumento,
  formatearFecha,
  formatearFechaLarga,
  formatearMoneda,
  truncar,
} from "@/lib/format";

describe("formatearMoneda", () => {
  it("formatea soles peruanos con dos decimales", () => {
    const resultado = formatearMoneda(1234.5);
    expect(resultado).toContain("1");
    expect(resultado).toContain("234");
    expect(resultado).toContain("50");
    expect(resultado).toMatch(/S\/|\$/);
  });

  it("formatea cero", () => {
    expect(formatearMoneda(0)).toContain("0.00");
  });
});

describe("formatearFecha", () => {
  it("convierte una fecha ISO a dd/MM/yyyy", () => {
    expect(formatearFecha("2025-02-17T14:20:00-05:00")).toBe("17/02/2025");
  });

  it("acepta objetos Date", () => {
    expect(formatearFecha(new Date(2025, 0, 5))).toBe("05/01/2025");
  });

  it("genera la fecha en formato largo en español", () => {
    expect(formatearFechaLarga("2025-02-17")).toBe("17 de febrero de 2025");
  });
});

describe("formatearDocumento", () => {
  it("mantiene el DNI de 8 dígitos", () => {
    expect(formatearDocumento("12345678")).toBe("12345678");
  });

  it("formatea el RUC de 11 dígitos", () => {
    expect(formatearDocumento("20123456789")).toBe("20-12345678-9");
  });
});

describe("validaciones", () => {
  it("valida DNI de 8 dígitos", () => {
    expect(esDniValido("12345678")).toBe(true);
    expect(esDniValido("1234567")).toBe(false);
    expect(esDniValido("1234567A")).toBe(false);
  });

  it("valida RUC de 11 dígitos", () => {
    expect(esRucValido("20123456789")).toBe(true);
    expect(esRucValido("2012345678")).toBe(false);
  });

  it("valida placas vehiculares", () => {
    expect(esPlacaValida("ABC123")).toBe(true);
    expect(esPlacaValida("A1")).toBe(false);
  });
});

describe("truncar", () => {
  it("no modifica textos cortos", () => {
    expect(truncar("Hola", 10)).toBe("Hola");
  });

  it("agrega elipsis a textos largos", () => {
    expect(truncar("abcdefghij", 5)).toBe("abcde…");
  });
});
