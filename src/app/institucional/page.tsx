import Link from "next/link";
import {
  ArrowRight,
  Building2,
  FileText,
  Landmark,
  MapPin,
  Network,
  Phone,
  UserRound,
  Users,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { siteConfig } from "@/lib/constants/site";
import { crearMetadata } from "@/lib/seo/metadata";

export const metadata = crearMetadata({
  title: "Información institucional",
  description:
    "Conoce la misión, visión, funciones y datos generales de la Municipalidad Distrital de Los Olivos.",
  path: "/institucional",
});

const secciones = [
  {
    titulo: "Organización",
    descripcion:
      "Gerencias, subgerencias y órganos de asesoría que conforman la municipalidad.",
    href: "/institucional/organizacion",
    icono: Building2,
  },
  {
    titulo: "Autoridades",
    descripcion: "Alcalde y concejo municipal del período 2023 - 2026.",
    href: "/institucional/autoridades",
    icono: Landmark,
  },
  {
    titulo: "Organigrama",
    descripcion: "Estructura orgánica y relaciones de dependencia entre las áreas.",
    href: "/institucional/organigrama",
    icono: Network,
  },
  {
    titulo: "Directorio de funcionarios",
    descripcion: "Contacto directo por área, con correo y teléfono de atención.",
    href: "/institucional/directorio-funcionarios",
    icono: UserRound,
  },
  {
    titulo: "Sedes municipales",
    descripcion: "Ubicación, horarios y servicios de cada sede del distrito.",
    href: "/institucional/sedes",
    icono: MapPin,
  },
  {
    titulo: "Documentos de gestión",
    descripcion: "ROF, MOF, PEI, POI, CAP y otros instrumentos de gestión.",
    href: "/institucional/documentos-de-gestion",
    icono: FileText,
  },
];

const funciones = [
  "Planificar y promover el desarrollo urbano y rural del distrito.",
  "Administrar los tributos municipales y prestar servicios públicos de calidad.",
  "Promover la participación vecinal y la organización de la comunidad.",
  "Ejecutar programas sociales orientados a la infancia, la familia y las personas con discapacidad.",
];

const datosInstitucionales = [
  { etiqueta: "Nombre oficial", valor: siteConfig.nombre },
  { etiqueta: "Tipo de entidad", valor: "Gobierno local" },
  {
    etiqueta: "Jurisdicción",
    valor: "Distrito de Los Olivos, provincia y región Lima",
  },
  { etiqueta: "Sede principal", valor: siteConfig.direccion },
  { etiqueta: "Horario de atención", valor: siteConfig.horario },
  { etiqueta: "Central telefónica", valor: siteConfig.telefonoCentral },
  { etiqueta: "Correo institucional", valor: "munilosolivos@munilosolivos.gob.pe" },
];

export default function InstitucionalPage() {
  return (
    <>
      <PageHero
        eyebrow="Información institucional"
        title="¿Qué hacemos?"
        description="Somos una institución de servicio a la comunidad, cuyo fin es mejorar la calidad de vida de la población olivense a través de la promoción laboral y empresarial, con asistencia en la salud, educación y tecnología."
        migajas={[{ nombre: "Inicio", href: "/" }, { nombre: "Institucional" }]}
      />

      <section className="py-10" aria-labelledby="mision-vision">
        <Container>
          <h2 id="mision-vision" className="sr-only">
            Misión, visión y funciones
          </h2>
          <div className="grid gap-5 md:grid-cols-3">
            <article className="rounded-xl border bg-card p-5 shadow-xs">
              <span className="inline-flex size-11 items-center justify-center rounded-lg bg-brand-soft text-brand-strong">
                <Landmark className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-3 text-lg font-semibold text-brand-dark">Misión</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Servir a la comunidad olivense con una gestión moderna, transparente y
                cercana, que garantice servicios públicos de calidad y promueva el
                desarrollo integral del distrito.
              </p>
            </article>

            <article className="rounded-xl border bg-card p-5 shadow-xs">
              <span className="inline-flex size-11 items-center justify-center rounded-lg bg-gold-soft text-brand-dark">
                <Users className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-3 text-lg font-semibold text-brand-dark">Visión</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Ser una municipalidad referente en Lima Norte por su eficiencia, uso de
                tecnología y compromiso con el bienestar de sus vecinos.
              </p>
            </article>

            <article className="rounded-xl border bg-card p-5 shadow-xs">
              <span className="inline-flex size-11 items-center justify-center rounded-lg bg-brand-soft text-brand-strong">
                <Building2 className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-3 text-lg font-semibold text-brand-dark">Funciones</h3>
              <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-muted-foreground">
                {funciones.slice(0, 3).map((funcion) => (
                  <li key={funcion} className="flex gap-2">
                    <span
                      aria-hidden="true"
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-brand"
                    />
                    {funcion}
                  </li>
                ))}
              </ul>
            </article>
          </div>

          <div className="mt-6 rounded-xl border bg-card p-5 shadow-xs">
            <h3 className="text-lg font-semibold text-brand-dark">Funciones generales</h3>
            <ul className="mt-3 grid gap-2 text-sm leading-relaxed text-muted-foreground sm:grid-cols-2">
              {funciones.map((funcion) => (
                <li key={funcion} className="flex gap-2">
                  <span
                    aria-hidden="true"
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-brand"
                  />
                  {funcion}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-muted-foreground">
              Marco normativo: Ley N.° 27972, Ley Orgánica de Municipalidades.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-y bg-muted/40 py-10">
        <Container>
          <SectionHeading
            eyebrow="Datos generales"
            title="Datos de la entidad"
            description="Información de referencia para trámites, solicitudes y comunicaciones oficiales."
            className="mb-6"
          />
          <dl className="grid gap-x-8 gap-y-4 rounded-xl border bg-card p-5 sm:grid-cols-2">
            {datosInstitucionales.map((dato) => (
              <div
                key={dato.etiqueta}
                className="border-b pb-3 last:border-0 sm:last:border-b"
              >
                <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  {dato.etiqueta}
                </dt>
                <dd className="mt-1 text-sm font-medium text-brand-dark">{dato.valor}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="py-10">
        <Container>
          <SectionHeading
            eyebrow="Explora"
            title="Secciones institucionales"
            description="Accede a la información detallada de la organización municipal."
            className="mb-6"
          />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {secciones.map((seccion) => {
              const Icono = seccion.icono;
              return (
                <li key={seccion.href}>
                  <Link
                    href={seccion.href}
                    className="group flex h-full flex-col gap-2 rounded-xl border bg-card p-5 shadow-xs transition-shadow hover:shadow-md"
                  >
                    <span className="inline-flex size-10 items-center justify-center rounded-lg bg-brand-soft text-brand-strong">
                      <Icono className="size-5" aria-hidden="true" />
                    </span>
                    <span className="mt-1 font-semibold text-brand-dark group-hover:underline">
                      {seccion.titulo}
                    </span>
                    <span className="text-sm leading-relaxed text-muted-foreground">
                      {seccion.descripcion}
                    </span>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-brand-strong">
                      Ver sección
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <section className="pb-12" aria-labelledby="ayuda-institucional">
        <Container>
          <div className="flex flex-col gap-4 rounded-xl border bg-brand-soft/60 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2
                id="ayuda-institucional"
                className="text-lg font-semibold text-brand-dark"
              >
                ¿Necesitas comunicarte con la municipalidad?
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Llama a la central telefónica o revisa los canales de atención
                disponibles.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/contacto"
                className="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                <Phone className="size-4" aria-hidden="true" />
                Canales de atención
              </Link>
              <Link
                href="/emergencias"
                className="inline-flex h-11 items-center gap-2 rounded-lg border bg-background px-4 text-sm font-semibold text-brand-dark hover:bg-muted"
              >
                Emergencias
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
