import type { ReactNode } from "react";
import { SearchX } from "lucide-react";

export function EmptyState({
  titulo,
  descripcion,
  children,
}: {
  titulo: string;
  descripcion?: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed bg-muted/40 px-6 py-12 text-center">
      <span className="inline-flex size-12 items-center justify-center rounded-full bg-brand-soft text-brand-strong">
        <SearchX className="size-6" aria-hidden="true" />
      </span>
      <p className="mt-2 font-semibold text-brand-dark">{titulo}</p>
      {descripcion ? (
        <p className="max-w-md text-sm text-muted-foreground">{descripcion}</p>
      ) : null}
      {children}
    </div>
  );
}
