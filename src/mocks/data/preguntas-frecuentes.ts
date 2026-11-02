import type { PreguntaFrecuente } from "@/lib/api/types";

export const preguntasFrecuentes: PreguntaFrecuente[] = [
  {
    id: "faq-01",
    slug: "como-se-inicia-un-tramite",
    categoria: "tramites",
    pregunta: "¿Cómo inicio un trámite municipal?",
    respuesta: [
      "Busca el trámite en el catálogo del portal. Cada ficha indica los requisitos, el costo, el plazo y la oficina responsable.",
      "Si el trámite está disponible en línea, puedes iniciarlo desde la mesa de partes virtual. Si es presencial, acércate a la sede indicada con tu DNI y los documentos requeridos.",
    ],
    enlaces: [
      { nombre: "Ver el catálogo de trámites", href: "/tramites" },
      { nombre: "Ir a la mesa de partes virtual", href: "/mesa-de-partes" },
    ],
  },
  {
    id: "faq-02",
    slug: "como-pago-el-derecho-de-tramitacion",
    categoria: "tramites",
    pregunta: "¿Cómo pago el derecho de tramitación?",
    respuesta: [
      "Puedes pagar en la caja de la municipalidad o, si el trámite está habilitado en línea, con tarjeta, Yape o Plin desde el módulo de pagos.",
      "Conserva siempre el comprobante: es necesario para el seguimiento de tu expediente y para cualquier reclamo.",
    ],
    enlaces: [{ nombre: "Pagar tributos en línea", href: "/tributos" }],
  },
  {
    id: "faq-03",
    slug: "que-pasa-si-me-falta-un-requisito",
    categoria: "tramites",
    pregunta: "¿Qué pasa si me falta un requisito?",
    respuesta: [
      "La oficina responsable te notificará la observación con el plazo para subsanarla. Mientras no se complete, el expediente queda suspendido y el plazo de atención se detiene.",
      "Revisa la lista de requisitos antes de presentar tu solicitud para evitar demoras.",
    ],
  },
  {
    id: "faq-04",
    slug: "como-consulto-el-estado-de-mi-expediente",
    categoria: "mesa-de-partes",
    pregunta: "¿Cómo consulto el estado de mi expediente?",
    respuesta: [
      "Ingresa al seguimiento de trámites con el código de expediente que recibiste al presentar tu solicitud. También puedes revisarlo desde Mi cuenta si te registraste con tu DNI.",
      "Si el código no aparece, comunícate con la central telefónica para verificar los datos de tu presentación.",
    ],
    enlaces: [{ nombre: "Seguimiento de trámites", href: "/mesa-de-partes/seguimiento" }],
  },
  {
    id: "faq-05",
    slug: "que-archivos-puedo-subir-a-la-mesa-de-partes",
    categoria: "mesa-de-partes",
    pregunta: "¿Qué archivos puedo subir a la mesa de partes virtual?",
    respuesta: [
      "Solo se aceptan archivos en formato PDF de hasta 25 MB por documento. El sistema rechaza archivos dañados o con otro formato.",
      "Antes de subir tu documento, verifica que se pueda abrir correctamente y que las firmas sean legibles.",
    ],
  },
  {
    id: "faq-06",
    slug: "la-mesa-de-partes-virtual-tiene-validez-legal",
    categoria: "mesa-de-partes",
    pregunta: "¿La mesa de partes virtual tiene validez legal?",
    respuesta: [
      "Sí. La presentación por mesa de partes virtual tiene la misma validez que la presentación física y genera un código de expediente con fecha y hora de recepción.",
      "Recibirás una constancia en tu correo electrónico que sirve como cargo de presentación.",
    ],
  },
  {
    id: "faq-07",
    slug: "como-creo-mi-cuenta",
    categoria: "cuenta",
    pregunta: "¿Cómo creo mi cuenta en el portal?",
    respuesta: [
      "Regístrate con tu DNI y un correo electrónico. El sistema envía un código de verificación para confirmar tu identidad.",
      "Solo los residentes del distrito pueden crear una cuenta para acceder a los servicios personalizados.",
    ],
    enlaces: [{ nombre: "Crear una cuenta", href: "/registro" }],
  },
  {
    id: "faq-08",
    slug: "olvide-mi-clave",
    categoria: "cuenta",
    pregunta: "Olvidé mi contraseña, ¿cómo la recupero?",
    respuesta: [
      "Usa la opción Recuperar contraseña en la pantalla de acceso. Recibirás un enlace o código en el correo asociado a tu cuenta.",
      "Si no recuerdas el correo registrado, acércate a la oficina de atención al ciudadano con tu DNI.",
    ],
    enlaces: [{ nombre: "Recuperar contraseña", href: "/recuperar-clave" }],
  },
  {
    id: "faq-09",
    slug: "como-pago-mi-impuesto-predial",
    categoria: "tributos",
    pregunta: "¿Cómo pago mi impuesto predial y arbitrios?",
    respuesta: [
      "Puedes pagar en línea con tarjeta, Yape o Plin, o en la caja de la municipalidad. Antes de pagar, consulta tu deuda con tu DNI, código de predio o placa.",
      "Si pagas el impuesto predial al contado hasta el último día de febrero, accedes al descuento del 10 % previsto en la ordenanza vigente.",
    ],
    enlaces: [{ nombre: "Consultar y pagar tributos", href: "/tributos" }],
  },
  {
    id: "faq-10",
    slug: "que-pasa-si-no-pago-mis-arbitrios",
    categoria: "tributos",
    pregunta: "¿Qué pasa si no pago mis arbitrios?",
    respuesta: [
      "La deuda genera intereses moratorios y puede ser cobrada mediante procedimiento de ejecución coactiva.",
      "Si tienes dificultades para pagar, puedes solicitar un fraccionamiento en la Gerencia de Administración Tributaria antes de que la deuda pase a cobranza coactiva.",
    ],
    enlaces: [
      {
        nombre: "Fraccionamiento de deuda",
        href: "/tramites/fraccionamiento-de-deuda-tributaria",
      },
    ],
  },
  {
    id: "faq-11",
    slug: "como-solicito-una-constancia-de-no-adeudo",
    categoria: "tributos",
    pregunta: "¿Cómo solicito una constancia de no adeudo?",
    respuesta: [
      "La constancia de no adeudo se solicita en línea y se genera en PDF una vez confirmado el pago del derecho de tramitación.",
      "Si registras deuda pendiente, primero debes regularizarla o suscribir un fraccionamiento.",
    ],
    enlaces: [
      {
        nombre: "Solicitar constancia de no adeudo",
        href: "/tramites/constancia-de-no-adeudo-tributario",
      },
    ],
  },
  {
    id: "faq-12",
    slug: "como-reporto-una-emergencia",
    categoria: "servicios",
    pregunta: "¿Cómo reporto una emergencia de seguridad?",
    respuesta: [
      "Llama a la central de Serenazgo al (01) 510-4230 o envía un WhatsApp al 937 016 501. Para delitos en flagrancia, comunícate primero con la Policía Nacional al 105.",
      "También puedes reportar desde la aplicación Los Olivos Seguro, que comparte tu ubicación con la central de videovigilancia.",
    ],
    enlaces: [
      { nombre: "Números de emergencia", href: "/emergencias" },
      {
        nombre: "Aplicación Los Olivos Seguro",
        href: "/servicios/aplicacion-los-olivos-seguro",
      },
    ],
  },
  {
    id: "faq-13",
    slug: "como-solicito-el-recojo-de-residuos",
    categoria: "servicios",
    pregunta: "¿Cómo solicito el recojo de residuos en mi zona?",
    respuesta: [
      "El recojo domiciliario sigue un cronograma por zona. Si tu zona no tiene cobertura o hay acumulación de residuos, reporta el caso a la central telefónica indicando la dirección exacta.",
      "No arrojes residuos en la vía pública fuera del horario de recolección: puede generar una infracción municipal.",
    ],
    enlaces: [{ nombre: "Servicios de limpieza pública", href: "/servicios" }],
  },
  {
    id: "faq-14",
    slug: "donde-queda-el-palacio-municipal",
    categoria: "institucional",
    pregunta: "¿Dónde queda el Palacio Municipal y cuál es su horario?",
    respuesta: [
      "El Palacio Municipal se ubica en Av. Carlos Izaguirre 813, Urb. Mercurio, Los Olivos. La atención es de lunes a viernes de 8:30 a. m. a 6:00 p. m. y los sábados de 8:00 a. m. a 1:00 p. m.",
      "Algunas oficinas atienden en sedes descentralizadas; revisa el directorio de sedes antes de acudir.",
    ],
    enlaces: [
      { nombre: "Sedes municipales", href: "/institucional/sedes" },
      { nombre: "Cómo llegar", href: "/institucional/sedes/palacio-municipal" },
    ],
  },
  {
    id: "faq-15",
    slug: "como-presento-un-reclamo",
    categoria: "institucional",
    pregunta: "¿Cómo presento un reclamo sobre la atención recibida?",
    respuesta: [
      "Puedes registrar tu reclamo en el Libro de Reclamaciones virtual o presencial. Recibirás un código de constancia y una respuesta en el plazo legal.",
      "Si tu reclamo está relacionado con un trámite específico, indica el número de expediente para agilizar la atención.",
    ],
    enlaces: [{ nombre: "Libro de reclamaciones", href: "/libro-de-reclamaciones" }],
  },
  {
    id: "faq-16",
    slug: "como-reservo-una-cita",
    categoria: "servicios",
    pregunta: "¿Cómo reservo una cita para atención presencial?",
    respuesta: [
      "Ingresa a la sección de citas, elige el servicio y la sede, y selecciona el día y la hora disponibles. Recibirás la confirmación en tu correo.",
      "Llega 15 minutos antes con tu DNI y los documentos del trámite. Si no puedes asistir, cancela la cita para liberar el cupo.",
    ],
    enlaces: [{ nombre: "Reservar una cita", href: "/citas" }],
  },
];
