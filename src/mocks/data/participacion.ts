import type { ParticipacionVecinal } from "@/lib/api/types";

export const participacionVecinal: ParticipacionVecinal = {
  etapas: [
    {
      id: "etapa-1",
      titulo: "Preparación y convocatoria",
      descripcion:
        "El Consejo Municipal aprueba el cronograma y convoca a las organizaciones vecinales a participar del proceso.",
      fecha: "2026-03-02",
    },
    {
      id: "etapa-2",
      titulo: "Identificación de problemas",
      descripcion:
        "Se realizan talleres por zonas para identificar las principales necesidades de la población.",
      fecha: "2026-04-06",
    },
    {
      id: "etapa-3",
      titulo: "Priorización de proyectos",
      descripcion:
        "Las organizaciones participantes priorizan los proyectos de inversión con criterios técnicos y sociales.",
      fecha: "2026-05-18",
    },
    {
      id: "etapa-4",
      titulo: "Formalización de acuerdos",
      descripcion:
        "Se suscribe el acta de acuerdos y se incorporan los proyectos priorizados al presupuesto institucional.",
      fecha: "2026-06-15",
    },
    {
      id: "etapa-5",
      titulo: "Ejecución y seguimiento",
      descripcion:
        "El comité de vigilancia ciudadana acompaña la ejecución de los proyectos priorizados.",
      fecha: "2026-07-01",
    },
  ],
  proyectos: [
    {
      id: "proyecto-2026-01",
      nombre: "Mejoramiento del parque de la zona 3",
      anio: 2026,
      zona: "Zona 3",
      monto: 1_250_000,
      estado: "en-ejecucion",
    },
    {
      id: "proyecto-2026-02",
      nombre: "Pistas y veredas en la urbanización Los Jardines",
      anio: 2026,
      zona: "Zona 5",
      monto: 2_800_000,
      estado: "en-ejecucion",
    },
    {
      id: "proyecto-2026-03",
      nombre: "Ampliación del local comunal de Sol de Oro",
      anio: 2026,
      zona: "Zona 2",
      monto: 680_000,
      estado: "priorizado",
    },
    {
      id: "proyecto-2026-04",
      nombre: "Implementación de luminarias LED en la zona 6",
      anio: 2026,
      zona: "Zona 6",
      monto: 950_000,
      estado: "priorizado",
    },
    {
      id: "proyecto-2025-01",
      nombre: "Mejoramiento del parque zonal de Villa del Norte",
      anio: 2025,
      zona: "Zona 1",
      monto: 1_100_000,
      estado: "culminado",
    },
    {
      id: "proyecto-2025-02",
      nombre: "Construcción de veredas en la zona 7",
      anio: 2025,
      zona: "Zona 7",
      monto: 1_450_000,
      estado: "culminado",
    },
    {
      id: "proyecto-2025-03",
      nombre: "Mejoramiento del local comunal de Angélica Gamarra",
      anio: 2025,
      zona: "Zona 4",
      monto: 520_000,
      estado: "culminado",
    },
    {
      id: "proyecto-2025-04",
      nombre: "Recuperación de áreas verdes en la zona 8",
      anio: 2025,
      zona: "Zona 8",
      monto: 730_000,
      estado: "culminado",
    },
  ],
  miembrosCodisec: [
    {
      id: "codisec-01",
      nombre: "Luis Felipe Castillo Oliva",
      organizacion: "Municipalidad Distrital de Los Olivos",
      cargo: "Alcalde y presidente del CODISE",
      tipo: "municipal",
    },
    {
      id: "codisec-02",
      nombre: "José Carlos Salas Reátegui",
      organizacion: "Gerencia Municipal",
      cargo: "Gerente Municipal",
      tipo: "municipal",
    },
    {
      id: "codisec-03",
      nombre: "Elizabeth Sonia Canchari De Lino",
      organizacion: "Gerencia de Desarrollo Social",
      cargo: "Gerenta de Desarrollo Social",
      tipo: "municipal",
    },
    {
      id: "codisec-04",
      nombre: "Renzo Carlos Rojas Chumbimune",
      organizacion: "Gerencia de Desarrollo Urbano",
      cargo: "Gerente de Desarrollo Urbano",
      tipo: "municipal",
    },
    {
      id: "codisec-05",
      nombre: "William Valladares Escobedo",
      organizacion: "Gerencia de Seguridad Ciudadana",
      cargo: "Gerente de Seguridad Ciudadana",
      tipo: "municipal",
    },
    {
      id: "codisec-06",
      nombre: "María Elena Quispe Huamán",
      organizacion: "Junta Vecinal Sol de Oro",
      cargo: "Representante de juntas vecinales",
      tipo: "vecinal",
    },
    {
      id: "codisec-07",
      nombre: "Jorge Antonio Ramírez Paredes",
      organizacion: "Junta Vecinal Villa del Norte",
      cargo: "Delegado zonal",
      tipo: "vecinal",
    },
    {
      id: "codisec-08",
      nombre: "Pedro Pablo Sánchez Aguilar",
      organizacion: "Junta Vecinal Los Jardines",
      cargo: "Delegado zonal",
      tipo: "vecinal",
    },
    {
      id: "codisec-09",
      nombre: "Rosa Amelia Torres Chávez",
      organizacion: "Comité de Vaso de Leche",
      cargo: "Representante de organizaciones sociales",
      tipo: "social",
    },
    {
      id: "codisec-10",
      nombre: "Carlos Enrique Mendoza Ríos",
      organizacion: "Asociación de Comerciantes",
      cargo: "Representante del sector comercio",
      tipo: "social",
    },
    {
      id: "codisec-11",
      nombre: "Lucía Fernanda Rojas Campos",
      organizacion: "Organización Juvenil Los Olivos",
      cargo: "Representante de organizaciones juveniles",
      tipo: "social",
    },
    {
      id: "codisec-12",
      nombre: "Ana Cecilia Flores Villanueva",
      organizacion: "Comedor Popular Santa Rosa",
      cargo: "Representante de comedores populares",
      tipo: "social",
    },
  ],
  funcionesCodisec: [
    "Participar en la elaboración y actualización del plan de desarrollo concertado del distrito.",
    "Proponer y priorizar los proyectos de inversión del presupuesto participativo.",
    "Fiscalizar la ejecución de los proyectos priorizados.",
    "Promover la participación de las organizaciones sociales en la gestión municipal.",
    "Emitir opinión sobre las políticas públicas de alcance distrital.",
    "Convocar a audiencias públicas y rendiciones de cuentas.",
  ],
  documentos: [
    {
      id: "documento-participacion-01",
      titulo: "Reglamento del CODISE 2026",
      descripcion:
        "Normas de organización, funcionamiento y participación de los integrantes del CODISE.",
      fecha: "2026-02-20",
      archivoUrl: "/documents/participacion/reglamento-codisec-2026.pdf",
    },
    {
      id: "documento-participacion-02",
      titulo: "Convocatoria al presupuesto participativo 2027",
      descripcion:
        "Cronograma y requisitos para participar en el proceso del siguiente año fiscal.",
      fecha: "2026-09-30",
      archivoUrl:
        "/documents/participacion/convocatoria-presupuesto-participativo-2027.pdf",
    },
    {
      id: "documento-participacion-03",
      titulo: "Acta de acuerdos del presupuesto participativo 2026",
      descripcion:
        "Acuerdos y proyectos priorizados por las organizaciones vecinales para el año 2026.",
      fecha: "2026-06-15",
      archivoUrl:
        "/documents/participacion/acta-acuerdos-presupuesto-participativo-2026.pdf",
    },
    {
      id: "documento-participacion-04",
      titulo: "Plan de trabajo del CODISE 2026",
      descripcion:
        "Actividades, metas y cronograma de trabajo del consejo para el presente año.",
      fecha: "2026-03-10",
      archivoUrl: "/documents/participacion/plan-de-trabajo-codisec-2026.pdf",
    },
  ],
};
