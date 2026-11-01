import { Download, Info } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Organigrama } from "@/components/institucional/organigrama";
import { PageHero } from "@/components/shared/page-hero";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { obtenerAreasOrganizacionales } from "@/lib/api/contenido";
import { crearMetadata } from "@/lib/seo/metadata";

const organigramaOficialUrl =
  "https://www.gob.pe/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6MzYxNzUxLCJwdXIiOiJibG9iX2lkIn19--cdec16e1941d4d441b10d80edf61a2104878bb4b/Organigrama_MDLO_2023.pdf";

export const metadata = crearMetadata({
  title: "Organigrama",
  description:
    "Estructura orgánica vigente de la Municipalidad Distrital de Los Olivos y sus relaciones de dependencia.",
  path: "/institucional/organigrama",
});

export default async function OrganigramaPage() {
  const areas = await obtenerAreasOrganizacionales();

  return (
    <>
      <PageHero
        eyebrow="La institución"
        title="Organigrama institucional"
        description="Representación de la estructura orgánica de la municipalidad, desde la alta dirección hasta las subgerencias."
        migajas={[
          { nombre: "Inicio", href: "/" },
          { nombre: "Institucional", href: "/institucional" },
          { nombre: "Organigrama" },
        ]}
      />

      <div className="py-10">
        <Container className="space-y-8">
          <Alert>
            <Info className="size-4" aria-hidden="true" />
            <AlertTitle>Versión oficial</AlertTitle>
            <AlertDescription>
              <p>
                La estructura mostrada es una versión accesible del organigrama aprobado.
                Para efectos oficiales, descarga el documento publicado por la entidad.
              </p>
              <Button asChild variant="outline" size="sm" className="mt-3">
                <a href={organigramaOficialUrl} target="_blank" rel="noopener noreferrer">
                  <Download className="size-4" aria-hidden="true" />
                  Descargar organigrama oficial (PDF)
                  <span className="sr-only"> (se abre en una pestaña nueva)</span>
                </a>
              </Button>
            </AlertDescription>
          </Alert>

          <Organigrama areas={areas} />

          <p className="text-xs text-muted-foreground">
            Las denominaciones y dependencias pueden actualizarse mediante resoluciones de
            alcaldía. Consulta la sección de normas para conocer los cambios vigentes.
          </p>
        </Container>
      </div>
    </>
  );
}
