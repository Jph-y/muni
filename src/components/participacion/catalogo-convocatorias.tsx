"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { ConvocatoriaCard } from "@/components/participacion/convocatoria-card";
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
import type { EstadoConvocatoria, TipoConvocatoria } from "@/lib/api/types";
import {
  etiquetasEstadoConvocatoria,
  etiquetasTipoConvocatoria,
} from "@/lib/constants/etiquetas";
import {
  filtrarConvocatorias,
  obtenerAniosConvocatorias,
  type ConvocatoriaConEstado,
  type FiltroAnioConvocatoria,
  type FiltroEstadoConvocatoria,
  type FiltroTipoConvocatoria,
} from "@/lib/participacion/filtros";

export function CatalogoConvocatorias({
  convocatorias,
}: {
  convocatorias: ConvocatoriaConEstado[];
}) {
  const idBusqueda = useId();
  const idTipo = useId();
  const idEstado = useId();
  const idAnio = useId();
  const [texto, setTexto] = useState("");
  const [tipo, setTipo] = useState<FiltroTipoConvocatoria>("todos");
  const [estado, setEstado] = useState<FiltroEstadoConvocatoria>("todas");
  const [anio, setAnio] = useState<FiltroAnioConvocatoria>("todos");

  const anios = useMemo(() => obtenerAniosConvocatorias(convocatorias), [convocatorias]);
  const resultados = useMemo(
    () => filtrarConvocatorias(convocatorias, { texto, tipo, estado, anio }),
    [convocatorias, texto, tipo, estado, anio],
  );

  const hayFiltros =
    texto.trim().length > 0 || tipo !== "todos" || estado !== "todas" || anio !== "todos";

  return (
    <div className="space-y-6">
      <div className="rounded-xl border bg-card p-4 shadow-xs sm:p-5">
        <div className="grid gap-4 md:grid-cols-[1fr_11rem_11rem_9rem]">
          <div className="space-y-2">
            <Label htmlFor={idBusqueda}>Buscar convocatorias</Label>
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
                placeholder="Ej. sistemas, comunicaciones o serenazgo"
                className="h-11 pl-9"
                autoComplete="off"
              />
            </div>
          </div>

          <div className="space-y-2">
            <p id={idTipo} className="text-sm leading-none font-medium">
              Tipo
            </p>
            <Select
              value={tipo}
              onValueChange={(valor) => setTipo(valor as FiltroTipoConvocatoria)}
            >
              <SelectTrigger aria-labelledby={idTipo} className="h-11 w-full">
                <SelectValue placeholder="Todos los tipos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los tipos</SelectItem>
                {(Object.keys(etiquetasTipoConvocatoria) as TipoConvocatoria[]).map(
                  (item) => (
                    <SelectItem key={item} value={item}>
                      {etiquetasTipoConvocatoria[item]}
                    </SelectItem>
                  ),
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <p id={idEstado} className="text-sm leading-none font-medium">
              Estado
            </p>
            <Select
              value={estado}
              onValueChange={(valor) => setEstado(valor as FiltroEstadoConvocatoria)}
            >
              <SelectTrigger aria-labelledby={idEstado} className="h-11 w-full">
                <SelectValue placeholder="Todos los estados" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todos los estados</SelectItem>
                {(Object.keys(etiquetasEstadoConvocatoria) as EstadoConvocatoria[]).map(
                  (item) => (
                    <SelectItem key={item} value={item}>
                      {etiquetasEstadoConvocatoria[item]}
                    </SelectItem>
                  ),
                )}
              </SelectContent>
            </Select>
          </div>

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
            {resultados.length === 1
              ? "convocatoria encontrada"
              : "convocatorias encontradas"}
          </p>
          {hayFiltros ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setTexto("");
                setTipo("todos");
                setEstado("todas");
                setAnio("todos");
              }}
            >
              Limpiar filtros
            </Button>
          ) : null}
        </div>
      </div>

      {resultados.length === 0 ? (
        <EmptyState
          titulo="No encontramos convocatorias con esos filtros"
          descripcion="Prueba con otra palabra clave, tipo, estado o año. También puedes revisar todas las convocatorias publicadas."
        >
          <Button asChild variant="outline" className="mt-3">
            <Link href="/convocatorias">Ver todas las convocatorias</Link>
          </Button>
        </EmptyState>
      ) : (
        <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {resultados.map((convocatoria) => (
            <li key={convocatoria.id}>
              <ConvocatoriaCard convocatoria={convocatoria} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
