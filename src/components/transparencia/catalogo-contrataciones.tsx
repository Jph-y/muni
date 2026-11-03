"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";
import { Building2, CalendarDays, Download, Search } from "lucide-react";
import { EmptyState } from "@/components/shared/empty-state";
import { Badge } from "@/components/ui/badge";
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
import type { Contratacion, EstadoContratacion, TipoContratacion } from "@/lib/api/types";
import {
  etiquetasEstadoContratacion,
  etiquetasModalidadContratacion,
  etiquetasTipoContratacion,
} from "@/lib/constants/etiquetas";
import { formatearFecha, formatearMoneda } from "@/lib/format";
import {
  filtrarContrataciones,
  obtenerAniosContrataciones,
  sumarMontosContrataciones,
  type FiltroAnioContratacion,
  type FiltroEstadoContratacion,
  type FiltroTipoContratacion,
} from "@/lib/transparencia/filtros";

const variantePorEstado = {
  convocado: "outline",
  "buena-pro": "secondary",
  ejecucion: "default",
  culminado: "secondary",
  desierto: "destructive",
} as const;

export function CatalogoContrataciones({
  contrataciones,
}: {
  contrataciones: Contratacion[];
}) {
  const idBusqueda = useId();
  const idTipo = useId();
  const idEstado = useId();
  const idAnio = useId();
  const [texto, setTexto] = useState("");
  const [tipo, setTipo] = useState<FiltroTipoContratacion>("todos");
  const [estado, setEstado] = useState<FiltroEstadoContratacion>("todos");
  const [anio, setAnio] = useState<FiltroAnioContratacion>("todos");

  const anios = useMemo(
    () => obtenerAniosContrataciones(contrataciones),
    [contrataciones],
  );
  const resultados = useMemo(
    () => filtrarContrataciones(contrataciones, { texto, tipo, estado, anio }),
    [contrataciones, texto, tipo, estado, anio],
  );
  const monto = useMemo(() => sumarMontosContrataciones(resultados), [resultados]);

  const hayFiltros =
    texto.trim().length > 0 || tipo !== "todos" || estado !== "todos" || anio !== "todos";

  return (
    <div className="space-y-6">
      <div className="rounded-xl border bg-card p-4 shadow-xs sm:p-5">
        <div className="grid gap-4 md:grid-cols-[1fr_12rem_12rem_9rem]">
          <div className="space-y-2">
            <Label htmlFor={idBusqueda}>Buscar procesos</Label>
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
                placeholder="Ej. uniformes, pistas o medicamentos"
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
              onValueChange={(valor) => setTipo(valor as FiltroTipoContratacion)}
            >
              <SelectTrigger aria-labelledby={idTipo} className="h-11 w-full">
                <SelectValue placeholder="Todos los tipos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los tipos</SelectItem>
                {(Object.keys(etiquetasTipoContratacion) as TipoContratacion[]).map(
                  (item) => (
                    <SelectItem key={item} value={item}>
                      {etiquetasTipoContratacion[item]}
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
              onValueChange={(valor) => setEstado(valor as FiltroEstadoContratacion)}
            >
              <SelectTrigger aria-labelledby={idEstado} className="h-11 w-full">
                <SelectValue placeholder="Todos los estados" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los estados</SelectItem>
                {(Object.keys(etiquetasEstadoContratacion) as EstadoContratacion[]).map(
                  (item) => (
                    <SelectItem key={item} value={item}>
                      {etiquetasEstadoContratacion[item]}
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
            {resultados.length === 1 ? "proceso encontrado" : "procesos encontrados"} ·{" "}
            {formatearMoneda(monto)} en total
          </p>
          {hayFiltros ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setTexto("");
                setTipo("todos");
                setEstado("todos");
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
          titulo="No encontramos procesos con esos filtros"
          descripcion="Prueba con otra palabra clave, tipo, estado o año. También puedes revisar todos los procesos registrados."
        >
          <Button asChild variant="outline" className="mt-3">
            <Link href="/transparencia/contrataciones">Ver todos los procesos</Link>
          </Button>
        </EmptyState>
      ) : (
        <ul className="grid gap-4 lg:grid-cols-2">
          {resultados.map((contratacion) => (
            <li key={contratacion.id}>
              <article className="flex h-full flex-col rounded-xl border bg-card p-5 shadow-xs">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant={variantePorEstado[contratacion.estado]}>
                    {etiquetasEstadoContratacion[contratacion.estado]}
                  </Badge>
                  <Badge variant="outline">
                    {etiquetasTipoContratacion[contratacion.tipo]}
                  </Badge>
                  <span className="text-xs font-medium text-muted-foreground">
                    {contratacion.codigo}
                  </span>
                </div>

                <h3 className="mt-3 text-base leading-snug font-semibold text-brand-dark">
                  {contratacion.objeto}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {etiquetasModalidadContratacion[contratacion.modalidad]}
                </p>

                <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      Monto referencial
                    </dt>
                    <dd className="mt-0.5 font-medium text-brand-dark">
                      {formatearMoneda(contratacion.monto)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      Convocatoria
                    </dt>
                    <dd className="mt-0.5 flex items-center gap-1.5 text-brand-dark">
                      <CalendarDays className="size-3.5 text-brand" aria-hidden="true" />
                      {formatearFecha(contratacion.fecha)}
                    </dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      Proveedor
                    </dt>
                    <dd className="mt-0.5 flex items-center gap-1.5 text-brand-dark">
                      <Building2 className="size-3.5 text-brand" aria-hidden="true" />
                      {contratacion.proveedor ?? "Por definir"}
                    </dd>
                  </div>
                </dl>

                {contratacion.archivoUrl ? (
                  <div className="mt-auto pt-4">
                    <Button asChild variant="outline" size="sm">
                      <a
                        href={contratacion.archivoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Download className="size-4" aria-hidden="true" />
                        Ver bases del proceso
                      </a>
                    </Button>
                  </div>
                ) : null}
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
