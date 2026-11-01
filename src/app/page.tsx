import { CampaignBanner } from "@/components/home/campaign-banner";
import { ContactStrip } from "@/components/home/contact-strip";
import { Hero } from "@/components/home/hero";
import { NewsGrid } from "@/components/home/news-grid";
import { NormsList } from "@/components/home/norms-list";
import { QuickAccess } from "@/components/home/quick-access";
import {
  obtenerCampanaVigente,
  obtenerNormas,
  obtenerNoticias,
} from "@/lib/api/contenido";
import { crearMetadata } from "@/lib/seo/metadata";

export const metadata = crearMetadata({
  title: "Inicio",
  description:
    "Portal web oficial de la Municipalidad Distrital de Los Olivos: trámites, servicios, tributos, normas, noticias y canales de atención.",
  path: "/",
});

export default async function HomePage() {
  const [campana, noticias, normas] = await Promise.all([
    obtenerCampanaVigente(),
    obtenerNoticias(),
    obtenerNormas(),
  ]);

  return (
    <>
      <Hero />
      <QuickAccess />
      {campana ? <CampaignBanner campana={campana} /> : null}
      <NewsGrid noticias={noticias.slice(0, 4)} />
      <NormsList normas={normas} />
      <ContactStrip />
    </>
  );
}
