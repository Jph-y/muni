import { describe, expect, it } from "vitest";
import { ApiError, apiFetch } from "@/lib/api/client";
import type {
  PreguntaFrecuente,
  PuntoEmergencia,
  Servicio,
  Tramite,
} from "@/lib/api/types";

describe("API simulada de trámites y servicios", () => {
  it("devuelve el catálogo de trámites con pasos y costos", async () => {
    const tramites = await apiFetch<Tramite[]>("/contenido/tramites");
    expect(tramites.length).toBeGreaterThan(10);
    expect(tramites[0]).toHaveProperty("pasos");
    expect(tramites.every((tramite) => tramite.pasos.length > 0)).toBe(true);
  });

  it("devuelve el detalle de un trámite por slug", async () => {
    const tramite = await apiFetch<Tramite>(
      "/contenido/tramites/licencia-de-funcionamiento-para-negocios-de-riesgo-bajo-o-medio",
    );
    expect(tramite.codigoTupa).toBe("21198");
    expect(tramite.costo).toBeGreaterThan(0);
  });

  it("responde 404 cuando el trámite no existe", async () => {
    await expect(apiFetch("/contenido/tramites/no-existe")).rejects.toMatchObject({
      status: 404,
    });
  });

  it("devuelve servicios y su detalle", async () => {
    const servicios = await apiFetch<Servicio[]>("/contenido/servicios");
    expect(servicios.length).toBeGreaterThan(5);

    const servicio = await apiFetch<Servicio>("/contenido/servicios/serenazgo-municipal");
    expect(servicio.incluye.length).toBeGreaterThan(0);
  });

  it("responde 404 cuando el servicio no existe", async () => {
    await expect(apiFetch("/contenido/servicios/no-existe")).rejects.toBeInstanceOf(
      ApiError,
    );
  });

  it("devuelve preguntas frecuentes y puntos de emergencia", async () => {
    const [preguntas, emergencias] = await Promise.all([
      apiFetch<PreguntaFrecuente[]>("/contenido/preguntas-frecuentes"),
      apiFetch<PuntoEmergencia[]>("/contenido/emergencias"),
    ]);

    expect(preguntas.length).toBeGreaterThan(10);
    expect(emergencias.some((punto) => punto.telefono === "105")).toBe(true);
  });
});
