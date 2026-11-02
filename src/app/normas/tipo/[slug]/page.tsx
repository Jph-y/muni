import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { CatalogoNormas } from "@/components/normas/catalogo-normas";
import { PageHero } from "@/components/shared/page-hero";
import { Button } from "@/components/ui/button";
import { obtenerNormas } from "@/lib/api/contenido";
import type { TipoNorma } from "@/lib/api/types";
import { descripcionesTipoNorma, etiquetasTipoNorma } from "@/lib/constants/etiquetas";
import { contarNormasPorTipo } from "@/lib/normas/filtros";
import { crearMetadata } from "@/lib/seo/metadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const tipos = Object.keys(etiquetasTipoNorma) as TipoNorma[];

function esTipoNorma(valor: string): valor is TipoNorma {
  return tipos.includes(valor as TipoNorma);
}

export function generateStaticParams() {
  return tipos.map((tipo) => ({ slug: tipo }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;

  if (!esTipoNorma(slug)) {
    return crearMetadata({
      title: "Tipo de norma no encontrado",
      path: `/normas/tipo/${slug}`,
      noIndex: true,
    });
  }

  return crearMetadata({
    title: etiquetasTipoNorma[slug],
    description: descripcionesTipoNorma[slug],
    path: `/normas/tipo/${slug}`,
  });
}

export default async function NormasPorTipoPage({ params }: PageProps) {
  const { slug } = await params;

  if (!esTipoNorma(slug)) notFound();

  const [normas, todas] = await Promise.all([obtenerNormas(slug), obtenerNormas()]);
  const conteo = contarNormasPorTipo(todas);

  return (
    <>
      <PageHero
        eyebrow="Normas legales"
        title={etiquetasTipoNorma[slug]}
        description={descripcionesTipoNorma[slug]}
        migajas={[
          { nombre: "Inicio", href: "/" },
          { nombre: "Normas legales", href: "/normas" },
          { nombre: etiquetasTipoNorma[slug] },
        ]}
      >
        <Button asChild variant="outline">
          <Link href="/normas">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Ver todas las normas
          </Link>
        </Button>
      </PageHero>

      <div className="py-10">
        <Container className="space-y-10">
          <section aria-label={`Normas de tipo ${etiquetasTipoNorma[slug]}`}>
            <CatalogoNormas normas={normas} tipoFijo={slug} />
          </section>

          <section
            aria-label="Otros tipos de norma"
            className="rounded-xl border bg-card p-5 shadow-xs"
          >
            <h2 className="text-lg font-semibold text-brand-dark">
              Otros tipos de norma
            </h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {tipos
                .filter((tipo) => tipo !== slug)
                .map((tipo) => (
                  <li key={tipo}>
                    <Link
                      href={`/normas/tipo/${tipo}`}
                      className="flex items-center justify-between gap-3 rounded-lg border p-3 text-sm hover:bg-muted/40"
                    >
                      <span className="font-medium text-brand-dark">
                        {etiquetasTipoNorma[tipo]}
                      </span>
                      <span className="flex items-center gap-2 text-xs text-muted-foreground">
                        {conteo[tipo]} normas
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
