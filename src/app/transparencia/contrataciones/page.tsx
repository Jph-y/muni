import Link from "next/link";
import {
  ArrowLeft,
  BadgeCheck,
  Building2,
  ExternalLink,
  FileCheck2,
  Info,
  ReceiptText,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { CatalogoContrataciones } from "@/components/transparencia/catalogo-contrataciones";
import { TarjetaIndicador } from "@/components/transparencia/tarjeta-indicador";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { obtenerContrataciones } from "@/lib/api/contenido";
import { formatearMoneda } from "@/lib/format";
import { crearMetadata } from "@/lib/seo/metadata";
import {
  contarContratacionesPorEstado,
  sumarMontosContrataciones,
} from "@/lib/transparencia/filtros";

export const metadata = crearMetadata({
  title: "Contrataciones y adquisiciones",
  description:
    "Procesos de contratación de bienes, servicios, obras y consultorías de la Municipalidad Distrital de Los Olivos.",
  path: "/transparencia/contrataciones",
});

export default async function ContratacionesPage() {
  const contrataciones = await obtenerContrataciones();
  const conteo = contarContratacionesPorEstado(contrataciones);
  const montoTotal = sumarMontosContrataciones(contrataciones);
  const montoAdjudicado = sumarMontosContrataciones(contrataciones, [
    "buena-pro",
    "ejecucion",
    "culminado",
  ]);

  return (
    <>
      <PageHero
        eyebrow="Transparencia"
        title="Contrataciones y adquisiciones"
        description="Consulta los procesos convocados por la municipalidad, su modalidad, monto referencial, proveedor adjudicado y estado de ejecución."
        migajas={[
          { nombre: "Inicio", href: "/" },
          { nombre: "Transparencia", href: "/transparencia" },
          { nombre: "Contrataciones" },
        ]}
      >
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">{contrataciones.length} procesos</Badge>
          <Badge variant="secondary">{conteo.ejecucion} en ejecución</Badge>
          <Button asChild variant="outline">
            <a href="https://www.seace.gob.pe/" target="_blank" rel="noopener noreferrer">
              Consultar en SEACE
              <ExternalLink className="size-4" aria-hidden="true" />
            </a>
          </Button>
        </div>
      </PageHero>

      <div className="py-10">
        <Container className="space-y-10">
          <section aria-label="Indicadores de contrataciones">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <TarjetaIndicador
                titulo="Procesos registrados"
                valor={String(contrataciones.length)}
                detalle="Convocatorias de 2024 a 2026"
                icono={<ReceiptText className="size-5" aria-hidden="true" />}
              />
              <TarjetaIndicador
                titulo="Monto total"
                valor={formatearMoneda(montoTotal)}
                detalle="Monto referencial acumulado"
                icono={<Building2 className="size-5" aria-hidden="true" />}
              />
              <TarjetaIndicador
                titulo="Monto adjudicado"
                valor={formatearMoneda(montoAdjudicado)}
                detalle="Buena pro, ejecución y culminados"
                icono={<BadgeCheck className="size-5" aria-hidden="true" />}
              />
              <TarjetaIndicador
                titulo="Procesos culminados"
                valor={String(conteo.culminado)}
                detalle={`${conteo.desierto} desiertos`}
                icono={<FileCheck2 className="size-5" aria-hidden="true" />}
              />
            </div>
          </section>

          <section aria-label="Catálogo de contrataciones">
            <SectionHeading
              eyebrow="Procesos"
              title="Catálogo de contrataciones"
              description="Filtra por palabra clave, tipo de contratación, estado o año para encontrar un proceso."
              className="mb-6"
            />
            <CatalogoContrataciones contrataciones={contrataciones} />
          </section>

          <Alert>
            <Info className="size-4" aria-hidden="true" />
            <AlertTitle>Documentos oficiales</AlertTitle>
            <AlertDescription>
              Las bases administrativas, actas y resoluciones de adjudicación se publican
              en el Sistema Electrónico de Contrataciones del Estado (SEACE). Los
              documentos de este portal son demostrativos.
            </AlertDescription>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button asChild size="sm">
                <a
                  href="https://www.seace.gob.pe/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ir al SEACE
                  <ExternalLink className="size-4" aria-hidden="true" />
                </a>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link href="/transparencia">Volver al portal</Link>
              </Button>
            </div>
          </Alert>

          <div className="border-t pt-5">
            <Link
              href="/transparencia"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-strong hover:underline"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Volver al portal de transparencia
            </Link>
          </div>
        </Container>
      </div>
    </>
  );
}
