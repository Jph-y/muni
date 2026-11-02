import Link from "next/link";
import { ArrowRight, Download, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Norma } from "@/lib/api/types";
import { etiquetasTipoNorma } from "@/lib/constants/etiquetas";
import { formatearFecha } from "@/lib/format";

export function NormaCard({ norma }: { norma: Norma }) {
  return (
    <article className="flex h-full flex-col gap-3 rounded-xl border bg-card p-4 shadow-xs transition-shadow hover:shadow-md">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="secondary">{etiquetasTipoNorma[norma.tipo]}</Badge>
        <span className="text-xs text-muted-foreground">
          <time dateTime={norma.fecha}>{formatearFecha(norma.fecha)}</time>
        </span>
      </div>

      <h3 className="text-base leading-snug font-semibold text-brand-dark">
        <Link href={`/normas/${norma.slug}`} className="hover:underline">
          {norma.titulo}
        </Link>
      </h3>

      <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
        {norma.resumen}
      </p>

      <div className="mt-auto flex flex-wrap items-center gap-2 border-t pt-3">
        <Button asChild variant="ghost" size="sm" className="px-2">
          <Link href={`/normas/${norma.slug}`}>
            <FileText className="size-4" aria-hidden="true" />
            Ver norma
            <span className="sr-only">: {norma.numero}</span>
          </Link>
        </Button>
        {norma.archivoUrl ? (
          <Button asChild variant="outline" size="sm" className="px-2">
            <a href={norma.archivoUrl} download>
              <Download className="size-4" aria-hidden="true" />
              PDF
              <span className="sr-only"> de la norma {norma.numero}</span>
            </a>
          </Button>
        ) : null}
        <Link
          href={`/normas/${norma.slug}`}
          className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-brand-strong hover:underline"
        >
          Detalle
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
