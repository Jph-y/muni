import Link from "next/link";
import {
  Flame,
  HeartPulse,
  MapPin,
  Phone,
  ShieldAlert,
  ShieldCheck,
  Siren,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/shared/page-hero";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { obtenerPuntosEmergencia } from "@/lib/api/contenido";
import type { TipoPuntoEmergencia } from "@/lib/api/types";
import { etiquetasTipoPuntoEmergencia } from "@/lib/constants/etiquetas";
import { siteConfig } from "@/lib/constants/site";
import { crearMetadata } from "@/lib/seo/metadata";

export const metadata = crearMetadata({
  title: "Emergencias y seguridad",
  description:
    "Teléfonos de emergencia, comisarías, Serenazgo, bomberos y servicios de salud en el distrito de Los Olivos.",
  path: "/emergencias",
});

const ordenTipos: TipoPuntoEmergencia[] = [
  "central",
  "serenazgo",
  "comisaria",
  "bomberos",
  "salud",
];

const iconos: Record<TipoPuntoEmergencia, typeof Siren> = {
  central: Siren,
  serenazgo: ShieldCheck,
  comisaria: ShieldAlert,
  bomberos: Flame,
  salud: HeartPulse,
};

export default async function EmergenciasPage() {
  const puntos = await obtenerPuntosEmergencia();

  const grupos = ordenTipos
    .map((tipo) => ({
      tipo,
      puntos: puntos.filter((punto) => punto.tipo === tipo),
    }))
    .filter((grupo) => grupo.puntos.length > 0);

  return (
    <>
      <PageHero
        eyebrow="Atención inmediata"
        title="Emergencias y seguridad"
        description="Ante una situación de riesgo, llama de inmediato al número correspondiente. No esperes respuesta por correo electrónico ni redes sociales."
        migajas={[{ nombre: "Inicio", href: "/" }, { nombre: "Emergencias" }]}
      >
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="destructive">
            <a href="tel:105">
              <Phone className="size-4" aria-hidden="true" />
              Llamar al 105
            </a>
          </Button>
          <Button asChild variant="outline">
            <a
              href={`https://wa.me/51${siteConfig.whatsappSerenazgo.replace(/\D/g, "")}`}
            >
              WhatsApp Serenazgo
            </a>
          </Button>
        </div>
      </PageHero>

      <div className="py-10">
        <Container className="space-y-10">
          <Alert variant="destructive">
            <Siren className="size-4" aria-hidden="true" />
            <AlertTitle>Emergencias en curso</AlertTitle>
            <AlertDescription>
              Delitos en flagrancia: 105 · Incendios y rescates: 116 · Emergencias
              médicas: 106. Indica tu ubicación exacta y una referencia cercana.
            </AlertDescription>
          </Alert>

          {grupos.map((grupo) => {
            const Icono = iconos[grupo.tipo];

            return (
              <section key={grupo.tipo} aria-labelledby={`grupo-${grupo.tipo}`}>
                <h2
                  id={`grupo-${grupo.tipo}`}
                  className="mb-4 flex items-center gap-2 text-xl font-bold text-brand-dark"
                >
                  <Icono className="size-5 text-brand" aria-hidden="true" />
                  {etiquetasTipoPuntoEmergencia[grupo.tipo]}
                </h2>
                <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {grupo.puntos.map((punto) => (
                    <li key={punto.id}>
                      <article className="flex h-full flex-col gap-2 rounded-xl border bg-card p-4 shadow-xs">
                        <h3 className="text-base leading-snug font-semibold text-brand-dark">
                          {punto.nombre}
                        </h3>

                        <a
                          href={`tel:${punto.telefono.replace(/[^\d+]/g, "")}`}
                          className="inline-flex w-fit items-center gap-2 text-lg font-bold text-brand-strong hover:underline"
                        >
                          <Phone className="size-4" aria-hidden="true" />
                          {punto.telefono}
                        </a>

                        {punto.telefonoAlterno ? (
                          <a
                            href={`tel:${punto.telefonoAlterno.replace(/[^\d+]/g, "")}`}
                            className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-brand-strong hover:underline"
                          >
                            <Phone className="size-3.5" aria-hidden="true" />
                            {punto.telefonoAlterno}
                          </a>
                        ) : null}

                        {punto.direccion ? (
                          <p className="flex items-start gap-2 text-sm text-muted-foreground">
                            <MapPin
                              className="mt-0.5 size-4 shrink-0 text-brand"
                              aria-hidden="true"
                            />
                            {punto.direccion}
                          </p>
                        ) : null}

                        {punto.horario ? (
                          <p className="text-xs text-muted-foreground">{punto.horario}</p>
                        ) : null}

                        {punto.nota ? (
                          <p className="mt-auto border-t pt-2 text-xs text-muted-foreground">
                            {punto.nota}
                          </p>
                        ) : null}
                      </article>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}

          <section aria-labelledby="recomendaciones">
            <h2 id="recomendaciones" className="text-xl font-bold text-brand-dark">
              Recomendaciones al reportar una emergencia
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                "Mantén la calma e indica la dirección exacta con una referencia visible.",
                "Describe qué ocurre, cuántas personas están involucradas y si hay heridos.",
                "No cortes la llamada hasta que el operador te lo indique.",
                "Si puedes, permanece en un lugar seguro y no intervengas directamente.",
                "Para reportes de seguridad, usa la aplicación Los Olivos Seguro.",
                "Guarda los números de tu comisaría más cercana en tu teléfono.",
              ].map((recomendacion) => (
                <li
                  key={recomendacion}
                  className="flex items-start gap-2 rounded-xl border bg-card p-3 text-sm text-brand-dark shadow-xs"
                >
                  <ShieldCheck
                    className="mt-0.5 size-4 shrink-0 text-brand"
                    aria-hidden="true"
                  />
                  {recomendacion}
                </li>
              ))}
            </ul>
          </section>

          <div className="flex flex-wrap gap-3">
            <Button asChild variant="outline">
              <Link href="/contacto">Otros canales de contacto</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/preguntas-frecuentes">Preguntas frecuentes</Link>
            </Button>
          </div>
        </Container>
      </div>
    </>
  );
}
