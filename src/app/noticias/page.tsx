import Link from "next/link";
import { ArrowRight, Megaphone } from "lucide-react";
import { Container } from "@/components/layout/container";
import { NoticiaCard } from "@/components/noticias/noticia-card";
import { CatalogoNoticias } from "@/components/noticias/catalogo-noticias";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { obtenerNoticias, obtenerNoticiasDestacadas } from "@/lib/api/contenido";
import type { CategoriaNoticia } from "@/lib/api/types";
import {
  descripcionesCategoriaNoticia,
  etiquetasCategoriaNoticia,
} from "@/lib/constants/etiquetas";
import { contarNoticiasPorCategoria } from "@/lib/noticias/filtros";
import { crearMetadata } from "@/lib/seo/metadata";

export const metadata = crearMetadata({
  title: "Noticias",
  description:
    "Últimas noticias, obras, campañas y actividades de la Municipalidad Distrital de Los Olivos.",
  path: "/noticias",
});

export default async function NoticiasPage() {
  const [noticias, destacadas] = await Promise.all([
    obtenerNoticias(),
    obtenerNoticiasDestacadas(3),
  ]);
  const conteo = contarNoticiasPorCategoria(noticias);
  const categorias = Object.keys(etiquetasCategoriaNoticia) as CategoriaNoticia[];

  return (
    <>
      <PageHero
        eyebrow="Sala de prensa"
        title="Noticias"
        description="Conoce las acciones, obras, campañas y actividades que la municipalidad desarrolla para las familias olivenses."
        migajas={[{ nombre: "Inicio", href: "/" }, { nombre: "Noticias" }]}
      >
        <div className="flex flex-wrap gap-2">
          <Button asChild>
            <Link href="/campanas">
              <Megaphone className="size-4" aria-hidden="true" />
              Campañas y eventos
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contacto">Contacto de prensa</Link>
          </Button>
        </div>
      </PageHero>

      <div className="py-10">
        <Container className="space-y-12">
          <section aria-label="Noticias destacadas">
            <SectionHeading
              eyebrow="Destacadas"
              title="Lo más reciente"
              description="Una selección de las noticias con mayor impacto para el distrito."
              className="mb-6"
            />
            <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {destacadas.map((noticia, indice) => (
                <li key={noticia.id}>
                  <NoticiaCard noticia={noticia} prioridad={indice === 0} />
                </li>
              ))}
            </ul>
          </section>

          <section aria-label="Categorías de noticias">
            <SectionHeading
              eyebrow="Categorías"
              title="Explora por categoría"
              description="Encuentra las noticias que más te interesan según el tema."
              className="mb-6"
            />
            <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {categorias.map((categoria) => (
                <li key={categoria}>
                  <Link
                    href={`/noticias/categoria/${categoria}`}
                    className="flex h-full flex-col gap-2 rounded-xl border bg-card p-5 shadow-xs transition-shadow hover:shadow-md"
                  >
                    <span className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-brand-dark">
                        {etiquetasCategoriaNoticia[categoria]}
                      </span>
                      <span className="rounded-full bg-brand-soft px-2 py-0.5 text-xs font-semibold text-brand-strong">
                        {conteo[categoria]}
                      </span>
                    </span>
                    <span className="text-sm leading-relaxed text-muted-foreground">
                      {descripcionesCategoriaNoticia[categoria]}
                    </span>
                    <span className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-semibold text-brand-strong">
                      Ver noticias
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section aria-label="Listado de noticias">
            <SectionHeading
              eyebrow="Archivo"
              title="Todas las noticias"
              description="Busca por palabra clave, categoría o año de publicación."
              className="mb-6"
            />
            <CatalogoNoticias noticias={noticias} />
          </section>

          <Alert>
            <Megaphone className="size-4" aria-hidden="true" />
            <AlertTitle>¿Tienes información para la comunidad?</AlertTitle>
            <AlertDescription>
              Escríbenos a través del formulario de contacto o acércate a la Oficina de
              Comunicaciones e Imagen Institucional del Palacio Municipal.
            </AlertDescription>
            <div className="mt-3">
              <Button asChild variant="outline" size="sm">
                <Link href="/contacto">Enviar un mensaje</Link>
              </Button>
            </div>
          </Alert>
        </Container>
      </div>
    </>
  );
}
