"use client";

import { useMemo, useState } from "react";
import { Download, FileText } from "lucide-react";
import { EmptyState } from "@/components/shared/empty-state";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { DocumentoGestion, TipoDocumentoGestion } from "@/lib/api/types";
import {
  descripcionesTipoDocumentoGestion,
  etiquetasTipoDocumentoGestion,
} from "@/lib/constants/etiquetas";
import { formatearFecha } from "@/lib/format";
import { filtrarDocumentos } from "@/lib/institucional/filtros";

type FiltroDocumento = TipoDocumentoGestion | "todos";

export function DocumentosGestion({ documentos }: { documentos: DocumentoGestion[] }) {
  const [filtro, setFiltro] = useState<FiltroDocumento>("todos");

  const tiposDisponibles = useMemo(() => {
    const tipos = new Set(documentos.map((documento) => documento.tipo));
    return [...tipos].sort((a, b) =>
      etiquetasTipoDocumentoGestion[a].localeCompare(
        etiquetasTipoDocumentoGestion[b],
        "es",
      ),
    );
  }, [documentos]);

  return (
    <Tabs
      value={filtro}
      onValueChange={(valor) => setFiltro(valor as FiltroDocumento)}
      className="gap-5"
    >
      <div className="-mx-1 overflow-x-auto px-1 pb-1">
        <TabsList variant="line" className="h-auto flex-nowrap">
          <TabsTrigger value="todos" className="h-10 px-3">
            Todos
          </TabsTrigger>
          {tiposDisponibles.map((tipo) => (
            <TabsTrigger key={tipo} value={tipo} className="h-10 px-3">
              {etiquetasTipoDocumentoGestion[tipo]}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {(["todos", ...tiposDisponibles] as FiltroDocumento[]).map((tipo) => {
        const lista = filtrarDocumentos(documentos, tipo);

        return (
          <TabsContent key={tipo} value={tipo}>
            {lista.length === 0 ? (
              <EmptyState
                titulo="Aún no hay documentos de este tipo"
                descripcion="Los documentos se publican a medida que la oficina responsable los aprueba."
              />
            ) : (
              <ul className="space-y-3">
                {lista.map((documento) => (
                  <li key={documento.id}>
                    <article className="flex flex-col gap-4 rounded-xl border bg-card p-4 shadow-xs sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex min-w-0 items-start gap-3">
                        <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand-strong">
                          <FileText className="size-5" aria-hidden="true" />
                        </span>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge variant="secondary">
                              {etiquetasTipoDocumentoGestion[documento.tipo]}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              Actualizado el {formatearFecha(documento.actualizado)}
                            </span>
                          </div>
                          <h2 className="mt-1.5 text-base leading-snug font-semibold text-brand-dark">
                            {documento.titulo}
                          </h2>
                          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                            {documento.descripcion}
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {descripcionesTipoDocumentoGestion[documento.tipo]} ·{" "}
                            {documento.anio}
                          </p>
                        </div>
                      </div>

                      <Button asChild variant="outline" className="shrink-0">
                        <a href={documento.archivoUrl} download>
                          <Download className="size-4" aria-hidden="true" />
                          Descargar PDF
                          <span className="sr-only">: {documento.titulo}</span>
                        </a>
                      </Button>
                    </article>
                  </li>
                ))}
              </ul>
            )}
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
