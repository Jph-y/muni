"use client";

import { useId, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { CheckCircle2, Send } from "lucide-react";
import { z } from "zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const motivos = [
  { valor: "consulta", etiqueta: "Consulta general" },
  { valor: "tramites", etiqueta: "Trámites" },
  { valor: "tributos", etiqueta: "Tributos" },
  { valor: "servicios", etiqueta: "Servicios municipales" },
  { valor: "reclamo", etiqueta: "Reclamo o sugerencia" },
  { valor: "otro", etiqueta: "Otro" },
] as const;

const esquema = z.object({
  nombre: z
    .string()
    .trim()
    .min(3, "Ingresa tu nombre completo")
    .max(120, "El nombre es demasiado largo"),
  dni: z
    .string()
    .trim()
    .regex(/^\d{8}$/, "El DNI debe tener 8 dígitos"),
  correo: z.string().trim().email("Ingresa un correo electrónico válido"),
  telefono: z
    .string()
    .trim()
    .refine(
      (valor) => valor.length === 0 || /^[0-9+\s()-]{6,15}$/.test(valor),
      "Ingresa un teléfono válido",
    ),
  motivo: z.enum(["consulta", "tramites", "tributos", "servicios", "reclamo", "otro"]),
  mensaje: z
    .string()
    .trim()
    .min(20, "Describe tu consulta con al menos 20 caracteres")
    .max(1200, "El mensaje no debe superar los 1200 caracteres"),
  acepto: z
    .boolean()
    .refine((valor) => valor, "Debes aceptar el tratamiento de tus datos"),
});

type DatosContacto = z.infer<typeof esquema>;

export function FormularioContacto() {
  const idNombre = useId();
  const idDni = useId();
  const idCorreo = useId();
  const idTelefono = useId();
  const idMotivo = useId();
  const idMensaje = useId();
  const idAcepto = useId();

  const [confirmacion, setConfirmacion] = useState<{
    codigo: string;
    nombre: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DatosContacto>({
    resolver: zodResolver(esquema),
    defaultValues: {
      nombre: "",
      dni: "",
      correo: "",
      telefono: "",
      motivo: "consulta",
      mensaje: "",
      acepto: false,
    },
  });

  async function enviar(datos: DatosContacto) {
    await new Promise((resolver) => setTimeout(resolver, 700));
    setConfirmacion({
      codigo: `MDLO-${datos.dni.slice(-4)}-${datos.motivo.slice(0, 2).toUpperCase()}`,
      nombre: datos.nombre,
    });
    reset();
  }

  if (confirmacion) {
    return (
      <Alert>
        <CheckCircle2 className="size-4" aria-hidden="true" />
        <AlertTitle>Mensaje registrado correctamente</AlertTitle>
        <AlertDescription>
          <p>
            Gracias, {confirmacion.nombre}. Tu consulta quedó registrada con el código{" "}
            <strong className="font-semibold">{confirmacion.codigo}</strong>. Recibirás
            una respuesta en el correo indicado en un plazo máximo de cinco días hábiles.
          </p>
          <p className="mt-2 text-xs">
            Este formulario es demostrativo y no envía datos a la municipalidad.
          </p>
          <Button
            type="button"
            variant="outline"
            className="mt-3"
            onClick={() => setConfirmacion(null)}
          >
            Enviar otra consulta
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <form onSubmit={handleSubmit(enviar)} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={idNombre}>Nombre completo</Label>
          <Input
            id={idNombre}
            className="h-11"
            autoComplete="name"
            aria-invalid={Boolean(errors.nombre)}
            aria-describedby={errors.nombre ? `${idNombre}-error` : undefined}
            {...register("nombre")}
          />
          {errors.nombre ? (
            <p id={`${idNombre}-error`} className="text-xs text-destructive">
              {errors.nombre.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor={idDni}>DNI</Label>
          <Input
            id={idDni}
            className="h-11"
            inputMode="numeric"
            maxLength={8}
            autoComplete="off"
            aria-invalid={Boolean(errors.dni)}
            aria-describedby={errors.dni ? `${idDni}-error` : undefined}
            {...register("dni")}
          />
          {errors.dni ? (
            <p id={`${idDni}-error`} className="text-xs text-destructive">
              {errors.dni.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor={idCorreo}>Correo electrónico</Label>
          <Input
            id={idCorreo}
            type="email"
            className="h-11"
            autoComplete="email"
            aria-invalid={Boolean(errors.correo)}
            aria-describedby={errors.correo ? `${idCorreo}-error` : undefined}
            {...register("correo")}
          />
          {errors.correo ? (
            <p id={`${idCorreo}-error`} className="text-xs text-destructive">
              {errors.correo.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor={idTelefono}>Teléfono (opcional)</Label>
          <Input
            id={idTelefono}
            type="tel"
            className="h-11"
            autoComplete="tel"
            aria-invalid={Boolean(errors.telefono)}
            aria-describedby={errors.telefono ? `${idTelefono}-error` : undefined}
            {...register("telefono")}
          />
          {errors.telefono ? (
            <p id={`${idTelefono}-error`} className="text-xs text-destructive">
              {errors.telefono.message}
            </p>
          ) : null}
        </div>
      </div>

      <div className="space-y-2">
        <p id={idMotivo} className="text-sm leading-none font-medium">
          Motivo de contacto
        </p>
        <Controller
          control={control}
          name="motivo"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger aria-labelledby={idMotivo} className="h-11 w-full">
                <SelectValue placeholder="Selecciona un motivo" />
              </SelectTrigger>
              <SelectContent>
                {motivos.map((motivo) => (
                  <SelectItem key={motivo.valor} value={motivo.valor}>
                    {motivo.etiqueta}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor={idMensaje}>Mensaje</Label>
        <Textarea
          id={idMensaje}
          rows={5}
          placeholder="Describe tu consulta con el mayor detalle posible."
          aria-invalid={Boolean(errors.mensaje)}
          aria-describedby={errors.mensaje ? `${idMensaje}-error` : undefined}
          {...register("mensaje")}
        />
        {errors.mensaje ? (
          <p id={`${idMensaje}-error`} className="text-xs text-destructive">
            {errors.mensaje.message}
          </p>
        ) : null}
      </div>

      <div className="flex items-start gap-2">
        <Controller
          control={control}
          name="acepto"
          render={({ field }) => (
            <Checkbox
              id={idAcepto}
              checked={field.value}
              onCheckedChange={(valor) => field.onChange(valor === true)}
              aria-invalid={Boolean(errors.acepto)}
              aria-describedby={errors.acepto ? `${idAcepto}-error` : undefined}
            />
          )}
        />
        <div>
          <Label htmlFor={idAcepto} className="text-sm font-normal">
            Acepto el tratamiento de mis datos personales para la atención de esta
            consulta.
          </Label>
          {errors.acepto ? (
            <p id={`${idAcepto}-error`} className="text-xs text-destructive">
              {errors.acepto.message}
            </p>
          ) : null}
        </div>
      </div>

      <Button type="submit" className="h-11" disabled={isSubmitting}>
        <Send className="size-4" aria-hidden="true" />
        {isSubmitting ? "Enviando…" : "Enviar consulta"}
      </Button>

      <p className="text-xs text-muted-foreground">
        Formulario demostrativo: la información no se envía a la municipalidad. Para una
        atención oficial utiliza el Libro de Reclamaciones o la mesa de partes virtual.
      </p>
    </form>
  );
}
