import type { EtapaPresupuestoParticipativo } from "@/lib/api/types";
import { formatearFechaLarga } from "@/lib/format";

export function TimelineEtapas({ etapas }: { etapas: EtapaPresupuestoParticipativo[] }) {
  return (
    <ol className="space-y-4">
      {etapas.map((etapa, indice) => (
        <li key={etapa.id} className="relative rounded-xl border bg-card p-5 shadow-xs">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
              {indice + 1}
            </span>
            <h3 className="text-base font-semibold text-brand-dark">{etapa.titulo}</h3>
            <time
              dateTime={etapa.fecha}
              className="ml-auto text-xs font-medium text-muted-foreground"
            >
              {formatearFechaLarga(etapa.fecha)}
            </time>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {etapa.descripcion}
          </p>
        </li>
      ))}
    </ol>
  );
}
