import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Megaphone,
  Tag,
  UserRound,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { GaleriaNoticia } from "@/components/noticias/galeria-noticia";
import { PageHero } from "@/components/shared/page-hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { obtenerNoticiaPorSlug, obtenerNoticias } from "@/lib/api/contenido";
import { etiquetasCategoriaNoticia } from "@/lib/constants/etiquetas";
import { formatearFechaLarga } from "@/lib/format";
import { obtenerNoticiasRelacionadas } from "@/lib/noticias/filtros";
import { crearMetadata, jsonLdNoticia } from "@/lib/seo/metadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const noticias = await obtenerNoticias();
  return noticias.map((noticia) => ({ slug: noticia.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const noticia = await obtenerNoticiaPorSlug(slug);

  if (!noticia) {
    return crearMetadata({
      title: "Noticia no encontrada",
      path: `/noticias/${slug}`,
      noIndex: true,
    });
  }

  return crearMetadata({
    title: noticia.titulo,
    description: noticia.resumen,
    path: `/noticias/${noticia.slug}`,
    image: noticia.imagen,
  });
}

export default async function NoticiaPage({ params }: PageProps) {
  const { slug } = await params;
  const [noticia, noticias] = await Promise.all([
    obtenerNoticiaPorSlug(slug),
    obtenerNoticias(),
  ]);

  if (!noticia) notFound();

  const relacionadas = obtenerNoticiasRelacionadas(noticias, noticia, 3);

  const jsonLd = jsonLdNoticia({
    titulo: noticia.titulo,
    resumen: noticia.resumen,
    fecha: noticia.fecha,
    imagen: noticia.imagen,
    url: `/noticias/${noticia.slug}`,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        eyebrow={etiquetasCategoriaNoticia[noticia.categoria]}
        title={noticia.titulo}
        description={noticia.resumen}
        migajas={[
          { nombre: "Inicio", href: "/" },
          { nombre: "Noticias", href: "/noticias" },
          {
            nombre: etiquetasCategoriaNoticia[noticia.categoria],
            href: `/noticias/categoria/${noticia.categoria}`,
          },
          { nombre: noticia.titulo },
        ]}
      >
        <div className="flex flex-wrap gap-2">
          <Badge asChild variant="secondary">
            <Link href={`/noticias/categoria/${noticia.categoria}`}>
              {etiquetasCategoriaNoticia[noticia.categoria]}
            </Link>
          </Badge>
          <Badge variant="outline">{formatearFechaLarga(noticia.fecha)}</Badge>
          {noticia.autor ? <Badge variant="outline">{noticia.autor}</Badge> : null}
        </div>
      </PageHero>

      <div className="py-10">
        <Container className="grid gap-8 lg:grid-cols-[1fr_20rem]">
          <article className="space-y-6">
            <figure className="overflow-hidden rounded-xl border bg-muted">
              <div className="relative aspect-16/9 w-full">
                <Image
                  src={noticia.imagen}
                  alt={noticia.titulo}
                  fill
                  priority
                  sizes="(min-width: 1024px) 66vw, 100vw"
                  className="object-cover"
                />
              </div>
            </figure>

            <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
              {noticia.contenido.map((parrafo, indice) => (
                <p key={`${noticia.id}-parrafo-${indice}`}>{parrafo}</p>
              ))}
            </div>

            {noticia.galeria && noticia.galeria.length > 0 ? (
              <GaleriaNoticia imagenes={noticia.galeria} titulo={noticia.titulo} />
            ) : null}

            {noticia.etiquetas && noticia.etiquetas.length > 0 ? (
              <section aria-label="Etiquetas de la noticia">
                <h2 className="sr-only">Etiquetas</h2>
                <ul className="flex flex-wrap gap-2">
                  {noticia.etiquetas.map((etiqueta) => (
                    <li key={etiqueta}>
                      <Badge variant="secondary">
                        <Tag className="size-3" aria-hidden="true" />
                        {etiqueta}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-5">
              <Link
                href="/noticias"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-strong hover:underline"
              >
                <ArrowLeft className="size-4" aria-hidden="true" />
                Volver a noticias
              </Link>
              <Button asChild variant="outline">
                <Link href="/campanas">
                  <Megaphone className="size-4" aria-hidden="true" />
                  Ver campañas vigentes
                </Link>
              </Button>
            </div>
          </article>

          <aside className="space-y-4">
            <div className="rounded-xl border bg-card p-5 shadow-xs">
              <h2 className="text-base font-semibold text-brand-dark">
                Sobre esta noticia
              </h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <Tag className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
                  <div>
                    <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      Categoría
                    </dt>
                    <dd className="mt-0.5">
                      <Link
                        href={`/noticias/categoria/${noticia.categoria}`}
                        className="text-brand-dark hover:underline"
                      >
                        {etiquetasCategoriaNoticia[noticia.categoria]}
                      </Link>
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
                      Publicado
                    </dt>
                    <dd className="mt-0.5 text-brand-dark">
                      <time dateTime={noticia.fecha}>
                        {formatearFechaLarga(noticia.fecha)}
                      </time>
                    </dd>
                  </div>
                </div>
                {noticia.autor ? (
                  <div className="flex items-start gap-2">
                    <UserRound
                      className="mt-0.5 size-4 shrink-0 text-brand"
                      aria-hidden="true"
                    />
                    <div>
                      <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                        Fuente
                      </dt>
                      <dd className="mt-0.5 text-brand-dark">{noticia.autor}</dd>
                    </div>
                  </div>
                ) : null}
              </dl>
            </div>

            {relacionadas.length > 0 ? (
              <section aria-labelledby="noticias-relacionadas">
                <h2
                  id="noticias-relacionadas"
                  className="text-base font-semibold text-brand-dark"
                >
                  Noticias relacionadas
                </h2>
                <ul className="mt-3 space-y-3">
                  {relacionadas.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={`/noticias/${item.slug}`}
                        className="group flex gap-3 rounded-xl border bg-card p-3 shadow-xs hover:shadow-md"
                      >
                        <span className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                          <Image
                            src={item.imagen}
                            alt=""
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </span>
                        <span className="min-w-0">
                          <span className="line-clamp-2 text-sm font-medium text-brand-dark group-hover:underline">
                            {item.titulo}
                          </span>
                          <span className="mt-1 block text-xs text-muted-foreground">
                            {formatearFechaLarga(item.fecha)}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/noticias"
                  className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-strong hover:underline"
                >
                  Ver todas las noticias
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </section>
            ) : null}
          </aside>
        </Container>
      </div>
    </>
  );
}
