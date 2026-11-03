"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { ProgramaCard } from "@/components/participacion/programa-card";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { CategoriaPrograma, Programa } from "@/lib/api/types";
import { etiquetasCategoriaPrograma } from "@/lib/constants/etiquetas";
import {
  contarProgramasPorCategoria,
  filtrarProgramas,
  type FiltroCategoriaPrograma,
} from "@/lib/participacion/filtros";

export function CatalogoProgramas({ programas }: { programas: Programa[] }) {
  const idBusqueda = useId();
  const idCategoria = useId();
  const [texto, setTexto] = useState("");
  const [categoria, setCategoria] = useState<FiltroCategoriaPrograma>("todas");

  const conteo = useMemo(() => contarProgramasPorCategoria(programas), [programas]);
  const resultados = useMemo(
    () => filtrarProgramas(programas, { texto, categoria }),
    [programas, texto, categoria],
  );

  const hayFiltros = texto.trim().length > 0 || categoria !== "todas";

  return (
    <div className="space-y-6">
      <div className="rounded-xl border bg-card p-4 shadow-xs sm:p-5">
        <div className="grid gap-4 md:grid-cols-[1fr_16rem]">
          <div className="space-y-2">
            <Label htmlFor={idBusqueda}>Buscar programas</Label>
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
                placeholder="Ej. Vaso de Leche, DEMUNA o adulto mayor"
                className="h-11 pl-9"
                autoComplete="off"
              />
            </div>
          </div>

          <div className="space-y-2">
            <p id={idCategoria} className="text-sm leading-none font-medium">
              Categoría
            </p>
            <Select
              value={categoria}
              onValueChange={(valor) => setCategoria(valor as FiltroCategoriaPrograma)}
            >
              <SelectTrigger aria-labelledby={idCategoria} className="h-11 w-full">
                <SelectValue placeholder="Todas las categorías" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas las categorías</SelectItem>
                {(Object.keys(conteo) as CategoriaPrograma[]).map((item) => (
                  <SelectItem key={item} value={item}>
                    {etiquetasCategoriaPrograma[item]} ({conteo[item]})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground" role="status" aria-live="polite">
            {resultados.length}{" "}
            {resultados.length === 1 ? "programa encontrado" : "programas encontrados"}
          </p>
          {hayFiltros ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setTexto("");
                setCategoria("todas");
              }}
            >
              Limpiar filtros
            </Button>
          ) : null}
        </div>
      </div>

      {resultados.length === 0 ? (
        <EmptyState
          titulo="No encontramos programas con esos filtros"
          descripcion="Prueba con otra palabra clave o categoría. También puedes revisar todos los programas sociales vigentes."
        >
          <Button asChild variant="outline" className="mt-3">
            <Link href="/programas">Ver todos los programas</Link>
          </Button>
        </EmptyState>
      ) : (
        <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {resultados.map((programa) => (
            <li key={programa.id}>
              <ProgramaCard programa={programa} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
