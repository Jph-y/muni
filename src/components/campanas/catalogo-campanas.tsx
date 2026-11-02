"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { CampanaCard } from "@/components/campanas/campana-card";
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
import type { EstadoCampana } from "@/lib/api/types";
import type { CampanaConEstado } from "@/lib/campanas/filtros";
import {
  contarCampanasPorEstado,
  filtrarCampanas,
  obtenerAniosCampanas,
  type FiltroAnioCampana,
  type FiltroEstadoCampana,
} from "@/lib/campanas/filtros";
import { etiquetasEstadoCampana } from "@/lib/constants/etiquetas";

export function CatalogoCampanas({
  campanas,
  estadoInicial = "todas",
}: {
  campanas: CampanaConEstado[];
  estadoInicial?: FiltroEstadoCampana;
}) {
  const idBusqueda = useId();
  const idEstado = useId();
  const idAnio = useId();
  const [texto, setTexto] = useState("");
  const [estado, setEstado] = useState<FiltroEstadoCampana>(estadoInicial);
  const [anio, setAnio] = useState<FiltroAnioCampana>("todos");

  const conteo = useMemo(() => contarCampanasPorEstado(campanas), [campanas]);
  const anios = useMemo(() => obtenerAniosCampanas(campanas), [campanas]);

  const resultados = useMemo(
    () => filtrarCampanas(campanas, { texto, estado, anio }),
    [campanas, texto, estado, anio],
  );

  const hayFiltros =
    texto.trim().length > 0 || anio !== "todos" || estado !== estadoInicial;

  return (
    <div className="space-y-6">
      <div className="rounded-xl border bg-card p-4 shadow-xs sm:p-5">
        <div className="grid gap-4 md:grid-cols-[1fr_14rem_10rem]">
          <div className="space-y-2">
            <Label htmlFor={idBusqueda}>Buscar campañas</Label>
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
                placeholder="Ej. tributario, vacunación o feria"
                className="h-11 pl-9"
                autoComplete="off"
              />
            </div>
          </div>

          <div className="space-y-2">
            <p id={idEstado} className="text-sm leading-none font-medium">
              Estado
            </p>
            <Select
              value={estado}
              onValueChange={(valor) => setEstado(valor as FiltroEstadoCampana)}
            >
              <SelectTrigger aria-labelledby={idEstado} className="h-11 w-full">
                <SelectValue placeholder="Todos los estados" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todos los estados</SelectItem>
                {(Object.keys(conteo) as EstadoCampana[]).map((item) => (
                  <SelectItem key={item} value={item}>
                    {etiquetasEstadoCampana[item]} ({conteo[item]})
                  </SelectItem>
                ))}
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
            {resultados.length === 1 ? "campaña encontrada" : "campañas encontradas"}
          </p>
          {hayFiltros ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setTexto("");
                setEstado(estadoInicial);
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
          titulo="No encontramos campañas con esos filtros"
          descripcion="Prueba con otra palabra clave, estado o año. También puedes revisar todas las campañas registradas."
        >
          <Button asChild variant="outline" className="mt-3">
            <Link href="/campanas">Ver todas las campañas</Link>
          </Button>
        </EmptyState>
      ) : (
        <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {resultados.map((campana) => (
            <li key={campana.id}>
              <CampanaCard campana={campana} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
