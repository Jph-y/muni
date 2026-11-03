import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  Gift,
  MapPin,
  Phone,
  Target,
  Users,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/shared/page-hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { obtenerProgramaPorSlug, obtenerProgramas } from "@/lib/api/contenido";
import { etiquetasCategoriaPrograma } from "@/lib/constants/etiquetas";
import { crearMetadata } from "@/lib/seo/metadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const programas = await obtenerProgramas();
  return programas.map((programa) => ({ slug: programa.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const programa = await obtenerProgramaPorSlug(slug);

  if (!programa) {
    return crearMetadata({
      title: "Programa no encontrado",
      path: `/programas/${slug}`,
      noIndex: true,
    });
  }

  return crearMetadata({
    title: programa.nombre,
    description: programa.descripcion,
    path: `/programas/${programa.slug}`,
  });
}

export default async function ProgramaPage({ params }: PageProps) {
  const { slug } = await params;
  const [programa, programas] = await Promise.all([
    obtenerProgramaPorSlug(slug),
    obtenerProgramas(),
  ]);

  if (!programa) notFound();

  const otros = programas
    .filter((item) => item.id !== programa.id)
    .sort((a, b) => {
      const mismaCategoria =
        Number(b.categoria === programa.categoria) -
        Number(a.categoria === programa.categoria);
      return mismaCategoria || a.nombre.localeCompare(b.nombre, "es");
    })
    .slice(0, 4);

  return (
    <>
      <PageHero
        eyebrow="Programas sociales"
        title={programa.nombre}
        description={programa.descripcion}
        migajas={[
          { nombre: "Inicio", href: "/" },
          { nombre: "Programas sociales", href: "/programas" },
          { nombre: programa.nombre },
        ]}
      >
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">
            {etiquetasCategoriaPrograma[programa.categoria]}
          </Badge>
          <Badge variant="outline">
            {programa.enLinea ? "Inscripción en línea" : "Inscripción presencial"}
          </Badge>
        </div>
      </PageHero>

      <div className="py-10">
        <Container className="grid gap-8 lg:grid-cols-[1fr_20rem]">
          <div className="space-y-8">
            <section aria-label="Dirigido a">
              <div className="flex items-start gap-3 rounded-xl border bg-brand-soft/50 p-5">
                <Users className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden="true" />
                <div>
                  <h2 className="text-sm font-semibold text-brand-dark">Dirigido a</h2>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {programa.dirigidoA}
                  </p>
                </div>
              </div>
            </section>

            <section aria-label="Objetivos del programa">
              <h2 className="text-lg font-semibold text-brand-dark">Objetivos</h2>
              <ul className="mt-3 space-y-3">
                {programa.objetivos.map((objetivo) => (
                  <li key={objetivo} className="flex items-start gap-2 text-sm">
                    <Target
                      className="mt-0.5 size-4 shrink-0 text-brand"
                      aria-hidden="true"
                    />
                    <span className="leading-relaxed text-muted-foreground">
                      {objetivo}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-label="Beneficios del programa">
              <h2 className="text-lg font-semibold text-brand-dark">Beneficios</h2>
              <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                {programa.beneficios.map((beneficio) => (
                  <li
                    key={beneficio}
                    className="flex items-start gap-2 rounded-xl border bg-card p-4 text-sm shadow-xs"
                  >
                    <Gift
                      className="mt-0.5 size-4 shrink-0 text-brand"
                      aria-hidden="true"
                    />
                    <span className="leading-relaxed text-muted-foreground">
                      {beneficio}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-label="Requisitos del programa">
              <h2 className="text-lg font-semibold text-brand-dark">Requisitos</h2>
              <ul className="mt-3 space-y-3 rounded-xl border bg-card p-5 shadow-xs">
                {programa.requisitos.map((requisito) => (
                  <li key={requisito} className="flex items-start gap-2 text-sm">
                    <CheckCircle2
                      className="mt-0.5 size-4 shrink-0 text-brand"
                      aria-hidden="true"
                    />
                    <span className="leading-relaxed text-muted-foreground">
                      {requisito}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-5">
              <Link
                href="/programas"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-strong hover:underline"
              >
                <ArrowLeft className="size-4" aria-hidden="true" />
                Volver a programas
              </Link>
              <Button asChild>
                <Link href="/contacto">
                  Consultar por este programa
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-xl border bg-card p-5 shadow-xs">
              <h2 className="text-base font-semibold text-brand-dark">
                Datos de atención
              </h2>
              <dl className="mt-4 space-y-4 text-sm">
                <div>
                  <dt className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    <CalendarClock className="size-4 text-brand" aria-hidden="true" />
                    Horario
                  </dt>
                  <dd className="mt-1 text-brand-dark">{programa.horario}</dd>
                </div>
                <div>
                  <dt className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    <MapPin className="size-4 text-brand" aria-hidden="true" />
                    Sede
                  </dt>
                  <dd className="mt-1 text-brand-dark">
                    {programa.sedeSlug ? (
                      <Link
                        href={`/institucional/sedes/${programa.sedeSlug}`}
                        className="font-medium hover:underline"
                      >
                        {programa.sede}
                      </Link>
                    ) : (
                      programa.sede
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    <Phone className="size-4 text-brand" aria-hidden="true" />
                    Contacto
                  </dt>
                  <dd className="mt-1 text-brand-dark">{programa.contacto}</dd>
                </div>
              </dl>
              <div className="mt-5 flex flex-col gap-2 border-t pt-4">
                <Button asChild className="h-11">
                  <Link href="/contacto">Solicitar información</Link>
                </Button>
                <Button asChild variant="outline" className="h-11">
                  <Link href="/programas">Ver todos los programas</Link>
                </Button>
              </div>
            </div>

            {otros.length > 0 ? (
              <section aria-label="Otros programas">
                <h2 className="text-base font-semibold text-brand-dark">
                  Otros programas
                </h2>
                <ul className="mt-3 space-y-2">
                  {otros.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={`/programas/${item.slug}`}
                        className="flex items-center justify-between gap-3 rounded-xl border bg-card p-3 text-sm shadow-xs hover:shadow-md"
                      >
                        <span>
                          <span className="block font-medium text-brand-dark">
                            {item.nombre}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {etiquetasCategoriaPrograma[item.categoria]}
                          </span>
                        </span>
                        <ArrowRight
                          className="size-4 shrink-0 text-brand"
                          aria-hidden="true"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </aside>
        </Container>
      </div>
    </>
  );
}
