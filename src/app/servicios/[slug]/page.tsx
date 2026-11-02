import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Banknote,
  CalendarCheck,
  CheckCircle2,
  Clock,
  ExternalLink,
  MapPin,
  Users,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/shared/page-hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { obtenerServicioPorSlug, obtenerServicios } from "@/lib/api/contenido";
import {
  etiquetasCategoriaServicio,
  etiquetasModalidad,
} from "@/lib/constants/etiquetas";
import { crearMetadata } from "@/lib/seo/metadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const servicios = await obtenerServicios();
  return servicios.map((servicio) => ({ slug: servicio.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const servicio = await obtenerServicioPorSlug(slug);

  if (!servicio) {
    return crearMetadata({
      title: "Servicio no encontrado",
      path: `/servicios/${slug}`,
      noIndex: true,
    });
  }

  return crearMetadata({
    title: servicio.nombre,
    description: `${servicio.descripcion} Dirigido a: ${servicio.dirigidoA}.`,
    path: `/servicios/${servicio.slug}`,
  });
}

export default async function ServicioPage({ params }: PageProps) {
  const { slug } = await params;
  const [servicio, servicios] = await Promise.all([
    obtenerServicioPorSlug(slug),
    obtenerServicios(),
  ]);

  if (!servicio) notFound();

  const relacionados = servicios
    .filter((item) => item.id !== servicio.id && item.categoria === servicio.categoria)
    .slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={etiquetasCategoriaServicio[servicio.categoria]}
        title={servicio.nombre}
        description={servicio.descripcion}
        migajas={[
          { nombre: "Inicio", href: "/" },
          { nombre: "Servicios", href: "/servicios" },
          { nombre: servicio.nombre },
        ]}
      >
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{etiquetasModalidad[servicio.modalidad]}</Badge>
          <Badge variant="outline">
            {servicio.costo === 0 ? "Gratuito" : `S/ ${servicio.costo.toFixed(2)}`}
          </Badge>
        </div>
      </PageHero>

      <div className="py-10">
        <Container className="grid gap-6 lg:grid-cols-[1fr_22rem]">
          <div className="space-y-6">
            <article className="rounded-xl border bg-card p-5 shadow-xs">
              <h2 className="text-lg font-semibold text-brand-dark">
                ¿Qué incluye este servicio?
              </h2>
              <ul className="mt-4 space-y-2.5">
                {servicio.incluye.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <CheckCircle2
                      className="mt-0.5 size-4 shrink-0 text-brand"
                      aria-hidden="true"
                    />
                    <span className="text-brand-dark">{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-xl border bg-card p-5 shadow-xs">
              <h2 className="text-lg font-semibold text-brand-dark">Dirigido a</h2>
              <p className="mt-2 flex items-start gap-2 text-sm text-muted-foreground">
                <Users className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
                {servicio.dirigidoA}
              </p>
            </article>

            {servicio.requisitos.length > 0 ? (
              <article className="rounded-xl border bg-card p-5 shadow-xs">
                <h2 className="text-lg font-semibold text-brand-dark">
                  Requisitos para acceder
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {servicio.requisitos.map((requisito) => (
                    <li key={requisito} className="flex items-start gap-2 text-sm">
                      <span
                        aria-hidden="true"
                        className="mt-2 size-1.5 shrink-0 rounded-full bg-brand"
                      />
                      <span className="text-brand-dark">{requisito}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ) : null}

            {relacionados.length > 0 ? (
              <section aria-labelledby="servicios-relacionados">
                <h2
                  id="servicios-relacionados"
                  className="text-lg font-semibold text-brand-dark"
                >
                  Otros servicios de la misma categoría
                </h2>
                <ul className="mt-3 space-y-2">
                  {relacionados.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={`/servicios/${item.slug}`}
                        className="flex items-center justify-between gap-3 rounded-xl border bg-card p-3 text-sm shadow-xs hover:shadow-md"
                      >
                        <span className="font-medium text-brand-dark">{item.nombre}</span>
                        <ExternalLink
                          className="size-4 shrink-0 text-brand"
                          aria-hidden="true"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>

          <aside className="space-y-4">
            <div className="rounded-xl border bg-card p-5 shadow-xs">
              <h2 className="text-base font-semibold text-brand-dark">
                Datos del servicio
              </h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <Banknote
                    className="mt-0.5 size-4 shrink-0 text-brand"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      Costo
                    </dt>
                    <dd className="mt-0.5 font-semibold text-brand-dark">
                      {servicio.costo === 0
                        ? "Gratuito"
                        : `S/ ${servicio.costo.toFixed(2)}`}
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <MapPin
                    className="mt-0.5 size-4 shrink-0 text-brand"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      Sede
                    </dt>
                    <dd className="mt-0.5 text-brand-dark">
                      {servicio.sedeSlug ? (
                        <Link
                          href={`/institucional/sedes/${servicio.sedeSlug}`}
                          className="hover:underline"
                        >
                          {servicio.sede}
                        </Link>
                      ) : (
                        servicio.sede
                      )}
                    </dd>
                  </div>
                </div>

                {servicio.horario ? (
                  <div className="flex items-start gap-2">
                    <Clock
                      className="mt-0.5 size-4 shrink-0 text-brand"
                      aria-hidden="true"
                    />
                    <div>
                      <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                        Horario
                      </dt>
                      <dd className="mt-0.5 text-brand-dark">{servicio.horario}</dd>
                    </div>
                  </div>
                ) : null}

                {servicio.contacto ? (
                  <div className="flex items-start gap-2">
                    <ExternalLink
                      className="mt-0.5 size-4 shrink-0 text-brand"
                      aria-hidden="true"
                    />
                    <div>
                      <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                        Contacto
                      </dt>
                      <dd className="mt-0.5">
                        <a
                          href={`tel:${servicio.contacto.replace(/[^\d+]/g, "")}`}
                          className="text-brand-strong hover:underline"
                        >
                          {servicio.contacto}
                        </a>
                      </dd>
                    </div>
                  </div>
                ) : null}
              </dl>

              <div className="mt-5 flex flex-col gap-2 border-t pt-4">
                <Button asChild className="h-11">
                  <Link href="/contacto">Solicitar información</Link>
                </Button>
                <Button asChild variant="outline" className="h-11">
                  <Link href="/citas">
                    <CalendarCheck className="size-4" aria-hidden="true" />
                    Reservar una cita
                  </Link>
                </Button>
              </div>
            </div>

            <Link
              href="/servicios"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-strong hover:underline"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Volver a servicios
            </Link>
          </aside>
        </Container>
      </div>
    </>
  );
}
