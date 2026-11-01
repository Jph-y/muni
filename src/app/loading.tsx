import { Container } from "@/components/layout/container";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div aria-busy="true" aria-live="polite">
      <span className="sr-only">Cargando contenido</span>
      <div className="bg-brand-dark py-16">
        <Container>
          <Skeleton className="h-4 w-40 bg-white/20" />
          <Skeleton className="mt-4 h-10 w-3/4 max-w-xl bg-white/20" />
          <Skeleton className="mt-3 h-4 w-2/3 max-w-md bg-white/20" />
          <Skeleton className="mt-8 h-12 w-full max-w-xl bg-white/20" />
        </Container>
      </div>
      <Container className="py-10">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {Array.from({ length: 6 }).map((_, indice) => (
            <Skeleton key={indice} className="h-28 rounded-xl" />
          ))}
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Skeleton className="h-80 rounded-xl" />
          <div className="space-y-4">
            <Skeleton className="h-24 rounded-xl" />
            <Skeleton className="h-24 rounded-xl" />
            <Skeleton className="h-24 rounded-xl" />
          </div>
        </div>
      </Container>
    </div>
  );
}
