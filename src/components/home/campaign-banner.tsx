import Image from "next/image";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import type { Campana } from "@/lib/api/types";
import { formatearFecha } from "@/lib/format";

export function CampaignBanner({ campana }: { campana: Campana }) {
  return (
    <section className="py-10" aria-labelledby="campana-vigente">
      <Container>
        <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
          <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
            <div className="relative min-h-52 md:min-h-full">
              <Image
                src={campana.imagen}
                alt=""
                fill
                sizes="(min-width: 768px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="p-6 sm:p-8">
              <p className="text-xs font-semibold tracking-wider text-brand uppercase">
                Campaña vigente
              </p>
              <h2
                id="campana-vigente"
                className="mt-1 text-2xl font-bold text-brand-dark"
              >
                {campana.titulo}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {campana.descripcion}
              </p>
              <p className="mt-4 inline-flex items-center gap-2 rounded-md bg-gold-soft px-3 py-1.5 text-sm font-medium text-brand-dark">
                <CalendarDays className="size-4" aria-hidden="true" />
                Hasta el {formatearFecha(campana.fin)}
              </p>
              <div className="mt-5">
                <Button asChild className="h-11 px-5 text-base">
                  <Link href={campana.enlace ?? "/campanas"}>
                    Aprovechar el beneficio
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
