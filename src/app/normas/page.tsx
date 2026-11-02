import Link from "next/link";
import { ArrowRight, Download, FileText, Info } from "lucide-react";
import { Container } from "@/components/layout/container";
import { CatalogoNormas } from "@/components/normas/catalogo-normas";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { obtenerNormas } from "@/lib/api/contenido";
import type { TipoNorma } from "@/lib/api/types";
import { descripcionesTipoNorma, etiquetasTipoNorma } from "@/lib/constants/etiquetas";
import { contarNormasPorTipo } from "@/lib/normas/filtros";
import { crearMetadata } from "@/lib/seo/metadata";

export const metadata = crearMetadata({
  title: "Normas legales",
  description:
    "Ordenanzas, decretos de alcaldía, acuerdos de concejo y resoluciones publicadas por la Municipalidad Distrital de Los Olivos.",
  path: "/normas",
});

export default async function NormasPage() {
  const normas = await obtenerNormas();
  const conteo = contarNormasPorTipo(normas);
  const tipos = Object.keys(etiquetasTipoNorma) as TipoNorma[];

  return (
    <>
      <PageHero
        eyebrow="Normas y documentos"
        title="Normas legales"
        description="Consulta las ordenanzas, decretos, acuerdos y resoluciones que rigen la gestión municipal. Puedes filtrar por tipo, año o palabra clave."
        migajas={[{ nombre: "Inicio", href: "/" }, { nombre: "Normas legales" }]}
      >
        <div className="flex flex-wrap gap-2">
          <Button asChild>
            <Link href="/informes-publicaciones">
              <FileText className="size-4" aria-hidden="true" />
              Informes y publicaciones
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/institucional/documentos-de-gestion">Documentos de gestión</Link>
          </Button>
        </div>
      </PageHero>

      <div className="py-10">
        <Container className="space-y-12">
          <section aria-label="Tipos de norma">
            <SectionHeading
              eyebrow="Tipos"
              title="Explora por tipo de norma"
              description="Cada tipo de norma tiene un alcance y un procedimiento de aprobación distinto."
              className="mb-6"
            />
            <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {tipos.map((tipo) => (
                <li key={tipo}>
                  <Link
                    href={`/normas/tipo/${tipo}`}
                    className="flex h-full flex-col gap-2 rounded-xl border bg-card p-5 shadow-xs transition-shadow hover:shadow-md"
                  >
                    <span className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-brand-dark">
                        {etiquetasTipoNorma[tipo]}
                      </span>
                      <span className="rounded-full bg-brand-soft px-2 py-0.5 text-xs font-semibold text-brand-strong">
                        {conteo[tipo]}
                      </span>
                    </span>
                    <span className="text-sm leading-relaxed text-muted-foreground">
                      {descripcionesTipoNorma[tipo]}
                    </span>
                    <span className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-semibold text-brand-strong">
                      Ver normas
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section aria-label="Listado de normas">
            <SectionHeading
              eyebrow="Buscar"
              title="Todas las normas publicadas"
              description="Usa los filtros para encontrar una norma por su número, su título o el año de publicación."
              className="mb-6"
            />
            <CatalogoNormas normas={normas} />
          </section>

          <Alert>
            <Info className="size-4" aria-hidden="true" />
            <AlertTitle>Sobre la publicación de normas</AlertTitle>
            <AlertDescription>
              Las normas se publican en este portal para facilitar su consulta. En caso de
              discrepancia, prevalece el texto publicado en el diario oficial El Peruano y
              en el Portal de Transparencia Estándar.
            </AlertDescription>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button asChild variant="outline" size="sm">
                <Link href="/transparencia">Portal de Transparencia</Link>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link href="/contacto">
                  <Download className="size-4" aria-hidden="true" />
                  Solicitar una copia
                </Link>
              </Button>
            </div>
          </Alert>
        </Container>
      </div>
    </>
  );
}
