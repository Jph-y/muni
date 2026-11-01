import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center justify-center py-24 text-center">
      <span className="inline-flex size-16 items-center justify-center rounded-full bg-brand-soft text-brand-strong">
        <SearchX className="size-8" aria-hidden="true" />
      </span>
      <p className="mt-6 text-sm font-semibold tracking-wider text-brand uppercase">
        Error 404
      </p>
      <h1 className="mt-2 text-3xl font-bold text-brand-dark sm:text-4xl">
        No encontramos esta página
      </h1>
      <p className="mt-3 max-w-lg text-muted-foreground">
        Es posible que el enlace haya cambiado o que la página ya no esté disponible.
        Puedes volver al inicio o buscar lo que necesitas.
      </p>
      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <Button asChild className="h-11 px-5 text-base">
          <Link href="/">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Volver al inicio
          </Link>
        </Button>
        <Button asChild variant="outline" className="h-11 px-5 text-base">
          <Link href="/buscar">Buscar en el portal</Link>
        </Button>
      </div>
    </Container>
  );
}
