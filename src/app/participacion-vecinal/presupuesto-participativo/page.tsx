import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Download,
  Handshake,
  Landmark,
  Wallet,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { TimelineEtapas } from "@/components/participacion/timeline-etapas";
import { TarjetaIndicador } from "@/components/transparencia/tarjeta-indicador";
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
import { obtenerParticipacionVecinal } from "@/lib/api/contenido";
import { etiquetasEstadoProyectoParticipativo } from "@/lib/constants/etiquetas";
import { formatearFechaLarga, formatearMoneda } from "@/lib/format";
import {
  contarProyectosPorEstado,
  filtrarProyectosPorAnio,
  obtenerAniosProyectos,
  sumarMontoProyectos,
} from "@/lib/participacion/filtros";
import { crearMetadata } from "@/lib/seo/metadata";

export const metadata = crearMetadata({
  title: "Presupuesto participativo",
  description:
    "Etapas, proyectos priorizados y documentos del presupuesto participativo de la Municipalidad Distrital de Los Olivos.",
  path: "/participacion-vecinal/presupuesto-participativo",
});

const variantePorEstado = {
  priorizado: "secondary",
  "en-ejecucion": "default",
  culminado: "outline",
} as const;

export default async function PresupuestoParticipativoPage() {
  const participacion = await obtenerParticipacionVecinal();
  const anios = obtenerAniosProyectos(participacion.proyectos);
  const anioActual = anios[0] ?? 2026;
  const proyectosActuales = filtrarProyectosPorAnio(participacion.proyectos, anioActual);
  const estados = contarProyectosPorEstado(proyectosActuales);
  const monto = sumarMontoProyectos(proyectosActuales);

  return (
    <>
      <PageHero
        eyebrow="Participación vecinal"
        title="Presupuesto participativo"
        description="Proceso anual en el que las organizaciones vecinales identifican, priorizan y dan seguimiento a los proyectos de inversión del distrito."
        migajas={[
          { nombre: "Inicio", href: "/" },
          { nombre: "Participación vecinal", href: "/participacion-vecinal" },
          { nombre: "Presupuesto participativo" },
        ]}
      >
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">Proceso {anioActual}</Badge>
          <Badge variant="secondary">{proyectosActuales.length} proyectos</Badge>
          <Button asChild variant="outline">
            <Link href="/participacion-vecinal/codisec">Conocer el CODISE</Link>
          </Button>
        </div>
      </PageHero>

      <div className="py-10">
        <Container className="space-y-12">
          <section aria-label="Indicadores del presupuesto participativo">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <TarjetaIndicador
                titulo="Proyectos priorizados"
                valor={String(proyectosActuales.length)}
                detalle={`Proceso ${anioActual}`}
                icono={<Landmark className="size-5" aria-hidden="true" />}
              />
              <TarjetaIndicador
                titulo="Monto priorizado"
                valor={formatearMoneda(monto)}
                detalle="Inversión comprometida"
                icono={<Wallet className="size-5" aria-hidden="true" />}
              />
              <TarjetaIndicador
                titulo="En ejecución"
                valor={String(estados["en-ejecucion"])}
                detalle="Proyectos en obra"
                icono={<Building2 className="size-5" aria-hidden="true" />}
              />
              <TarjetaIndicador
                titulo="Culminados"
                valor={String(estados.culminado)}
                detalle="Proyectos entregados"
                icono={<Building2 className="size-5" aria-hidden="true" />}
              />
            </div>
          </section>

          <section aria-label="Etapas del proceso">
            <SectionHeading
              eyebrow="Cronograma"
              title="Etapas del proceso"
              description="Fases del presupuesto participativo del presente año y sus fechas de referencia."
              className="mb-6"
            />
            <TimelineEtapas etapas={participacion.etapas} />
          </section>

          {anios.map((anio) => {
            const proyectos = filtrarProyectosPorAnio(participacion.proyectos, anio);
            if (proyectos.length === 0) return null;

            return (
              <section
                key={anio}
                aria-label={`Proyectos del presupuesto participativo ${anio}`}
              >
                <SectionHeading
                  eyebrow="Proyectos"
                  title={`Proyectos ${anio}`}
                  description="Proyectos priorizados por las organizaciones vecinales y su estado de ejecución."
                  className="mb-6"
                />
                <Table>
                  <TableCaption>
                    Proyectos del presupuesto participativo {anio} (montos en soles)
                  </TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Proyecto</TableHead>
                      <TableHead>Zona</TableHead>
                      <TableHead className="text-right">Monto</TableHead>
                      <TableHead>Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {proyectos.map((proyecto) => (
                      <TableRow key={proyecto.id}>
                        <TableCell className="font-medium text-brand-dark">
                          {proyecto.nombre}
                        </TableCell>
                        <TableCell>{proyecto.zona}</TableCell>
                        <TableCell className="text-right whitespace-nowrap">
                          {formatearMoneda(proyecto.monto)}
                        </TableCell>
                        <TableCell>
                          <Badge variant={variantePorEstado[proyecto.estado]}>
                            {etiquetasEstadoProyectoParticipativo[proyecto.estado]}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </section>
            );
          })}

          <section aria-label="Documentos del presupuesto participativo">
            <SectionHeading
              eyebrow="Documentos"
              title="Documentos del proceso"
              description="Convocatorias, actas y reglamentos que respaldan el proceso participativo."
              className="mb-6"
            />
            <ul className="grid gap-3 sm:grid-cols-2">
              {participacion.documentos.map((documento) => (
                <li key={documento.id}>
                  <a
                    href={documento.archivoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-full items-start justify-between gap-3 rounded-xl border bg-card p-4 text-sm shadow-xs hover:shadow-md"
                  >
                    <span>
                      <span className="block font-medium text-brand-dark">
                        {documento.titulo}
                      </span>
                      <span className="mt-1 block text-xs text-muted-foreground">
                        {formatearFechaLarga(documento.fecha)}
                      </span>
                    </span>
                    <Download
                      className="mt-1 size-4 shrink-0 text-brand"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <div className="rounded-xl border bg-brand-soft/50 p-6">
            <h2 className="text-lg font-semibold text-brand-dark">
              Participa en la siguiente convocatoria
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Coordina con tu junta vecinal y participa en los talleres de identificación
              de problemas. El CODISE articula las propuestas de la sociedad civil con la
              gestión municipal.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button asChild>
                <Link href="/participacion-vecinal/codisec">
                  <Handshake className="size-4" aria-hidden="true" />
                  Ver el CODISE
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/contacto">
                  Contactar a la municipalidad
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="border-t pt-5">
            <Link
              href="/participacion-vecinal"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-strong hover:underline"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Volver a participación vecinal
            </Link>
          </div>
        </Container>
      </div>
    </>
  );
}
