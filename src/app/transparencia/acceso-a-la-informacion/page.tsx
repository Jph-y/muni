import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  Clock,
  Download,
  FileText,
  Info,
  Mail,
  MapPin,
  Phone,
  Scale,
  Send,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/constants/site";
import { crearMetadata } from "@/lib/seo/metadata";

export const metadata = crearMetadata({
  title: "Acceso a la información pública",
  description:
    "Procedimiento, requisitos y plazos para solicitar información pública a la Municipalidad Distrital de Los Olivos en el marco de la Ley 27806.",
  path: "/transparencia/acceso-a-la-informacion",
});

const pasos = [
  {
    titulo: "Presenta tu solicitud",
    descripcion:
      "Completa el formato de solicitud y preséntalo en mesa de partes, de forma presencial o virtual.",
    icono: Send,
  },
  {
    titulo: "Registro y derivación",
    descripcion:
      "La Oficina de Transparencia registra la solicitud y la deriva al área responsable de la información.",
    icono: FileText,
  },
  {
    titulo: "Evaluación",
    descripcion:
      "El área responsable evalúa la solicitud y prepara la información solicitada dentro del plazo legal.",
    icono: Scale,
  },
  {
    titulo: "Entrega de la información",
    descripcion:
      "Recibes la información por correo electrónico o de forma presencial, según lo hayas indicado.",
    icono: CheckCircle2,
  },
];

const requisitos = [
  "Nombres y apellidos completos del solicitante.",
  "Número de DNI y domicilio.",
  "Correo electrónico o dirección para recibir la respuesta.",
  "Descripción clara y precisa de la información solicitada.",
  "Firma del solicitante en el formato de solicitud.",
];

export default function AccesoInformacionPage() {
  return (
    <>
      <PageHero
        eyebrow="Transparencia"
        title="Acceso a la información pública"
        description="Ejerce tu derecho a solicitar información en poder de la municipalidad. El procedimiento es gratuito y tiene plazos establecidos por ley."
        migajas={[
          { nombre: "Inicio", href: "/" },
          { nombre: "Transparencia", href: "/transparencia" },
          { nombre: "Acceso a la información" },
        ]}
      >
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">Ley 27806</Badge>
          <Badge variant="secondary">Respuesta en 10 días hábiles</Badge>
          <Button asChild variant="outline">
            <a
              href="/documents/transparencia/formato-solicitud-acceso-informacion-publica.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download className="size-4" aria-hidden="true" />
              Descargar formato
            </a>
          </Button>
        </div>
      </PageHero>

      <div className="py-10">
        <Container className="space-y-12">
          <Alert>
            <Info className="size-4" aria-hidden="true" />
            <AlertTitle>Información pública de acceso directo</AlertTitle>
            <AlertDescription>
              Antes de presentar una solicitud, revisa las secciones de presupuesto,
              contrataciones, POI y planilla. La información ya publicada no requiere
              solicitud adicional.
            </AlertDescription>
            <div className="mt-3">
              <Button asChild variant="outline" size="sm">
                <Link href="/transparencia">Ver información publicada</Link>
              </Button>
            </div>
          </Alert>

          <section aria-label="Procedimiento para solicitar información">
            <SectionHeading
              eyebrow="Procedimiento"
              title="¿Cómo solicitar información?"
              description="Sigue estos cuatro pasos para presentar y dar seguimiento a tu solicitud."
              className="mb-6"
            />
            <ol className="grid gap-4 sm:grid-cols-2">
              {pasos.map((paso, indice) => {
                const Icono = paso.icono;
                return (
                  <li
                    key={paso.titulo}
                    className="rounded-xl border bg-card p-5 shadow-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="inline-flex size-9 items-center justify-center rounded-full bg-brand-soft text-brand-strong">
                        <Icono className="size-5" aria-hidden="true" />
                      </span>
                      <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                        Paso {indice + 1}
                      </p>
                    </div>
                    <h3 className="mt-3 text-base font-semibold text-brand-dark">
                      {paso.titulo}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {paso.descripcion}
                    </p>
                  </li>
                );
              })}
            </ol>
          </section>

          <div className="grid gap-6 lg:grid-cols-2">
            <section aria-label="Requisitos de la solicitud">
              <SectionHeading
                eyebrow="Requisitos"
                title="¿Qué debe contener tu solicitud?"
                className="mb-4"
              />
              <ul className="space-y-3 rounded-xl border bg-card p-5 shadow-xs">
                {requisitos.map((requisito) => (
                  <li key={requisito} className="flex items-start gap-2 text-sm">
                    <CheckCircle2
                      className="mt-0.5 size-4 shrink-0 text-brand"
                      aria-hidden="true"
                    />
                    {requisito}
                  </li>
                ))}
              </ul>
            </section>

            <section aria-label="Plazos y costos">
              <SectionHeading eyebrow="Plazos" title="Plazos y costos" className="mb-4" />
              <div className="space-y-4 rounded-xl border bg-card p-5 shadow-xs">
                <div className="flex items-start gap-3">
                  <Clock
                    className="mt-0.5 size-5 shrink-0 text-brand"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-medium text-brand-dark">Plazo de respuesta</p>
                    <p className="text-sm text-muted-foreground">
                      10 días hábiles, prorrogables por 5 días hábiles adicionales cuando
                      la información lo requiera.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Scale
                    className="mt-0.5 size-5 shrink-0 text-brand"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-medium text-brand-dark">Costo</p>
                    <p className="text-sm text-muted-foreground">
                      El acceso es gratuito. Solo se cobra el costo de reproducción cuando
                      la información se entrega en formato físico.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CalendarClock
                    className="mt-0.5 size-5 shrink-0 text-brand"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-medium text-brand-dark">Información reservada</p>
                    <p className="text-sm text-muted-foreground">
                      La información clasificada como reservada o confidencial se
                      encuentra excluida del acceso, conforme a la ley.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <section aria-label="Presentación de la solicitud">
            <div className="grid gap-5 rounded-xl border bg-brand-soft/50 p-6 lg:grid-cols-[1.4fr_1fr]">
              <div>
                <h2 className="text-lg font-semibold text-brand-dark">
                  Presenta tu solicitud
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Puedes presentar el formato en la mesa de partes virtual o en la sede
                  central. Conserva el cargo o código de expediente para dar seguimiento.
                </p>
                <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                  <p className="flex items-center gap-2">
                    <MapPin className="size-4 text-brand" aria-hidden="true" />
                    {siteConfig.direccion}
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="size-4 text-brand" aria-hidden="true" />
                    {siteConfig.telefonoCentral}
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="size-4 text-brand" aria-hidden="true" />
                    transparencia@munilosolivos.gob.pe
                  </p>
                  <p className="flex items-center gap-2">
                    <CalendarClock className="size-4 text-brand" aria-hidden="true" />
                    Lunes a viernes, 8:30 a. m. a 4:30 p. m.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center gap-2">
                <Button asChild className="h-11">
                  <Link href="/mesa-de-partes">
                    Ir a mesa de partes
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-11">
                  <a
                    href="/documents/transparencia/formato-solicitud-acceso-informacion-publica.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download className="size-4" aria-hidden="true" />
                    Descargar formato
                  </a>
                </Button>
              </div>
            </div>
          </section>

          <Alert>
            <Scale className="size-4" aria-hidden="true" />
            <AlertTitle>Base legal</AlertTitle>
            <AlertDescription>
              Ley 27806, Ley de Transparencia y Acceso a la Información Pública, y su
              Texto Único Ordenado aprobado por Decreto Supremo 043-2003-PCM.
            </AlertDescription>
          </Alert>

          <div className="border-t pt-5">
            <Link
              href="/transparencia"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-strong hover:underline"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Volver al portal de transparencia
            </Link>
          </div>
        </Container>
      </div>
    </>
  );
}
