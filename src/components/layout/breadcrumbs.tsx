import { Fragment } from "react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export type Migaja = {
  nombre: string;
  href?: string;
};

export function Breadcrumbs({ items }: { items: Migaja[] }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, indice) => {
          const esUltimo = indice === items.length - 1;

          return (
            <Fragment key={`${item.nombre}-${indice}`}>
              <BreadcrumbItem>
                {esUltimo || !item.href ? (
                  <BreadcrumbPage>{item.nombre}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={item.href}>{item.nombre}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {esUltimo ? null : <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
