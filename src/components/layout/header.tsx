import Link from "next/link";
import { Phone, Search, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Logo } from "@/components/layout/logo";
import { MainNav } from "@/components/layout/main-nav";
import { MobileNav } from "@/components/layout/mobile-nav";
import { siteConfig } from "@/lib/constants/site";

const enlacesSuperiores = [
  { label: "Transparencia", href: "/transparencia" },
  { label: "Mesa de partes", href: "/mesa-de-partes" },
  { label: "Libro de reclamaciones", href: "/libro-de-reclamaciones" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="bg-brand-dark text-white">
        <Container className="flex h-9 items-center justify-between gap-4 text-xs">
          <p className="truncate font-medium tracking-wide">
            Portal oficial de la {siteConfig.nombre}
          </p>
          <div className="hidden items-center gap-5 md:flex">
            {enlacesSuperiores.map((enlace) => (
              <Link
                key={enlace.href}
                href={enlace.href}
                className="text-white/80 transition-colors hover:text-white"
              >
                {enlace.label}
              </Link>
            ))}
            <a
              href={`tel:${siteConfig.telefonoCentral}`}
              className="flex items-center gap-1.5 text-white/90 transition-colors hover:text-white"
            >
              <Phone className="size-3.5" aria-hidden="true" />
              {siteConfig.telefonoCentral}
            </a>
          </div>
        </Container>
      </div>

      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
        <Container className="flex h-18 items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-md focus-visible:outline-2"
            aria-label={`${siteConfig.nombre} — Ir al inicio`}
          >
            <Logo />
            <span className="flex flex-col">
              <span className="text-sm leading-tight font-bold tracking-tight text-brand-dark sm:text-base">
                Municipalidad Distrital
              </span>
              <span className="text-sm leading-tight font-semibold text-brand sm:text-base">
                de Los Olivos
              </span>
            </span>
          </Link>

          <div className="hidden xl:block">
            <MainNav />
          </div>

          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="icon-lg" aria-label="Buscar">
              <Link href="/buscar">
                <Search className="size-5" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild className="hidden h-10 gap-2 px-4 text-sm sm:inline-flex">
              <Link href="/mi-cuenta">
                <UserRound className="size-4" aria-hidden="true" />
                Mi cuenta
              </Link>
            </Button>
            <div className="xl:hidden">
              <MobileNav />
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
}
