import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  CalendarDays,
  CheckCircle2,
  Download,
  FileText,
  Send,
  Users,
  Wallet,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/shared/page-hero";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { obtenerConvocatoriaPorSlug, obtenerConvocatorias } from "@/lib/api/contenido";
import {
  etiquetasEstadoConvocatoria,
  etiquetasTipoConvocatoria,
} from "@/lib/constants/etiquetas";
import { obtenerFechaActual } from "@/lib/fechas";
import { formatearFecha, formatearFechaLarga, formatearMoneda } from "@/lib/format";
import {
  agregarEstadoConvocatorias,
  obtenerEstadoConvocatoria,
} from "@/lib/participacion/filtros";
import { crearMetadata } from "@/lib/seo/metadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const variantePorEstado = {
  proxima: "secondary",
  vigente: "default",
  cerrada: "outline",
} as const;

export async function generateStaticParams() {
  const convocatorias = await obtenerConvocatorias();
  return convocatorias.map((convocatoria) => ({ slug: convocatoria.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const convocatoria = await obtenerConvocatoriaPorSlug(slug);

  if (!convocatoria) {
    return crearMetadata({
      title: "Convocatoria no encontrada",
      path: `/convocatorias/${slug}`,
      noIndex: true,
    });
  }

  return crearMetadata({
    title: convocatoria.titulo,
    description: convocatoria.descripcion,
    path: `/convocatorias/${convocatoria.slug}`,
  });
}

export default async function ConvocatoriaPage({ params }: PageProps) {
  const { slug } = await params;
  const [convocatoria, convocatorias, hoy] = await Promise.all([
    obtenerConvocatoriaPorSlug(slug),
    obtenerConvocatorias(),
    obtenerFechaActual(),
  ]);

  if (!convocatoria) notFound();

  const estado = obtenerEstadoConvocatoria(convocatoria, hoy);
  const otras = agregarEstadoConvocatorias(
    convocatorias.filter((item) => item.id !== convocatoria.id),
    hoy,
  )
    .sort((a, b) => b.publicacion.localeCompare(a.publicacion))
    .slice(0, 4);

  const cronograma = [
    { titulo: "Publicación", fecha: convocatoria.publicacion },
    { titulo: "Cierre de postulación", fecha: convocatoria.cierre },
    ...(convocatoria.evaluacion
      ? [{ titulo: "Evaluación", fecha: convocatoria.evaluacion }]
      : []),
    ...(convocatoria.resultado
      ? [{ titulo: "Resultados", fecha: convocatoria.resultado }]
      : []),
  ];

  return (
    <>
      <PageHero
        eyebrow="Convocatorias"
        title={convocatoria.titulo}
        description={convocatoria.descripcion}
        migajas={[
          { nombre: "Inicio", href: "/" },
          { nombre: "Convocatorias", href: "/convocatorias" },
          { nombre: convocatoria.titulo },
        ]}
      >
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={variantePorEstado[estado]}>
            {etiquetasEstadoConvocatoria[estado]}
          </Badge>
          <Badge variant="outline">{etiquetasTipoConvocatoria[convocatoria.tipo]}</Badge>
          <Badge variant="secondary">{convocatoria.area}</Badge>
        </div>
      </PageHero>

      <div className="py-10">
        <Container className="grid gap-8 lg:grid-cols-[1fr_20rem]">
          <div className="space-y-8">
            {estado === "cerrada" ? (
              <Alert>
                <AlertTitle>Esta convocatoria ya cerró</AlertTitle>
                <AlertDescription>
                  El plazo de postulación terminó. La información se mantiene disponible
                  para consulta y los resultados se publican en la sección de
                  convocatorias.
                </AlertDescription>
              </Alert>
            ) : null}

            {estado === "proxima" ? (
              <Alert>
                <AlertTitle>Postulaciones próximas a abrir</AlertTitle>
                <AlertDescription>
                  Las postulaciones se recibirán desde el{" "}
                  {formatearFechaLarga(convocatoria.publicacion)} hasta el{" "}
                  {formatearFechaLarga(convocatoria.cierre)}. Revisa las bases para
                  preparar tus documentos.
                </AlertDescription>
              </Alert>
            ) : null}

            <section aria-label="Requisitos de la convocatoria">
              <h2 className="text-lg font-semibold text-brand-dark">Requisitos</h2>
              <ul className="mt-3 space-y-3 rounded-xl border bg-card p-5 shadow-xs">
                {convocatoria.requisitos.map((requisito) => (
                  <li key={requisito} className="flex items-start gap-2 text-sm">
                    <CheckCircle2
                      className="mt-0.5 size-4 shrink-0 text-brand"
                      aria-hidden="true"
                    />
                    <span className="leading-relaxed text-muted-foreground">
                      {requisito}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-label="Funciones del puesto">
              <h2 className="text-lg font-semibold text-brand-dark">Funciones</h2>
              <ul className="mt-3 space-y-3">
                {convocatoria.funciones.map((funcion) => (
                  <li key={funcion} className="flex items-start gap-2 text-sm">
                    <Briefcase
                      className="mt-0.5 size-4 shrink-0 text-brand"
                      aria-hidden="true"
                    />
                    <span className="leading-relaxed text-muted-foreground">
                      {funcion}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-label="Cronograma de la convocatoria">
              <h2 className="text-lg font-semibold text-brand-dark">Cronograma</h2>
              <ol className="mt-3 space-y-3">
                {cronograma.map((etapa, indice) => (
                  <li
                    key={etapa.titulo}
                    className="flex items-center justify-between gap-3 rounded-xl border bg-card p-4 text-sm shadow-xs"
                  >
                    <span className="flex items-center gap-3">
                      <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-soft text-xs font-bold text-brand-strong">
                        {indice + 1}
                      </span>
                      <span className="font-medium text-brand-dark">{etapa.titulo}</span>
                    </span>
                    <time
                      dateTime={etapa.fecha}
                      className="text-xs text-muted-foreground"
                    >
                      {formatearFechaLarga(etapa.fecha)}
                    </time>
                  </li>
                ))}
              </ol>
            </section>

            {convocatoria.resultadoUrl ? (
              <section aria-label="Resultados de la convocatoria">
                <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border bg-card p-5 shadow-xs">
                  <div>
                    <h2 className="text-base font-semibold text-brand-dark">
                      Resultados del proceso
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Consulta el documento con los resultados oficiales.
                    </p>
                  </div>
                  <Button asChild variant="outline">
                    <a
                      href={convocatoria.resultadoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FileText className="size-4" aria-hidden="true" />
                      Ver resultados
                    </a>
                  </Button>
                </div>
              </section>
            ) : null}

            <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-5">
              <Link
                href="/convocatorias"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-strong hover:underline"
              >
                <ArrowLeft className="size-4" aria-hidden="true" />
                Volver a convocatorias
              </Link>
              {estado === "vigente" ? (
                <Button asChild>
                  <Link href="/mesa-de-partes">
                    Presentar postulación
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </Button>
              ) : null}
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-xl border bg-card p-5 shadow-xs">
              <h2 className="text-base font-semibold text-brand-dark">
                Datos de la convocatoria
              </h2>
              <dl className="mt-4 space-y-4 text-sm">
                <div>
                  <dt className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    <Users className="size-4 text-brand" aria-hidden="true" />
                    Vacantes
                  </dt>
                  <dd className="mt-1 text-brand-dark">
                    {convocatoria.vacantes}{" "}
                    {convocatoria.vacantes === 1 ? "vacante" : "vacantes"}
                  </dd>
                </div>
                {convocatoria.remuneracion ? (
                  <div>
                    <dt className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      <Wallet className="size-4 text-brand" aria-hidden="true" />
                      Remuneración
                    </dt>
                    <dd className="mt-1 text-brand-dark">
                      {formatearMoneda(convocatoria.remuneracion)}
                    </dd>
                  </div>
                ) : null}
                <div>
                  <dt className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    <CalendarDays className="size-4 text-brand" aria-hidden="true" />
                    Cierre de postulación
                  </dt>
                  <dd className="mt-1 text-brand-dark">
                    {formatearFecha(convocatoria.cierre)}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    Estado
                  </dt>
                  <dd className="mt-1">
                    <Badge variant={variantePorEstado[estado]}>
                      {etiquetasEstadoConvocatoria[estado]}
                    </Badge>
                  </dd>
                </div>
              </dl>
              <div className="mt-5 flex flex-col gap-2 border-t pt-4">
                <Button asChild className="h-11">
                  <a
                    href={convocatoria.basesUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download className="size-4" aria-hidden="true" />
                    Descargar bases
                  </a>
                </Button>
                {estado === "vigente" ? (
                  <Button asChild variant="outline" className="h-11">
                    <Link href="/mesa-de-partes">
                      <Send className="size-4" aria-hidden="true" />
                      Postular en línea
                    </Link>
                  </Button>
                ) : (
                  <Button asChild variant="outline" className="h-11">
                    <Link href="/convocatorias">Ver convocatorias abiertas</Link>
                  </Button>
                )}
              </div>
            </div>

            {otras.length > 0 ? (
              <section aria-label="Otras convocatorias">
                <h2 className="text-base font-semibold text-brand-dark">
                  Otras convocatorias
                </h2>
                <ul className="mt-3 space-y-2">
                  {otras.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={`/convocatorias/${item.slug}`}
                        className="flex items-center justify-between gap-3 rounded-xl border bg-card p-3 text-sm shadow-xs hover:shadow-md"
                      >
                        <span>
                          <span className="block font-medium text-brand-dark">
                            {item.titulo}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {etiquetasEstadoConvocatoria[item.estado]} ·{" "}
                            {formatearFecha(item.cierre)}
                          </span>
                        </span>
                        <ArrowRight
                          className="size-4 shrink-0 text-brand"
                          aria-hidden="true"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </aside>
        </Container>
      </div>
    </>
  );
}
