"use client";

import Link from "next/link";
import { RotateCcw, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container className="flex flex-col items-center justify-center py-24 text-center">
      <span className="inline-flex size-16 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <TriangleAlert className="size-8" aria-hidden="true" />
      </span>
      <h1 className="mt-6 text-3xl font-bold text-brand-dark sm:text-4xl">
        Ocurrió un problema
      </h1>
      <p className="mt-3 max-w-lg text-muted-foreground">
        No pudimos cargar esta sección. Intenta nuevamente en unos segundos. Si el
        problema continúa, comunícate con la central telefónica.
      </p>
      {error.digest ? (
        <p className="mt-2 text-xs text-muted-foreground">
          Código de referencia: {error.digest}
        </p>
      ) : null}
      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <Button onClick={reset} className="h-11 px-5 text-base">
          <RotateCcw className="size-4" aria-hidden="true" />
          Intentar nuevamente
        </Button>
        <Button asChild variant="outline" className="h-11 px-5 text-base">
          <Link href="/">Volver al inicio</Link>
        </Button>
      </div>
    </Container>
  );
}
