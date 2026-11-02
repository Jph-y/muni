import Link from "next/link";
import { ArrowRight, FileText, Info } from "lucide-react";
import { Container } from "@/components/layout/container";
import { CatalogoPublicaciones } from "@/components/publicaciones/catalogo-publicaciones";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { obtenerPublicaciones } from "@/lib/api/contenido";
import type { TipoPublicacion } from "@/lib/api/types";
import {
  descripcionesTipoPublicacion,
  etiquetasTipoPublicacion,
} from "@/lib/constants/etiquetas";
import { contarPublicacionesPorTipo } from "@/lib/publicaciones/filtros";
import { crearMetadata } from "@/lib/seo/metadata";

export const metadata = crearMetadata({
  title: "Informes y publicaciones",
  description:
    "Formatos, formularios e informes de gestión publicados por la Municipalidad Distrital de Los Olivos.",
  path: "/informes-publicaciones",
});

export default async function InformesPublicacionesPage() {
  const publicaciones = await obtenerPublicaciones();
  const conteo = contarPublicacionesPorTipo(publicaciones);
  const tipos = Object.keys(etiquetasTipoPublicacion) as TipoPublicacion[];

  return (
    <>
      <PageHero
        eyebrow="Normas y documentos"
        title="Informes y publicaciones"
        description="Descarga los formatos oficiales, formularios de inscripción e informes de gestión de la municipalidad."
        migajas={[
          { nombre: "Inicio", href: "/" },
          { nombre: "Informes y publicaciones" },
        ]}
      >
        <div className="flex flex-wrap gap-2">
          <Button asChild>
            <Link href="/normas">
              <FileText className="size-4" aria-hidden="true" />
              Normas legales
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/institucional/documentos-de-gestion">Documentos de gestión</Link>
          </Button>
        </div>
      </PageHero>

      <div className="py-10">
        <Container className="space-y-12">
          <section aria-label="Tipos de publicación">
            <SectionHeading
              eyebrow="Tipos"
              title="Explora por tipo de publicación"
              description="Los formatos y formularios se actualizan cuando cambia el procedimiento; verifica siempre la fecha de publicación."
              className="mb-6"
            />
            <ul className="grid gap-4 sm:grid-cols-3">
              {tipos.map((tipo) => (
                <li key={tipo}>
                  <Link
                    href={`/informes-publicaciones/tipo/${tipo}`}
                    className="flex h-full flex-col gap-2 rounded-xl border bg-card p-5 shadow-xs transition-shadow hover:shadow-md"
                  >
                    <span className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-brand-dark">
                        {etiquetasTipoPublicacion[tipo]}
                      </span>
                      <span className="rounded-full bg-brand-soft px-2 py-0.5 text-xs font-semibold text-brand-strong">
                        {conteo[tipo]}
                      </span>
                    </span>
                    <span className="text-sm leading-relaxed text-muted-foreground">
                      {descripcionesTipoPublicacion[tipo]}
                    </span>
                    <span className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-semibold text-brand-strong">
                      Ver publicaciones
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section aria-label="Listado de publicaciones">
            <SectionHeading
              eyebrow="Buscar"
              title="Todas las publicaciones"
              description="Filtra por tipo o año, o busca por el nombre del documento y la oficina responsable."
              className="mb-6"
            />
            <CatalogoPublicaciones publicaciones={publicaciones} />
          </section>

          <Alert>
            <Info className="size-4" aria-hidden="true" />
            <AlertTitle>Documentos de demostración</AlertTitle>
            <AlertDescription>
              Los archivos de este portal son referenciales mientras se integra el
              repositorio documental oficial. Para presentar un trámite, usa el formato
              vigente en mesa de partes.
            </AlertDescription>
            <div className="mt-3">
              <Button asChild variant="outline" size="sm">
                <Link href="/tramites">Revisar el catálogo de trámites</Link>
              </Button>
            </div>
          </Alert>
        </Container>
      </div>
    </>
  );
}
