import { Info } from "lucide-react";
import { Container } from "@/components/layout/container";
import { DocumentosGestion } from "@/components/institucional/documentos-gestion";
import { PageHero } from "@/components/shared/page-hero";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { obtenerDocumentosGestion } from "@/lib/api/contenido";
import { crearMetadata } from "@/lib/seo/metadata";

export const metadata = crearMetadata({
  title: "Documentos de gestión",
  description:
    "ROF, MOF, PEI, POI, CAP y otros documentos de gestión de la Municipalidad Distrital de Los Olivos.",
  path: "/institucional/documentos-de-gestion",
});

export default async function DocumentosDeGestionPage() {
  const documentos = await obtenerDocumentosGestion();

  return (
    <>
      <PageHero
        eyebrow="Transparencia institucional"
        title="Documentos de gestión"
        description="Instrumentos que definen la organización, las funciones y la planificación de la municipalidad."
        migajas={[
          { nombre: "Inicio", href: "/" },
          { nombre: "Institucional", href: "/institucional" },
          { nombre: "Documentos de gestión" },
        ]}
      />

      <div className="py-10">
        <Container className="space-y-6">
          <Alert>
            <Info className="size-4" aria-hidden="true" />
            <AlertTitle>Documentos oficiales en PDF</AlertTitle>
            <AlertDescription>
              Descarga la versión vigente de cada documento. Si necesitas una versión
              accesible o requieres información adicional, presenta una solicitud de
              acceso a la información pública.
            </AlertDescription>
          </Alert>

          <DocumentosGestion documentos={documentos} />

          <p className="text-xs text-muted-foreground">
            Los documentos pueden ser actualizados por la oficina responsable. La fecha de
            actualización se muestra en cada registro.
          </p>
        </Container>
      </div>
    </>
  );
}
