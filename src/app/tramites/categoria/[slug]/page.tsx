import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { TramiteCard } from "@/components/tramites/tramite-card";
import { Button } from "@/components/ui/button";
import { obtenerTramites } from "@/lib/api/contenido";
import type { CategoriaTramite } from "@/lib/api/types";
import {
  descripcionesCategoriaTramite,
  etiquetasCategoriaTramite,
} from "@/lib/constants/etiquetas";
import { crearMetadata } from "@/lib/seo/metadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const categorias = Object.keys(etiquetasCategoriaTramite) as CategoriaTramite[];

function esCategoria(valor: string): valor is CategoriaTramite {
  return categorias.includes(valor as CategoriaTramite);
}

export function generateStaticParams() {
  return categorias.map((categoria) => ({ slug: categoria }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;

  if (!esCategoria(slug)) {
    return crearMetadata({
      title: "Categoría no encontrada",
      path: `/tramites/categoria/${slug}`,
      noIndex: true,
    });
  }

  return crearMetadata({
    title: etiquetasCategoriaTramite[slug],
    description: descripcionesCategoriaTramite[slug],
    path: `/tramites/categoria/${slug}`,
  });
}

export default async function CategoriaTramitesPage({ params }: PageProps) {
  const { slug } = await params;

  if (!esCategoria(slug)) notFound();

  const tramites = await obtenerTramites(slug);
  const otrasCategorias = categorias.filter((categoria) => categoria !== slug);

  return (
    <>
      <PageHero
        eyebrow="Trámites por categoría"
        title={etiquetasCategoriaTramite[slug]}
        description={descripcionesCategoriaTramite[slug]}
        migajas={[
          { nombre: "Inicio", href: "/" },
          { nombre: "Trámites y servicios", href: "/tramites" },
          { nombre: etiquetasCategoriaTramite[slug] },
        ]}
      >
        <Button asChild variant="outline">
          <Link href="/tramites">Ver todos los trámites</Link>
        </Button>
      </PageHero>

      <div className="py-10">
        <Container className="space-y-10">
          <section aria-labelledby="lista-categoria">
            <SectionHeading
              title={`${tramites.length} ${
                tramites.length === 1 ? "trámite disponible" : "trámites disponibles"
              }`}
              description="Revisa los requisitos y el plazo de atención antes de iniciar tu solicitud."
              className="mb-6"
            />
            <h2 id="lista-categoria" className="sr-only">
              Trámites de la categoría
            </h2>

            {tramites.length === 0 ? (
              <p className="rounded-xl border border-dashed bg-muted/40 px-6 py-10 text-center text-sm text-muted-foreground">
                Aún no hay trámites publicados en esta categoría.
              </p>
            ) : (
              <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {tramites.map((tramite) => (
                  <li key={tramite.id}>
                    <TramiteCard tramite={tramite} />
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section aria-labelledby="otras-categorias">
            <h2
              id="otras-categorias"
              className="mb-3 text-lg font-semibold text-brand-dark"
            >
              Otras categorías
            </h2>
            <ul className="flex flex-wrap gap-2">
              {otrasCategorias.map((categoria) => (
                <li key={categoria}>
                  <Link
                    href={`/tramites/categoria/${categoria}`}
                    className="inline-flex h-10 items-center rounded-full border bg-card px-4 text-sm font-medium text-brand-dark hover:border-brand hover:bg-brand-soft"
                  >
                    {etiquetasCategoriaTramite[categoria]}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <div className="flex flex-wrap gap-3">
            <Button asChild variant="outline">
              <Link href="/tramites/tupa">Consultar el TUPA</Link>
            </Button>
            <Link
              href="/tramites"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-strong hover:underline"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Volver al catálogo completo
            </Link>
          </div>
        </Container>
      </div>
    </>
  );
}
