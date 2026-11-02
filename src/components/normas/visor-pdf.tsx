import { Download, ExternalLink, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export function VisorPdf({
  src,
  titulo,
  nombreDescarga,
}: {
  src: string;
  titulo: string;
  nombreDescarga?: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b bg-muted/40 px-4 py-3">
        <p className="flex items-center gap-2 text-sm font-medium text-brand-dark">
          <FileText className="size-4 text-brand" aria-hidden="true" />
          Documento oficial (PDF)
        </p>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline" size="sm">
            <a href={src} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="size-4" aria-hidden="true" />
              Abrir en nueva pestaña
            </a>
          </Button>
          <Button asChild size="sm">
            <a href={src} download={nombreDescarga}>
              <Download className="size-4" aria-hidden="true" />
              Descargar
            </a>
          </Button>
        </div>
      </div>
      <iframe
        src={src}
        title={`Visor del documento: ${titulo}`}
        className="h-[70vh] min-h-[28rem] w-full bg-muted"
        loading="lazy"
      />
      <p className="border-t px-4 py-3 text-xs text-muted-foreground">
        Si el visor no carga en tu dispositivo, usa el botón «Abrir en nueva pestaña» o
        descarga el archivo PDF.
      </p>
    </div>
  );
}
