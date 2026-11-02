import Image from "next/image";
import { ImageIcon } from "lucide-react";

export function GaleriaNoticia({
  imagenes,
  titulo,
}: {
  imagenes: string[];
  titulo: string;
}) {
  if (imagenes.length === 0) return null;

  return (
    <section aria-labelledby="galeria-noticia">
      <h2
        id="galeria-noticia"
        className="flex items-center gap-2 text-lg font-semibold text-brand-dark"
      >
        <ImageIcon className="size-5 text-brand" aria-hidden="true" />
        Galería de imágenes
      </h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {imagenes.map((imagen, indice) => (
          <li key={`${imagen}-${indice}`}>
            <a
              href={imagen}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-16/10 overflow-hidden rounded-xl border bg-muted"
              aria-label={`Ampliar imagen ${indice + 1} de la galería: ${titulo}`}
            >
              <Image
                src={imagen}
                alt={`${titulo} — imagen ${indice + 1}`}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-xs text-muted-foreground">
        Imágenes de referencia de la actividad institucional.
      </p>
    </section>
  );
}
