import Link from "next/link";
import { CalendarCheck, CreditCard, FileText, Info } from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { CatalogoTramites } from "@/components/tramites/catalogo-tramites";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { obtenerTramites } from "@/lib/api/contenido";
import { crearMetadata } from "@/lib/seo/metadata";

export const metadata = crearMetadata({
  title: "Trámites y servicios",
  description:
    "Catálogo de trámites municipales de Los Olivos con requisitos, costos, plazos y canales de atención.",
  path: "/tramites",
});

const canales = [
  {
    titulo: "Mesa de partes virtual",
    descripcion: "Presenta documentos y solicitudes sin acudir a la sede.",
    href: "/mesa-de-partes",
    icono: FileText,
  },
  {
    titulo: "Reserva de citas",
    descripcion: "Agenda tu atención presencial en la sede correspondiente.",
    href: "/citas",
    icono: CalendarCheck,
  },
  {
    titulo: "Pago de tributos",
    descripcion: "Consulta y paga tu predial, arbitrios y multas en línea.",
    href: "/tributos",
    icono: CreditCard,
  },
];

export default async function TramitesPage() {
  const tramites = await obtenerTramites();

  return (
    <>
      <PageHero
        eyebrow="Atención al ciudadano"
        title="Trámites y servicios municipales"
        description="Encuentra el trámite que necesitas, revisa sus requisitos y conoce el costo y el plazo de atención antes de iniciarlo."
        migajas={[{ nombre: "Inicio", href: "/" }, { nombre: "Trámites y servicios" }]}
      >
        <div className="flex flex-wrap gap-2">
          <Button asChild>
            <Link href="/tramites/tupa">Consultar el TUPA</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/servicios">Ver servicios municipales</Link>
          </Button>
        </div>
      </PageHero>

      <div className="py-10">
        <Container className="space-y-12">
          <section aria-labelledby="catalogo-tramites">
            <SectionHeading
              eyebrow="Catálogo"
              title="¿Qué trámite necesitas realizar?"
              description="Busca por nombre o filtra por categoría. Cada ficha detalla los requisitos, los pasos y la oficina responsable."
              className="mb-6"
            />
            <h2 id="catalogo-tramites" className="sr-only">
              Catálogo de trámites
            </h2>
            <CatalogoTramites tramites={tramites} />
          </section>

          <section aria-labelledby="canales-tramites">
            <SectionHeading
              eyebrow="Canales"
              title="Inicia tu trámite por el canal que prefieras"
              className="mb-6"
            />
            <h2 id="canales-tramites" className="sr-only">
              Canales de atención
            </h2>
            <ul className="grid gap-4 md:grid-cols-3">
              {canales.map((canal) => (
                <li key={canal.href}>
                  <Link
                    href={canal.href}
                    className="flex h-full flex-col gap-2 rounded-xl border bg-card p-5 shadow-xs transition-shadow hover:shadow-md"
                  >
                    <span className="inline-flex size-11 items-center justify-center rounded-lg bg-brand-soft text-brand-strong">
                      <canal.icono className="size-5" aria-hidden="true" />
                    </span>
                    <span className="font-semibold text-brand-dark">{canal.titulo}</span>
                    <span className="text-sm text-muted-foreground">
                      {canal.descripcion}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <Alert>
            <Info className="size-4" aria-hidden="true" />
            <AlertTitle>¿No encuentras tu procedimiento?</AlertTitle>
            <AlertDescription>
              El TUPA reúne todos los procedimientos administrativos vigentes con su
              derecho de tramitación y plazo. Si necesitas orientación adicional,
              comunícate con la central telefónica.
            </AlertDescription>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button asChild variant="outline" size="sm">
                <Link href="/tramites/tupa">Revisar el TUPA</Link>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link href="/contacto">Contactar a la municipalidad</Link>
              </Button>
            </div>
          </Alert>
        </Container>
      </div>
    </>
  );
}
