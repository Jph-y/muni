import { describe, expect, it } from "vitest";
import { apiFetch } from "@/lib/api/client";
import type { Campana, Noticia } from "@/lib/api/types";

describe("API simulada de noticias y campañas", () => {
  it("devuelve el listado de noticias con galería y etiquetas", async () => {
    const noticias = await apiFetch<Noticia[]>("/contenido/noticias");

    expect(noticias.length).toBeGreaterThan(10);
    expect(noticias.some((noticia) => (noticia.galeria?.length ?? 0) > 0)).toBe(true);
    expect(noticias.some((noticia) => (noticia.etiquetas?.length ?? 0) > 0)).toBe(true);
  });

  it("devuelve el detalle de una noticia por slug", async () => {
    const noticia = await apiFetch<Noticia>(
      "/contenido/noticias/festival-de-danzas-olivenses-celebro-un-nuevo-aniversario-del-distrito",
    );

    expect(noticia.categoria).toBe("cultura");
    expect(noticia.contenido.length).toBeGreaterThan(1);
  });

  it("responde 404 cuando la noticia no existe", async () => {
    await expect(apiFetch("/contenido/noticias/no-existe")).rejects.toMatchObject({
      status: 404,
    });
  });

  it("devuelve campañas con sus datos de ubicación", async () => {
    const campanas = await apiFetch<Campana[]>("/contenido/campanas");

    expect(campanas.length).toBeGreaterThan(5);
    expect(campanas.some((campana) => campana.lugar)).toBe(true);
  });

  it("devuelve el detalle de una campaña por slug", async () => {
    const campana = await apiFetch<Campana>(
      "/contenido/campanas/campana-de-vacunacion-antirrabica-2026",
    );

    expect(campana.organiza).toContain("Salud");
    expect(campana.fin).toBe("2026-11-30");
  });

  it("responde 404 cuando la campaña no existe", async () => {
    await expect(apiFetch("/contenido/campanas/no-existe")).rejects.toMatchObject({
      status: 404,
    });
  });
});
