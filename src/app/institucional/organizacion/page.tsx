import Link from "next/link";
import { ArrowRight, FileText, Network } from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/shared/page-hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { obtenerAreasOrganizacionales } from "@/lib/api/contenido";
import { etiquetasNivelOrganizacional } from "@/lib/constants/etiquetas";
import { agruparAreasPorNivel } from "@/lib/institucional/filtros";
import { crearMetadata } from "@/lib/seo/metadata";

export const metadata = crearMetadata({
  title: "Organización municipal",
  description:
    "Estructura orgánica de la Municipalidad Distrital de Los Olivos: alta dirección, órganos de asesoría, gerencias y subgerencias.",
  path: "/institucional/organizacion",
});

export default async function OrganizacionPage() {
  const areas = await obtenerAreasOrganizacionales();
  const grupos = agruparAreasPorNivel(areas);

  return (
    <>
      <PageHero
        eyebrow="La institución"
        title="Organización municipal"
        description="La municipalidad se organiza en alta dirección, órganos de asesoría, gerencias y subgerencias. Cada área tiene funciones definidas en el Reglamento de Organización y Funciones (ROF)."
        migajas={[
          { nombre: "Inicio", href: "/" },
          { nombre: "Institucional", href: "/institucional" },
          { nombre: "Organización" },
        ]}
      >
        <div className="flex flex-wrap gap-2">
          <Button asChild>
            <Link href="/institucional/organigrama">
              <Network className="size-4" aria-hidden="true" />
              Ver organigrama
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/institucional/documentos-de-gestion">
              <FileText className="size-4" aria-hidden="true" />
              Documentos de gestión
            </Link>
          </Button>
        </div>
      </PageHero>

      <div className="py-10">
        <Container className="space-y-10">
          {grupos.map((grupo) => (
            <section key={grupo.nivel} aria-labelledby={`grupo-${grupo.nivel}`}>
              <div className="flex items-center gap-3">
                <h2
                  id={`grupo-${grupo.nivel}`}
                  className="text-xl font-bold text-brand-dark sm:text-2xl"
                >
                  {etiquetasNivelOrganizacional[grupo.nivel]}
                </h2>
                <span className="h-px flex-1 bg-border" aria-hidden="true" />
                <span className="text-sm text-muted-foreground">
                  {grupo.areas.length} {grupo.areas.length === 1 ? "área" : "áreas"}
                </span>
              </div>

              <ul className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {grupo.areas.map((area) => (
                  <li key={area.id}>
                    <article className="flex h-full flex-col rounded-xl border bg-card p-5 shadow-xs">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <h3 className="text-base leading-snug font-semibold text-brand-dark">
                          {area.nombre}
                        </h3>
                        {area.siglas ? (
                          <Badge variant="secondary">{area.siglas}</Badge>
                        ) : null}
                      </div>

                      <dl className="mt-2 space-y-1 text-xs text-muted-foreground">
                        {area.responsable ? (
                          <div className="flex gap-1.5">
                            <dt className="font-medium">Responsable:</dt>
                            <dd>{area.responsable}</dd>
                          </div>
                        ) : null}
                        {area.dependeDe ? (
                          <div className="flex gap-1.5">
                            <dt className="font-medium">Depende de:</dt>
                            <dd>{area.dependeDe}</dd>
                          </div>
                        ) : null}
                      </dl>

                      <h4 className="mt-4 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                        Funciones
                      </h4>
                      <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-muted-foreground">
                        {area.funciones.map((funcion) => (
                          <li key={funcion} className="flex gap-2">
                            <span
                              aria-hidden="true"
                              className="mt-2 size-1.5 shrink-0 rounded-full bg-brand"
                            />
                            {funcion}
                          </li>
                        ))}
                      </ul>
                    </article>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <div className="flex flex-col gap-4 rounded-xl border bg-brand-soft/60 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-brand-dark">
                ¿Buscas el contacto de un área?
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                El directorio de funcionarios incluye correos y teléfonos de atención.
              </p>
            </div>
            <Link
              href="/institucional/directorio-funcionarios"
              className="inline-flex h-11 shrink-0 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Ir al directorio
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </div>
    </>
  );
}
