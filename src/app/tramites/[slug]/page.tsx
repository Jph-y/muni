import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Banknote,
  CalendarClock,
  CalendarCheck,
  CheckCircle2,
  Download,
  ExternalLink,
  FileText,
  Landmark,
  Laptop,
  ScrollText,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/shared/page-hero";
import { PasosTimeline } from "@/components/tramites/pasos-timeline";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { obtenerTramitePorSlug, obtenerTramites } from "@/lib/api/contenido";
import { etiquetasCategoriaTramite, etiquetasModalidad } from "@/lib/constants/etiquetas";
import { formatearMoneda } from "@/lib/format";
import { crearMetadata } from "@/lib/seo/metadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function formatearPlazo(plazoDias: number): string {
  if (plazoDias === 0) return "Atención inmediata";
  if (plazoDias === 1) return "1 día hábil";
  return `${plazoDias} días hábiles`;
}

export async function generateStaticParams() {
  const tramites = await obtenerTramites();
  return tramites.map((tramite) => ({ slug: tramite.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const tramite = await obtenerTramitePorSlug(slug);

  if (!tramite) {
    return crearMetadata({
      title: "Trámite no encontrado",
      path: `/tramites/${slug}`,
      noIndex: true,
    });
  }

  return crearMetadata({
    title: tramite.nombre,
    description: `${tramite.descripcion} Requisitos, costo y plazo de atención.`,
    path: `/tramites/${tramite.slug}`,
  });
}

export default async function TramitePage({ params }: PageProps) {
  const { slug } = await params;
  const [tramite, tramites] = await Promise.all([
    obtenerTramitePorSlug(slug),
    obtenerTramites(),
  ]);

  if (!tramite) notFound();

  const relacionados = tramites
    .filter((item) => item.id !== tramite.id && item.categoria === tramite.categoria)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "GovernmentService",
    name: tramite.nombre,
    description: tramite.descripcion,
    serviceType: etiquetasCategoriaTramite[tramite.categoria],
    provider: {
      "@type": "GovernmentOrganization",
      name: "Municipalidad Distrital de Los Olivos",
    },
    offers: {
      "@type": "Offer",
      price: tramite.costo.toFixed(2),
      priceCurrency: "PEN",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        eyebrow={etiquetasCategoriaTramite[tramite.categoria]}
        title={tramite.nombre}
        description={tramite.descripcion}
        migajas={[
          { nombre: "Inicio", href: "/" },
          { nombre: "Trámites y servicios", href: "/tramites" },
          {
            nombre: etiquetasCategoriaTramite[tramite.categoria],
            href: `/tramites/categoria/${tramite.categoria}`,
          },
          { nombre: tramite.nombre },
        ]}
      >
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{etiquetasModalidad[tramite.modalidad]}</Badge>
          <Badge variant="outline">
            {tramite.costo === 0 ? "Gratuito" : formatearMoneda(tramite.costo)}
          </Badge>
          <Badge variant="outline">{formatearPlazo(tramite.plazoDias)}</Badge>
        </div>
      </PageHero>

      <div className="py-10">
        <Container className="grid gap-6 lg:grid-cols-[1fr_22rem]">
          <div className="space-y-6">
            <article className="rounded-xl border bg-card p-5 shadow-xs">
              <h2 className="text-lg font-semibold text-brand-dark">
                Requisitos del trámite
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Presenta los documentos en el orden indicado. Si falta alguno, la
                municipalidad notificará la observación.
              </p>
              <ul className="mt-4 space-y-2.5">
                {tramite.requisitos.map((requisito) => (
                  <li key={requisito} className="flex items-start gap-2 text-sm">
                    <CheckCircle2
                      className="mt-0.5 size-4 shrink-0 text-brand"
                      aria-hidden="true"
                    />
                    <span className="text-brand-dark">{requisito}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-xl border bg-card p-5 shadow-xs">
              <h2 className="text-lg font-semibold text-brand-dark">
                Pasos para completar el trámite
              </h2>
              <div className="mt-5">
                <PasosTimeline pasos={tramite.pasos} />
              </div>
            </article>

            {tramite.baseLegal?.length ? (
              <article className="rounded-xl border bg-card p-5 shadow-xs">
                <h2 className="flex items-center gap-2 text-lg font-semibold text-brand-dark">
                  <ScrollText className="size-5 text-brand" aria-hidden="true" />
                  Base legal
                </h2>
                <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                  {tramite.baseLegal.map((norma) => (
                    <li key={norma}>{norma}</li>
                  ))}
                </ul>
              </article>
            ) : null}

            {relacionados.length > 0 ? (
              <section aria-labelledby="tramites-relacionados">
                <h2
                  id="tramites-relacionados"
                  className="text-lg font-semibold text-brand-dark"
                >
                  Otros trámites de la misma categoría
                </h2>
                <ul className="mt-3 space-y-2">
                  {relacionados.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={`/tramites/${item.slug}`}
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
                Ficha del trámite
              </h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <Banknote
                    className="mt-0.5 size-4 shrink-0 text-brand"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      Derecho de tramitación
                    </dt>
                    <dd className="mt-0.5 font-semibold text-brand-dark">
                      {tramite.costo === 0 ? "Gratuito" : formatearMoneda(tramite.costo)}
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <CalendarClock
                    className="mt-0.5 size-4 shrink-0 text-brand"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      Plazo de atención
                    </dt>
                    <dd className="mt-0.5 text-brand-dark">
                      {formatearPlazo(tramite.plazoDias)}
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Landmark
                    className="mt-0.5 size-4 shrink-0 text-brand"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      Oficina responsable
                    </dt>
                    <dd className="mt-0.5 text-brand-dark">{tramite.oficina}</dd>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Laptop
                    className="mt-0.5 size-4 shrink-0 text-brand"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      Modalidad
                    </dt>
                    <dd className="mt-0.5 text-brand-dark">
                      {etiquetasModalidad[tramite.modalidad]}
                    </dd>
                  </div>
                </div>

                {tramite.codigoTupa ? (
                  <div className="flex items-start gap-2">
                    <FileText
                      className="mt-0.5 size-4 shrink-0 text-brand"
                      aria-hidden="true"
                    />
                    <div>
                      <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                        Código TUPA
                      </dt>
                      <dd className="mt-0.5 font-mono text-brand-dark">
                        {tramite.codigoTupa}
                      </dd>
                    </div>
                  </div>
                ) : null}
              </dl>

              <div className="mt-5 flex flex-col gap-2 border-t pt-4">
                {tramite.enLinea ? (
                  <Button asChild className="h-11">
                    <Link href="/mesa-de-partes">
                      Iniciar en línea
                      <ExternalLink className="size-4" aria-hidden="true" />
                    </Link>
                  </Button>
                ) : null}
                <Button asChild variant="outline" className="h-11">
                  <Link href="/citas">
                    <CalendarCheck className="size-4" aria-hidden="true" />
                    Reservar una cita
                  </Link>
                </Button>
                {tramite.formatoUrl ? (
                  <Button asChild variant="outline" className="h-11">
                    <a href={tramite.formatoUrl} download>
                      <Download className="size-4" aria-hidden="true" />
                      Descargar formato
                    </a>
                  </Button>
                ) : null}
              </div>
            </div>

            <Alert>
              <AlertTitle>Antes de presentar tu solicitud</AlertTitle>
              <AlertDescription>
                Verifica que los documentos estén legibles y vigentes. Para consultas
                sobre el estado de tu expediente usa el seguimiento en línea.
              </AlertDescription>
            </Alert>

            <Link
              href="/tramites"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-strong hover:underline"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Volver al catálogo
            </Link>
          </aside>
        </Container>
      </div>
    </>
  );
}
