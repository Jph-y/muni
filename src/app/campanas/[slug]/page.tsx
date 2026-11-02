import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CalendarDays,
  Clock,
  MapPin,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/shared/page-hero";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { obtenerCampanaPorSlug, obtenerCampanas } from "@/lib/api/contenido";
import { agregarEstadoCampanas, obtenerEstadoCampana } from "@/lib/campanas/filtros";
import { etiquetasEstadoCampana } from "@/lib/constants/etiquetas";
import { obtenerFechaActual } from "@/lib/fechas";
import { formatearFechaLarga } from "@/lib/format";
import { crearMetadata, jsonLdEvento } from "@/lib/seo/metadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const variantePorEstado = {
  vigente: "default",
  proxima: "secondary",
  finalizada: "outline",
} as const;

export async function generateStaticParams() {
  const campanas = await obtenerCampanas();
  return campanas.map((campana) => ({ slug: campana.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const campana = await obtenerCampanaPorSlug(slug);

  if (!campana) {
    return crearMetadata({
      title: "Campaña no encontrada",
      path: `/campanas/${slug}`,
      noIndex: true,
    });
  }

  return crearMetadata({
    title: campana.titulo,
    description: campana.descripcion,
    path: `/campanas/${campana.slug}`,
    image: campana.imagen,
  });
}

export default async function CampanaPage({ params }: PageProps) {
  const { slug } = await params;
  const [campana, campanas, hoy] = await Promise.all([
    obtenerCampanaPorSlug(slug),
    obtenerCampanas(),
    obtenerFechaActual(),
  ]);

  if (!campana) notFound();

  const estado = obtenerEstadoCampana(campana, hoy);
  const otras = agregarEstadoCampanas(
    campanas.filter((item) => item.id !== campana.id),
    hoy,
  )
    .sort((a, b) => a.inicio.localeCompare(b.inicio))
    .slice(0, 4);

  const jsonLd = jsonLdEvento({
    titulo: campana.titulo,
    descripcion: campana.descripcion,
    inicio: campana.inicio,
    fin: campana.fin,
    imagen: campana.imagen,
    lugar: campana.lugar,
    url: `/campanas/${campana.slug}`,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        eyebrow="Campañas y eventos"
        title={campana.titulo}
        description={campana.descripcion}
        migajas={[
          { nombre: "Inicio", href: "/" },
          { nombre: "Campañas y eventos", href: "/campanas" },
          { nombre: campana.titulo },
        ]}
      >
        <div className="flex flex-wrap gap-2">
          <Badge variant={variantePorEstado[estado]}>
            {etiquetasEstadoCampana[estado]}
          </Badge>
          <Badge variant="outline">
            Del {formatearFechaLarga(campana.inicio)} al{" "}
            {formatearFechaLarga(campana.fin)}
          </Badge>
        </div>
      </PageHero>

      <div className="py-10">
        <Container className="grid gap-8 lg:grid-cols-[1fr_20rem]">
          <div className="space-y-6">
            <figure className="overflow-hidden rounded-xl border bg-muted">
              <div className="relative aspect-16/9 w-full">
                <Image
                  src={campana.imagen}
                  alt={campana.titulo}
                  fill
                  priority
                  sizes="(min-width: 1024px) 66vw, 100vw"
                  className="object-cover"
                />
              </div>
            </figure>

            <p className="text-base leading-relaxed text-muted-foreground">
              {campana.descripcion}
            </p>

            <section aria-labelledby="detalles-campana" className="space-y-3">
              <h2 id="detalles-campana" className="text-lg font-semibold text-brand-dark">
                Detalles de la actividad
              </h2>
              <dl className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border bg-card p-4">
                  <dt className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    <CalendarDays className="size-4 text-brand" aria-hidden="true" />
                    Inicio
                  </dt>
                  <dd className="mt-1 text-sm font-medium text-brand-dark">
                    <time dateTime={campana.inicio}>
                      {formatearFechaLarga(campana.inicio)}
                    </time>
                  </dd>
                </div>
                <div className="rounded-xl border bg-card p-4">
                  <dt className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    <CalendarDays className="size-4 text-brand" aria-hidden="true" />
                    Fin
                  </dt>
                  <dd className="mt-1 text-sm font-medium text-brand-dark">
                    <time dateTime={campana.fin}>{formatearFechaLarga(campana.fin)}</time>
                  </dd>
                </div>
                {campana.horario ? (
                  <div className="rounded-xl border bg-card p-4">
                    <dt className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      <Clock className="size-4 text-brand" aria-hidden="true" />
                      Horario
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-brand-dark">
                      {campana.horario}
                    </dd>
                  </div>
                ) : null}
                {campana.lugar ? (
                  <div className="rounded-xl border bg-card p-4">
                    <dt className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      <MapPin className="size-4 text-brand" aria-hidden="true" />
                      Lugar
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-brand-dark">
                      {campana.lugar}
                    </dd>
                  </div>
                ) : null}
                {campana.organiza ? (
                  <div className="rounded-xl border bg-card p-4 sm:col-span-2">
                    <dt className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      <Building2 className="size-4 text-brand" aria-hidden="true" />
                      Organiza
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-brand-dark">
                      {campana.organiza}
                    </dd>
                  </div>
                ) : null}
              </dl>
            </section>

            {estado === "finalizada" ? (
              <Alert>
                <AlertTitle>Esta campaña ya finalizó</AlertTitle>
                <AlertDescription>
                  La información se mantiene disponible para consulta. Revisa las campañas
                  vigentes para conocer las actividades actuales.
                </AlertDescription>
              </Alert>
            ) : null}

            <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-5">
              <Link
                href="/campanas"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-strong hover:underline"
              >
                <ArrowLeft className="size-4" aria-hidden="true" />
                Volver a campañas
              </Link>
              {estado !== "finalizada" && campana.enlace ? (
                <Button asChild>
                  <Link href={campana.enlace}>
                    Más información
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </Button>
              ) : null}
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-xl border bg-card p-5 shadow-xs">
              <h2 className="text-base font-semibold text-brand-dark">
                Estado de la campaña
              </h2>
              <p className="mt-2">
                <Badge variant={variantePorEstado[estado]}>
                  {etiquetasEstadoCampana[estado]}
                </Badge>
              </p>
              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    Vigencia
                  </dt>
                  <dd className="mt-0.5 text-brand-dark">
                    {formatearFechaLarga(campana.inicio)} —{" "}
                    {formatearFechaLarga(campana.fin)}
                  </dd>
                </div>
                {campana.lugar ? (
                  <div>
                    <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      Lugar
                    </dt>
                    <dd className="mt-0.5 text-brand-dark">{campana.lugar}</dd>
                  </div>
                ) : null}
              </dl>
              <div className="mt-5 flex flex-col gap-2 border-t pt-4">
                {estado !== "finalizada" && campana.enlace ? (
                  <Button asChild className="h-11">
                    <Link href={campana.enlace}>Participar</Link>
                  </Button>
                ) : null}
                <Button asChild variant="outline" className="h-11">
                  <Link href="/campanas">Ver todas las campañas</Link>
                </Button>
              </div>
            </div>

            {otras.length > 0 ? (
              <section aria-labelledby="otras-campanas">
                <h2
                  id="otras-campanas"
                  className="text-base font-semibold text-brand-dark"
                >
                  Otras campañas
                </h2>
                <ul className="mt-3 space-y-2">
                  {otras.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={`/campanas/${item.slug}`}
                        className="flex items-center justify-between gap-3 rounded-xl border bg-card p-3 text-sm shadow-xs hover:shadow-md"
                      >
                        <span>
                          <span className="block font-medium text-brand-dark">
                            {item.titulo}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {etiquetasEstadoCampana[item.estado]} ·{" "}
                            {formatearFechaLarga(item.fin)}
                          </span>
                        </span>
                        <ArrowRight
                          className="size-4 shrink-0 text-brand"
                          aria-hidden="true"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </aside>
        </Container>
      </div>
    </>
  );
}
