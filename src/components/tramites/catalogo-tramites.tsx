"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { EmptyState } from "@/components/shared/empty-state";
import { TramiteCard } from "@/components/tramites/tramite-card";
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
import type { CategoriaTramite, Tramite } from "@/lib/api/types";
import { etiquetasCategoriaTramite } from "@/lib/constants/etiquetas";
import { contarTramitesPorCategoria, filtrarTramites } from "@/lib/tramites/filtros";

export function CatalogoTramites({
  tramites,
  categoriaInicial = "todas",
}: {
  tramites: Tramite[];
  categoriaInicial?: CategoriaTramite | "todas";
}) {
  const idBusqueda = useId();
  const idCategoria = useId();
  const [texto, setTexto] = useState("");
  const [categoria, setCategoria] = useState<CategoriaTramite | "todas">(
    categoriaInicial,
  );

  const conteo = useMemo(() => contarTramitesPorCategoria(tramites), [tramites]);
  const categoriasDisponibles = useMemo(
    () => (Object.keys(conteo) as CategoriaTramite[]).filter((item) => conteo[item] > 0),
    [conteo],
  );

  const resultados = useMemo(
    () => filtrarTramites(tramites, { texto, categoria }),
    [tramites, texto, categoria],
  );

  const hayFiltros = texto.trim().length > 0 || categoria !== categoriaInicial;

  return (
    <div className="space-y-6">
      <div className="rounded-xl border bg-card p-4 shadow-xs sm:p-5">
        <div className="grid gap-4 md:grid-cols-[1fr_18rem]">
          <div className="space-y-2">
            <Label htmlFor={idBusqueda}>Buscar trámite por nombre o requisito</Label>
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
                placeholder="Ej. licencia de funcionamiento"
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
              onValueChange={(valor) => setCategoria(valor as CategoriaTramite | "todas")}
            >
              <SelectTrigger aria-labelledby={idCategoria} className="h-11 w-full">
                <SelectValue placeholder="Todas las categorías" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas las categorías</SelectItem>
                {categoriasDisponibles.map((item) => (
                  <SelectItem key={item} value={item}>
                    {etiquetasCategoriaTramite[item]} ({conteo[item]})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground" role="status" aria-live="polite">
            {resultados.length}{" "}
            {resultados.length === 1 ? "trámite encontrado" : "trámites encontrados"}
          </p>
          {hayFiltros ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setTexto("");
                setCategoria(categoriaInicial);
              }}
            >
              Limpiar filtros
            </Button>
          ) : null}
        </div>
      </div>

      {resultados.length === 0 ? (
        <EmptyState
          titulo="No encontramos trámites con esos filtros"
          descripcion="Prueba con otra palabra clave o revisa el TUPA completo. También puedes comunicarte con la central telefónica para recibir orientación."
        >
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            <Button asChild variant="outline">
              <Link href="/tramites/tupa">Ver el TUPA</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/contacto">Contactar a la municipalidad</Link>
            </Button>
          </div>
        </EmptyState>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {resultados.map((tramite) => (
            <li key={tramite.id}>
              <TramiteCard tramite={tramite} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
