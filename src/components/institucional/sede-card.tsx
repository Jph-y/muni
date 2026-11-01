import Link from "next/link";
import { ArrowRight, Clock, MapPin, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Sede } from "@/lib/api/types";

export function SedeCard({ sede }: { sede: Sede }) {
  return (
    <article className="flex h-full flex-col gap-3 rounded-xl border bg-card p-5 shadow-xs transition-shadow hover:shadow-md">
      <div className="flex flex-wrap items-center gap-2">
        <h2 className="text-lg font-semibold text-brand-dark">
          <Link href={`/institucional/sedes/${sede.slug}`} className="hover:underline">
            {sede.nombre}
          </Link>
        </h2>
        {sede.principal ? <Badge variant="secondary">Sede principal</Badge> : null}
      </div>

      <p className="flex items-start gap-2 text-sm text-muted-foreground">
        <MapPin className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
        {sede.direccion}
      </p>
      <p className="flex items-start gap-2 text-sm text-muted-foreground">
        <Clock className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
        {sede.horario}
      </p>
      <p className="flex items-start gap-2 text-sm text-muted-foreground">
        <Phone className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
        <a
          href={`tel:${sede.telefono.replace(/[^\d+]/g, "")}`}
          className="hover:underline"
        >
          {sede.telefono}
        </a>
      </p>

      <ul className="mt-1 flex flex-wrap gap-1.5" aria-label="Servicios disponibles">
        {sede.servicios.slice(0, 3).map((servicio) => (
          <li
            key={servicio}
            className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground"
          >
            {servicio}
          </li>
        ))}
        {sede.servicios.length > 3 ? (
          <li className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
            +{sede.servicios.length - 3} más
          </li>
        ) : null}
      </ul>

      <Link
        href={`/institucional/sedes/${sede.slug}`}
        className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-brand-strong hover:underline"
      >
        Ver detalle de la sede
        <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
    </article>
  );
}
