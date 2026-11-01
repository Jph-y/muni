import type { Sede } from "@/lib/api/types";

export function MapaSede({ sede }: { sede: Sede }) {
  if (!sede.coordenadas) return null;

  const { lat, lng } = sede.coordenadas;
  const delta = 0.004;
  const bbox = `${lng - delta}%2C${lat - delta / 1.6}%2C${lng + delta}%2C${lat + delta / 1.6}`;
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`;
  const googleMaps = `https://maps.google.com/maps?daddr=${lat},${lng}`;

  return (
    <div className="overflow-hidden rounded-xl border bg-muted">
      <iframe
        src={src}
        title={`Mapa de ubicación de ${sede.nombre}`}
        className="h-72 w-full border-0 sm:h-96"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div className="flex flex-wrap items-center justify-between gap-2 border-t bg-card px-4 py-3">
        <p className="text-xs text-muted-foreground">
          Mapa referencial. Confirma la ubicación antes de acudir.
        </p>
        <a
          href={googleMaps}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-brand-strong hover:underline"
        >
          Abrir en Google Maps
          <span className="sr-only"> (se abre en una pestaña nueva)</span>
        </a>
      </div>
    </div>
  );
}
