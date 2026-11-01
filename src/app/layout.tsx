import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { SkipLink } from "@/components/layout/skip-link";
import { Providers } from "@/components/providers";
import { siteConfig } from "@/lib/constants/site";
import { jsonLdOrganizacion } from "@/lib/seo/metadata";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.siglas} · ${siteConfig.nombre}`,
    template: `%s | ${siteConfig.siglas}`,
  },
  description: siteConfig.descripcion,
  applicationName: siteConfig.nombre,
  authors: [{ name: siteConfig.nombre, url: siteConfig.url }],
  keywords: [
    "Municipalidad de Los Olivos",
    "MDLO",
    "trámites municipales",
    "pago de tributos",
    "arbitrios",
    "impuesto predial",
    "mesa de partes",
    "Los Olivos",
  ],
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: siteConfig.url,
    siteName: siteConfig.nombre,
    title: `${siteConfig.siglas} · ${siteConfig.nombre}`,
    description: siteConfig.descripcion,
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.siglas} · ${siteConfig.nombre}`,
    description: siteConfig.descripcion,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: true, address: true, email: true },
};

export const viewport: Viewport = {
  themeColor: "#1F3D24",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-PE" className={`${inter.variable} h-full`} suppressHydrationWarning>
      <body className="flex min-h-full flex-col">
        <Providers>
          <SkipLink />
          <Header />
          <main id="contenido-principal" className="flex-1">
            {children}
          </main>
          <Footer />
        </Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganizacion()) }}
        />
      </body>
    </html>
  );
}
