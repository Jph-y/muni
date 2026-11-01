import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import type { Norma } from "@/lib/api/types";
import { etiquetasTipoNorma } from "@/lib/constants/etiquetas";
import { formatearFecha } from "@/lib/format";

export function NormsList({ normas }: { normas: Norma[] }) {
  return (
    <section className="py-10" aria-labelledby="normas-recientes">
      <Container>
        <SectionHeading
          eyebrow="Normativa"
          title="Normas y documentos recientes"
          description="Ordenanzas, decretos, acuerdos y resoluciones publicadas por la municipalidad."
          href="/normas"
          hrefLabel="Ver todas las normas"
          className="mb-6"
        />
        <h2 id="normas-recientes" className="sr-only">
          Normas recientes
        </h2>

        <ul className="divide-y rounded-xl border bg-card shadow-xs">
          {normas.slice(0, 5).map((norma) => (
            <li key={norma.id}>
              <Link
                href={`/normas/${norma.slug}`}
                className="group flex flex-col gap-2 p-4 transition-colors hover:bg-brand-soft/50 sm:flex-row sm:items-start sm:gap-4"
              >
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand-strong">
                  <FileText className="size-5" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
                      {etiquetasTipoNorma[norma.tipo]}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatearFecha(norma.fecha)}
                    </span>
                  </span>
                  <span className="mt-1.5 block text-sm font-semibold text-brand-dark group-hover:underline">
                    {norma.titulo}
                  </span>
                  <span className="mt-1 line-clamp-2 block text-sm leading-relaxed text-muted-foreground">
                    {norma.resumen}
                  </span>
                </span>
                <ArrowRight
                  className="hidden size-4 shrink-0 self-center text-brand-strong sm:block"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
