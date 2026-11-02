import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CalendarDays,
  Download,
  Tag,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { VisorPdf } from "@/components/normas/visor-pdf";
import { PageHero } from "@/components/shared/page-hero";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { obtenerPublicacionPorSlug, obtenerPublicaciones } from "@/lib/api/contenido";
import { etiquetasTipoPublicacion } from "@/lib/constants/etiquetas";
import { formatearFechaLarga } from "@/lib/format";
import { crearMetadata } from "@/lib/seo/metadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const publicaciones = await obtenerPublicaciones();
  return publicaciones.map((publicacion) => ({ slug: publicacion.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const publicacion = await obtenerPublicacionPorSlug(slug);

  if (!publicacion) {
    return crearMetadata({
      title: "Publicación no encontrada",
      path: `/informes-publicaciones/${slug}`,
      noIndex: true,
    });
  }

  return crearMetadata({
    title: publicacion.titulo,
    description: publicacion.descripcion,
    path: `/informes-publicaciones/${publicacion.slug}`,
  });
}

export default async function PublicacionPage({ params }: PageProps) {
  const { slug } = await params;
  const [publicacion, publicaciones] = await Promise.all([
    obtenerPublicacionPorSlug(slug),
    obtenerPublicaciones(),
  ]);

  if (!publicacion) notFound();

  const relacionadas = publicaciones
    .filter((item) => item.id !== publicacion.id && item.tipo === publicacion.tipo)
    .slice(0, 4);

  return (
    <>
      <PageHero
        eyebrow={etiquetasTipoPublicacion[publicacion.tipo]}
        title={publicacion.titulo}
        description={publicacion.descripcion}
        migajas={[
          { nombre: "Inicio", href: "/" },
          { nombre: "Informes y publicaciones", href: "/informes-publicaciones" },
          {
            nombre: etiquetasTipoPublicacion[publicacion.tipo],
            href: `/informes-publicaciones/tipo/${publicacion.tipo}`,
          },
          { nombre: publicacion.titulo },
        ]}
      >
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{etiquetasTipoPublicacion[publicacion.tipo]}</Badge>
          <Badge variant="outline">{formatearFechaLarga(publicacion.fecha)}</Badge>
          <Badge variant="outline">{publicacion.oficina}</Badge>
        </div>
      </PageHero>

      <div className="py-10">
        <Container className="grid gap-6 lg:grid-cols-[1fr_20rem]">
          <div className="space-y-6">
            <VisorPdf
              src={publicacion.archivoUrl}
              titulo={publicacion.titulo}
              nombreDescarga={`${publicacion.slug}.pdf`}
            />

            <Link
              href="/informes-publicaciones"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-strong hover:underline"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Volver a informes y publicaciones
            </Link>
          </div>

          <aside className="space-y-4">
            <div className="rounded-xl border bg-card p-5 shadow-xs">
              <h2 className="text-base font-semibold text-brand-dark">
                Datos de la publicación
              </h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <Tag className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
                  <div>
                    <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      Tipo de documento
                    </dt>
                    <dd className="mt-0.5 text-brand-dark">
                      {etiquetasTipoPublicacion[publicacion.tipo]}
                    </dd>
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
                      <time dateTime={publicacion.fecha}>
                        {formatearFechaLarga(publicacion.fecha)}
                      </time>
                    </dd>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Building2
                    className="mt-0.5 size-4 shrink-0 text-brand"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      Oficina responsable
                    </dt>
                    <dd className="mt-0.5 text-brand-dark">{publicacion.oficina}</dd>
                  </div>
                </div>
              </dl>

              <div className="mt-5 flex flex-col gap-2 border-t pt-4">
                <Button asChild className="h-11">
                  <a href={publicacion.archivoUrl} download={`${publicacion.slug}.pdf`}>
                    <Download className="size-4" aria-hidden="true" />
                    Descargar documento
                  </a>
                </Button>
                <Button asChild variant="outline" className="h-11">
                  <Link href={`/informes-publicaciones/tipo/${publicacion.tipo}`}>
                    Ver más {etiquetasTipoPublicacion[publicacion.tipo].toLowerCase()}s
                  </Link>
                </Button>
              </div>
            </div>

            <Alert>
              <AlertTitle>Antes de descargar</AlertTitle>
              <AlertDescription>
                Verifica que el documento corresponda al año vigente. Los formatos
                actualizados se publican en esta sección y en mesa de partes.
              </AlertDescription>
            </Alert>

            {relacionadas.length > 0 ? (
              <section aria-labelledby="publicaciones-relacionadas">
                <h2
                  id="publicaciones-relacionadas"
                  className="text-base font-semibold text-brand-dark"
                >
                  Publicaciones relacionadas
                </h2>
                <ul className="mt-3 space-y-2">
                  {relacionadas.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={`/informes-publicaciones/${item.slug}`}
                        className="flex items-center justify-between gap-3 rounded-xl border bg-card p-3 text-sm shadow-xs hover:shadow-md"
                      >
                        <span className="line-clamp-2 font-medium text-brand-dark">
                          {item.titulo}
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
