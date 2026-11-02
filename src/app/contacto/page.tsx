import Link from "next/link";
import { Clock, Mail, MapPin, MessageCircle, Phone, ShieldAlert } from "lucide-react";
import { Container } from "@/components/layout/container";
import { FormularioContacto } from "@/components/contacto/formulario-contacto";
import { MapaSede } from "@/components/institucional/mapa-sede";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { obtenerSedes } from "@/lib/api/contenido";
import { siteConfig } from "@/lib/constants/site";
import { crearMetadata } from "@/lib/seo/metadata";

export const metadata = crearMetadata({
  title: "Contacto",
  description:
    "Canales de atención telefónica, WhatsApp, correo electrónico y atención presencial de la Municipalidad Distrital de Los Olivos.",
  path: "/contacto",
});

const canales = [
  {
    titulo: "Central telefónica",
    valor: siteConfig.telefonoCentral,
    href: `tel:${siteConfig.telefonoCentral.replace(/[^\d+]/g, "")}`,
    descripcion: "Orientación general y derivación a las áreas responsables.",
    icono: Phone,
  },
  {
    titulo: "WhatsApp Serenazgo",
    valor: siteConfig.whatsappSerenazgo,
    href: `https://wa.me/51${siteConfig.whatsappSerenazgo.replace(/\D/g, "")}`,
    descripcion: "Reportes de seguridad y emergencias en el distrito.",
    icono: MessageCircle,
  },
  {
    titulo: "Correo institucional",
    valor: "atencion@munilosolivos.gob.pe",
    href: "mailto:atencion@munilosolivos.gob.pe",
    descripcion: "Consultas documentadas y solicitudes de información.",
    icono: Mail,
  },
  {
    titulo: "Atención presencial",
    valor: siteConfig.direccion,
    href: "/institucional/sedes",
    descripcion: "Palacio Municipal y sedes descentralizadas del distrito.",
    icono: MapPin,
  },
];

const enlaces = [
  { nombre: "Preguntas frecuentes", href: "/preguntas-frecuentes" },
  { nombre: "Emergencias y comisarías", href: "/emergencias" },
  { nombre: "Libro de reclamaciones", href: "/libro-de-reclamaciones" },
  { nombre: "Mesa de partes virtual", href: "/mesa-de-partes" },
];

export default async function ContactoPage() {
  const sedes = await obtenerSedes();
  const principal = sedes.find((sede) => sede.principal) ?? sedes[0];

  return (
    <>
      <PageHero
        eyebrow="Canales de atención"
        title="Contacto"
        description="Comunícate con la municipalidad por el canal que prefieras. Para emergencias, llama a la central de Serenazgo o a la línea 105."
        migajas={[{ nombre: "Inicio", href: "/" }, { nombre: "Contacto" }]}
      />

      <div className="py-10">
        <Container className="grid gap-8 lg:grid-cols-[1fr_22rem]">
          <section aria-labelledby="formulario-contacto">
            <h2 id="formulario-contacto" className="text-2xl font-bold text-brand-dark">
              Escríbenos
            </h2>
            <p className="mt-2 mb-5 text-sm text-muted-foreground">
              Completa el formulario y recibe orientación sobre trámites, servicios o
              tributos. Los campos marcados con error se indican debajo de cada uno.
            </p>
            <div className="rounded-xl border bg-card p-5 shadow-xs">
              <FormularioContacto />
            </div>
          </section>

          <aside className="space-y-4">
            <div className="rounded-xl border bg-card p-5 shadow-xs">
              <h2 className="text-base font-semibold text-brand-dark">
                Canales oficiales
              </h2>
              <ul className="mt-4 space-y-4">
                {canales.map((canal) => (
                  <li key={canal.titulo} className="flex items-start gap-3">
                    <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand-strong">
                      <canal.icono className="size-4" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                        {canal.titulo}
                      </p>
                      <a
                        href={canal.href}
                        className="mt-0.5 block text-sm font-medium break-words text-brand-strong hover:underline"
                      >
                        {canal.valor}
                      </a>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {canal.descripcion}
                      </p>
                    </div>
                  </li>
                ))}
                <li className="flex items-start gap-3">
                  <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand-strong">
                    <Clock className="size-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      Horario de atención
                    </p>
                    <p className="mt-0.5 text-sm text-brand-dark">{siteConfig.horario}</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border bg-brand-soft/60 p-5">
              <h2 className="flex items-center gap-2 text-base font-semibold text-brand-dark">
                <ShieldAlert className="size-4" aria-hidden="true" />
                ¿Es una emergencia?
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Para delitos en flagrancia llama al 105. Para incendios, al 116. Para
                emergencias médicas, al 106.
              </p>
              <Button asChild variant="outline" className="mt-3">
                <Link href="/emergencias">Ver números de emergencia</Link>
              </Button>
            </div>

            <div className="rounded-xl border bg-card p-5 shadow-xs">
              <h2 className="text-base font-semibold text-brand-dark">Enlaces útiles</h2>
              <ul className="mt-3 space-y-2 text-sm">
                {enlaces.map((enlace) => (
                  <li key={enlace.href}>
                    <Link
                      href={enlace.href}
                      className="text-brand-strong hover:underline"
                    >
                      {enlace.nombre}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </Container>

        {principal ? (
          <Container className="mt-12">
            <SectionHeading
              eyebrow="Visítanos"
              title="Cómo llegar al Palacio Municipal"
              description={principal.direccion}
              className="mb-4"
            />
            <MapaSede sede={principal} />
          </Container>
        ) : null}
      </div>
    </>
  );
}
