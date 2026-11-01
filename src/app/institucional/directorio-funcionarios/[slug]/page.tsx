import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Mail, Phone, UserRound } from "lucide-react";
import { Container } from "@/components/layout/container";
import { AvatarIniciales } from "@/components/shared/avatar-iniciales";
import { PageHero } from "@/components/shared/page-hero";
import { Badge } from "@/components/ui/badge";
import {
  obtenerAreasOrganizacionales,
  obtenerFuncionarioPorSlug,
  obtenerFuncionarios,
} from "@/lib/api/contenido";
import { crearMetadata } from "@/lib/seo/metadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const funcionarios = await obtenerFuncionarios();
  return funcionarios.map((funcionario) => ({ slug: funcionario.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const funcionario = await obtenerFuncionarioPorSlug(slug);

  if (!funcionario) {
    return crearMetadata({
      title: "Funcionario no encontrado",
      path: `/institucional/directorio-funcionarios/${slug}`,
      noIndex: true,
    });
  }

  return crearMetadata({
    title: funcionario.nombre,
    description: `${funcionario.cargo} · ${funcionario.area}. Contacto oficial de la Municipalidad Distrital de Los Olivos.`,
    path: `/institucional/directorio-funcionarios/${funcionario.slug}`,
  });
}

export default async function FuncionarioPage({ params }: PageProps) {
  const { slug } = await params;
  const [funcionario, areas, funcionarios] = await Promise.all([
    obtenerFuncionarioPorSlug(slug),
    obtenerAreasOrganizacionales(),
    obtenerFuncionarios(),
  ]);

  if (!funcionario) notFound();

  const area = areas.find((item) => item.slug === funcionario.slug);
  const relacionados = funcionarios
    .filter((item) => item.id !== funcionario.id && item.area === funcionario.area)
    .slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={funcionario.area}
        title={funcionario.nombre}
        description={funcionario.cargo}
        migajas={[
          { nombre: "Inicio", href: "/" },
          { nombre: "Institucional", href: "/institucional" },
          {
            nombre: "Directorio",
            href: "/institucional/directorio-funcionarios",
          },
          { nombre: funcionario.nombre },
        ]}
      />

      <div className="py-10">
        <Container className="grid gap-6 lg:grid-cols-[1fr_22rem]">
          <div className="space-y-6">
            <article className="rounded-xl border bg-card p-5 shadow-xs">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <AvatarIniciales
                  nombre={funcionario.nombre}
                  className="size-16 text-xl"
                />
                <div>
                  <h2 className="text-xl font-bold text-brand-dark">
                    {funcionario.nombre}
                  </h2>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {funcionario.cargo}
                  </p>
                  <Badge variant="secondary" className="mt-2">
                    {funcionario.area}
                  </Badge>
                </div>
              </div>

              <dl className="mt-5 grid gap-3 border-t pt-4 sm:grid-cols-2">
                {funcionario.dependencia ? (
                  <div>
                    <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      Dependencia
                    </dt>
                    <dd className="mt-0.5 text-sm text-brand-dark">
                      {funcionario.dependencia}
                    </dd>
                  </div>
                ) : null}
                {funcionario.atencion ? (
                  <div>
                    <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      Horario de atención
                    </dt>
                    <dd className="mt-0.5 flex items-start gap-1.5 text-sm text-brand-dark">
                      <Clock
                        className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                        aria-hidden="true"
                      />
                      {funcionario.atencion}
                    </dd>
                  </div>
                ) : null}
              </dl>
            </article>

            {area ? (
              <article className="rounded-xl border bg-card p-5 shadow-xs">
                <h2 className="text-lg font-semibold text-brand-dark">
                  Funciones del área
                </h2>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
                  {area.funciones.map((funcion) => (
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
            ) : null}

            {relacionados.length > 0 ? (
              <section aria-labelledby="relacionados">
                <h2 id="relacionados" className="text-lg font-semibold text-brand-dark">
                  Otras áreas relacionadas
                </h2>
                <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                  {relacionados.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={`/institucional/directorio-funcionarios/${item.slug}`}
                        className="flex h-full items-start gap-3 rounded-xl border bg-card p-3 text-sm shadow-xs hover:shadow-md"
                      >
                        <AvatarIniciales nombre={item.nombre} size="default" />
                        <span className="min-w-0">
                          <span className="block font-semibold text-brand-dark">
                            {item.nombre}
                          </span>
                          <span className="mt-0.5 block text-xs text-muted-foreground">
                            {item.cargo}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>

          <aside className="space-y-4">
            <div className="rounded-xl border bg-card p-5 shadow-xs">
              <h2 className="text-base font-semibold text-brand-dark">
                Datos de contacto
              </h2>
              <ul className="mt-3 space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <Mail
                    className="mt-0.5 size-4 shrink-0 text-brand"
                    aria-hidden="true"
                  />
                  <a
                    href={`mailto:${funcionario.correo}`}
                    className="break-all text-brand-strong hover:underline"
                  >
                    {funcionario.correo}
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <Phone
                    className="mt-0.5 size-4 shrink-0 text-brand"
                    aria-hidden="true"
                  />
                  <a
                    href={`tel:${funcionario.telefono.replace(/[^\d+]/g, "")}`}
                    className="text-brand-strong hover:underline"
                  >
                    {funcionario.telefono}
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <UserRound
                    className="mt-0.5 size-4 shrink-0 text-brand"
                    aria-hidden="true"
                  />
                  <span className="text-muted-foreground">
                    {funcionario.dependencia ?? "Municipalidad de Los Olivos"}
                  </span>
                </li>
              </ul>
            </div>

            <Link
              href="/institucional/directorio-funcionarios"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-strong hover:underline"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Volver al directorio
            </Link>
          </aside>
        </Container>
      </div>
    </>
  );
}
