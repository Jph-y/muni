import Link from "next/link";
import {
  ArrowLeft,
  Download,
  Info,
  Landmark,
  ShieldCheck,
  Users,
  Wallet,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { BarraAvance } from "@/components/transparencia/barra-avance";
import { TarjetaIndicador } from "@/components/transparencia/tarjeta-indicador";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { obtenerPlanillas } from "@/lib/api/contenido";
import { etiquetasRegimenPlanilla } from "@/lib/constants/etiquetas";
import { formatearFecha, formatearMoneda } from "@/lib/format";
import { crearMetadata } from "@/lib/seo/metadata";
import {
  calcularTotalPlanillaMensual,
  calcularTotalTrabajadores,
} from "@/lib/transparencia/filtros";

export const metadata = crearMetadata({
  title: "Planilla y personal",
  description:
    "Número de trabajadores y remuneraciones por régimen laboral y área de la Municipalidad Distrital de Los Olivos.",
  path: "/transparencia/planilla",
});

export default async function PlanillaPage() {
  const planillas = await obtenerPlanillas();
  const actual = planillas[0];

  if (!actual) {
    return (
      <Container className="py-16">
        <p>No hay información de planilla disponible.</p>
      </Container>
    );
  }

  const totalTrabajadores = calcularTotalTrabajadores(actual.resumen);
  const totalMensual = calcularTotalPlanillaMensual(actual.resumen);
  const areas = [...(actual.areas ?? [])].sort((a, b) => b.cantidad - a.cantidad);
  const maximoArea = areas[0]?.cantidad ?? 1;
  const anterior = planillas[1];
  const totalAnterior = anterior ? calcularTotalTrabajadores(anterior.resumen) : null;

  return (
    <>
      <PageHero
        eyebrow="Transparencia"
        title="Planilla y personal"
        description={`Número de trabajadores y remuneraciones por régimen laboral y área, con información al ${formatearFecha(actual.actualizado)}.`}
        migajas={[
          { nombre: "Inicio", href: "/" },
          { nombre: "Transparencia", href: "/transparencia" },
          { nombre: "Planilla" },
        ]}
      >
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">Año {actual.anio}</Badge>
          <Badge variant="secondary">{totalTrabajadores} trabajadores</Badge>
          <Button asChild variant="outline">
            <a
              href="/documents/transparencia/planilla-2026-resumen.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download className="size-4" aria-hidden="true" />
              Descargar resumen
            </a>
          </Button>
        </div>
      </PageHero>

      <div className="py-10">
        <Container className="space-y-12">
          <section aria-label="Indicadores de planilla">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <TarjetaIndicador
                titulo="Total de trabajadores"
                valor={String(totalTrabajadores)}
                detalle={
                  totalAnterior
                    ? `${totalTrabajadores - totalAnterior >= 0 ? "+" : ""}${
                        totalTrabajadores - totalAnterior
                      } respecto a ${anterior.anio}`
                    : "Personal de todos los regímenes"
                }
                icono={<Users className="size-5" aria-hidden="true" />}
              />
              <TarjetaIndicador
                titulo="Remuneración mensual"
                valor={formatearMoneda(totalMensual)}
                detalle="Estimado para el mes en curso"
                icono={<Wallet className="size-5" aria-hidden="true" />}
              />
              <TarjetaIndicador
                titulo="Regímenes laborales"
                valor={String(actual.resumen.length)}
                detalle="276, 728, CAS y locación"
                icono={<Landmark className="size-5" aria-hidden="true" />}
              />
              <TarjetaIndicador
                titulo="Área con más personal"
                valor={areas[0]?.area ?? "—"}
                detalle={areas[0] ? `${areas[0].cantidad} trabajadores` : undefined}
                icono={<ShieldCheck className="size-5" aria-hidden="true" />}
              />
            </div>
          </section>

          <section aria-label="Remuneraciones por régimen">
            <SectionHeading
              eyebrow="Detalle"
              title="Remuneraciones por régimen"
              description="Cantidad de trabajadores y remuneración promedio mensual según el régimen laboral."
              className="mb-6"
            />
            <Table>
              <TableCaption>
                Planilla resumida del año {actual.anio} (montos en soles)
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Régimen laboral</TableHead>
                  <TableHead className="text-right">Trabajadores</TableHead>
                  <TableHead className="text-right">Remuneración promedio</TableHead>
                  <TableHead className="text-right">Total mensual</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {actual.resumen.map((item) => (
                  <TableRow key={item.regimen}>
                    <TableCell className="font-medium">
                      {etiquetasRegimenPlanilla[item.regimen]}
                    </TableCell>
                    <TableCell className="text-right">{item.cantidad}</TableCell>
                    <TableCell className="text-right">
                      {formatearMoneda(item.remuneracionPromedio)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatearMoneda(item.cantidad * item.remuneracionPromedio)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </section>

          {areas.length > 0 ? (
            <section aria-label="Personal por área">
              <SectionHeading
                eyebrow="Distribución"
                title="Personal por área"
                description="Cantidad de trabajadores asignados a cada unidad orgánica de la municipalidad."
                className="mb-6"
              />
              <div className="space-y-4 rounded-xl border bg-card p-5 shadow-xs">
                {areas.map((area) => (
                  <div key={area.area}>
                    <BarraAvance
                      valor={(area.cantidad / maximoArea) * 100}
                      etiqueta={`${area.area} · ${area.cantidad} trabajadores`}
                    />
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          <Alert>
            <Info className="size-4" aria-hidden="true" />
            <AlertTitle>Protección de datos personales</AlertTitle>
            <AlertDescription>
              Este prototipo publica información agregada. La planilla nominal con
              nombres, cargos y remuneraciones se encuentra disponible en el Portal de
              Transparencia Estándar, conforme a la Ley 29733.
            </AlertDescription>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button asChild size="sm">
                <a
                  href="https://www.transparencia.gob.pe/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Consultar planilla oficial
                </a>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link href="/transparencia/acceso-a-la-informacion">
                  Solicitar información
                </Link>
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
