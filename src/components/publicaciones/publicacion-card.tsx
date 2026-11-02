import Link from "next/link";
import { ArrowRight, Building2, CalendarDays, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Publicacion } from "@/lib/api/types";
import { etiquetasTipoPublicacion } from "@/lib/constants/etiquetas";
import { formatearFecha } from "@/lib/format";

export function PublicacionCard({ publicacion }: { publicacion: Publicacion }) {
  return (
    <article className="flex h-full flex-col gap-3 rounded-xl border bg-card p-4 shadow-xs transition-shadow hover:shadow-md">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="secondary">{etiquetasTipoPublicacion[publicacion.tipo]}</Badge>
        <span className="text-xs text-muted-foreground">
          <time dateTime={publicacion.fecha}>{formatearFecha(publicacion.fecha)}</time>
        </span>
      </div>

      <h3 className="text-base leading-snug font-semibold text-brand-dark">
        <Link
          href={`/informes-publicaciones/${publicacion.slug}`}
          className="hover:underline"
        >
          {publicacion.titulo}
        </Link>
      </h3>

      <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
        {publicacion.descripcion}
      </p>

      <dl className="mt-auto space-y-1.5 border-t pt-3 text-xs text-muted-foreground">
        <div className="flex items-start gap-2">
          <dt className="sr-only">Oficina responsable</dt>
          <Building2 className="mt-0.5 size-3.5 shrink-0 text-brand" aria-hidden="true" />
          <dd>{publicacion.oficina}</dd>
        </div>
        <div className="flex items-start gap-2">
          <dt className="sr-only">Fecha de publicación</dt>
          <CalendarDays
            className="mt-0.5 size-3.5 shrink-0 text-brand"
            aria-hidden="true"
          />
          <dd>{formatearFecha(publicacion.fecha)}</dd>
        </div>
      </dl>

      <div className="flex flex-wrap items-center gap-2">
        <Button asChild variant="ghost" size="sm" className="px-2">
          <Link href={`/informes-publicaciones/${publicacion.slug}`}>
            Ver detalle
            <ArrowRight className="size-4" aria-hidden="true" />
            <span className="sr-only">: {publicacion.titulo}</span>
          </Link>
        </Button>
        <Button asChild variant="outline" size="sm" className="px-2">
          <a href={publicacion.archivoUrl} download>
            <Download className="size-4" aria-hidden="true" />
            Descargar
            <span className="sr-only"> {publicacion.titulo}</span>
          </a>
        </Button>
      </div>
    </article>
  );
}
