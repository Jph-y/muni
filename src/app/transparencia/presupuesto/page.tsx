import Link from "next/link";
import {
  ArrowLeft,
  BarChart3,
  Download,
  Info,
  Landmark,
  TrendingDown,
  TrendingUp,
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
import { obtenerPresupuestos } from "@/lib/api/contenido";
import { formatearFecha, formatearMoneda } from "@/lib/format";
import { crearMetadata } from "@/lib/seo/metadata";
import { calcularPorcentaje } from "@/lib/transparencia/filtros";

export const metadata = crearMetadata({
  title: "Presupuesto y ejecución",
  description:
    "Presupuesto institucional, ingresos, gastos y avance de ejecución por rubro de la Municipalidad Distrital de Los Olivos.",
  path: "/transparencia/presupuesto",
});

export default async function PresupuestoPage() {
  const presupuestos = await obtenerPresupuestos();
  const actual = presupuestos[0];

  if (!actual) {
    return (
      <Container className="py-16">
        <p>No hay información presupuestal disponible.</p>
      </Container>
    );
  }

  const avanceIngresos = calcularPorcentaje(
    actual.ingresos.ejecutado,
    actual.ingresos.monto,
  );
  const avanceGastos = calcularPorcentaje(actual.gastos.ejecutado, actual.gastos.monto);
  const saldoGastos = actual.gastos.monto - actual.gastos.ejecutado;

  return (
    <>
      <PageHero
        eyebrow="Transparencia"
        title="Presupuesto y ejecución"
        description={`Presupuesto institucional ${actual.anio}, avance de ingresos y gastos por rubro, y comparativo de los últimos años.`}
        migajas={[
          { nombre: "Inicio", href: "/" },
          { nombre: "Transparencia", href: "/transparencia" },
          { nombre: "Presupuesto" },
        ]}
      >
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">Año fiscal {actual.anio}</Badge>
          <Badge variant="secondary">
            Actualizado al {formatearFecha(actual.actualizado)}
          </Badge>
          <Button asChild variant="outline">
            <a
              href="/documents/transparencia/presupuesto-2026-resumen.pdf"
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
          <section aria-label="Indicadores del presupuesto">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <TarjetaIndicador
                titulo="Presupuesto de gastos"
                valor={formatearMoneda(actual.gastos.monto)}
                detalle={`Año fiscal ${actual.anio}`}
                icono={<Landmark className="size-5" aria-hidden="true" />}
              />
              <TarjetaIndicador
                titulo="Gastos ejecutados"
                valor={formatearMoneda(actual.gastos.ejecutado)}
                detalle={`${avanceGastos}% del presupuesto`}
                icono={<TrendingUp className="size-5" aria-hidden="true" />}
              />
              <TarjetaIndicador
                titulo="Saldo por ejecutar"
                valor={formatearMoneda(saldoGastos)}
                detalle="Diferencia al último corte"
                icono={<TrendingDown className="size-5" aria-hidden="true" />}
              />
              <TarjetaIndicador
                titulo="Ingresos ejecutados"
                valor={formatearMoneda(actual.ingresos.ejecutado)}
                detalle={`${avanceIngresos}% de la meta anual`}
                icono={<BarChart3 className="size-5" aria-hidden="true" />}
              />
            </div>
          </section>

          <section aria-label="Ingresos y gastos">
            <SectionHeading
              eyebrow="Balance"
              title="Ingresos y gastos"
              description="Comparación entre la meta anual y lo efectivamente ejecutado al cierre del último mes publicado."
              className="mb-6"
            />
            <div className="grid gap-5 lg:grid-cols-2">
              <div className="rounded-xl border bg-card p-5 shadow-xs">
                <h3 className="text-base font-semibold text-brand-dark">Ingresos</h3>
                <p className="mt-1 text-2xl font-bold text-brand-dark">
                  {formatearMoneda(actual.ingresos.ejecutado)}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  de {formatearMoneda(actual.ingresos.monto)} programados
                </p>
                <BarraAvance
                  valor={avanceIngresos}
                  etiqueta="Avance de ingresos"
                  className="mt-4"
                />
              </div>
              <div className="rounded-xl border bg-card p-5 shadow-xs">
                <h3 className="text-base font-semibold text-brand-dark">Gastos</h3>
                <p className="mt-1 text-2xl font-bold text-brand-dark">
                  {formatearMoneda(actual.gastos.ejecutado)}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  de {formatearMoneda(actual.gastos.monto)} programados
                </p>
                <BarraAvance
                  valor={avanceGastos}
                  etiqueta="Avance de gastos"
                  className="mt-4"
                  tono="amber"
                />
              </div>
            </div>
          </section>

          <section aria-label="Ejecución por rubro">
            <SectionHeading
              eyebrow="Detalle"
              title="Ejecución por rubro"
              description="Distribución del presupuesto de gastos y su avance por función municipal."
              className="mb-6"
            />
            <div className="space-y-4 rounded-xl border bg-card p-5 shadow-xs">
              {actual.rubros.map((rubro) => {
                const avance = calcularPorcentaje(rubro.ejecutado, rubro.monto);
                return (
                  <div
                    key={rubro.nombre}
                    className="border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-sm font-semibold text-brand-dark">
                        {rubro.nombre}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {formatearMoneda(rubro.ejecutado)} de{" "}
                        {formatearMoneda(rubro.monto)}
                      </p>
                    </div>
                    <BarraAvance valor={avance} etiqueta="Avance" className="mt-2" />
                  </div>
                );
              })}
            </div>
          </section>

          <section aria-label="Comparativo histórico">
            <SectionHeading
              eyebrow="Historial"
              title="Comparativo de los últimos años"
              description="Evolución del presupuesto institucional y su nivel de ejecución."
              className="mb-6"
            />
            <Table>
              <TableCaption>
                Presupuesto institucional por año fiscal (en soles)
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Año</TableHead>
                  <TableHead className="text-right">Presupuesto</TableHead>
                  <TableHead className="text-right">Ingresos ejecutados</TableHead>
                  <TableHead className="text-right">Gastos ejecutados</TableHead>
                  <TableHead className="text-right">Avance de gastos</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {presupuestos.map((presupuesto) => (
                  <TableRow key={presupuesto.anio}>
                    <TableCell className="font-medium">{presupuesto.anio}</TableCell>
                    <TableCell className="text-right">
                      {formatearMoneda(presupuesto.gastos.monto)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatearMoneda(presupuesto.ingresos.ejecutado)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatearMoneda(presupuesto.gastos.ejecutado)}
                    </TableCell>
                    <TableCell className="text-right">
                      {calcularPorcentaje(
                        presupuesto.gastos.ejecutado,
                        presupuesto.gastos.monto,
                      )}
                      %
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </section>

          <Alert>
            <Info className="size-4" aria-hidden="true" />
            <AlertTitle>Fuente de la información</AlertTitle>
            <AlertDescription>
              Los montos corresponden al Sistema Integrado de Administración Financiera
              (SIAF) y se actualizan mensualmente. La información oficial y el detalle por
              partida se publican en el Portal de Transparencia Estándar.
            </AlertDescription>
          </Alert>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-5">
            <Link
              href="/transparencia"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-strong hover:underline"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Volver al portal de transparencia
            </Link>
            <Button asChild variant="outline">
              <Link href="/transparencia/contrataciones">Ver contrataciones</Link>
            </Button>
          </div>
        </Container>
      </div>
    </>
  );
}
