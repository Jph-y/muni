import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import type { Noticia } from "@/lib/api/types";
import { etiquetasCategoriaNoticia } from "@/lib/constants/etiquetas";
import { formatearFecha } from "@/lib/format";

export function NewsGrid({ noticias }: { noticias: Noticia[] }) {
  const [principal, ...resto] = noticias;

  if (!principal) return null;

  return (
    <section className="py-10" aria-labelledby="ultimas-noticias">
      <Container>
        <SectionHeading
          eyebrow="Actualidad"
          title="Últimas noticias"
          description="Conoce las acciones, obras y campañas que la municipalidad desarrolla en el distrito."
          href="/noticias"
          hrefLabel="Todas las noticias"
          className="mb-6"
        />
        <h2 id="ultimas-noticias" className="sr-only">
          Últimas noticias
        </h2>

        <div className="grid gap-6 lg:grid-cols-2">
          <article className="group overflow-hidden rounded-xl border bg-card shadow-xs transition-shadow hover:shadow-md">
            <Link href={`/noticias/${principal.slug}`} className="block">
              <div className="relative aspect-16/9 w-full overflow-hidden bg-muted">
                <Image
                  src={principal.imagen}
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <span className="absolute top-3 left-3 rounded-full bg-brand-dark/90 px-3 py-1 text-xs font-semibold text-white">
                  {etiquetasCategoriaNoticia[principal.categoria]}
                </span>
              </div>
              <div className="p-5">
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <CalendarDays className="size-3.5" aria-hidden="true" />
                  {formatearFecha(principal.fecha)}
                </p>
                <h3 className="mt-2 text-xl font-bold text-brand-dark group-hover:underline">
                  {principal.titulo}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                  {principal.resumen}
                </p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-strong">
                  Leer noticia
                  <ArrowRight className="size-4" aria-hidden="true" />
                </span>
              </div>
            </Link>
          </article>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {resto.slice(0, 3).map((noticia) => (
              <article
                key={noticia.id}
                className="group flex gap-4 rounded-xl border bg-card p-3 shadow-xs transition-shadow hover:shadow-md"
              >
                <Link
                  href={`/noticias/${noticia.slug}`}
                  className="relative aspect-square w-28 shrink-0 overflow-hidden rounded-lg bg-muted sm:w-32"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <Image
                    src={noticia.imagen}
                    alt=""
                    fill
                    sizes="128px"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  />
                </Link>
                <div className="min-w-0 py-1">
                  <p className="text-xs font-semibold text-brand">
                    {etiquetasCategoriaNoticia[noticia.categoria]}
                  </p>
                  <h3 className="mt-1 line-clamp-2 text-base leading-snug font-semibold text-brand-dark">
                    <Link href={`/noticias/${noticia.slug}`} className="hover:underline">
                      {noticia.titulo}
                    </Link>
                  </h3>
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    {formatearFecha(noticia.fecha)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
