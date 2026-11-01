import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Mail, MapPin, Phone, Signpost } from "lucide-react";
import { Container } from "@/components/layout/container";
import { MapaSede } from "@/components/institucional/mapa-sede";
import { PageHero } from "@/components/shared/page-hero";
import { Badge } from "@/components/ui/badge";
import { obtenerSedePorSlug, obtenerSedes } from "@/lib/api/contenido";
import { crearMetadata } from "@/lib/seo/metadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const sedes = await obtenerSedes();
  return sedes.map((sede) => ({ slug: sede.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const sede = await obtenerSedePorSlug(slug);

  if (!sede) {
    return crearMetadata({
      title: "Sede no encontrada",
      path: `/institucional/sedes/${slug}`,
      noIndex: true,
    });
  }

  return crearMetadata({
    title: sede.nombre,
    description: `${sede.direccion}. Horario: ${sede.horario}`,
    path: `/institucional/sedes/${sede.slug}`,
  });
}

export default async function SedePage({ params }: PageProps) {
  const { slug } = await params;
  const [sede, sedes] = await Promise.all([obtenerSedePorSlug(slug), obtenerSedes()]);

  if (!sede) notFound();

  const otrasSedes = sedes.filter((item) => item.id !== sede.id);

  return (
    <>
      <PageHero
        eyebrow={sede.principal ? "Sede principal" : "Sede municipal"}
        title={sede.nombre}
        description={sede.direccion}
        migajas={[
          { nombre: "Inicio", href: "/" },
          { nombre: "Institucional", href: "/institucional" },
          { nombre: "Sedes", href: "/institucional/sedes" },
          { nombre: sede.nombre },
        ]}
      />

      <div className="py-10">
        <Container className="grid gap-6 lg:grid-cols-[1fr_22rem]">
          <div className="space-y-6">
            <article className="rounded-xl border bg-card p-5 shadow-xs">
              <h2 className="text-lg font-semibold text-brand-dark">
                Información de la sede
              </h2>
              <dl className="mt-4 space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin
                    className="mt-0.5 size-5 shrink-0 text-brand"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      Dirección
                    </dt>
                    <dd className="mt-0.5 text-brand-dark">{sede.direccion}</dd>
                    {sede.referencia ? (
                      <dd className="mt-1 text-xs text-muted-foreground">
                        {sede.referencia}
                      </dd>
                    ) : null}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock
                    className="mt-0.5 size-5 shrink-0 text-brand"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      Horario de atención
                    </dt>
                    <dd className="mt-0.5 text-brand-dark">{sede.horario}</dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone
                    className="mt-0.5 size-5 shrink-0 text-brand"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      Teléfono
                    </dt>
                    <dd className="mt-0.5">
                      <a
                        href={`tel:${sede.telefono.replace(/[^\d+]/g, "")}`}
                        className="text-brand-strong hover:underline"
                      >
                        {sede.telefono}
                      </a>
                    </dd>
                  </div>
                </div>

                {sede.correo ? (
                  <div className="flex items-start gap-3">
                    <Mail
                      className="mt-0.5 size-5 shrink-0 text-brand"
                      aria-hidden="true"
                    />
                    <div>
                      <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                        Correo electrónico
                      </dt>
                      <dd className="mt-0.5">
                        <a
                          href={`mailto:${sede.correo}`}
                          className="break-all text-brand-strong hover:underline"
                        >
                          {sede.correo}
                        </a>
                      </dd>
                    </div>
                  </div>
                ) : null}
              </dl>
            </article>

            <article className="rounded-xl border bg-card p-5 shadow-xs">
              <h2 className="text-lg font-semibold text-brand-dark">
                Servicios disponibles
              </h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {sede.servicios.map((servicio) => (
                  <li key={servicio}>
                    <Badge variant="secondary" className="h-auto px-3 py-1 text-sm">
                      {servicio}
                    </Badge>
                  </li>
                ))}
              </ul>
            </article>

            {sede.coordenadas ? (
              <section aria-labelledby="mapa-sede">
                <h2 id="mapa-sede" className="mb-3 text-lg font-semibold text-brand-dark">
                  Ubicación
                </h2>
                <MapaSede sede={sede} />
              </section>
            ) : null}
          </div>

          <aside className="space-y-4">
            <div className="rounded-xl border bg-brand-soft/60 p-5">
              <h2 className="flex items-center gap-2 text-base font-semibold text-brand-dark">
                <Signpost className="size-4" aria-hidden="true" />
                Antes de tu visita
              </h2>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
                <li>Presenta tu DNI físico o digital vigente.</li>
                <li>Verifica si tu trámite requiere cita previa.</li>
                <li>Llega con 15 minutos de anticipación.</li>
              </ul>
              <Link
                href="/citas"
                className="mt-4 inline-flex h-11 items-center rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Reservar una cita
              </Link>
            </div>

            {otrasSedes.length > 0 ? (
              <div className="rounded-xl border bg-card p-5">
                <h2 className="text-base font-semibold text-brand-dark">Otras sedes</h2>
                <ul className="mt-3 space-y-2 text-sm">
                  {otrasSedes.map((otra) => (
                    <li key={otra.id}>
                      <Link
                        href={`/institucional/sedes/${otra.slug}`}
                        className="text-brand-strong hover:underline"
                      >
                        {otra.nombre}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <Link
              href="/institucional/sedes"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-strong hover:underline"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Ver todas las sedes
            </Link>
          </aside>
        </Container>
      </div>
    </>
  );
}
