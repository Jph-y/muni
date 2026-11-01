import Link from "next/link";
import {
  FileText,
  Landmark,
  MessageSquareWarning,
  Search,
  Store,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { enlacesRapidos } from "@/lib/constants/navegacion";

const iconos: Record<string, LucideIcon> = {
  wallet: Wallet,
  "file-text": FileText,
  search: Search,
  "message-square-warning": MessageSquareWarning,
  store: Store,
  landmark: Landmark,
};

export function QuickAccess() {
  return (
    <section aria-labelledby="accesos-rapidos" className="bg-brand-soft/60 py-10">
      <Container>
        <h2 id="accesos-rapidos" className="sr-only">
          Accesos rápidos
        </h2>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {enlacesRapidos.map((enlace) => {
            const Icono = iconos[enlace.icono] ?? FileText;

            return (
              <li key={enlace.href}>
                <Link
                  href={enlace.href}
                  className="group flex h-full flex-col gap-2 rounded-xl border bg-card p-4 shadow-xs transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md"
                >
                  <span className="inline-flex size-10 items-center justify-center rounded-lg bg-brand-soft text-brand-strong transition-colors group-hover:bg-brand group-hover:text-white">
                    <Icono className="size-5" aria-hidden="true" />
                  </span>
                  <span className="text-sm leading-snug font-semibold text-brand-dark">
                    {enlace.label}
                  </span>
                  <span className="hidden text-xs leading-relaxed text-muted-foreground sm:block">
                    {enlace.descripcion}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
