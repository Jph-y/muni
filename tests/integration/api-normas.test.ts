import { describe, expect, it } from "vitest";
import { ApiError, apiFetch } from "@/lib/api/client";
import type { Norma, Publicacion } from "@/lib/api/types";

describe("API simulada de normas y publicaciones", () => {
  it("devuelve el listado de normas con archivo adjunto", async () => {
    const normas = await apiFetch<Norma[]>("/contenido/normas");
    expect(normas.length).toBeGreaterThan(20);
    expect(normas.every((norma) => norma.archivoUrl.startsWith("/documents/"))).toBe(
      true,
    );
  });

  it("devuelve el detalle de una norma por slug", async () => {
    const norma = await apiFetch<Norma>("/contenido/normas/ordenanza-682-2025-mdlo-tupa");
    expect(norma.tipo).toBe("ordenanza");
    expect(norma.numero).toBe("682-2025-MDLO");
  });

  it("responde 404 cuando la norma no existe", async () => {
    await expect(apiFetch("/contenido/normas/no-existe")).rejects.toMatchObject({
      status: 404,
    });
  });

  it("devuelve publicaciones y su detalle", async () => {
    const publicaciones = await apiFetch<Publicacion[]>("/contenido/publicaciones");
    expect(publicaciones.length).toBeGreaterThan(5);

    const publicacion = await apiFetch<Publicacion>(
      "/contenido/publicaciones/formato-solicitud-licencia-de-funcionamiento",
    );
    expect(publicacion.tipo).toBe("formato");
    expect(publicacion.oficina).toContain("Desarrollo Económico");
  });

  it("responde 404 cuando la publicación no existe", async () => {
    await expect(apiFetch("/contenido/publicaciones/no-existe")).rejects.toBeInstanceOf(
      ApiError,
    );
  });
});
