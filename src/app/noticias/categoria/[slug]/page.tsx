import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { CatalogoNoticias } from "@/components/noticias/catalogo-noticias";
import { PageHero } from "@/components/shared/page-hero";
import { Button } from "@/components/ui/button";
import { obtenerNoticias } from "@/lib/api/contenido";
import type { CategoriaNoticia } from "@/lib/api/types";
import {
  descripcionesCategoriaNoticia,
  etiquetasCategoriaNoticia,
} from "@/lib/constants/etiquetas";
import { contarNoticiasPorCategoria } from "@/lib/noticias/filtros";
import { crearMetadata } from "@/lib/seo/metadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const categorias = Object.keys(etiquetasCategoriaNoticia) as CategoriaNoticia[];

function esCategoriaNoticia(valor: string): valor is CategoriaNoticia {
  return categorias.includes(valor as CategoriaNoticia);
}

export function generateStaticParams() {
  return categorias.map((categoria) => ({ slug: categoria }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;

  if (!esCategoriaNoticia(slug)) {
    return crearMetadata({
      title: "Categoría de noticias no encontrada",
      path: `/noticias/categoria/${slug}`,
      noIndex: true,
    });
  }

  return crearMetadata({
    title: `Noticias de ${etiquetasCategoriaNoticia[slug].toLowerCase()}`,
    description: descripcionesCategoriaNoticia[slug],
    path: `/noticias/categoria/${slug}`,
  });
}

export default async function NoticiasPorCategoriaPage({ params }: PageProps) {
  const { slug } = await params;

  if (!esCategoriaNoticia(slug)) notFound();

  const noticias = await obtenerNoticias();
  const deCategoria = noticias.filter((noticia) => noticia.categoria === slug);
  const conteo = contarNoticiasPorCategoria(noticias);

  return (
    <>
      <PageHero
        eyebrow="Noticias"
        title={etiquetasCategoriaNoticia[slug]}
        description={descripcionesCategoriaNoticia[slug]}
        migajas={[
          { nombre: "Inicio", href: "/" },
          { nombre: "Noticias", href: "/noticias" },
          { nombre: etiquetasCategoriaNoticia[slug] },
        ]}
      >
        <Button asChild variant="outline">
          <Link href="/noticias">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Ver todas las noticias
          </Link>
        </Button>
      </PageHero>

      <div className="py-10">
        <Container className="space-y-10">
          <section aria-label={`Noticias de ${etiquetasCategoriaNoticia[slug]}`}>
            <CatalogoNoticias
              noticias={deCategoria}
              categoriaInicial={slug}
              categoriaFija={slug}
            />
          </section>

          <section
            aria-label="Otras categorías de noticias"
            className="rounded-xl border bg-card p-5 shadow-xs"
          >
            <h2 className="text-lg font-semibold text-brand-dark">Otras categorías</h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
              {categorias
                .filter((categoria) => categoria !== slug)
                .map((categoria) => (
                  <li key={categoria}>
                    <Link
                      href={`/noticias/categoria/${categoria}`}
                      className="flex items-center justify-between gap-3 rounded-lg border p-3 text-sm hover:bg-muted/40"
                    >
                      <span className="font-medium text-brand-dark">
                        {etiquetasCategoriaNoticia[categoria]}
                      </span>
                      <span className="flex items-center gap-2 text-xs text-muted-foreground">
                        {conteo[categoria]} noticias
                        <ArrowRight className="size-4 text-brand" aria-hidden="true" />
                      </span>
                    </Link>
                  </li>
                ))}
            </ul>
          </section>
        </Container>
      </div>
    </>
  );
}
