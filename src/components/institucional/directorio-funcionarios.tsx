"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";
import { Mail, Phone, Search, UserRound } from "lucide-react";
import { AvatarIniciales } from "@/components/shared/avatar-iniciales";
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
import type { Funcionario } from "@/lib/api/types";
import {
  filtrarFuncionarios,
  obtenerAreasDeFuncionarios,
} from "@/lib/institucional/filtros";

export function DirectorioFuncionarios({
  funcionarios,
}: {
  funcionarios: Funcionario[];
}) {
  const idBusqueda = useId();
  const idArea = useId();
  const [texto, setTexto] = useState("");
  const [area, setArea] = useState("todas");

  const areas = useMemo(() => obtenerAreasDeFuncionarios(funcionarios), [funcionarios]);
  const resultados = useMemo(
    () => filtrarFuncionarios(funcionarios, { texto, area }),
    [funcionarios, texto, area],
  );

  const hayFiltros = texto.trim().length > 0 || area !== "todas";

  return (
    <div className="space-y-6">
      <div className="rounded-xl border bg-card p-4 shadow-xs sm:p-5">
        <div className="grid gap-4 md:grid-cols-[1fr_18rem]">
          <div className="space-y-2">
            <Label htmlFor={idBusqueda}>Buscar por nombre, cargo o dependencia</Label>
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
                placeholder="Ej. Gerencia de Seguridad Ciudadana"
                className="h-11 pl-9"
                autoComplete="off"
              />
            </div>
          </div>

          <div className="space-y-2">
            <p id={idArea} className="text-sm leading-none font-medium">
              Filtrar por área
            </p>
            <Select value={area} onValueChange={setArea}>
              <SelectTrigger aria-labelledby={idArea} className="h-11 w-full">
                <SelectValue placeholder="Todas las áreas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas las áreas</SelectItem>
                {areas.map((nombreArea) => (
                  <SelectItem key={nombreArea} value={nombreArea}>
                    {nombreArea}
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
              ? "funcionario encontrado"
              : "funcionarios encontrados"}
          </p>
          {hayFiltros ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setTexto("");
                setArea("todas");
              }}
            >
              Limpiar filtros
            </Button>
          ) : null}
        </div>
      </div>

      {resultados.length === 0 ? (
        <EmptyState
          titulo="No encontramos coincidencias"
          descripcion="Prueba con otra palabra clave o selecciona un área distinta. También puedes comunicarte con la central telefónica para que te orientemos."
        />
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {resultados.map((funcionario) => (
            <li key={funcionario.id}>
              <article className="flex h-full flex-col gap-3 rounded-xl border bg-card p-4 shadow-xs transition-shadow hover:shadow-md">
                <div className="flex items-start gap-3">
                  <AvatarIniciales nombre={funcionario.nombre} />
                  <div className="min-w-0">
                    <h2 className="text-base leading-snug font-semibold text-brand-dark">
                      <Link
                        href={`/institucional/directorio-funcionarios/${funcionario.slug}`}
                        className="hover:underline"
                      >
                        {funcionario.nombre}
                      </Link>
                    </h2>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {funcionario.cargo}
                    </p>
                  </div>
                </div>

                <p className="inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-soft px-2.5 py-1 text-xs font-semibold text-brand-strong">
                  <UserRound className="size-3.5" aria-hidden="true" />
                  {funcionario.area}
                </p>

                <dl className="mt-auto space-y-1.5 text-sm">
                  <div className="flex items-start gap-2">
                    <dt className="sr-only">Correo electrónico</dt>
                    <Mail
                      className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <dd className="min-w-0">
                      <a
                        href={`mailto:${funcionario.correo}`}
                        className="break-all text-brand-strong hover:underline"
                      >
                        {funcionario.correo}
                      </a>
                    </dd>
                  </div>
                  <div className="flex items-start gap-2">
                    <dt className="sr-only">Teléfono</dt>
                    <Phone
                      className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <dd>
                      <a
                        href={`tel:${funcionario.telefono.replace(/[^\d+]/g, "")}`}
                        className="text-brand-strong hover:underline"
                      >
                        {funcionario.telefono}
                      </a>
                    </dd>
                  </div>
                </dl>
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
