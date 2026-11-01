import { Container } from "@/components/layout/container";
import { MapaSede } from "@/components/institucional/mapa-sede";
import { SedeCard } from "@/components/institucional/sede-card";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { obtenerSedes } from "@/lib/api/contenido";
import { crearMetadata } from "@/lib/seo/metadata";

export const metadata = crearMetadata({
  title: "Sedes municipales",
  description:
    "Ubicación, horarios de atención, teléfonos y servicios de las sedes de la Municipalidad Distrital de Los Olivos.",
  path: "/institucional/sedes",
});

export default async function SedesPage() {
  const sedes = await obtenerSedes();
  const principal = sedes.find((sede) => sede.principal) ?? sedes[0];

  return (
    <>
      <PageHero
        eyebrow="Atención presencial"
        title="Sedes municipales"
        description="Conoce la dirección, el horario y los servicios disponibles en cada sede del distrito antes de acudir."
        migajas={[
          { nombre: "Inicio", href: "/" },
          { nombre: "Institucional", href: "/institucional" },
          { nombre: "Sedes" },
        ]}
      />

      <div className="py-10">
        <Container className="space-y-10">
          <section>
            <SectionHeading
              eyebrow="Directorio de sedes"
              title="¿Dónde atendemos?"
              description="Cada sede concentra servicios específicos. Verifica el horario antes de tu visita."
              className="mb-6"
            />
            <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {sedes.map((sede) => (
                <li key={sede.id}>
                  <SedeCard sede={sede} />
                </li>
              ))}
            </ul>
          </section>

          {principal ? (
            <section aria-labelledby="mapa-principal">
              <SectionHeading
                eyebrow="Ubicación"
                title={`Cómo llegar a ${principal.nombre}`}
                description={principal.direccion}
                className="mb-4"
              />
              <h2 id="mapa-principal" className="sr-only">
                Mapa de la sede principal
              </h2>
              <MapaSede sede={principal} />
            </section>
          ) : null}
        </Container>
      </div>
    </>
  );
}
