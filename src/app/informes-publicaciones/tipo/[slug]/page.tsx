import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { CatalogoPublicaciones } from "@/components/publicaciones/catalogo-publicaciones";
import { PageHero } from "@/components/shared/page-hero";
import { Button } from "@/components/ui/button";
import { obtenerPublicaciones } from "@/lib/api/contenido";
import type { TipoPublicacion } from "@/lib/api/types";
import {
  descripcionesTipoPublicacion,
  etiquetasTipoPublicacion,
} from "@/lib/constants/etiquetas";
import { contarPublicacionesPorTipo } from "@/lib/publicaciones/filtros";
import { crearMetadata } from "@/lib/seo/metadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const tipos = Object.keys(etiquetasTipoPublicacion) as TipoPublicacion[];

function esTipoPublicacion(valor: string): valor is TipoPublicacion {
  return tipos.includes(valor as TipoPublicacion);
}

export function generateStaticParams() {
  return tipos.map((tipo) => ({ slug: tipo }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;

  if (!esTipoPublicacion(slug)) {
    return crearMetadata({
      title: "Tipo de publicación no encontrado",
      path: `/informes-publicaciones/tipo/${slug}`,
      noIndex: true,
    });
  }

  return crearMetadata({
    title: etiquetasTipoPublicacion[slug],
    description: descripcionesTipoPublicacion[slug],
    path: `/informes-publicaciones/tipo/${slug}`,
  });
}

export default async function PublicacionesPorTipoPage({ params }: PageProps) {
  const { slug } = await params;

  if (!esTipoPublicacion(slug)) notFound();

  const [publicaciones, todas] = await Promise.all([
    obtenerPublicaciones(slug),
    obtenerPublicaciones(),
  ]);
  const conteo = contarPublicacionesPorTipo(todas);

  return (
    <>
      <PageHero
        eyebrow="Informes y publicaciones"
        title={etiquetasTipoPublicacion[slug]}
        description={descripcionesTipoPublicacion[slug]}
        migajas={[
          { nombre: "Inicio", href: "/" },
          { nombre: "Informes y publicaciones", href: "/informes-publicaciones" },
          { nombre: etiquetasTipoPublicacion[slug] },
        ]}
      >
        <Button asChild variant="outline">
          <Link href="/informes-publicaciones">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Ver todas las publicaciones
          </Link>
        </Button>
      </PageHero>

      <div className="py-10">
        <Container className="space-y-10">
          <section aria-label={`Publicaciones de tipo ${etiquetasTipoPublicacion[slug]}`}>
            <CatalogoPublicaciones publicaciones={publicaciones} tipoFijo={slug} />
          </section>

          <section
            aria-label="Otros tipos de publicación"
            className="rounded-xl border bg-card p-5 shadow-xs"
          >
            <h2 className="text-lg font-semibold text-brand-dark">
              Otros tipos de publicación
            </h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {tipos
                .filter((tipo) => tipo !== slug)
                .map((tipo) => (
                  <li key={tipo}>
                    <Link
                      href={`/informes-publicaciones/tipo/${tipo}`}
                      className="flex items-center justify-between gap-3 rounded-lg border p-3 text-sm hover:bg-muted/40"
                    >
                      <span className="font-medium text-brand-dark">
                        {etiquetasTipoPublicacion[tipo]}
                      </span>
                      <span className="flex items-center gap-2 text-xs text-muted-foreground">
                        {conteo[tipo]} documentos
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
