import type { Metadata } from "next";
import { siteConfig } from "@/lib/constants/site";

type MetadataInput = {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
};

export function crearMetadata({
  title,
  description = siteConfig.descripcion,
  path = "/",
  image = "/og-image.png",
  noIndex = false,
}: MetadataInput): Metadata {
  const url = new URL(path, siteConfig.url).toString();

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "es_PE",
      url,
      siteName: siteConfig.nombre,
      title: `${title} | ${siteConfig.siglas}`,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: siteConfig.nombre }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.siglas}`,
      description,
      images: [image],
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}

export function jsonLdOrganizacion() {
  return {
    "@context": "https://schema.org",
    "@type": "GovernmentOrganization",
    name: siteConfig.nombre,
    alternateName: siteConfig.siglas,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo-mdlo.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Av. Carlos Izaguirre 813, Urb. Mercurio",
      addressLocality: "Los Olivos",
      addressRegion: "Lima",
      addressCountry: "PE",
    },
    telephone: siteConfig.telefonoCentral,
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Distrito de Los Olivos",
    },
    sameAs: Object.values(siteConfig.redes),
  };
}

export function jsonLdMigasDePan(items: { nombre: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, indice) => ({
      "@type": "ListItem",
      position: indice + 1,
      name: item.nombre,
      item: new URL(item.url, siteConfig.url).toString(),
    })),
  };
}

export function jsonLdNoticia(noticia: {
  titulo: string;
  resumen: string;
  fecha: string;
  imagen?: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: noticia.titulo,
    description: noticia.resumen,
    datePublished: noticia.fecha,
    image: noticia.imagen ? [noticia.imagen] : undefined,
    mainEntityOfPage: new URL(noticia.url, siteConfig.url).toString(),
    publisher: {
      "@type": "GovernmentOrganization",
      name: siteConfig.nombre,
    },
  };
}
