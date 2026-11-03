import Link from "next/link";
import {
  ArrowLeft,
  Download,
  FileSpreadsheet,
  Info,
  Target,
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
import { obtenerDocumentosGestion, obtenerPoi } from "@/lib/api/contenido";
import { formatearMoneda } from "@/lib/format";
import { crearMetadata } from "@/lib/seo/metadata";
import {
  agruparPoiPorEje,
  calcularPorcentaje,
  obtenerPoiDelAnio,
} from "@/lib/transparencia/filtros";

export const metadata = crearMetadata({
  title: "Plan Operativo Institucional",
  description:
    "Actividades, metas físicas, presupuesto y avance del Plan Operativo Institucional de la Municipalidad Distrital de Los Olivos.",
  path: "/transparencia/poi",
});

export default async function PoiPage() {
  const [actividades, documentos] = await Promise.all([
    obtenerPoi(),
    obtenerDocumentosGestion(),
  ]);

  const anios = [...new Set(actividades.map((actividad) => actividad.anio))].sort(
    (a, b) => b - a,
  );
  const anio = anios[0] ?? 2026;
  const delAnio = obtenerPoiDelAnio(actividades, anio);
  const grupos = agruparPoiPorEje(delAnio);

  const presupuesto = delAnio.reduce((suma, item) => suma + item.presupuesto, 0);
  const ejecutado = delAnio.reduce((suma, item) => suma + item.ejecutado, 0);
  const avancePresupuestal = calcularPorcentaje(ejecutado, presupuesto);
  const avanceFisico = Math.round(
    delAnio.reduce((suma, item) => suma + item.avance, 0) / (delAnio.length || 1),
  );
  const documentosPoi = documentos.filter((documento) => documento.tipo === "poi");

  return (
    <>
      <PageHero
        eyebrow="Transparencia"
        title="Plan Operativo Institucional"
        description={`Actividades operativas, metas físicas y ejecución presupuestal del POI ${anio}, organizadas por eje estratégico.`}
        migajas={[
          { nombre: "Inicio", href: "/" },
          { nombre: "Transparencia", href: "/transparencia" },
          { nombre: "POI" },
        ]}
      >
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">Año {anio}</Badge>
          <Badge variant="secondary">{delAnio.length} actividades</Badge>
          {documentosPoi[0] ? (
            <Button asChild variant="outline">
              <a
                href={documentosPoi[0].archivoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="size-4" aria-hidden="true" />
                Descargar POI
              </a>
            </Button>
          ) : null}
        </div>
      </PageHero>

      <div className="py-10">
        <Container className="space-y-12">
          <section aria-label="Indicadores del POI">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <TarjetaIndicador
                titulo="Actividades"
                valor={String(delAnio.length)}
                detalle={`${grupos.length} ejes estratégicos`}
                icono={<FileSpreadsheet className="size-5" aria-hidden="true" />}
              />
              <TarjetaIndicador
                titulo="Presupuesto POI"
                valor={formatearMoneda(presupuesto)}
                detalle={`Año fiscal ${anio}`}
                icono={<Target className="size-5" aria-hidden="true" />}
              />
              <TarjetaIndicador
                titulo="Ejecutado"
                valor={formatearMoneda(ejecutado)}
                detalle={`${avancePresupuestal}% del presupuesto`}
                icono={<TrendingUp className="size-5" aria-hidden="true" />}
              />
              <TarjetaIndicador
                titulo="Avance físico"
                valor={`${avanceFisico}%`}
                detalle="Promedio de metas físicas"
                icono={<Target className="size-5" aria-hidden="true" />}
              />
            </div>
          </section>

          <section aria-label="Actividades por eje estratégico">
            <SectionHeading
              eyebrow="Ejecución"
              title="Actividades por eje estratégico"
              description="Avance físico y presupuestal de cada actividad programada para el año."
              className="mb-6"
            />
            <div className="space-y-8">
              {grupos.map((grupo) => (
                <div key={grupo.eje} className="rounded-xl border bg-card p-5 shadow-xs">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-base font-semibold text-brand-dark">
                        {grupo.eje}
                      </h3>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {grupo.actividades.length}{" "}
                        {grupo.actividades.length === 1 ? "actividad" : "actividades"} ·{" "}
                        {formatearMoneda(grupo.ejecutado)} de{" "}
                        {formatearMoneda(grupo.presupuesto)}
                      </p>
                    </div>
                    <Badge variant="secondary">{grupo.avance}% de avance</Badge>
                  </div>
                  <BarraAvance
                    valor={grupo.avance}
                    etiqueta="Avance físico promedio"
                    className="mt-3"
                  />
                  <div className="mt-5">
                    <Table>
                      <TableCaption className="sr-only">
                        Actividades del eje {grupo.eje}
                      </TableCaption>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Actividad</TableHead>
                          <TableHead className="text-right">Meta</TableHead>
                          <TableHead className="text-right">Avance</TableHead>
                          <TableHead className="text-right">Presupuesto</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {grupo.actividades.map((actividad) => (
                          <TableRow key={actividad.id}>
                            <TableCell>
                              <p className="font-medium text-brand-dark">
                                {actividad.actividad}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {actividad.objetivo}
                              </p>
                            </TableCell>
                            <TableCell className="text-right whitespace-nowrap">
                              {actividad.meta} {actividad.unidad}
                            </TableCell>
                            <TableCell className="text-right">
                              {actividad.avance}%
                            </TableCell>
                            <TableCell className="text-right whitespace-nowrap">
                              {formatearMoneda(actividad.presupuesto)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {documentosPoi.length > 0 ? (
            <section aria-label="Documentos del POI">
              <SectionHeading
                eyebrow="Documentos"
                title="Documentos oficiales"
                description="Versiones aprobadas y modificatorias del Plan Operativo Institucional."
                className="mb-6"
              />
              <ul className="grid gap-3 sm:grid-cols-2">
                {documentosPoi.map((documento) => (
                  <li key={documento.id}>
                    <a
                      href={documento.archivoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-3 rounded-xl border bg-card p-4 text-sm shadow-xs hover:shadow-md"
                    >
                      <span>
                        <span className="block font-medium text-brand-dark">
                          {documento.titulo}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Actualizado en {documento.anio}
                        </span>
                      </span>
                      <Download
                        className="size-4 shrink-0 text-brand"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <Alert>
            <Info className="size-4" aria-hidden="true" />
            <AlertTitle>Seguimiento del POI</AlertTitle>
            <AlertDescription>
              El avance se reporta trimestralmente y se contrasta con el presupuesto
              ejecutado. La información oficial forma parte de los documentos de gestión
              aprobados por la municipalidad.
            </AlertDescription>
            <div className="mt-3">
              <Button asChild variant="outline" size="sm">
                <Link href="/institucional/documentos-de-gestion">
                  Ver documentos de gestión
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
