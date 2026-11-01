import type { ReactNode } from "react";
import { Breadcrumbs, type Migaja } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/layout/container";

export function PageHero({
  eyebrow,
  title,
  description,
  migajas,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  migajas: Migaja[];
  children?: ReactNode;
}) {
  return (
    <section className="border-b bg-brand-soft/60">
      <Container className="py-7 sm:py-10">
        <Breadcrumbs items={migajas} />
        <div className="mt-5 max-w-3xl">
          {eyebrow ? (
            <p className="text-xs font-semibold tracking-wider text-brand-strong uppercase">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="mt-1 text-3xl font-bold text-brand-dark sm:text-4xl">{title}</h1>
          {description ? (
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              {description}
            </p>
          ) : null}
          {children ? <div className="mt-5">{children}</div> : null}
        </div>
      </Container>
    </section>
  );
}
