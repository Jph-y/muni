"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function construirPaginas(pagina: number, totalPaginas: number): (number | "…")[] {
  if (totalPaginas <= 7) {
    return Array.from({ length: totalPaginas }, (_, indice) => indice + 1);
  }

  const paginas = new Set<number>([1, totalPaginas, pagina - 1, pagina, pagina + 1]);
  const ordenadas = [...paginas]
    .filter((item) => item >= 1 && item <= totalPaginas)
    .sort((a, b) => a - b);

  const resultado: (number | "…")[] = [];

  ordenadas.forEach((item, indice) => {
    const anterior = ordenadas[indice - 1];
    if (anterior !== undefined && item - anterior > 1) {
      resultado.push("…");
    }
    resultado.push(item);
  });

  return resultado;
}

export function Paginacion({
  pagina,
  totalPaginas,
  onCambiarPagina,
  etiqueta = "resultados",
  className,
}: {
  pagina: number;
  totalPaginas: number;
  onCambiarPagina: (pagina: number) => void;
  etiqueta?: string;
  className?: string;
}) {
  if (totalPaginas <= 1) return null;

  return (
    <nav
      aria-label={`Paginación de ${etiqueta}`}
      className={cn("flex flex-wrap items-center justify-center gap-1", className)}
    >
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={() => onCambiarPagina(pagina - 1)}
        disabled={pagina <= 1}
        aria-label="Página anterior"
      >
        <ChevronLeft className="size-4" aria-hidden="true" />
      </Button>

      {construirPaginas(pagina, totalPaginas).map((item, indice) =>
        item === "…" ? (
          <span
            key={`separador-${indice}`}
            className="px-1 text-sm text-muted-foreground"
            aria-hidden="true"
          >
            …
          </span>
        ) : (
          <Button
            key={item}
            type="button"
            variant={item === pagina ? "default" : "outline"}
            size="icon"
            onClick={() => onCambiarPagina(item)}
            aria-label={`Página ${item}`}
            aria-current={item === pagina ? "page" : undefined}
          >
            {item}
          </Button>
        ),
      )}

      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={() => onCambiarPagina(pagina + 1)}
        disabled={pagina >= totalPaginas}
        aria-label="Página siguiente"
      >
        <ChevronRight className="size-4" aria-hidden="true" />
      </Button>
    </nav>
  );
}
