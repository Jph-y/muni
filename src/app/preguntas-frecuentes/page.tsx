import Link from "next/link";
import { MessageCircleQuestion } from "lucide-react";
import { Container } from "@/components/layout/container";
import { AcordeonFaq } from "@/components/faq/acordeon-faq";
import { PageHero } from "@/components/shared/page-hero";
import { Button } from "@/components/ui/button";
import { obtenerPreguntasFrecuentes } from "@/lib/api/contenido";
import { crearMetadata } from "@/lib/seo/metadata";

export const metadata = crearMetadata({
  title: "Preguntas frecuentes",
  description:
    "Respuestas a las dudas más comunes sobre trámites, tributos, mesa de partes virtual, servicios y el uso de la cuenta digital.",
  path: "/preguntas-frecuentes",
});

export default async function PreguntasFrecuentesPage() {
  const preguntas = await obtenerPreguntasFrecuentes();

  return (
    <>
      <PageHero
        eyebrow="Ayuda"
        title="Preguntas frecuentes"
        description="Busca por palabra clave y despliega la respuesta. Si tu duda no aparece, escríbenos o llama a la central telefónica."
        migajas={[{ nombre: "Inicio", href: "/" }, { nombre: "Preguntas frecuentes" }]}
      />

      <div className="py-10">
        <Container className="grid gap-8 lg:grid-cols-[1fr_20rem]">
          <div>
            <AcordeonFaq preguntas={preguntas} />
          </div>

          <aside className="space-y-4">
            <div className="rounded-xl border bg-brand-soft/60 p-5">
              <h2 className="flex items-center gap-2 text-base font-semibold text-brand-dark">
                <MessageCircleQuestion className="size-4" aria-hidden="true" />
                ¿No encontraste tu respuesta?
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Escríbenos a través del formulario de contacto o revisa el catálogo de
                trámites para conocer requisitos y plazos.
              </p>
              <div className="mt-4 flex flex-col gap-2">
                <Button asChild>
                  <Link href="/contacto">Contactar a la municipalidad</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/tramites">Ver trámites</Link>
                </Button>
              </div>
            </div>

            <div className="rounded-xl border bg-card p-5">
              <h2 className="text-base font-semibold text-brand-dark">
                Accesos directos
              </h2>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link
                    href="/tramites/tupa"
                    className="text-brand-strong hover:underline"
                  >
                    Consultar el TUPA
                  </Link>
                </li>
                <li>
                  <Link
                    href="/mesa-de-partes"
                    className="text-brand-strong hover:underline"
                  >
                    Mesa de partes virtual
                  </Link>
                </li>
                <li>
                  <Link href="/tributos" className="text-brand-strong hover:underline">
                    Pago de tributos
                  </Link>
                </li>
                <li>
                  <Link href="/emergencias" className="text-brand-strong hover:underline">
                    Números de emergencia
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </Container>
      </div>
    </>
  );
}
