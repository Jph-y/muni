import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Download,
  Handshake,
  Landmark,
  Megaphone,
  MessagesSquare,
  Users,
  Wallet,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { TarjetaIndicador } from "@/components/transparencia/tarjeta-indicador";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { obtenerParticipacionVecinal } from "@/lib/api/contenido";
import { formatearFechaLarga, formatearMoneda } from "@/lib/format";
import {
  contarProyectosPorEstado,
  filtrarProyectosPorAnio,
  sumarMontoProyectos,
} from "@/lib/participacion/filtros";
import { crearMetadata } from "@/lib/seo/metadata";

export const metadata = crearMetadata({
  title: "Participación vecinal",
  description:
    "Espacios de participación ciudadana de Los Olivos: presupuesto participativo, CODISE, audiencias y juntas vecinales.",
  path: "/participacion-vecinal",
});

const espacios = [
  {
    href: "/participacion-vecinal/presupuesto-participativo",
    titulo: "Presupuesto participativo",
    descripcion:
      "Proceso mediante el cual las organizaciones vecinales priorizan los proyectos de inversión del distrito.",
    icono: Wallet,
  },
  {
    href: "/participacion-vecinal/codisec",
    titulo: "CODISE",
    descripcion:
      "Consejo de Desarrollo Económico, Social e Institucional que articula a la municipalidad con la sociedad civil.",
    icono: Handshake,
  },
];

const otrosEspacios = [
  {
    titulo: "Audiencias públicas",
    descripcion:
      "Espacios de rendición de cuentas donde la gestión presenta avances y responde consultas de la ciudadanía.",
    icono: Megaphone,
  },
  {
    titulo: "Juntas vecinales",
    descripcion:
      "Organizaciones de base que canalizan las necesidades de cada zona y coordinan con la municipalidad.",
    icono: Users,
  },
  {
    titulo: "Mesas de diálogo",
    descripcion:
      "Instancias temporales para resolver temas específicos con comerciantes, vecinos y organizaciones sociales.",
    icono: MessagesSquare,
  },
];

export default async function ParticipacionVecinalPage() {
  const participacion = await obtenerParticipacionVecinal();
  const proyectos2026 = filtrarProyectosPorAnio(participacion.proyectos, 2026);
  const estados2026 = contarProyectosPorEstado(proyectos2026);
  const monto2026 = sumarMontoProyectos(proyectos2026);
  const convocatoria = participacion.documentos.find((documento) =>
    documento.titulo.toLowerCase().includes("convocatoria"),
  );

  return (
    <>
      <PageHero
        eyebrow="Comunidad"
        title="Participación vecinal"
        description="La gestión municipal se construye con la ciudadanía. Conoce los espacios donde puedes proponer, priorizar y fiscalizar las decisiones del distrito."
        migajas={[{ nombre: "Inicio", href: "/" }, { nombre: "Participación vecinal" }]}
      >
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">
            {participacion.miembrosCodisec.length} integrantes del CODISE
          </Badge>
          {convocatoria ? (
            <Badge variant="secondary">
              Convocatoria publicada el {formatearFechaLarga(convocatoria.fecha)}
            </Badge>
          ) : null}
          <Button asChild variant="outline">
            <Link href="/participacion-vecinal/presupuesto-participativo">
              Presupuesto participativo
            </Link>
          </Button>
        </div>
      </PageHero>

      <div className="py-10">
        <Container className="space-y-12">
          <section aria-label="Indicadores de participación">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <TarjetaIndicador
                titulo="Proyectos 2026"
                valor={String(proyectos2026.length)}
                detalle={`${estados2026["en-ejecucion"]} en ejecución`}
                icono={<Landmark className="size-5" aria-hidden="true" />}
              />
              <TarjetaIndicador
                titulo="Monto priorizado"
                valor={formatearMoneda(monto2026)}
                detalle="Proyectos del presupuesto participativo"
                icono={<Wallet className="size-5" aria-hidden="true" />}
              />
              <TarjetaIndicador
                titulo="Proyectos culminados"
                valor={String(estados2026.culminado)}
                detalle="Ejecutados en el presente año"
                icono={<Building2 className="size-5" aria-hidden="true" />}
              />
              <TarjetaIndicador
                titulo="Integrantes CODISE"
                valor={String(participacion.miembrosCodisec.length)}
                detalle="Sector municipal, vecinal y social"
                icono={<Users className="size-5" aria-hidden="true" />}
              />
            </div>
          </section>

          <section aria-label="Espacios de participación">
            <SectionHeading
              eyebrow="Participa"
              title="Espacios de participación"
              description="Canales formales para que las organizaciones y vecinos incidan en la gestión municipal."
              className="mb-6"
            />
            <ul className="grid gap-5 lg:grid-cols-2">
              {espacios.map((espacio) => {
                const Icono = espacio.icono;
                return (
                  <li key={espacio.href}>
                    <Link
                      href={espacio.href}
                      className="flex h-full flex-col rounded-xl border bg-card p-6 shadow-xs transition-shadow hover:shadow-md"
                    >
                      <span className="inline-flex size-11 items-center justify-center rounded-full bg-brand-soft text-brand-strong">
                        <Icono className="size-5" aria-hidden="true" />
                      </span>
                      <h3 className="mt-4 text-lg font-semibold text-brand-dark">
                        {espacio.titulo}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {espacio.descripcion}
                      </p>
                      <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-brand-strong">
                        Conocer más
                        <ArrowRight className="size-4" aria-hidden="true" />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>

          <section aria-label="Otros espacios de participación">
            <SectionHeading
              eyebrow="También puedes participar"
              title="Otros espacios de diálogo"
              description="Instancias permanentes y temporales de coordinación con la ciudadanía."
              className="mb-6"
            />
            <ul className="grid gap-4 sm:grid-cols-3">
              {otrosEspacios.map((espacio) => {
                const Icono = espacio.icono;
                return (
                  <li
                    key={espacio.titulo}
                    className="rounded-xl border bg-card p-5 shadow-xs"
                  >
                    <Icono className="size-5 text-brand" aria-hidden="true" />
                    <h3 className="mt-3 text-base font-semibold text-brand-dark">
                      {espacio.titulo}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {espacio.descripcion}
                    </p>
                  </li>
                );
              })}
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">
              Para sumarte a una junta vecinal o participar en una audiencia, acércate a
              la sede municipal o{" "}
              <Link
                href="/contacto"
                className="font-semibold text-brand-strong hover:underline"
              >
                contáctanos
              </Link>
              .
            </p>
          </section>

          <section aria-label="Documentos de participación">
            <SectionHeading
              eyebrow="Documentos"
              title="Documentos del proceso"
              description="Reglamentos, convocatorias y actas de los espacios de participación ciudadana."
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
                      <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                        {documento.descripcion}
                      </span>
                      <span className="mt-2 block text-xs text-muted-foreground">
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

          <div className="rounded-xl border bg-brand-soft/50 p-6">
            <h2 className="text-lg font-semibold text-brand-dark">
              ¿Quieres proponer un proyecto para tu zona?
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Participa en los talleres del presupuesto participativo y presenta las
              necesidades de tu barrio a través de tu junta vecinal. La convocatoria 2027
              ya se encuentra publicada.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button asChild>
                <Link href="/participacion-vecinal/presupuesto-participativo">
                  Ver el proceso
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/contacto">Contactar a la municipalidad</Link>
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
