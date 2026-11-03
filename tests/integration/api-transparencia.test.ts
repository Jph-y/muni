import { describe, expect, it } from "vitest";
import { apiFetch } from "@/lib/api/client";
import type {
  Convocatoria,
  ParticipacionVecinal,
  Planilla,
  PoiActividad,
  PresupuestoAnual,
  Programa,
  Contratacion,
} from "@/lib/api/types";

describe("API simulada de transparencia", () => {
  it("devuelve los presupuestos con rubros", async () => {
    const presupuestos = await apiFetch<PresupuestoAnual[]>("/contenido/presupuesto");

    expect(presupuestos).toHaveLength(3);
    expect(presupuestos[0].rubros.length).toBeGreaterThan(0);
  });

  it("devuelve las contrataciones con proveedores", async () => {
    const contrataciones = await apiFetch<Contratacion[]>("/contenido/contrataciones");

    expect(contrataciones).toHaveLength(12);
    expect(contrataciones.some((contratacion) => contratacion.proveedor)).toBe(true);
  });

  it("devuelve las actividades del POI", async () => {
    const actividades = await apiFetch<PoiActividad[]>("/contenido/poi");

    expect(actividades.length).toBe(12);
    expect(actividades[0].eje).toBeTruthy();
  });

  it("devuelve la planilla resumida", async () => {
    const planillas = await apiFetch<Planilla[]>("/contenido/planilla");

    expect(planillas.length).toBe(2);
    expect(planillas[0].areas?.length).toBeGreaterThan(0);
  });
});

describe("API simulada de programas y convocatorias", () => {
  it("devuelve el catálogo de programas", async () => {
    const programas = await apiFetch<Programa[]>("/contenido/programas");

    expect(programas).toHaveLength(8);
    expect(programas.some((programa) => programa.categoria === "alimentacion")).toBe(
      true,
    );
  });

  it("devuelve el detalle de un programa", async () => {
    const programa = await apiFetch<Programa>("/contenido/programas/vaso-de-leche");

    expect(programa.categoria).toBe("alimentacion");
    expect(programa.requisitos.length).toBeGreaterThan(0);
  });

  it("responde 404 cuando el programa no existe", async () => {
    await expect(apiFetch("/contenido/programas/no-existe")).rejects.toMatchObject({
      status: 404,
    });
  });

  it("devuelve las convocatorias con sus bases", async () => {
    const convocatorias = await apiFetch<Convocatoria[]>("/contenido/convocatorias");

    expect(convocatorias).toHaveLength(8);
    expect(convocatorias.every((convocatoria) => convocatoria.basesUrl)).toBe(true);
  });

  it("devuelve el detalle de una convocatoria", async () => {
    const convocatoria = await apiFetch<Convocatoria>(
      "/contenido/convocatorias/cas-2026-12-analista-de-sistemas",
    );

    expect(convocatoria.vacantes).toBe(2);
    expect(convocatoria.area).toContain("Administración");
  });

  it("responde 404 cuando la convocatoria no existe", async () => {
    await expect(apiFetch("/contenido/convocatorias/no-existe")).rejects.toMatchObject({
      status: 404,
    });
  });
});

describe("API simulada de participación vecinal", () => {
  it("devuelve etapas, proyectos, integrantes y documentos", async () => {
    const participacion = await apiFetch<ParticipacionVecinal>(
      "/contenido/participacion",
    );

    expect(participacion.etapas).toHaveLength(5);
    expect(participacion.proyectos).toHaveLength(8);
    expect(participacion.miembrosCodisec).toHaveLength(12);
    expect(participacion.documentos).toHaveLength(4);
  });
});
