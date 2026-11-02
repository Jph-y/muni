import Link from "next/link";
import { Info } from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/shared/page-hero";
import { TablaTupa } from "@/components/tramites/tabla-tupa";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { obtenerTramites } from "@/lib/api/contenido";
import { crearMetadata } from "@/lib/seo/metadata";

export const metadata = crearMetadata({
  title: "Texto Único de Procedimientos Administrativos (TUPA)",
  description:
    "Procedimientos administrativos vigentes de la Municipalidad Distrital de Los Olivos, con derecho de tramitación y plazo de atención.",
  path: "/tramites/tupa",
});

export default async function TupaPage() {
  const tramites = await obtenerTramites();

  return (
    <>
      <PageHero
        eyebrow="Transparencia administrativa"
        title="Texto Único de Procedimientos Administrativos (TUPA)"
        description="Consulta los procedimientos vigentes, el derecho de tramitación y el plazo de atención. La versión oficial se publica en el Portal de Transparencia."
        migajas={[
          { nombre: "Inicio", href: "/" },
          { nombre: "Trámites y servicios", href: "/tramites" },
          { nombre: "TUPA" },
        ]}
      >
        <Button asChild variant="outline">
          <Link href="/tramites">Ir al catálogo de trámites</Link>
        </Button>
      </PageHero>

      <div className="py-10">
        <Container className="space-y-6">
          <Alert>
            <Info className="size-4" aria-hidden="true" />
            <AlertTitle>Versión de consulta</AlertTitle>
            <AlertDescription>
              Esta tabla resume los procedimientos publicados en el portal. Antes de
              presentar tu solicitud, verifica el TUPA oficial y sus modificatorias en el
              Portal de Transparencia de la entidad.
            </AlertDescription>
          </Alert>

          <TablaTupa tramites={tramites} />

          <p className="text-xs text-muted-foreground">
            Los derechos de tramitación se expresan en soles (S/) y no incluyen pagos a
            terceros ni tasas registrales. Los plazos se cuentan en días hábiles.
          </p>
        </Container>
      </div>
    </>
  );
}
