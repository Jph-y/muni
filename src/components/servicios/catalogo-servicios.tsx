"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { EmptyState } from "@/components/shared/empty-state";
import { ServicioCard } from "@/components/servicios/servicio-card";
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
import type { CategoriaServicio, Servicio } from "@/lib/api/types";
import { etiquetasCategoriaServicio } from "@/lib/constants/etiquetas";
import { filtrarServicios } from "@/lib/tramites/filtros";

export function CatalogoServicios({ servicios }: { servicios: Servicio[] }) {
  const idBusqueda = useId();
  const idCategoria = useId();
  const [texto, setTexto] = useState("");
  const [categoria, setCategoria] = useState<CategoriaServicio | "todas">("todas");

  const categoriasDisponibles = useMemo(() => {
    const categorias = new Set(servicios.map((servicio) => servicio.categoria));
    return [...categorias].sort((a, b) =>
      etiquetasCategoriaServicio[a].localeCompare(etiquetasCategoriaServicio[b], "es"),
    );
  }, [servicios]);

  const resultados = useMemo(
    () => filtrarServicios(servicios, { texto, categoria }),
    [servicios, texto, categoria],
  );

  const hayFiltros = texto.trim().length > 0 || categoria !== "todas";

  return (
    <div className="space-y-6">
      <div className="rounded-xl border bg-card p-4 shadow-xs sm:p-5">
        <div className="grid gap-4 md:grid-cols-[1fr_18rem]">
          <div className="space-y-2">
            <Label htmlFor={idBusqueda}>Buscar servicio municipal</Label>
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
                placeholder="Ej. serenazgo, residuos, talleres"
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
              onValueChange={(valor) =>
                setCategoria(valor as CategoriaServicio | "todas")
              }
            >
              <SelectTrigger aria-labelledby={idCategoria} className="h-11 w-full">
                <SelectValue placeholder="Todas las categorías" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas las categorías</SelectItem>
                {categoriasDisponibles.map((item) => (
                  <SelectItem key={item} value={item}>
                    {etiquetasCategoriaServicio[item]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground" role="status" aria-live="polite">
            {resultados.length}{" "}
            {resultados.length === 1 ? "servicio disponible" : "servicios disponibles"}
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
          titulo="No encontramos servicios con esos filtros"
          descripcion="Prueba con otra palabra clave o consulta la central telefónica para conocer el servicio que necesitas."
        >
          <Button asChild variant="outline" className="mt-3">
            <Link href="/contacto">Contactar a la municipalidad</Link>
          </Button>
        </EmptyState>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {resultados.map((servicio) => (
            <li key={servicio.id}>
              <ServicioCard servicio={servicio} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
