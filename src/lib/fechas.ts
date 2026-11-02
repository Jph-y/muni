import { cacheLife } from "next/cache";

export async function obtenerFechaActual(): Promise<string> {
  "use cache";
  cacheLife("hours");

  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Lima",
  }).format(new Date());
}
