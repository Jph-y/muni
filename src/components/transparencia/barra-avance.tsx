import { cn } from "@/lib/utils";

export function BarraAvance({
  valor,
  etiqueta,
  tono = "brand",
  className,
}: {
  valor: number;
  etiqueta?: string;
  tono?: "brand" | "amber";
  className?: string;
}) {
  const seguro = Math.min(100, Math.max(0, Math.round(valor)));

  return (
    <div className={cn("space-y-1.5", className)}>
      {etiqueta ? (
        <div className="flex items-center justify-between gap-2 text-xs">
          <span className="text-muted-foreground">{etiqueta}</span>
          <span className="font-semibold text-brand-dark">{seguro}%</span>
        </div>
      ) : null}
      <div
        role="progressbar"
        aria-valuenow={seguro}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={etiqueta ?? `Avance de ejecución: ${seguro}%`}
        className="h-2 w-full overflow-hidden rounded-full bg-muted"
      >
        <div
          className={cn(
            "h-full rounded-full transition-[width]",
            tono === "amber" ? "bg-amber-500" : "bg-brand",
          )}
          style={{ width: `${seguro}%` }}
        />
      </div>
    </div>
  );
}
