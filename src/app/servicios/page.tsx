import Link from "next/link";
import { ArrowRight, HandHeart, Megaphone, Users } from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { CatalogoServicios } from "@/components/servicios/catalogo-servicios";
import { Button } from "@/components/ui/button";
import { obtenerServicios } from "@/lib/api/contenido";
import { crearMetadata } from "@/lib/seo/metadata";

export const metadata = crearMetadata({
  title: "Servicios municipales",
  description:
    "Limpieza pública, seguridad ciudadana, salud, programas sociales, medio ambiente y actividades culturales en Los Olivos.",
  path: "/servicios",
});

const secciones = [
  {
    titulo: "Programas sociales",
    descripcion: "Vaso de Leche, DEMUNA, OMAPED y atención al adulto mayor.",
    href: "/programas",
    icono: HandHeart,
  },
  {
    titulo: "Participación vecinal",
    descripcion: "Presupuesto participativo, CODISE y consulta ciudadana.",
    href: "/participacion-vecinal",
    icono: Users,
  },
  {
    titulo: "Convocatorias",
    descripcion: "Procesos de selección y oportunidades para la comunidad.",
    href: "/convocatorias",
    icono: Megaphone,
  },
];

export default async function ServiciosPage() {
  const servicios = await obtenerServicios();

  return (
    <>
      <PageHero
        eyebrow="Atención al ciudadano"
        title="Servicios municipales"
        description="Conoce los servicios que la municipalidad brinda a los vecinos, cómo acceder a ellos y dónde se atienden."
        migajas={[
          { nombre: "Inicio", href: "/" },
          { nombre: "Trámites y servicios", href: "/tramites" },
          { nombre: "Servicios" },
        ]}
      >
        <div className="flex flex-wrap gap-2">
          <Button asChild>
            <Link href="/tramites">Ver trámites</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contacto">Contactar</Link>
          </Button>
        </div>
      </PageHero>

      <div className="py-10">
        <Container className="space-y-12">
          <section aria-labelledby="catalogo-servicios">
            <SectionHeading
              eyebrow="Catálogo"
              title="¿Qué servicio necesitas?"
              description="Filtra por categoría o busca por palabra clave para encontrar el canal de atención adecuado."
              className="mb-6"
            />
            <h2 id="catalogo-servicios" className="sr-only">
              Catálogo de servicios municipales
            </h2>
            <CatalogoServicios servicios={servicios} />
          </section>

          <section aria-labelledby="mas-servicios">
            <SectionHeading
              eyebrow="Comunidad"
              title="Otros espacios de atención"
              className="mb-6"
            />
            <h2 id="mas-servicios" className="sr-only">
              Programas y participación
            </h2>
            <ul className="grid gap-4 md:grid-cols-3">
              {secciones.map((seccion) => (
                <li key={seccion.href}>
                  <Link
                    href={seccion.href}
                    className="flex h-full flex-col gap-2 rounded-xl border bg-card p-5 shadow-xs transition-shadow hover:shadow-md"
                  >
                    <span className="inline-flex size-11 items-center justify-center rounded-lg bg-brand-soft text-brand-strong">
                      <seccion.icono className="size-5" aria-hidden="true" />
                    </span>
                    <span className="font-semibold text-brand-dark">
                      {seccion.titulo}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {seccion.descripcion}
                    </span>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-brand-strong">
                      Ver más
                      <ArrowRight className="size-4" aria-hidden="true" />
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
