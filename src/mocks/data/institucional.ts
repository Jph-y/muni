import type { Funcionario, Sede } from "@/lib/api/types";

export const sedes: Sede[] = [
  {
    id: "palacio",
    slug: "palacio-municipal",
    nombre: "Palacio Municipal",
    direccion: "Av. Carlos Izaguirre 813, Urb. Mercurio, Los Olivos, Lima",
    horario: "Lunes a viernes, 8:00 a. m. a 4:30 p. m.",
    telefono: "(01) 510-4230",
    servicios: [
      "Despacho de alcaldía",
      "Mesa de partes presencial",
      "Caja y tesorería",
      "Registro civil",
      "Atención al ciudadano",
    ],
  },
];

export const funcionarios: Funcionario[] = [
  {
    id: "alcaldia",
    slug: "despacho-de-alcaldia",
    nombre: "Despacho de Alcaldía",
    cargo: "Alcaldía",
    area: "Alta dirección",
    correo: "alcaldia@munilosolivos.gob.pe",
    telefono: "(01) 510-4230",
  },
  {
    id: "secretaria-general",
    slug: "secretaria-general",
    nombre: "Secretaría General",
    cargo: "Secretaría General",
    area: "Alta dirección",
    correo: "secretaria@munilosolivos.gob.pe",
    telefono: "(01) 510-4230",
  },
  {
    id: "gerencia-municipal",
    slug: "gerencia-municipal",
    nombre: "Gerencia Municipal",
    cargo: "Gerencia Municipal",
    area: "Alta dirección",
    correo: "gerencia@munilosolivos.gob.pe",
    telefono: "(01) 510-4230",
  },
  {
    id: "seguridad-ciudadana",
    slug: "gerencia-de-seguridad-ciudadana",
    nombre: "Gerencia de Seguridad Ciudadana",
    cargo: "Gerencia",
    area: "Seguridad ciudadana",
    correo: "seguridad@munilosolivos.gob.pe",
    telefono: "(01) 510-4230",
  },
  {
    id: "desarrollo-economico",
    slug: "gerencia-de-desarrollo-economico",
    nombre: "Gerencia de Desarrollo Económico",
    cargo: "Gerencia",
    area: "Desarrollo económico",
    correo: "desarrollo.economico@munilosolivos.gob.pe",
    telefono: "(01) 510-4230",
  },
  {
    id: "registro-civil",
    slug: "subgerencia-de-registro-civil",
    nombre: "Subgerencia de Registro Civil",
    cargo: "Subgerencia",
    area: "Servicios sociales",
    correo: "registro.civil@munilosolivos.gob.pe",
    telefono: "(01) 510-4230",
  },
];
