import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import type { Noticia } from "@/lib/api/types";
import { etiquetasCategoriaNoticia } from "@/lib/constants/etiquetas";
import { formatearFecha } from "@/lib/format";

export function NoticiaCard({
  noticia,
  prioridad = false,
}: {
  noticia: Noticia;
  prioridad?: boolean;
}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border bg-card shadow-xs transition-shadow hover:shadow-md">
      <Link
        href={`/noticias/${noticia.slug}`}
        className="relative block aspect-16/9 w-full overflow-hidden bg-muted"
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={noticia.imagen}
          alt=""
          fill
          priority={prioridad}
          sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute top-3 left-3 rounded-full bg-brand-dark/90 px-3 py-1 text-xs font-semibold text-white">
          {etiquetasCategoriaNoticia[noticia.categoria]}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <CalendarDays className="size-3.5" aria-hidden="true" />
          <time dateTime={noticia.fecha}>{formatearFecha(noticia.fecha)}</time>
        </p>

        <h3 className="mt-2 text-lg leading-snug font-bold text-brand-dark">
          <Link href={`/noticias/${noticia.slug}`} className="hover:underline">
            {noticia.titulo}
          </Link>
        </h3>

        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {noticia.resumen}
        </p>

        <Link
          href={`/noticias/${noticia.slug}`}
          className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm font-semibold text-brand-strong hover:underline"
        >
          Leer noticia
          <span className="sr-only">: {noticia.titulo}</span>
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
