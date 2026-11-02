import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { CampanaConEstado } from "@/lib/campanas/filtros";
import { etiquetasEstadoCampana } from "@/lib/constants/etiquetas";
import { formatearFecha } from "@/lib/format";

const variantePorEstado = {
  vigente: "default",
  proxima: "secondary",
  finalizada: "outline",
} as const;

export function CampanaCard({ campana }: { campana: CampanaConEstado }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border bg-card shadow-xs transition-shadow hover:shadow-md">
      <Link
        href={`/campanas/${campana.slug}`}
        className="relative block aspect-16/9 w-full overflow-hidden bg-muted"
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={campana.imagen}
          alt=""
          fill
          sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute top-3 left-3">
          <Badge variant={variantePorEstado[campana.estado]}>
            {etiquetasEstadoCampana[campana.estado]}
          </Badge>
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg leading-snug font-bold text-brand-dark">
          <Link href={`/campanas/${campana.slug}`} className="hover:underline">
            {campana.titulo}
          </Link>
        </h3>

        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {campana.descripcion}
        </p>

        <dl className="mt-3 space-y-1.5 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <CalendarDays className="size-3.5 shrink-0" aria-hidden="true" />
            <dt className="sr-only">Fechas</dt>
            <dd>
              Del <time dateTime={campana.inicio}>{formatearFecha(campana.inicio)}</time>{" "}
              al <time dateTime={campana.fin}>{formatearFecha(campana.fin)}</time>
            </dd>
          </div>
          {campana.lugar ? (
            <div className="flex items-center gap-1.5">
              <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
              <dt className="sr-only">Lugar</dt>
              <dd className="line-clamp-1">{campana.lugar}</dd>
            </div>
          ) : null}
        </dl>

        <div className="mt-auto flex flex-wrap items-center gap-2 border-t pt-3">
          <Button asChild variant="ghost" size="sm" className="px-2">
            <Link href={`/campanas/${campana.slug}`}>
              Ver campaña
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
          {campana.estado !== "finalizada" && campana.enlace ? (
            <Button asChild variant="outline" size="sm" className="px-2">
              <Link href={campana.enlace}>Participar</Link>
            </Button>
          ) : null}
        </div>
      </div>
    </article>
  );
}
