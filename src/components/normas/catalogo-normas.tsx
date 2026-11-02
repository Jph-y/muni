"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { NormaCard } from "@/components/normas/norma-card";
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
import type { Norma, TipoNorma } from "@/lib/api/types";
import { etiquetasTipoNorma } from "@/lib/constants/etiquetas";
import {
  agruparNormasPorAnio,
  contarNormasPorTipo,
  filtrarNormas,
  obtenerAniosNormas,
  type FiltroAnioNorma,
  type FiltroTipoNorma,
} from "@/lib/normas/filtros";

export function CatalogoNormas({
  normas,
  tipoInicial = "todas",
  anioInicial = "todos",
  tipoFijo,
}: {
  normas: Norma[];
  tipoInicial?: FiltroTipoNorma;
  anioInicial?: FiltroAnioNorma;
  tipoFijo?: TipoNorma;
}) {
  const idBusqueda = useId();
  const idTipo = useId();
  const idAnio = useId();
  const [texto, setTexto] = useState("");
  const [tipo, setTipo] = useState<FiltroTipoNorma>(tipoFijo ?? tipoInicial);
  const [anio, setAnio] = useState<FiltroAnioNorma>(anioInicial);

  const conteo = useMemo(() => contarNormasPorTipo(normas), [normas]);
  const anios = useMemo(() => obtenerAniosNormas(normas), [normas]);

  const resultados = useMemo(
    () => filtrarNormas(normas, { texto, tipo, anio }),
    [normas, texto, tipo, anio],
  );
  const grupos = useMemo(() => agruparNormasPorAnio(resultados), [resultados]);

  const hayFiltros = texto.trim().length > 0 || anio !== "todos" || tipo !== tipoInicial;

  return (
    <div className="space-y-6">
      <div className="rounded-xl border bg-card p-4 shadow-xs sm:p-5">
        <div className="grid gap-4 md:grid-cols-[1fr_16rem_10rem]">
          <div className="space-y-2">
            <Label htmlFor={idBusqueda}>Buscar por número, título o sumilla</Label>
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
                placeholder="Ej. ordenanza o 682-2025"
                className="h-11 pl-9"
                autoComplete="off"
              />
            </div>
          </div>

          {tipoFijo ? null : (
            <div className="space-y-2">
              <p id={idTipo} className="text-sm leading-none font-medium">
                Tipo de norma
              </p>
              <Select
                value={tipo}
                onValueChange={(valor) => setTipo(valor as FiltroTipoNorma)}
              >
                <SelectTrigger aria-labelledby={idTipo} className="h-11 w-full">
                  <SelectValue placeholder="Todos los tipos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todos los tipos</SelectItem>
                  {(Object.keys(conteo) as TipoNorma[]).map((item) => (
                    <SelectItem key={item} value={item}>
                      {etiquetasTipoNorma[item]} ({conteo[item]})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <p id={idAnio} className="text-sm leading-none font-medium">
              Año
            </p>
            <Select
              value={String(anio)}
              onValueChange={(valor) =>
                setAnio(valor === "todos" ? "todos" : Number(valor))
              }
            >
              <SelectTrigger aria-labelledby={idAnio} className="h-11 w-full">
                <SelectValue placeholder="Todos los años" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los años</SelectItem>
                {anios.map((item) => (
                  <SelectItem key={item} value={String(item)}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground" role="status" aria-live="polite">
            {resultados.length}{" "}
            {resultados.length === 1 ? "norma encontrada" : "normas encontradas"}
          </p>
          {hayFiltros ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setTexto("");
                setTipo(tipoFijo ?? tipoInicial);
                setAnio(anioInicial);
              }}
            >
              Limpiar filtros
            </Button>
          ) : null}
        </div>
      </div>

      {resultados.length === 0 ? (
        <EmptyState
          titulo="No encontramos normas con esos filtros"
          descripcion="Prueba con otro número, palabra clave o año. También puedes revisar todas las normas publicadas."
        >
          <Button asChild variant="outline" className="mt-3">
            <Link href="/normas">Ver todas las normas</Link>
          </Button>
        </EmptyState>
      ) : (
        <div className="space-y-10">
          {grupos.map((grupo) => (
            <section key={grupo.anio} aria-labelledby={`normas-${grupo.anio}`}>
              <h2
                id={`normas-${grupo.anio}`}
                className="flex items-center gap-3 text-lg font-semibold text-brand-dark"
              >
                {grupo.anio}
                <span className="text-sm font-normal text-muted-foreground">
                  ({grupo.normas.length} {grupo.normas.length === 1 ? "norma" : "normas"})
                </span>
              </h2>
              <ul className="mt-3 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {grupo.normas.map((norma) => (
                  <li key={norma.id}>
                    <NormaCard norma={norma} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
