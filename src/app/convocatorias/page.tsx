import Link from "next/link";
import { Briefcase, CalendarClock, Info, Send } from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { CatalogoConvocatorias } from "@/components/participacion/catalogo-convocatorias";
import { ConvocatoriaCard } from "@/components/participacion/convocatoria-card";
import { EmptyState } from "@/components/shared/empty-state";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { obtenerConvocatorias } from "@/lib/api/contenido";
import { obtenerFechaActual } from "@/lib/fechas";
import {
  agregarEstadoConvocatorias,
  contarConvocatoriasPorEstado,
} from "@/lib/participacion/filtros";
import { crearMetadata } from "@/lib/seo/metadata";

export const metadata = crearMetadata({
  title: "Convocatorias",
  description:
    "Convocatorias CAS, prácticas profesionales, locaciones y consultorías de la Municipalidad Distrital de Los Olivos.",
  path: "/convocatorias",
});

const ordenEstado = { vigente: 0, proxima: 1, cerrada: 2 } as const;

export default async function ConvocatoriasPage() {
  const [convocatorias, hoy] = await Promise.all([
    obtenerConvocatorias(),
    obtenerFechaActual(),
  ]);
  const conEstado = agregarEstadoConvocatorias(convocatorias, hoy);
  const conteo = contarConvocatoriasPorEstado(conEstado);

  const vigentes = conEstado.filter((convocatoria) => convocatoria.estado === "vigente");
  const proximas = conEstado.filter((convocatoria) => convocatoria.estado === "proxima");
  const ordenadas = [...conEstado].sort(
    (a, b) =>
      ordenEstado[a.estado] - ordenEstado[b.estado] ||
      b.publicacion.localeCompare(a.publicacion),
  );

  return (
    <>
      <PageHero
        eyebrow="Oportunidades"
        title="Convocatorias"
        description="Procesos de selección de personal y servicios convocados por la municipalidad. Revisa los requisitos, plazos y bases de cada convocatoria."
        migajas={[{ nombre: "Inicio", href: "/" }, { nombre: "Convocatorias" }]}
      >
        <div className="flex flex-wrap items-center gap-2">
          <Badge>
            {conteo.vigente} {conteo.vigente === 1 ? "vigente" : "vigentes"}
          </Badge>
          {conteo.proxima > 0 ? (
            <Badge variant="secondary">{conteo.proxima} próximas</Badge>
          ) : null}
          <Badge variant="outline">{conteo.cerrada} cerradas</Badge>
          <Button asChild variant="outline">
            <Link href="/mesa-de-partes">
              <Send className="size-4" aria-hidden="true" />
              Presentar postulación
            </Link>
          </Button>
        </div>
      </PageHero>

      <div className="py-10">
        <Container className="space-y-12">
          <section aria-label="Convocatorias vigentes">
            <SectionHeading
              eyebrow="Ahora"
              title="Convocatorias vigentes"
              description="Procesos que se encuentran recibiendo postulaciones."
              className="mb-6"
            />
            {vigentes.length > 0 ? (
              <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {vigentes.map((convocatoria) => (
                  <li key={convocatoria.id}>
                    <ConvocatoriaCard convocatoria={convocatoria} />
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState
                titulo="No hay convocatorias vigentes en este momento"
                descripcion="Revisa las próximas convocatorias o consulta las que ya cerraron."
              />
            )}
          </section>

          {proximas.length > 0 ? (
            <section aria-label="Próximas convocatorias">
              <SectionHeading
                eyebrow="Próximamente"
                title="Próximas convocatorias"
                description="Procesos que se publicarán en los próximos días."
                className="mb-6"
              />
              <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {proximas.map((convocatoria) => (
                  <li key={convocatoria.id}>
                    <ConvocatoriaCard convocatoria={convocatoria} />
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <section aria-label="Todas las convocatorias">
            <SectionHeading
              eyebrow="Archivo"
              title="Todas las convocatorias"
              description="Filtra por tipo, estado, año o palabra clave para encontrar un proceso."
              className="mb-6"
            />
            <CatalogoConvocatorias convocatorias={ordenadas} />
          </section>

          <Alert>
            <Info className="size-4" aria-hidden="true" />
            <AlertTitle>Proceso transparente</AlertTitle>
            <AlertDescription>
              Las bases, resultados y comunicados oficiales se publican en este portal y
              en la mesa de partes. La municipalidad no cobra por participar en las
              convocatorias.
            </AlertDescription>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button asChild size="sm">
                <Link href="/transparencia/contrataciones">Ver contrataciones</Link>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link href="/contacto">Consultas sobre convocatorias</Link>
              </Button>
            </div>
          </Alert>

          <div className="grid gap-4 rounded-xl border bg-brand-soft/50 p-6 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <Briefcase
                className="mt-0.5 size-5 shrink-0 text-brand"
                aria-hidden="true"
              />
              <div>
                <p className="font-medium text-brand-dark">Trabaja con nosotros</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Revisa las bases y presenta tu expediente dentro del plazo indicado.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CalendarClock
                className="mt-0.5 size-5 shrink-0 text-brand"
                aria-hidden="true"
              />
              <div>
                <p className="font-medium text-brand-dark">Fechas importantes</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  La publicación, evaluación y resultados se detallan en cada
                  convocatoria.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
