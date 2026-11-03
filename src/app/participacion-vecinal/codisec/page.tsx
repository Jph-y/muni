import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  Download,
  Handshake,
  MapPin,
  Users,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { AvatarIniciales } from "@/components/shared/avatar-iniciales";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { obtenerParticipacionVecinal } from "@/lib/api/contenido";
import { formatearFechaLarga } from "@/lib/format";
import { crearMetadata } from "@/lib/seo/metadata";

export const metadata = crearMetadata({
  title: "CODISE",
  description:
    "Consejo de Desarrollo Económico, Social e Institucional de Los Olivos: integrantes, funciones y documentos.",
  path: "/participacion-vecinal/codisec",
});

const grupos = [
  { tipo: "municipal", titulo: "Sector municipal" },
  { tipo: "vecinal", titulo: "Sector vecinal" },
  { tipo: "social", titulo: "Sector social" },
] as const;

export default async function CodisecPage() {
  const participacion = await obtenerParticipacionVecinal();

  return (
    <>
      <PageHero
        eyebrow="Participación vecinal"
        title="CODISE"
        description="Consejo de Desarrollo Económico, Social e Institucional: espacio de concertación entre la municipalidad y las organizaciones de la sociedad civil."
        migajas={[
          { nombre: "Inicio", href: "/" },
          { nombre: "Participación vecinal", href: "/participacion-vecinal" },
          { nombre: "CODISE" },
        ]}
      >
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">
            {participacion.miembrosCodisec.length} integrantes
          </Badge>
          <Badge variant="secondary">
            {participacion.funcionesCodisec.length} funciones
          </Badge>
          <Button asChild variant="outline">
            <Link href="/participacion-vecinal/presupuesto-participativo">
              Presupuesto participativo
            </Link>
          </Button>
        </div>
      </PageHero>

      <div className="py-10">
        <Container className="space-y-12">
          <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
            <section aria-label="¿Qué es el CODISE?">
              <SectionHeading
                eyebrow="La institución"
                title="¿Qué es el CODISE?"
                className="mb-4"
              />
              <div className="space-y-3 rounded-xl border bg-card p-5 text-sm leading-relaxed text-muted-foreground shadow-xs">
                <p>
                  El Consejo de Desarrollo Económico, Social e Institucional (CODISE) es
                  el espacio de concertación donde la municipalidad y las organizaciones
                  representativas del distrito coordinan prioridades, evalúan políticas
                  públicas y acompañan la ejecución de los proyectos de inversión.
                </p>
                <p>
                  Está integrado por representantes del sector municipal, de las juntas
                  vecinales y de las organizaciones sociales, quienes participan de forma
                  voluntaria y ad honorem.
                </p>
                <p>
                  Sus acuerdos se adoptan por consenso y se registran en actas que se
                  publican para conocimiento de la ciudadanía.
                </p>
              </div>
            </section>

            <section aria-label="Funciones del CODISE">
              <SectionHeading
                eyebrow="Funciones"
                title="¿Qué hace el CODISE?"
                className="mb-4"
              />
              <ul className="space-y-3 rounded-xl border bg-card p-5 shadow-xs">
                {participacion.funcionesCodisec.map((funcion) => (
                  <li key={funcion} className="flex items-start gap-2 text-sm">
                    <CheckCircle2
                      className="mt-0.5 size-4 shrink-0 text-brand"
                      aria-hidden="true"
                    />
                    <span className="leading-relaxed text-muted-foreground">
                      {funcion}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <section aria-label="Integrantes del CODISE">
            <SectionHeading
              eyebrow="Composición"
              title="Integrantes del CODISE"
              description="Representantes del sector municipal, vecinal y social que conforman el consejo."
              className="mb-6"
            />
            <div className="space-y-8">
              {grupos.map((grupo) => {
                const miembros = participacion.miembrosCodisec.filter(
                  (miembro) => miembro.tipo === grupo.tipo,
                );
                if (miembros.length === 0) return null;

                return (
                  <div key={grupo.tipo}>
                    <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-brand-dark">
                      <Users className="size-4 text-brand" aria-hidden="true" />
                      {grupo.titulo}
                    </h3>
                    <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                      {miembros.map((miembro) => (
                        <li
                          key={miembro.id}
                          className="flex items-start gap-3 rounded-xl border bg-card p-4 shadow-xs"
                        >
                          <AvatarIniciales nombre={miembro.nombre} size="default" />
                          <div>
                            <p className="text-sm font-semibold text-brand-dark">
                              {miembro.nombre}
                            </p>
                            <p className="mt-0.5 text-xs text-muted-foreground">
                              {miembro.cargo}
                            </p>
                            <p className="mt-1 text-xs text-muted-foreground">
                              {miembro.organizacion}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </section>

          <section aria-label="Sesiones del CODISE">
            <div className="grid gap-5 rounded-xl border bg-brand-soft/50 p-6 lg:grid-cols-[1.4fr_1fr]">
              <div>
                <h2 className="text-lg font-semibold text-brand-dark">
                  Sesiones y participación
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Las sesiones ordinarias se realizan el primer jueves de cada mes. Las
                  organizaciones interesadas pueden solicitar participación en la agenda
                  con cinco días hábiles de anticipación.
                </p>
                <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                  <p className="flex items-center gap-2">
                    <CalendarClock className="size-4 text-brand" aria-hidden="true" />
                    Primer jueves del mes, 4:00 p. m.
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="size-4 text-brand" aria-hidden="true" />
                    Sala de Concejo, Palacio Municipal
                  </p>
                  <p className="flex items-center gap-2">
                    <Handshake className="size-4 text-brand" aria-hidden="true" />
                    Participación ad honorem
                  </p>
                  <p className="flex items-center gap-2">
                    <Users className="size-4 text-brand" aria-hidden="true" />
                    {participacion.miembrosCodisec.length} integrantes
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center gap-2">
                <Button asChild className="h-11">
                  <Link href="/contacto">
                    Coordinar participación
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-11">
                  <Link href="/institucional/sedes">Ver sedes municipales</Link>
                </Button>
              </div>
            </div>
          </section>

          <section aria-label="Documentos del CODISE">
            <SectionHeading
              eyebrow="Documentos"
              title="Reglamento y actas"
              description="Documentos que regulan el funcionamiento del consejo y sus acuerdos."
              className="mb-6"
            />
            <ul className="grid gap-3 sm:grid-cols-2">
              {participacion.documentos.map((documento) => (
                <li key={documento.id}>
                  <a
                    href={documento.archivoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-full items-start justify-between gap-3 rounded-xl border bg-card p-4 text-sm shadow-xs hover:shadow-md"
                  >
                    <span>
                      <span className="block font-medium text-brand-dark">
                        {documento.titulo}
                      </span>
                      <span className="mt-1 block text-xs text-muted-foreground">
                        {formatearFechaLarga(documento.fecha)}
                      </span>
                    </span>
                    <Download
                      className="mt-1 size-4 shrink-0 text-brand"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <div className="border-t pt-5">
            <Link
              href="/participacion-vecinal"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-strong hover:underline"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Volver a participación vecinal
            </Link>
          </div>
        </Container>
      </div>
    </>
  );
}
