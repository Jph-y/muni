import Link from "next/link";
import { cacheLife } from "next/cache";
import { MapPin, Phone } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Logo } from "@/components/layout/logo";
import { enlacesPieDePagina } from "@/lib/constants/navegacion";
import { siteConfig } from "@/lib/constants/site";

function IconoFacebook({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M13.5 21v-7h2.4l.4-2.8h-2.8V9.4c0-.8.2-1.4 1.4-1.4h1.5V5.5c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2H8v2.8h2.5v7h3Z" />
    </svg>
  );
}

function IconoX({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.5 3h3l-6.6 7.6L21.8 21h-6l-4.7-6.2L5.7 21h-3l7-8.1L2.5 3h6.2l4.3 5.7L17.5 3Zm-1 16h1.6L7.6 4.6H5.9L16.5 19Z" />
    </svg>
  );
}

function IconoInstagram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden="true"
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const redes = [
  { label: "Facebook", href: siteConfig.redes.facebook, Icono: IconoFacebook },
  { label: "X", href: siteConfig.redes.x, Icono: IconoX },
  { label: "Instagram", href: siteConfig.redes.instagram, Icono: IconoInstagram },
];

export async function Footer() {
  "use cache";
  cacheLife("max");

  const anio = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-brand-dark text-white">
      <Container className="py-12">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <Logo className="ring-offset-brand-dark" />
              <span className="flex flex-col">
                <span className="text-base font-bold">Municipalidad Distrital</span>
                <span className="text-base font-semibold text-gold">de Los Olivos</span>
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/75">
              Trabajamos por mejorar la calidad de vida de las familias olivenses con
              servicios municipales cercanos, transparentes y digitales.
            </p>

            <address className="mt-5 space-y-2 text-sm text-white/80 not-italic">
              <span className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                {siteConfig.direccion}
              </span>
              <span className="flex items-center gap-2">
                <Phone className="size-4 shrink-0 text-gold" aria-hidden="true" />
                <a href={`tel:${siteConfig.telefonoCentral}`} className="hover:underline">
                  {siteConfig.telefonoCentral}
                </a>
              </span>
            </address>

            <ul className="mt-5 flex items-center gap-2">
              {redes.map(({ label, href, Icono }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${siteConfig.siglas} en ${label}`}
                    className="inline-flex size-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
                  >
                    <Icono className="size-4" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav
            aria-label="Enlaces del pie de página"
            className="grid grid-cols-2 gap-8 sm:grid-cols-4"
          >
            {enlacesPieDePagina.map((columna) => (
              <div key={columna.titulo}>
                <h2 className="text-sm font-semibold tracking-wide text-gold uppercase">
                  {columna.titulo}
                </h2>
                <ul className="mt-3 space-y-2">
                  {columna.enlaces.map((enlace) => (
                    <li key={enlace.href}>
                      <Link
                        href={enlace.href}
                        className="text-sm text-white/75 transition-colors hover:text-white hover:underline"
                      >
                        {enlace.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-3 py-5 text-xs text-white/60 sm:flex-row">
          <p>
            © {anio} {siteConfig.nombre}. Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/mapa-del-sitio" className="hover:text-white hover:underline">
              Mapa del sitio
            </Link>
            <Link
              href="/preguntas-frecuentes"
              className="hover:text-white hover:underline"
            >
              Preguntas frecuentes
            </Link>
            <Link
              href="/transparencia/acceso-a-la-informacion"
              className="hover:text-white hover:underline"
            >
              Acceso a la información pública
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
