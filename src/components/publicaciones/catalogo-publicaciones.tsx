"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { PublicacionCard } from "@/components/publicaciones/publicacion-card";
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
import type { Publicacion, TipoPublicacion } from "@/lib/api/types";
import { etiquetasTipoPublicacion } from "@/lib/constants/etiquetas";
import {
  contarPublicacionesPorTipo,
  filtrarPublicaciones,
  obtenerAniosPublicaciones,
  type FiltroAnioPublicacion,
  type FiltroTipoPublicacion,
} from "@/lib/publicaciones/filtros";

export function CatalogoPublicaciones({
  publicaciones,
  tipoInicial = "todas",
  tipoFijo,
}: {
  publicaciones: Publicacion[];
  tipoInicial?: FiltroTipoPublicacion;
  tipoFijo?: TipoPublicacion;
}) {
  const idBusqueda = useId();
  const idTipo = useId();
  const idAnio = useId();
  const [texto, setTexto] = useState("");
  const [tipo, setTipo] = useState<FiltroTipoPublicacion>(tipoFijo ?? tipoInicial);
  const [anio, setAnio] = useState<FiltroAnioPublicacion>("todos");

  const conteo = useMemo(
    () => contarPublicacionesPorTipo(publicaciones),
    [publicaciones],
  );
  const anios = useMemo(() => obtenerAniosPublicaciones(publicaciones), [publicaciones]);

  const resultados = useMemo(
    () => filtrarPublicaciones(publicaciones, { texto, tipo, anio }),
    [publicaciones, texto, tipo, anio],
  );

  const hayFiltros = texto.trim().length > 0 || anio !== "todos" || tipo !== tipoInicial;

  return (
    <div className="space-y-6">
      <div className="rounded-xl border bg-card p-4 shadow-xs sm:p-5">
        <div className="grid gap-4 md:grid-cols-[1fr_16rem_10rem]">
          <div className="space-y-2">
            <Label htmlFor={idBusqueda}>Buscar por título, oficina o descripción</Label>
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
                placeholder="Ej. formato de licencia"
                className="h-11 pl-9"
                autoComplete="off"
              />
            </div>
          </div>

          {tipoFijo ? null : (
            <div className="space-y-2">
              <p id={idTipo} className="text-sm leading-none font-medium">
                Tipo de publicación
              </p>
              <Select
                value={tipo}
                onValueChange={(valor) => setTipo(valor as FiltroTipoPublicacion)}
              >
                <SelectTrigger aria-labelledby={idTipo} className="h-11 w-full">
                  <SelectValue placeholder="Todos los tipos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todos los tipos</SelectItem>
                  {(Object.keys(conteo) as TipoPublicacion[]).map((item) => (
                    <SelectItem key={item} value={item}>
                      {etiquetasTipoPublicacion[item]} ({conteo[item]})
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
            {resultados.length === 1
              ? "publicación encontrada"
              : "publicaciones encontradas"}
          </p>
          {hayFiltros ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setTexto("");
                setTipo(tipoFijo ?? tipoInicial);
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
          titulo="No encontramos publicaciones con esos filtros"
          descripcion="Prueba con otra palabra clave o año. También puedes revisar todas las publicaciones disponibles."
        >
          <Button asChild variant="outline" className="mt-3">
            <Link href="/informes-publicaciones">Ver todas las publicaciones</Link>
          </Button>
        </EmptyState>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {resultados.map((publicacion) => (
            <li key={publicacion.id}>
              <PublicacionCard publicacion={publicacion} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
