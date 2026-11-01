import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { obtenerIniciales } from "@/lib/institucional/filtros";
import { cn } from "@/lib/utils";

export function AvatarIniciales({
  nombre,
  className,
  size = "lg",
}: {
  nombre: string;
  className?: string;
  size?: "default" | "sm" | "lg";
}) {
  return (
    <Avatar
      size={size}
      className={cn("bg-brand-soft text-brand-strong", className)}
      aria-hidden="true"
    >
      <AvatarFallback className="bg-transparent font-semibold text-inherit">
        {obtenerIniciales(nombre)}
      </AvatarFallback>
    </Avatar>
  );
}
