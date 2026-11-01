import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-dark text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, #C9A227 0, transparent 45%), radial-gradient(circle at 85% 10%, #7AA87F 0, transparent 40%), radial-gradient(circle at 60% 90%, #4B7F52 0, transparent 45%)",
        }}
      />
      <Container className="relative py-14 sm:py-20">
        <div className="max-w-3xl">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide uppercase">
            <span className="size-1.5 rounded-full bg-gold" aria-hidden="true" />
            Distrito de Los Olivos
          </p>
          <h1 className="text-3xl font-bold text-shadow-hero sm:text-4xl lg:text-5xl">
            Tu municipalidad, más cerca de ti
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
            Realiza tus trámites, paga tus tributos y mantente informado sobre las
            acciones de la gestión municipal, desde cualquier dispositivo.
          </p>

          <form
            action="/buscar"
            method="get"
            role="search"
            className="mt-7 flex w-full max-w-xl flex-col gap-2 sm:flex-row"
          >
            <div className="relative flex-1">
              <label htmlFor="busqueda-hero" className="sr-only">
                Buscar trámites, normas o noticias
              </label>
              <Search
                className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <input
                id="busqueda-hero"
                name="q"
                type="search"
                placeholder="Busca un trámite, norma o noticia"
                className="h-12 w-full rounded-lg border border-transparent bg-white pr-4 pl-12 text-base text-foreground shadow-sm outline-none placeholder:text-muted-foreground focus-visible:ring-3 focus-visible:ring-gold/70"
              />
            </div>
            <Button
              type="submit"
              className="h-12 bg-gold px-6 text-base font-semibold text-brand-dark hover:bg-gold/90"
            >
              Buscar
            </Button>
          </form>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button
              asChild
              variant="outline"
              className="h-11 border-white/30 bg-transparent px-5 text-base text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="/tramites">Ver trámites y servicios</Link>
            </Button>
            <Link
              href="/tributos"
              className="inline-flex items-center gap-1.5 px-1 text-sm font-semibold text-gold hover:underline"
            >
              Pagar mis tributos
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
