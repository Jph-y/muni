"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";
import { Download, Search } from "lucide-react";
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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { CategoriaTramite, Tramite } from "@/lib/api/types";
import { etiquetasCategoriaTramite, etiquetasModalidad } from "@/lib/constants/etiquetas";
import { formatearMoneda } from "@/lib/format";
import { contarTramitesPorCategoria, filtrarTramites } from "@/lib/tramites/filtros";

function formatearPlazo(plazoDias: number): string {
  if (plazoDias === 0) return "Inmediato";
  return `${plazoDias} ${plazoDias === 1 ? "día" : "días"}`;
}

export function TablaTupa({ tramites }: { tramites: Tramite[] }) {
  const idBusqueda = useId();
  const idCategoria = useId();
  const [texto, setTexto] = useState("");
  const [categoria, setCategoria] = useState<CategoriaTramite | "todas">("todas");

  const conteo = useMemo(() => contarTramitesPorCategoria(tramites), [tramites]);
  const categoriasDisponibles = useMemo(
    () => (Object.keys(conteo) as CategoriaTramite[]).filter((item) => conteo[item] > 0),
    [conteo],
  );

  const resultados = useMemo(
    () => filtrarTramites(tramites, { texto, categoria }),
    [tramites, texto, categoria],
  );

  return (
    <div className="space-y-5">
      <div className="rounded-xl border bg-card p-4 shadow-xs sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[1fr_18rem_auto] lg:items-end">
          <div className="space-y-2">
            <Label htmlFor={idBusqueda}>Buscar procedimiento</Label>
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
                placeholder="Ej. 21198 o matrimonio civil"
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

          <Button asChild variant="outline" className="h-11">
            <a href="/documents/tupa-2026.pdf" download>
              <Download className="size-4" aria-hidden="true" />
              Descargar TUPA
            </a>
          </Button>
        </div>

        <p
          className="mt-4 text-sm text-muted-foreground"
          role="status"
          aria-live="polite"
        >
          {resultados.length}{" "}
          {resultados.length === 1 ? "procedimiento listado" : "procedimientos listados"}
        </p>
      </div>

      {resultados.length === 0 ? (
        <EmptyState
          titulo="No encontramos procedimientos"
          descripcion="Ajusta la búsqueda o selecciona otra categoría. El TUPA completo en PDF sigue disponible para su descarga."
        />
      ) : (
        <>
          <div className="hidden overflow-x-auto rounded-xl border bg-card md:block">
            <Table>
              <TableCaption className="sr-only">
                Procedimientos administrativos del TUPA vigente
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-24">Código</TableHead>
                  <TableHead>Procedimiento</TableHead>
                  <TableHead className="w-28">Derecho</TableHead>
                  <TableHead className="w-24">Plazo</TableHead>
                  <TableHead className="w-28">Atención</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {resultados.map((tramite) => (
                  <TableRow key={tramite.id}>
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {tramite.codigoTupa ?? "—"}
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/tramites/${tramite.slug}`}
                        className="font-medium text-brand-strong hover:underline"
                      >
                        {tramite.nombre}
                      </Link>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {tramite.oficina}
                      </p>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {tramite.costo === 0 ? "Gratuito" : formatearMoneda(tramite.costo)}
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-muted-foreground">
                      {formatearPlazo(tramite.plazoDias)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {etiquetasModalidad[tramite.modalidad]}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <ul className="space-y-3 md:hidden">
            {resultados.map((tramite) => (
              <li key={tramite.id}>
                <article className="rounded-xl border bg-card p-4 shadow-xs">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary">
                      {etiquetasCategoriaTramite[tramite.categoria]}
                    </Badge>
                    <Badge variant="outline">
                      {etiquetasModalidad[tramite.modalidad]}
                    </Badge>
                  </div>
                  <h3 className="mt-2 text-sm leading-snug font-semibold text-brand-dark">
                    <Link href={`/tramites/${tramite.slug}`} className="hover:underline">
                      {tramite.nombre}
                    </Link>
                  </h3>
                  <dl className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
                    <dt className="text-muted-foreground">Código</dt>
                    <dd className="font-mono">{tramite.codigoTupa ?? "—"}</dd>
                    <dt className="text-muted-foreground">Derecho</dt>
                    <dd>
                      {tramite.costo === 0 ? "Gratuito" : formatearMoneda(tramite.costo)}
                    </dd>
                    <dt className="text-muted-foreground">Plazo</dt>
                    <dd>{formatearPlazo(tramite.plazoDias)}</dd>
                    <dt className="text-muted-foreground">Oficina</dt>
                    <dd className="col-span-1">{tramite.oficina}</dd>
                  </dl>
                </article>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
