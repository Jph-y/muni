import Link from "next/link";
import { HeartHandshake, Info, Users } from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { CatalogoProgramas } from "@/components/participacion/catalogo-programas";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { obtenerProgramas } from "@/lib/api/contenido";
import { etiquetasCategoriaPrograma } from "@/lib/constants/etiquetas";
import { contarProgramasPorCategoria } from "@/lib/participacion/filtros";
import { crearMetadata } from "@/lib/seo/metadata";
import type { CategoriaPrograma } from "@/lib/api/types";

export const metadata = crearMetadata({
  title: "Programas sociales",
  description:
    "Programas sociales de la Municipalidad Distrital de Los Olivos: Vaso de Leche, DEMUNA, OMAPED, CIAM, talleres y tenencia responsable de mascotas.",
  path: "/programas",
});

export default async function ProgramasPage() {
  const programas = await obtenerProgramas();
  const conteo = contarProgramasPorCategoria(programas);
  const categorias = Object.keys(conteo) as CategoriaPrograma[];

  return (
    <>
      <PageHero
        eyebrow="Comunidad"
        title="Programas sociales"
        description="Programas gratuitos de apoyo alimentario, protección, inclusión y desarrollo para las familias del distrito."
        migajas={[{ nombre: "Inicio", href: "/" }, { nombre: "Programas sociales" }]}
      >
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">{programas.length} programas</Badge>
          {categorias
            .filter((categoria) => conteo[categoria] > 0)
            .map((categoria) => (
              <Badge key={categoria} variant="secondary">
                {etiquetasCategoriaPrograma[categoria]} ({conteo[categoria]})
              </Badge>
            ))}
          <Button asChild variant="outline">
            <Link href="/contacto">
              <Users className="size-4" aria-hidden="true" />
              Consultar requisitos
            </Link>
          </Button>
        </div>
      </PageHero>

      <div className="py-10">
        <Container className="space-y-10">
          <section aria-label="Catálogo de programas sociales">
            <SectionHeading
              eyebrow="Catálogo"
              title="Encuentra un programa"
              description="Busca por nombre o filtra por categoría para conocer los requisitos, beneficios y sedes de atención."
              className="mb-6"
            />
            <CatalogoProgramas programas={programas} />
          </section>

          <Alert>
            <HeartHandshake className="size-4" aria-hidden="true" />
            <AlertTitle>Inscripción gratuita</AlertTitle>
            <AlertDescription>
              La inscripción a los programas sociales es gratuita y se realiza en la sede
              indicada en cada programa. Desconfía de personas que cobren por este
              servicio.
            </AlertDescription>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button asChild size="sm">
                <Link href="/institucional/sedes">Ver sedes municipales</Link>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link href="/preguntas-frecuentes">Preguntas frecuentes</Link>
              </Button>
            </div>
          </Alert>

          <Alert>
            <Info className="size-4" aria-hidden="true" />
            <AlertTitle>Actualización de requisitos</AlertTitle>
            <AlertDescription>
              Los requisitos pueden variar según la convocatoria y la disponibilidad
              presupuestal. Confirma la información en la sede antes de presentar tus
              documentos.
            </AlertDescription>
          </Alert>
        </Container>
      </div>
    </>
  );
}
