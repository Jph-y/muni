import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function TarjetaIndicador({
  titulo,
  valor,
  detalle,
  icono,
  className,
}: {
  titulo: string;
  valor: string;
  detalle?: string;
  icono?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-xl border bg-card p-5 shadow-xs", className)}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            {titulo}
          </p>
          <p className="mt-2 text-2xl font-bold text-brand-dark">{valor}</p>
          {detalle ? (
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              {detalle}
            </p>
          ) : null}
        </div>
        {icono ? (
          <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand-strong">
            {icono}
          </span>
        ) : null}
      </div>
    </div>
  );
}
