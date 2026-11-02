"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { NoticiaCard } from "@/components/noticias/noticia-card";
import { EmptyState } from "@/components/shared/empty-state";
import { Paginacion } from "@/components/shared/paginacion";
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
import type { CategoriaNoticia, Noticia } from "@/lib/api/types";
import { etiquetasCategoriaNoticia } from "@/lib/constants/etiquetas";
import {
  contarNoticiasPorCategoria,
  filtrarNoticias,
  obtenerAniosNoticias,
  paginarNoticias,
  type FiltroAnioNoticia,
  type FiltroCategoriaNoticia,
} from "@/lib/noticias/filtros";

export function CatalogoNoticias({
  noticias,
  categoriaInicial = "todas",
  categoriaFija,
  porPagina = 6,
}: {
  noticias: Noticia[];
  categoriaInicial?: FiltroCategoriaNoticia;
  categoriaFija?: CategoriaNoticia;
  porPagina?: number;
}) {
  const idBusqueda = useId();
  const idCategoria = useId();
  const idAnio = useId();
  const [texto, setTexto] = useState("");
  const [categoria, setCategoria] = useState<FiltroCategoriaNoticia>(
    categoriaFija ?? categoriaInicial,
  );
  const [anio, setAnio] = useState<FiltroAnioNoticia>("todos");
  const [pagina, setPagina] = useState(1);

  const conteo = useMemo(() => contarNoticiasPorCategoria(noticias), [noticias]);
  const anios = useMemo(() => obtenerAniosNoticias(noticias), [noticias]);

  const resultados = useMemo(
    () => filtrarNoticias(noticias, { texto, categoria, anio }),
    [noticias, texto, categoria, anio],
  );
  const paginados = useMemo(
    () => paginarNoticias(resultados, pagina, porPagina),
    [resultados, pagina, porPagina],
  );

  const hayFiltros =
    texto.trim().length > 0 || anio !== "todos" || categoria !== categoriaInicial;

  function reiniciarPagina() {
    setPagina(1);
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border bg-card p-4 shadow-xs sm:p-5">
        <div className="grid gap-4 md:grid-cols-[1fr_16rem_10rem]">
          <div className="space-y-2">
            <Label htmlFor={idBusqueda}>Buscar noticias</Label>
            <div className="relative">
              <Search
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                id={idBusqueda}
                type="search"
                value={texto}
                onChange={(evento) => {
                  setTexto(evento.target.value);
                  reiniciarPagina();
                }}
                placeholder="Ej. parque, vacunación o Serenazgo"
                className="h-11 pl-9"
                autoComplete="off"
              />
            </div>
          </div>

          {categoriaFija ? null : (
            <div className="space-y-2">
              <p id={idCategoria} className="text-sm leading-none font-medium">
                Categoría
              </p>
              <Select
                value={categoria}
                onValueChange={(valor) => {
                  setCategoria(valor as FiltroCategoriaNoticia);
                  reiniciarPagina();
                }}
              >
                <SelectTrigger aria-labelledby={idCategoria} className="h-11 w-full">
                  <SelectValue placeholder="Todas las categorías" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas las categorías</SelectItem>
                  {(Object.keys(conteo) as CategoriaNoticia[]).map((item) => (
                    <SelectItem key={item} value={item}>
                      {etiquetasCategoriaNoticia[item]} ({conteo[item]})
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
              onValueChange={(valor) => {
                setAnio(valor === "todos" ? "todos" : Number(valor));
                reiniciarPagina();
              }}
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
            {paginados.total === 0
              ? "No hay noticias con esos filtros"
              : `Mostrando ${paginados.desde}–${paginados.hasta} de ${
                  paginados.total
                } ${paginados.total === 1 ? "noticia" : "noticias"}`}
          </p>
          {hayFiltros ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setTexto("");
                setCategoria(categoriaFija ?? categoriaInicial);
                setAnio("todos");
                reiniciarPagina();
              }}
            >
              Limpiar filtros
            </Button>
          ) : null}
        </div>
      </div>

      {paginados.total === 0 ? (
        <EmptyState
          titulo="No encontramos noticias con esos filtros"
          descripcion="Prueba con otra palabra clave, categoría o año. También puedes revisar todas las noticias publicadas."
        >
          <Button asChild variant="outline" className="mt-3">
            <Link href="/noticias">Ver todas las noticias</Link>
          </Button>
        </EmptyState>
      ) : (
        <>
          <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {paginados.items.map((noticia, indice) => (
              <li key={noticia.id}>
                <NoticiaCard noticia={noticia} prioridad={pagina === 1 && indice < 3} />
              </li>
            ))}
          </ul>

          <Paginacion
            pagina={paginados.pagina}
            totalPaginas={paginados.totalPaginas}
            onCambiarPagina={setPagina}
            etiqueta="noticias"
            className="pt-2"
          />
        </>
      )}
    </div>
  );
}
