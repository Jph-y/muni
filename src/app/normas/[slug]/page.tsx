import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CalendarDays, Download, Hash, Tag } from "lucide-react";
import { Container } from "@/components/layout/container";
import { VisorPdf } from "@/components/normas/visor-pdf";
import { PageHero } from "@/components/shared/page-hero";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { obtenerNormaPorSlug, obtenerNormas } from "@/lib/api/contenido";
import { etiquetasTipoNorma } from "@/lib/constants/etiquetas";
import { formatearFechaLarga } from "@/lib/format";
import { crearMetadata } from "@/lib/seo/metadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const normas = await obtenerNormas();
  return normas.map((norma) => ({ slug: norma.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const norma = await obtenerNormaPorSlug(slug);

  if (!norma) {
    return crearMetadata({
      title: "Norma no encontrada",
      path: `/normas/${slug}`,
      noIndex: true,
    });
  }

  return crearMetadata({
    title: `${norma.titulo} — ${norma.numero}`,
    description: norma.resumen,
    path: `/normas/${norma.slug}`,
  });
}

export default async function NormaPage({ params }: PageProps) {
  const { slug } = await params;
  const [norma, normas] = await Promise.all([obtenerNormaPorSlug(slug), obtenerNormas()]);

  if (!norma) notFound();

  const relacionadas = normas
    .filter((item) => item.id !== norma.id && item.tipo === norma.tipo)
    .slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Legislation",
    name: norma.titulo,
    legislationIdentifier: norma.numero,
    legislationType: etiquetasTipoNorma[norma.tipo],
    description: norma.resumen,
    datePublished: norma.fecha,
    url: `/normas/${norma.slug}`,
    legislationPassedBy: {
      "@type": "GovernmentOrganization",
      name: "Municipalidad Distrital de Los Olivos",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        eyebrow={etiquetasTipoNorma[norma.tipo]}
        title={norma.titulo}
        description={norma.resumen}
        migajas={[
          { nombre: "Inicio", href: "/" },
          { nombre: "Normas legales", href: "/normas" },
          {
            nombre: etiquetasTipoNorma[norma.tipo],
            href: `/normas/tipo/${norma.tipo}`,
          },
          { nombre: norma.numero },
        ]}
      >
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{etiquetasTipoNorma[norma.tipo]}</Badge>
          <Badge variant="outline">{norma.numero}</Badge>
          <Badge variant="outline">{formatearFechaLarga(norma.fecha)}</Badge>
        </div>
      </PageHero>

      <div className="py-10">
        <Container className="grid gap-6 lg:grid-cols-[1fr_20rem]">
          <div className="space-y-6">
            <VisorPdf
              src={norma.archivoUrl}
              titulo={`${norma.numero} — ${norma.titulo}`}
              nombreDescarga={`${norma.slug}.pdf`}
            />

            <Link
              href="/normas"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-strong hover:underline"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Volver a normas legales
            </Link>
          </div>

          <aside className="space-y-4">
            <div className="rounded-xl border bg-card p-5 shadow-xs">
              <h2 className="text-base font-semibold text-brand-dark">
                Datos de la norma
              </h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <Tag className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
                  <div>
                    <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      Tipo
                    </dt>
                    <dd className="mt-0.5 text-brand-dark">
                      {etiquetasTipoNorma[norma.tipo]}
                    </dd>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Hash
                    className="mt-0.5 size-4 shrink-0 text-brand"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      Número
                    </dt>
                    <dd className="mt-0.5 font-mono text-brand-dark">{norma.numero}</dd>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CalendarDays
                    className="mt-0.5 size-4 shrink-0 text-brand"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      Fecha de publicación
                    </dt>
                    <dd className="mt-0.5 text-brand-dark">
                      <time dateTime={norma.fecha}>
                        {formatearFechaLarga(norma.fecha)}
                      </time>
                    </dd>
                  </div>
                </div>
              </dl>

              <div className="mt-5 flex flex-col gap-2 border-t pt-4">
                <Button asChild className="h-11">
                  <a href={norma.archivoUrl} download={`${norma.slug}.pdf`}>
                    <Download className="size-4" aria-hidden="true" />
                    Descargar PDF
                  </a>
                </Button>
                <Button asChild variant="outline" className="h-11">
                  <Link href={`/normas/tipo/${norma.tipo}`}>
                    Ver más {etiquetasTipoNorma[norma.tipo].toLowerCase()}s
                  </Link>
                </Button>
              </div>
            </div>

            <Alert>
              <AlertTitle>Texto oficial</AlertTitle>
              <AlertDescription>
                Esta copia facilita la consulta ciudadana. Para efectos legales prevalece
                la versión publicada en el diario oficial El Peruano.
              </AlertDescription>
            </Alert>

            {relacionadas.length > 0 ? (
              <section aria-labelledby="normas-relacionadas">
                <h2
                  id="normas-relacionadas"
                  className="text-base font-semibold text-brand-dark"
                >
                  Normas relacionadas
                </h2>
                <ul className="mt-3 space-y-2">
                  {relacionadas.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={`/normas/${item.slug}`}
                        className="flex items-center justify-between gap-3 rounded-xl border bg-card p-3 text-sm shadow-xs hover:shadow-md"
                      >
                        <span>
                          <span className="block font-medium text-brand-dark">
                            {item.numero}
                          </span>
                          <span className="line-clamp-1 text-xs text-muted-foreground">
                            {item.titulo}
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
