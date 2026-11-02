import Link from "next/link";
import { ArrowRight, Banknote, CalendarClock, Landmark } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Tramite } from "@/lib/api/types";
import { etiquetasCategoriaTramite, etiquetasModalidad } from "@/lib/constants/etiquetas";
import { formatearMoneda } from "@/lib/format";

function formatearPlazo(plazoDias: number): string {
  if (plazoDias === 0) return "Atención inmediata";
  if (plazoDias === 1) return "1 día hábil";
  return `${plazoDias} días hábiles`;
}

export function TramiteCard({ tramite }: { tramite: Tramite }) {
  return (
    <article className="flex h-full flex-col gap-3 rounded-xl border bg-card p-4 shadow-xs transition-shadow hover:shadow-md">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="secondary">{etiquetasCategoriaTramite[tramite.categoria]}</Badge>
        <Badge variant="outline">{etiquetasModalidad[tramite.modalidad]}</Badge>
      </div>

      <h2 className="text-base leading-snug font-semibold text-brand-dark">
        <Link href={`/tramites/${tramite.slug}`} className="hover:underline">
          {tramite.nombre}
        </Link>
      </h2>

      <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
        {tramite.descripcion}
      </p>

      <dl className="mt-auto grid gap-1.5 border-t pt-3 text-sm">
        <div className="flex items-center gap-2">
          <dt className="sr-only">Costo</dt>
          <Banknote className="size-4 shrink-0 text-brand" aria-hidden="true" />
          <dd className="font-semibold text-brand-dark">
            {tramite.costo === 0 ? "Gratuito" : formatearMoneda(tramite.costo)}
          </dd>
        </div>
        <div className="flex items-center gap-2">
          <dt className="sr-only">Plazo</dt>
          <CalendarClock className="size-4 shrink-0 text-brand" aria-hidden="true" />
          <dd className="text-muted-foreground">{formatearPlazo(tramite.plazoDias)}</dd>
        </div>
        <div className="flex items-center gap-2">
          <dt className="sr-only">Oficina responsable</dt>
          <Landmark className="size-4 shrink-0 text-brand" aria-hidden="true" />
          <dd className="truncate text-muted-foreground">{tramite.oficina}</dd>
        </div>
      </dl>

      <Link
        href={`/tramites/${tramite.slug}`}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-strong hover:underline"
      >
        Ver requisitos y pasos
        <ArrowRight className="size-4" aria-hidden="true" />
        <span className="sr-only">: {tramite.nombre}</span>
      </Link>
    </article>
  );
}
