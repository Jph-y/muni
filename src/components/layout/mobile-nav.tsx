"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Phone } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navegacionPrincipal } from "@/lib/constants/navegacion";
import { siteConfig } from "@/lib/constants/site";

export function MobileNav() {
  const [abierto, setAbierto] = useState(false);

  return (
    <Sheet open={abierto} onOpenChange={setAbierto}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon-lg"
          className="lg:hidden"
          aria-label="Abrir menú de navegación"
        >
          <Menu className="size-5" aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-sm overflow-y-auto p-0">
        <SheetHeader className="border-b px-5 py-4 text-left">
          <SheetTitle className="text-brand-dark">Menú</SheetTitle>
          <SheetDescription>Navega por el portal municipal</SheetDescription>
        </SheetHeader>

        <nav className="px-3 py-2" aria-label="Navegación móvil">
          <Accordion type="multiple" className="w-full">
            {navegacionPrincipal.map((seccion) => (
              <AccordionItem key={seccion.href} value={seccion.href}>
                <AccordionTrigger className="py-3 text-base font-semibold text-brand-dark">
                  {seccion.label}
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-1 pb-2">
                    {seccion.columns.flatMap((columna) =>
                      columna.items.map((item) => (
                        <li key={`${seccion.href}-${item.href}`}>
                          <Link
                            href={item.href}
                            onClick={() => setAbierto(false)}
                            className="block rounded-md px-3 py-2 text-sm hover:bg-brand-soft"
                          >
                            {item.label}
                          </Link>
                        </li>
                      )),
                    )}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-4 space-y-2 border-t pt-4">
            <Button asChild className="h-11 w-full text-base">
              <Link href="/mi-cuenta" onClick={() => setAbierto(false)}>
                Mi cuenta
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-11 w-full text-base">
              <Link href="/tributos" onClick={() => setAbierto(false)}>
                Pagar tributos
              </Link>
            </Button>
            <a
              href={`tel:${siteConfig.telefonoCentral}`}
              className="flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted"
            >
              <Phone className="size-4" aria-hidden="true" />
              {siteConfig.telefonoCentral}
            </a>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
