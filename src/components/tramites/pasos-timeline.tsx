import type { PasoTramite } from "@/lib/api/types";

export function PasosTimeline({ pasos }: { pasos: PasoTramite[] }) {
  return (
    <ol className="relative space-y-5 border-l border-border pl-6">
      {pasos.map((paso, indice) => (
        <li key={`${paso.titulo}-${indice}`} className="relative">
          <span
            aria-hidden="true"
            className="absolute top-0.5 -left-9 inline-flex size-6 items-center justify-center rounded-full bg-brand text-xs font-bold text-primary-foreground"
          >
            {indice + 1}
          </span>
          <h3 className="text-sm font-semibold text-brand-dark">{paso.titulo}</h3>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {paso.descripcion}
          </p>
        </li>
      ))}
    </ol>
  );
}
