import Link from "next/link";
import { ArrowRight, Clock, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Servicio } from "@/lib/api/types";
import { etiquetasCategoriaServicio } from "@/lib/constants/etiquetas";

export function ServicioCard({ servicio }: { servicio: Servicio }) {
  return (
    <article className="flex h-full flex-col gap-3 rounded-xl border bg-card p-4 shadow-xs transition-shadow hover:shadow-md">
      <Badge variant="secondary">{etiquetasCategoriaServicio[servicio.categoria]}</Badge>

      <h2 className="text-base leading-snug font-semibold text-brand-dark">
        <Link href={`/servicios/${servicio.slug}`} className="hover:underline">
          {servicio.nombre}
        </Link>
      </h2>

      <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
        {servicio.descripcion}
      </p>

      <dl className="mt-auto space-y-1.5 border-t pt-3 text-sm">
        <div className="flex items-start gap-2">
          <dt className="sr-only">Dirigido a</dt>
          <Users className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
          <dd className="text-muted-foreground">{servicio.dirigidoA}</dd>
        </div>
        <div className="flex items-start gap-2">
          <dt className="sr-only">Sede</dt>
          <MapPin className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
          <dd className="text-muted-foreground">{servicio.sede}</dd>
        </div>
        {servicio.horario ? (
          <div className="flex items-start gap-2">
            <dt className="sr-only">Horario</dt>
            <Clock className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
            <dd className="text-muted-foreground">{servicio.horario}</dd>
          </div>
        ) : null}
      </dl>

      <Link
        href={`/servicios/${servicio.slug}`}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-strong hover:underline"
      >
        Conocer el servicio
        <ArrowRight className="size-4" aria-hidden="true" />
        <span className="sr-only">: {servicio.nombre}</span>
      </Link>
    </article>
  );
}
