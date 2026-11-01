import { describe, expect, it } from "vitest";
import { ApiError, apiFetch } from "@/lib/api/client";
import type { Funcionario, Sede } from "@/lib/api/types";

describe("API simulada de contenido institucional", () => {
  it("devuelve el listado de sedes", async () => {
    const sedes = await apiFetch<Sede[]>("/contenido/sedes");
    expect(sedes.length).toBeGreaterThan(0);
    expect(sedes[0]).toHaveProperty("slug");
    expect(sedes[0]).toHaveProperty("servicios");
  });

  it("devuelve una sede por slug", async () => {
    const sede = await apiFetch<Sede>("/contenido/sedes/palacio-municipal");
    expect(sede.nombre).toBe("Palacio Municipal");
    expect(sede.principal).toBe(true);
  });

  it("responde 404 cuando la sede no existe", async () => {
    await expect(apiFetch("/contenido/sedes/no-existe")).rejects.toBeInstanceOf(ApiError);
    await expect(apiFetch("/contenido/sedes/no-existe")).rejects.toMatchObject({
      status: 404,
    });
  });

  it("devuelve el directorio de funcionarios", async () => {
    const funcionarios = await apiFetch<Funcionario[]>("/contenido/funcionarios");
    expect(funcionarios.length).toBeGreaterThan(5);
    expect(funcionarios.every((funcionario) => funcionario.correo.length > 0)).toBe(true);
  });
});
