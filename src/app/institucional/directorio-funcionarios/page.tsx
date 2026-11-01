import { Info } from "lucide-react";
import { Container } from "@/components/layout/container";
import { DirectorioFuncionarios } from "@/components/institucional/directorio-funcionarios";
import { PageHero } from "@/components/shared/page-hero";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { obtenerFuncionarios } from "@/lib/api/contenido";
import { crearMetadata } from "@/lib/seo/metadata";

export const metadata = crearMetadata({
  title: "Directorio de funcionarios",
  description:
    "Directorio de funcionarios de la Municipalidad Distrital de Los Olivos con correo, teléfono y área de atención.",
  path: "/institucional/directorio-funcionarios",
});

export default async function DirectorioPage() {
  const funcionarios = await obtenerFuncionarios();

  return (
    <>
      <PageHero
        eyebrow="Contacto institucional"
        title="Directorio de funcionarios"
        description="Busca por nombre, cargo o área para comunicarte con la oficina responsable de tu trámite."
        migajas={[
          { nombre: "Inicio", href: "/" },
          { nombre: "Institucional", href: "/institucional" },
          { nombre: "Directorio de funcionarios" },
        ]}
      />

      <div className="py-10">
        <Container className="space-y-6">
          <DirectorioFuncionarios funcionarios={funcionarios} />

          <Alert>
            <Info className="size-4" aria-hidden="true" />
            <AlertTitle>¿No encuentras el área que buscas?</AlertTitle>
            <AlertDescription>
              Comunícate con la central telefónica al (01) 321-4547 o revisa los canales
              de atención publicados en la sección de contacto. Los horarios pueden variar
              según la sede.
            </AlertDescription>
          </Alert>
        </Container>
      </div>
    </>
  );
}
