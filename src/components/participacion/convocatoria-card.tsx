import Link from "next/link";
import { ArrowRight, CalendarDays, Download, Users, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ConvocatoriaConEstado } from "@/lib/participacion/filtros";
import {
  etiquetasEstadoConvocatoria,
  etiquetasTipoConvocatoria,
} from "@/lib/constants/etiquetas";
import { formatearFecha, formatearMoneda } from "@/lib/format";

const variantePorEstado = {
  proxima: "secondary",
  vigente: "default",
  cerrada: "outline",
} as const;

export function ConvocatoriaCard({
  convocatoria,
}: {
  convocatoria: ConvocatoriaConEstado;
}) {
  return (
    <article className="flex h-full flex-col rounded-xl border bg-card p-5 shadow-xs">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant={variantePorEstado[convocatoria.estado]}>
          {etiquetasEstadoConvocatoria[convocatoria.estado]}
        </Badge>
        <Badge variant="outline">{etiquetasTipoConvocatoria[convocatoria.tipo]}</Badge>
      </div>

      <h3 className="mt-3 text-base leading-snug font-semibold text-brand-dark">
        <Link href={`/convocatorias/${convocatoria.slug}`} className="hover:underline">
          {convocatoria.titulo}
        </Link>
      </h3>
      <p className="mt-1 text-xs font-medium text-muted-foreground">
        {convocatoria.area}
      </p>

      <dl className="mt-4 grid gap-2 text-sm">
        <div className="flex items-center gap-1.5">
          <Users className="size-3.5 shrink-0 text-brand" aria-hidden="true" />
          <dt className="sr-only">Vacantes</dt>
          <dd>
            {convocatoria.vacantes} {convocatoria.vacantes === 1 ? "vacante" : "vacantes"}
          </dd>
        </div>
        {convocatoria.remuneracion ? (
          <div className="flex items-center gap-1.5">
            <Wallet className="size-3.5 shrink-0 text-brand" aria-hidden="true" />
            <dt className="sr-only">Remuneración</dt>
            <dd>{formatearMoneda(convocatoria.remuneracion)}</dd>
          </div>
        ) : null}
        <div className="flex items-center gap-1.5">
          <CalendarDays className="size-3.5 shrink-0 text-brand" aria-hidden="true" />
          <dt className="sr-only">Cierre de postulación</dt>
          <dd>Cierra el {formatearFecha(convocatoria.cierre)}</dd>
        </div>
      </dl>

      <div className="mt-auto flex flex-wrap gap-2 pt-4">
        <Button asChild size="sm">
          <Link href={`/convocatorias/${convocatoria.slug}`}>
            Ver detalle
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Button>
        <Button asChild variant="outline" size="sm">
          <a
            href={convocatoria.basesUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Descargar las bases de ${convocatoria.titulo}`}
          >
            <Download className="size-4" aria-hidden="true" />
            Bases
          </a>
        </Button>
      </div>
    </article>
  );
}
