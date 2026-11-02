import Link from "next/link";
import { CalendarDays, Info, Megaphone } from "lucide-react";
import { CampanaCard } from "@/components/campanas/campana-card";
import { CatalogoCampanas } from "@/components/campanas/catalogo-campanas";
import { Container } from "@/components/layout/container";
import { EmptyState } from "@/components/shared/empty-state";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { obtenerCampanas } from "@/lib/api/contenido";
import { agregarEstadoCampanas, contarCampanasPorEstado } from "@/lib/campanas/filtros";
import { obtenerFechaActual } from "@/lib/fechas";
import { crearMetadata } from "@/lib/seo/metadata";

export const metadata = crearMetadata({
  title: "Campañas y eventos",
  description:
    "Campañas tributarias, jornadas de salud, ferias y eventos organizados por la Municipalidad Distrital de Los Olivos.",
  path: "/campanas",
});

const ordenEstado = { vigente: 0, proxima: 1, finalizada: 2 } as const;

export default async function CampanasPage() {
  const [campanas, hoy] = await Promise.all([obtenerCampanas(), obtenerFechaActual()]);
  const conEstado = agregarEstadoCampanas(campanas, hoy);
  const conteo = contarCampanasPorEstado(conEstado);

  const vigentes = conEstado.filter((campana) => campana.estado === "vigente");
  const proximas = conEstado.filter((campana) => campana.estado === "proxima");
  const ordenadas = [...conEstado].sort(
    (a, b) =>
      ordenEstado[a.estado] - ordenEstado[b.estado] || b.inicio.localeCompare(a.inicio),
  );

  return (
    <>
      <PageHero
        eyebrow="Participa"
        title="Campañas y eventos"
        description="Aprovecha las campañas tributarias, jornadas de salud, ferias y actividades gratuitas que la municipalidad organiza para el distrito."
        migajas={[{ nombre: "Inicio", href: "/" }, { nombre: "Campañas y eventos" }]}
      >
        <div className="flex flex-wrap items-center gap-2">
          <Badge>
            {conteo.vigente} {conteo.vigente === 1 ? "vigente" : "vigentes"}
          </Badge>
          {conteo.proxima > 0 ? (
            <Badge variant="secondary">{conteo.proxima} próximas</Badge>
          ) : null}
          <Badge variant="outline">{conteo.finalizada} finalizadas</Badge>
          <Button asChild variant="outline">
            <Link href="/noticias">
              <Megaphone className="size-4" aria-hidden="true" />
              Ver noticias
            </Link>
          </Button>
        </div>
      </PageHero>

      <div className="py-10">
        <Container className="space-y-12">
          <section aria-label="Campañas vigentes">
            <SectionHeading
              eyebrow="Ahora"
              title="Campañas vigentes"
              description="Actividades que puedes aprovechar en este momento."
              className="mb-6"
            />
            {vigentes.length > 0 ? (
              <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {vigentes.map((campana) => (
                  <li key={campana.id}>
                    <CampanaCard campana={campana} />
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState
                titulo="No hay campañas vigentes en este momento"
                descripcion="Revisa las próximas actividades o consulta las campañas que ya finalizaron."
              />
            )}
          </section>

          {proximas.length > 0 ? (
            <section aria-label="Próximas campañas">
              <SectionHeading
                eyebrow="Próximamente"
                title="Próximas campañas"
                description="Actividades programadas que comenzarán en los próximos días."
                className="mb-6"
              />
              <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {proximas.map((campana) => (
                  <li key={campana.id}>
                    <CampanaCard campana={campana} />
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <section aria-label="Todas las campañas">
            <SectionHeading
              eyebrow="Archivo"
              title="Todas las campañas"
              description="Filtra por estado, año o palabra clave para encontrar una campaña."
              className="mb-6"
            />
            <CatalogoCampanas campanas={ordenadas} />
          </section>

          <Alert>
            <Info className="size-4" aria-hidden="true" />
            <AlertTitle>Fechas y horarios</AlertTitle>
            <AlertDescription>
              Las fechas y horarios pueden variar por disposición de la autoridad
              municipal. Te recomendamos confirmar la información en este portal o en la
              central telefónica antes de acudir.
            </AlertDescription>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button asChild variant="outline" size="sm">
                <Link href="/contacto">
                  <CalendarDays className="size-4" aria-hidden="true" />
                  Consultar una campaña
                </Link>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link href="/emergencias">Canales de atención</Link>
              </Button>
            </div>
          </Alert>
        </Container>
      </div>
    </>
  );
}
