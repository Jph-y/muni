"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { EmptyState } from "@/components/shared/empty-state";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { PreguntaFrecuente } from "@/lib/api/types";
import { etiquetasCategoriaFaq } from "@/lib/constants/etiquetas";
import { agruparPreguntasPorCategoria, filtrarPreguntas } from "@/lib/tramites/filtros";

export function AcordeonFaq({ preguntas }: { preguntas: PreguntaFrecuente[] }) {
  const idBusqueda = useId();
  const [texto, setTexto] = useState("");

  const resultados = useMemo(
    () => filtrarPreguntas(preguntas, texto),
    [preguntas, texto],
  );
  const grupos = useMemo(() => agruparPreguntasPorCategoria(resultados), [resultados]);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border bg-card p-4 shadow-xs sm:p-5">
        <div className="max-w-xl space-y-2">
          <Label htmlFor={idBusqueda}>Buscar en las preguntas frecuentes</Label>
          <div className="relative">
            <Search
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              id={idBusqueda}
              type="search"
              value={texto}
              onChange={(evento) => setTexto(evento.target.value)}
              placeholder="Ej. mesa de partes, predial, cita"
              className="h-11 pl-9"
              autoComplete="off"
            />
          </div>
        </div>
        <p
          className="mt-4 text-sm text-muted-foreground"
          role="status"
          aria-live="polite"
        >
          {resultados.length}{" "}
          {resultados.length === 1 ? "pregunta encontrada" : "preguntas encontradas"}
        </p>
      </div>

      {grupos.length === 0 ? (
        <EmptyState
          titulo="No encontramos una respuesta para tu búsqueda"
          descripcion="Intenta con otras palabras o comunícate con la central telefónica. También puedes revisar el catálogo de trámites."
        >
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            <Button asChild variant="outline">
              <Link href="/tramites">Ver trámites</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/contacto">Contactar</Link>
            </Button>
          </div>
        </EmptyState>
      ) : (
        <div className="space-y-8">
          {grupos.map((grupo) => (
            <section key={grupo.categoria} aria-labelledby={`faq-${grupo.categoria}`}>
              <h2
                id={`faq-${grupo.categoria}`}
                className="mb-3 text-lg font-semibold text-brand-dark"
              >
                {etiquetasCategoriaFaq[grupo.categoria]}
              </h2>
              <Accordion type="multiple" className="rounded-xl border bg-card px-4">
                {grupo.preguntas.map((pregunta) => (
                  <AccordionItem key={pregunta.id} value={pregunta.id}>
                    <AccordionTrigger className="text-left text-sm font-semibold text-brand-dark hover:no-underline">
                      {pregunta.pregunta}
                    </AccordionTrigger>
                    <AccordionContent className="space-y-2 text-sm leading-relaxed text-muted-foreground">
                      {pregunta.respuesta.map((parrafo) => (
                        <p key={parrafo}>{parrafo}</p>
                      ))}
                      {pregunta.enlaces?.length ? (
                        <ul className="space-y-1 pt-1">
                          {pregunta.enlaces.map((enlace) => (
                            <li key={enlace.href}>
                              <Link
                                href={enlace.href}
                                className="font-semibold text-brand-strong hover:underline"
                              >
                                {enlace.nombre}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
