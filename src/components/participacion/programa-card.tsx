import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Programa } from "@/lib/api/types";
import { etiquetasCategoriaPrograma } from "@/lib/constants/etiquetas";

export function ProgramaCard({ programa }: { programa: Programa }) {
  return (
    <article className="flex h-full flex-col rounded-xl border bg-card p-5 shadow-xs">
      <Badge variant="secondary" className="self-start">
        {etiquetasCategoriaPrograma[programa.categoria]}
      </Badge>
      <h3 className="mt-3 text-base leading-snug font-semibold text-brand-dark">
        <Link href={`/programas/${programa.slug}`} className="hover:underline">
          {programa.nombre}
        </Link>
      </h3>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
        {programa.descripcion}
      </p>
      <p className="mt-3 flex items-start gap-1.5 text-xs text-muted-foreground">
        <Users className="mt-0.5 size-3.5 shrink-0 text-brand" aria-hidden="true" />
        <span className="line-clamp-2">{programa.dirigidoA}</span>
      </p>
      <div className="mt-auto pt-4">
        <Button asChild variant="outline" size="sm">
          <Link href={`/programas/${programa.slug}`}>
            Ver programa
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </article>
  );
}
