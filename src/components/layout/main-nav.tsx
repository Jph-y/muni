"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { navegacionPrincipal } from "@/lib/constants/navegacion";

export function MainNav() {
  return (
    <NavigationMenu viewport={false} className="max-w-none">
      <NavigationMenuList className="gap-1">
        {navegacionPrincipal.map((seccion) => (
          <NavigationMenuItem key={seccion.href}>
            <NavigationMenuTrigger className="h-11 bg-transparent px-3 text-[0.95rem] font-medium text-foreground/80 data-[state=open]:bg-brand-soft data-[state=open]:text-brand-dark">
              {seccion.label}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="w-[44rem] p-6">
                <div className="grid gap-8 md:grid-cols-2">
                  {seccion.columns.map((columna) => (
                    <div key={columna.title}>
                      <p className="mb-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                        {columna.title}
                      </p>
                      <ul className="space-y-1">
                        {columna.items.map((item) => (
                          <li key={item.href}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={item.href}
                                className="block rounded-md p-2 transition-colors hover:bg-brand-soft focus-visible:bg-brand-soft"
                              >
                                <span className="block text-sm font-semibold text-brand-dark">
                                  {item.label}
                                </span>
                                {item.description ? (
                                  <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
                                    {item.description}
                                  </span>
                                ) : null}
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="mt-5 border-t pt-4">
                  <Link
                    href={seccion.href}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-strong hover:underline"
                  >
                    Ver todo sobre {seccion.label.toLowerCase()}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
