import { CalendarDays, ExternalLink, Landmark } from "lucide-react";
import { Container } from "@/components/layout/container";
import { AvatarIniciales } from "@/components/shared/avatar-iniciales";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { obtenerAutoridades } from "@/lib/api/contenido";
import { crearMetadata } from "@/lib/seo/metadata";

export const metadata = crearMetadata({
  title: "Autoridades",
  description:
    "Alcalde y regidores del concejo municipal de Los Olivos para el período 2023 - 2026.",
  path: "/institucional/autoridades",
});

export default async function AutoridadesPage() {
  const autoridades = await obtenerAutoridades();
  const alcalde = autoridades.find((autoridad) => autoridad.tipo === "alcalde");
  const regidores = autoridades.filter((autoridad) => autoridad.tipo === "regidor");

  return (
    <>
      <PageHero
        eyebrow="La institución"
        title="Autoridades municipales"
        description="El alcalde y el concejo municipal conducen la gestión del distrito para el período 2023 - 2026."
        migajas={[
          { nombre: "Inicio", href: "/" },
          { nombre: "Institucional", href: "/institucional" },
          { nombre: "Autoridades" },
        ]}
      />

      <div className="py-10">
        <Container className="space-y-10">
          {alcalde ? (
            <section aria-labelledby="alcaldia">
              <h2 id="alcaldia" className="sr-only">
                Alcaldía
              </h2>
              <article className="overflow-hidden rounded-xl border bg-card shadow-xs">
                <div className="h-1.5 bg-gold" aria-hidden="true" />
                <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center">
                  <AvatarIniciales nombre={alcalde.nombre} className="size-20 text-2xl" />
                  <div className="min-w-0">
                    <Badge variant="secondary">{alcalde.cargo}</Badge>
                    <h3 className="mt-2 text-2xl font-bold text-brand-dark">
                      {alcalde.nombre}
                    </h3>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                      <CalendarDays className="size-4" aria-hidden="true" />
                      Período municipal {alcalde.periodo}
                    </p>
                    <ul className="mt-3 space-y-1 text-sm leading-relaxed text-muted-foreground">
                      <li>Representa legalmente a la municipalidad.</li>
                      <li>Preside las sesiones del concejo municipal.</li>
                      <li>Dirige y supervisa la gestión administrativa.</li>
                    </ul>
                  </div>
                </div>
              </article>
            </section>
          ) : null}

          <section>
            <SectionHeading
              eyebrow="Concejo municipal"
              title="Regidores"
              description="El concejo municipal está integrado por el alcalde y los regidores elegidos por la ciudadanía."
              className="mb-6"
            />

            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {regidores.map((regidor) => (
                <li key={regidor.id}>
                  <article className="flex h-full flex-col items-start gap-3 rounded-xl border bg-card p-4 shadow-xs">
                    <AvatarIniciales nombre={regidor.nombre} />
                    <div>
                      <h3 className="text-sm leading-snug font-semibold text-brand-dark">
                        {regidor.nombre}
                      </h3>
                      <p className="mt-0.5 text-xs font-medium text-brand-strong">
                        {regidor.cargo}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Período {regidor.periodo}
                      </p>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-xl border bg-muted/40 p-5">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-brand-dark">
              <span className="inline-flex size-6 items-center justify-center rounded-full bg-brand-soft text-brand-strong">
                <Landmark className="size-3.5" aria-hidden="true" />
              </span>
              Sobre esta información
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Los nombres y cargos se publican de acuerdo con el directorio oficial de la
              entidad en la Plataforma del Estado Peruano. Para consultar los perfiles
              profesionales completos, visita el directorio oficial.
            </p>
            <a
              href="https://www.gob.pe/institucion/munilosolivos/funcionarios"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-strong hover:underline"
            >
              <ExternalLink className="size-4" aria-hidden="true" />
              Ver directorio oficial en gob.pe
              <span className="sr-only"> (se abre en una pestaña nueva)</span>
            </a>
          </section>
        </Container>
      </div>
    </>
  );
}
