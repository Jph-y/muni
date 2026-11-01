import Link from "next/link";
import { ArrowUpRight, MessageCircle, Phone, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { enlacesExternos, emergencias, siteConfig } from "@/lib/constants/site";

export function ContactStrip() {
  return (
    <section className="bg-brand-soft/60 py-12" aria-labelledby="atencion">
      <Container>
        <h2 id="atencion" className="text-2xl font-bold text-brand-dark sm:text-3xl">
          Canales de atención y emergencias
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
          Atendemos de forma presencial y digital. En caso de emergencia, comunícate de
          inmediato con Serenazgo.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          <div className="rounded-xl border bg-card p-5 shadow-xs">
            <h3 className="flex items-center gap-2 text-base font-bold text-brand-dark">
              <ShieldAlert className="size-5 text-destructive" aria-hidden="true" />
              Números de emergencia
            </h3>
            <ul className="mt-4 space-y-3">
              {emergencias.map((emergencia) => (
                <li
                  key={emergencia.nombre}
                  className="flex items-center justify-between gap-3 text-sm"
                >
                  <span className="text-muted-foreground">{emergencia.nombre}</span>
                  <a
                    href={`tel:${emergencia.telefono.replace(/[^\d+]/g, "")}`}
                    className="flex items-center gap-1.5 font-semibold text-brand-strong hover:underline"
                  >
                    <Phone className="size-3.5" aria-hidden="true" />
                    {emergencia.telefono}
                  </a>
                </li>
              ))}
            </ul>
            <Button asChild variant="outline" className="mt-5 h-11 w-full text-base">
              <a
                href={`https://wa.me/51${siteConfig.whatsappSerenazgo.replace(/\s/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                WhatsApp Serenazgo
              </a>
            </Button>
          </div>

          <div className="rounded-xl border bg-card p-5 shadow-xs">
            <h3 className="text-base font-bold text-brand-dark">
              Plataformas y enlaces de interés
            </h3>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {enlacesExternos.map((enlace) => (
                <li key={enlace.nombre}>
                  <a
                    href={enlace.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-2 rounded-lg border border-transparent p-3 transition-colors hover:border-border hover:bg-muted/60"
                  >
                    <ArrowUpRight
                      className="mt-0.5 size-4 shrink-0 text-brand"
                      aria-hidden="true"
                    />
                    <span>
                      <span className="block text-sm font-semibold text-brand-dark group-hover:underline">
                        {enlace.nombre}
                      </span>
                      <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
                        {enlace.descripcion}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-muted-foreground">
              ¿Buscas algo más?{" "}
              <Link
                href="/tramites"
                className="font-semibold text-brand-strong hover:underline"
              >
                Explora todos los trámites y servicios
              </Link>
              .
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
