import { Building2, UserRound } from "lucide-react";
import type { AreaOrganizacional } from "@/lib/api/types";
import { etiquetasNivelOrganizacional } from "@/lib/constants/etiquetas";
import { agruparAreasPorNivel } from "@/lib/institucional/filtros";

export function Organigrama({ areas }: { areas: AreaOrganizacional[] }) {
  const grupos = agruparAreasPorNivel(areas);

  return (
    <div className="space-y-10">
      {grupos.map((grupo, indice) => (
        <section key={grupo.nivel} aria-labelledby={`nivel-${grupo.nivel}`}>
          <div className="flex items-center gap-3">
            <h2
              id={`nivel-${grupo.nivel}`}
              className="shrink-0 text-sm font-semibold tracking-wider text-brand-strong uppercase"
            >
              {etiquetasNivelOrganizacional[grupo.nivel]}
            </h2>
            <span className="h-px flex-1 bg-border" aria-hidden="true" />
          </div>

          <ol className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {grupo.areas.map((area) => (
              <li key={area.id}>
                <article className="h-full rounded-xl border bg-card p-4 shadow-xs">
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand-strong">
                      <Building2 className="size-4" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-sm leading-snug font-semibold text-brand-dark">
                        {area.nombre}
                      </h3>
                      {area.siglas ? (
                        <p className="mt-0.5 text-xs font-medium text-muted-foreground">
                          {area.siglas}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <dl className="mt-3 space-y-1 text-xs">
                    {area.responsable ? (
                      <div className="flex items-start gap-1.5">
                        <dt className="sr-only">Responsable</dt>
                        <UserRound
                          className="mt-0.5 size-3.5 shrink-0 text-muted-foreground"
                          aria-hidden="true"
                        />
                        <dd className="text-muted-foreground">{area.responsable}</dd>
                      </div>
                    ) : null}
                    {area.dependeDe ? (
                      <div>
                        <dt className="sr-only">Depende de</dt>
                        <dd className="text-muted-foreground">
                          Depende de: {area.dependeDe}
                        </dd>
                      </div>
                    ) : null}
                  </dl>
                </article>
              </li>
            ))}
          </ol>

          {indice < grupos.length - 1 ? (
            <div className="mt-6 flex justify-center" aria-hidden="true">
              <span className="h-8 w-px bg-border" />
            </div>
          ) : null}
        </section>
      ))}
    </div>
  );
}
