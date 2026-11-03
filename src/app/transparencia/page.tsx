import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CalendarClock,
  ExternalLink,
  FileSpreadsheet,
  FileText,
  Info,
  Landmark,
  Mail,
  MapPin,
  Phone,
  ReceiptText,
  Scale,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { TarjetaIndicador } from "@/components/transparencia/tarjeta-indicador";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  obtenerContrataciones,
  obtenerPlanillas,
  obtenerPresupuestos,
} from "@/lib/api/contenido";
import { enlacesExternos, siteConfig } from "@/lib/constants/site";
import { formatearFecha, formatearMoneda } from "@/lib/format";
import { crearMetadata } from "@/lib/seo/metadata";
import {
  calcularPorcentaje,
  calcularTotalTrabajadores,
  sumarMontosContrataciones,
} from "@/lib/transparencia/filtros";

export const metadata = crearMetadata({
  title: "Portal de Transparencia",
  description:
    "Presupuesto, contrataciones, plan operativo, planilla y acceso a la información pública de la Municipalidad Distrital de Los Olivos.",
  path: "/transparencia",
});

const secciones = [
  {
    href: "/transparencia/presupuesto",
    titulo: "Presupuesto y ejecución",
    descripcion:
      "Ingresos, gastos y avance de ejecución por rubro de los últimos tres años.",
    icono: BarChart3,
  },
  {
    href: "/transparencia/contrataciones",
    titulo: "Contrataciones y adquisiciones",
    descripcion:
      "Procesos de bienes, servicios, obras y consultorías con sus montos y estados.",
    icono: ReceiptText,
  },
  {
    href: "/transparencia/poi",
    titulo: "Plan Operativo Institucional",
    descripcion: "Actividades, metas físicas y avance presupuestal del POI vigente.",
    icono: FileSpreadsheet,
  },
  {
    href: "/transparencia/planilla",
    titulo: "Planilla y personal",
    descripcion: "Número de trabajadores y remuneraciones por régimen laboral y área.",
    icono: Users,
  },
  {
    href: "/transparencia/acceso-a-la-informacion",
    titulo: "Acceso a la información pública",
    descripcion:
      "Procedimiento, plazos y formato para solicitar información en el marco de la Ley 27806.",
    icono: Scale,
  },
];

const publicaciones = [
  {
    titulo: "Presupuesto institucional y ejecución",
    href: "/transparencia/presupuesto",
  },
  {
    titulo: "Procesos de contrataciones y adquisiciones",
    href: "/transparencia/contrataciones",
  },
  {
    titulo: "Plan Operativo Institucional",
    href: "/transparencia/poi",
  },
  {
    titulo: "Planilla y personal",
    href: "/transparencia/planilla",
  },
  {
    titulo: "Solicitud de acceso a la información pública",
    href: "/transparencia/acceso-a-la-informacion",
  },
  {
    titulo: "Normas legales y ordenanzas",
    href: "/normas",
  },
  {
    titulo: "Documentos de gestión",
    href: "/institucional/documentos-de-gestion",
  },
];

export default async function TransparenciaPage() {
  const [presupuestos, contrataciones, planillas] = await Promise.all([
    obtenerPresupuestos(),
    obtenerContrataciones(),
    obtenerPlanillas(),
  ]);

  const presupuesto = presupuestos[0];
  const planilla = planillas[0];
  const portalTransparencia =
    enlacesExternos.find((enlace) => enlace.nombre === "Portal de Transparencia")?.href ??
    "https://www.transparencia.gob.pe/";
  const avanceGastos = presupuesto
    ? calcularPorcentaje(presupuesto.gastos.ejecutado, presupuesto.gastos.monto)
    : 0;
  const montoContratado = sumarMontosContrataciones(contrataciones);
  const trabajadores = planilla ? calcularTotalTrabajadores(planilla.resumen) : 0;

  return (
    <>
      <PageHero
        eyebrow="Gestión transparente"
        title="Portal de Transparencia"
        description="Información pública de la gestión municipal organizada para que puedas consultarla, descargarla y usarla para ejercer tu derecho de control ciudadano."
        migajas={[{ nombre: "Inicio", href: "/" }, { nombre: "Transparencia" }]}
      >
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">Ley 27806</Badge>
          {presupuesto ? (
            <Badge variant="secondary">
              Actualizado al {formatearFecha(presupuesto.actualizado)}
            </Badge>
          ) : null}
          <Button asChild variant="outline">
            <Link href="/transparencia/acceso-a-la-informacion">
              Solicitar información
            </Link>
          </Button>
        </div>
      </PageHero>

      <div className="py-10">
        <Container className="space-y-12">
          <Alert>
            <ShieldCheck className="size-4" aria-hidden="true" />
            <AlertTitle>Portal de Transparencia Estándar</AlertTitle>
            <AlertDescription>
              La municipalidad también publica la información obligatoria en el Portal de
              Transparencia Estándar del Estado peruano.
            </AlertDescription>
            <div className="mt-3">
              <Button asChild size="sm">
                <a href={portalTransparencia} target="_blank" rel="noopener noreferrer">
                  Ir al portal nacional
                  <ExternalLink className="size-4" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </Alert>

          <section aria-label="Cifras clave de la gestión">
            <SectionHeading
              eyebrow="Resumen"
              title="Cifras clave de la gestión"
              description="Indicadores generales al último corte publicado."
              className="mb-6"
            />
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <TarjetaIndicador
                titulo="Presupuesto 2026"
                valor={presupuesto ? formatearMoneda(presupuesto.gastos.monto) : "—"}
                detalle="Presupuesto institucional de gastos"
                icono={<Landmark className="size-5" aria-hidden="true" />}
              />
              <TarjetaIndicador
                titulo="Ejecución de gastos"
                valor={`${avanceGastos}%`}
                detalle={
                  presupuesto
                    ? `${formatearMoneda(presupuesto.gastos.ejecutado)} ejecutados`
                    : undefined
                }
                icono={<BarChart3 className="size-5" aria-hidden="true" />}
              />
              <TarjetaIndicador
                titulo="Procesos de contratación"
                valor={String(contrataciones.length)}
                detalle={`${formatearMoneda(montoContratado)} en procesos registrados`}
                icono={<ReceiptText className="size-5" aria-hidden="true" />}
              />
              <TarjetaIndicador
                titulo="Trabajadores"
                valor={String(trabajadores)}
                detalle="Personal bajo todos los regímenes"
                icono={<Users className="size-5" aria-hidden="true" />}
              />
            </div>
          </section>

          <section aria-label="Secciones del portal de transparencia">
            <SectionHeading
              eyebrow="Consulta"
              title="Información disponible"
              description="Accede a cada sección para revisar los datos completos y los documentos descargables."
              className="mb-6"
            />
            <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {secciones.map((seccion) => {
                const Icono = seccion.icono;
                return (
                  <li key={seccion.href}>
                    <Link
                      href={seccion.href}
                      className="flex h-full flex-col rounded-xl border bg-card p-5 shadow-xs transition-shadow hover:shadow-md"
                    >
                      <span className="inline-flex size-11 items-center justify-center rounded-full bg-brand-soft text-brand-strong">
                        <Icono className="size-5" aria-hidden="true" />
                      </span>
                      <h3 className="mt-4 text-base font-semibold text-brand-dark">
                        {seccion.titulo}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {seccion.descripcion}
                      </p>
                      <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-brand-strong">
                        Ver detalle
                        <ArrowRight className="size-4" aria-hidden="true" />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>

          <section aria-label="Información que publicamos">
            <SectionHeading
              eyebrow="Obligaciones"
              title="Información que publicamos"
              description="Contenidos exigidos por la normativa de transparencia y acceso a la información pública."
              className="mb-6"
            />
            <div className="rounded-xl border bg-card p-5 shadow-xs">
              <ul className="grid gap-3 sm:grid-cols-2">
                {publicaciones.map((publicacion) => (
                  <li key={publicacion.href}>
                    <Link
                      href={publicacion.href}
                      className="flex items-center justify-between gap-3 rounded-lg border border-transparent px-3 py-2 text-sm hover:border-border hover:bg-muted/60"
                    >
                      <span className="flex items-center gap-2">
                        <FileText
                          className="size-4 shrink-0 text-brand"
                          aria-hidden="true"
                        />
                        {publicacion.titulo}
                      </span>
                      <ArrowRight
                        className="size-4 shrink-0 text-muted-foreground"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section aria-label="Contacto de transparencia">
            <div className="grid gap-5 rounded-xl border bg-brand-soft/50 p-6 lg:grid-cols-[1.4fr_1fr]">
              <div>
                <h2 className="text-lg font-semibold text-brand-dark">
                  Oficina de Transparencia y Acceso a la Información
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Atendemos solicitudes de información pública y consultas sobre la
                  información publicada en este portal.
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
                  <Link href="/transparencia/acceso-a-la-informacion">
                    Cómo solicitar información
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-11">
                  <Link href="/contacto">Canales de atención</Link>
                </Button>
              </div>
            </div>
          </section>

          <Alert>
            <Info className="size-4" aria-hidden="true" />
            <AlertTitle>Sobre los datos publicados</AlertTitle>
            <AlertDescription>
              La información de este prototipo es demostrativa y se actualizará con los
              datos oficiales cuando se integre la API de la municipalidad. Para consultas
              oficiales, acude a la Oficina de Transparencia.
            </AlertDescription>
          </Alert>
        </Container>
      </div>
    </>
  );
}
