import type { Tramite } from "@/lib/api/types";

export const tramites: Tramite[] = [
  {
    id: "21198",
    slug: "licencia-de-funcionamiento-para-negocios-de-riesgo-bajo-o-medio",
    nombre: "Licencia de funcionamiento para negocios de riesgo bajo o medio",
    categoria: "licencias-de-funcionamiento",
    descripcion:
      "Autorización municipal que permite operar un establecimiento comercial clasificado como de riesgo bajo o medio. El trámite puede iniciarse en línea y completarse con la verificación de la dirección declarada.",
    requisitos: [
      "Solicitud de licencia de funcionamiento (formato oficial)",
      "Copia simple del RUC del titular",
      "Copia del DNI del titular o representante legal",
      "Vigencia de poder del representante legal, si corresponde",
      "Declaración jurada de cumplimiento de las condiciones de seguridad",
    ],
    costo: 147,
    plazoDias: 10,
    oficina: "Gerencia de Desarrollo Económico",
    enLinea: true,
    modalidad: "mixto",
    codigoTupa: "21198",
    formatoUrl: "/documents/solicitud-licencia-funcionamiento.pdf",
    formatoNombre: "Solicitud de licencia de funcionamiento",
    baseLegal: [
      "Ley 28976 — Ley Marco de Licencia de Funcionamiento",
      "Decreto Supremo 002-2017-PRODUCE",
      "Ordenanza 512-MDLO",
    ],
    pasos: [
      {
        titulo: "Presenta la solicitud",
        descripcion:
          "Completa el formato de solicitud y adjunta los requisitos por mesa de partes virtual o en la ventanilla de la Gerencia de Desarrollo Económico.",
      },
      {
        titulo: "Pago del derecho de tramitación",
        descripcion:
          "Cancela S/ 147.00 en caja de la municipalidad o mediante los canales de pago en línea. Conserva el comprobante.",
      },
      {
        titulo: "Evaluación de la solicitud",
        descripcion:
          "La municipalidad revisa la documentación y, cuando corresponde, programa la inspección de la dirección declarada.",
      },
      {
        titulo: "Inspección y observaciones",
        descripcion:
          "Si se identifican observaciones, se notifican al administrado para que las subsane dentro del plazo indicado.",
      },
      {
        titulo: "Recojo de la licencia",
        descripcion:
          "Una vez aprobada, la licencia se entrega en ventanilla o se notifica de forma electrónica, según lo elegido.",
      },
    ],
  },
  {
    id: "21199",
    slug: "licencia-de-funcionamiento-para-negocios-de-riesgo-alto-o-muy-alto",
    nombre: "Licencia de funcionamiento para negocios de riesgo alto o muy alto",
    categoria: "licencias-de-funcionamiento",
    descripcion:
      "Autorización para establecimientos clasificados como de riesgo alto o muy alto, que requieren el Certificado de Inspección Técnica de Seguridad en Edificaciones (ITSE) antes de obtener la licencia.",
    requisitos: [
      "Solicitud de licencia de funcionamiento (formato oficial)",
      "Copia simple del RUC del titular",
      "Certificado de Inspección Técnica de Seguridad en Edificaciones (ITSE)",
      "Copia del DNI del titular o representante legal",
      "Vigencia de poder del representante legal, si corresponde",
    ],
    costo: 279,
    plazoDias: 15,
    oficina: "Gerencia de Desarrollo Económico",
    enLinea: false,
    modalidad: "presencial",
    codigoTupa: "21199",
    formatoUrl: "/documents/solicitud-licencia-funcionamiento.pdf",
    formatoNombre: "Solicitud de licencia de funcionamiento",
    baseLegal: [
      "Ley 28976 — Ley Marco de Licencia de Funcionamiento",
      "Ley 29664 — Sistema Nacional de Gestión del Riesgo de Desastres",
    ],
    pasos: [
      {
        titulo: "Obtén el certificado ITSE",
        descripcion:
          "Solicita la inspección técnica de seguridad en edificaciones ante la municipalidad o una entidad certificadora autorizada.",
      },
      {
        titulo: "Presenta la solicitud de licencia",
        descripcion:
          "Adjunta el certificado ITSE y los demás requisitos en la ventanilla de la Gerencia de Desarrollo Económico.",
      },
      {
        titulo: "Pago del derecho de tramitación",
        descripcion: "Cancela S/ 279.00 y conserva el comprobante de pago.",
      },
      {
        titulo: "Evaluación y notificación",
        descripcion:
          "La municipalidad evalúa el expediente y notifica la aprobación o las observaciones dentro del plazo legal.",
      },
      {
        titulo: "Entrega de la licencia",
        descripcion:
          "La licencia se entrega en ventanilla junto con la constancia de autorización.",
      },
    ],
  },
  {
    id: "14025",
    slug: "contraer-matrimonio-civil",
    nombre: "Contraer matrimonio civil",
    categoria: "matrimonio-y-divorcio",
    descripcion:
      "Solicitud para celebrar matrimonio civil en el distrito de Los Olivos. Ambos contrayentes deben presentar la documentación y contar con dos testigos mayores de edad.",
    requisitos: [
      "Solicitud de matrimonio civil firmada por ambos contrayentes",
      "Copias certificadas de nacimiento de ambos contrayentes",
      "Copias del DNI de ambos contrayentes",
      "Certificado de domicilio de cada contrayente",
      "DNI de dos testigos mayores de edad",
    ],
    costo: 210,
    plazoDias: 15,
    oficina: "Subgerencia de Registro Civil",
    enLinea: false,
    modalidad: "presencial",
    codigoTupa: "14025",
    formatoUrl: "/documents/solicitud-matrimonio-civil.pdf",
    formatoNombre: "Solicitud de matrimonio civil",
    baseLegal: [
      "Código Civil, artículos 234 y siguientes",
      "Ley 29227 — Ley de Matrimonio Civil",
    ],
    pasos: [
      {
        titulo: "Reúne los requisitos",
        descripcion:
          "Solicita las copias certificadas de nacimiento y los certificados de domicilio con anticipación.",
      },
      {
        titulo: "Presenta la solicitud",
        descripcion:
          "Entrega la solicitud y los requisitos en la Subgerencia de Registro Civil, junto con los testigos.",
      },
      {
        titulo: "Pago del derecho de tramitación",
        descripcion: "Cancela S/ 210.00 en caja y conserva el comprobante.",
      },
      {
        titulo: "Publicación del edicto",
        descripcion:
          "La municipalidad publica el edicto matrimonial por el plazo legal para posibles oposiciones.",
      },
      {
        titulo: "Celebración del matrimonio",
        descripcion:
          "Confirma la fecha y hora de la ceremonia civil y preséntate con tu pareja y testigos.",
      },
    ],
  },
  {
    id: "14045",
    slug: "solicitar-separacion-convencional",
    nombre: "Solicitar separación convencional y divorcio ulterior",
    categoria: "matrimonio-y-divorcio",
    descripcion:
      "Primera etapa del divorcio rápido municipal. Ambos cónyuges solicitan de común acuerdo la separación convencional ante la municipalidad.",
    requisitos: [
      "Solicitud firmada por ambos cónyuges",
      "Copia certificada de la partida de matrimonio",
      "Copias del DNI de ambos cónyuges",
      "Certificado de domicilio conyugal",
      "Convenio de separación de bienes, si corresponde",
    ],
    costo: 390,
    plazoDias: 30,
    oficina: "Subgerencia de Registro Civil",
    enLinea: false,
    modalidad: "presencial",
    codigoTupa: "14045",
    baseLegal: ["Ley 29227 — Ley de Matrimonio Civil", "Código Civil, artículo 354"],
    pasos: [
      {
        titulo: "Presenta la solicitud conjunta",
        descripcion:
          "Ambos cónyuges firman la solicitud y la presentan en la Subgerencia de Registro Civil.",
      },
      {
        titulo: "Pago del derecho de tramitación",
        descripcion: "Cancela S/ 390.00 en caja de la municipalidad.",
      },
      {
        titulo: "Audiencia de separación convencional",
        descripcion:
          "La municipalidad convoca a una audiencia para verificar la voluntad de ambos cónyuges.",
      },
      {
        titulo: "Notificación de la separación",
        descripcion:
          "Se emite la constancia de separación convencional, requisito para la siguiente etapa.",
      },
    ],
  },
  {
    id: "14046",
    slug: "solicitar-divorcio-ulterior",
    nombre: "Solicitar divorcio ulterior",
    categoria: "matrimonio-y-divorcio",
    descripcion:
      "Etapa final del divorcio rápido municipal que disuelve definitivamente el vínculo matrimonial, una vez obtenida la separación convencional.",
    requisitos: [
      "Copia certificada de la constancia de separación convencional",
      "Copias del DNI de ambos cónyuges",
      "Solicitud de divorcio ulterior firmada por ambos cónyuges",
    ],
    costo: 190,
    plazoDias: 15,
    oficina: "Subgerencia de Registro Civil",
    enLinea: false,
    modalidad: "presencial",
    codigoTupa: "14046",
    baseLegal: ["Ley 29227 — Ley de Matrimonio Civil"],
    pasos: [
      {
        titulo: "Verifica el plazo legal",
        descripcion:
          "El divorcio ulterior puede solicitarse luego de transcurrido el plazo previsto desde la separación convencional.",
      },
      {
        titulo: "Presenta la solicitud",
        descripcion:
          "Entrega la solicitud con la constancia de separación y los DNI en Registro Civil.",
      },
      {
        titulo: "Pago del derecho de tramitación",
        descripcion: "Cancela S/ 190.00 en caja de la municipalidad.",
      },
      {
        titulo: "Inscripción del divorcio",
        descripcion:
          "La municipalidad inscribe la disolución del vínculo y entrega la constancia correspondiente.",
      },
    ],
  },
  {
    id: "14120",
    slug: "constancia-de-no-adeudo-tributario",
    nombre: "Constancia de no adeudo tributario",
    categoria: "tributos",
    descripcion:
      "Documento que acredita que el contribuyente se encuentra al día con el impuesto predial, los arbitrios y las multas municipales.",
    requisitos: [
      "Solicitud de constancia de no adeudo",
      "Copia del DNI del titular o representante legal",
      "Copia del RUC, si se solicita a nombre de una empresa",
      "Código de predio o placa del vehículo, según corresponda",
    ],
    costo: 25,
    plazoDias: 2,
    oficina: "Gerencia de Administración Tributaria",
    enLinea: true,
    modalidad: "virtual",
    codigoTupa: "14120",
    baseLegal: [
      "Texto Único Ordenado del Código Tributario",
      "Ordenanza de arbitrios municipales vigente",
    ],
    pasos: [
      {
        titulo: "Ingresa al servicio en línea",
        descripcion:
          "Accede al módulo de trámites tributarios con tu DNI y verifica que no registres deuda pendiente.",
      },
      {
        titulo: "Paga el derecho de tramitación",
        descripcion: "Cancela S/ 25.00 con tarjeta, Yape o Plin desde el mismo módulo.",
      },
      {
        titulo: "Recibe la constancia",
        descripcion:
          "La constancia se genera en formato PDF y queda disponible en tu cuenta para su descarga.",
      },
    ],
  },
  {
    id: "14121",
    slug: "fraccionamiento-de-deuda-tributaria",
    nombre: "Fraccionamiento de deuda tributaria",
    categoria: "tributos",
    descripcion:
      "Solicitud para pagar la deuda tributaria municipal en cuotas, previa evaluación de la capacidad de pago del contribuyente.",
    requisitos: [
      "Solicitud de fraccionamiento",
      "Copia del DNI del titular",
      "Cronograma de pagos propuesto",
      "Declaración jurada de ingresos",
      "Copia del último recibo de servicios, si corresponde",
    ],
    costo: 0,
    plazoDias: 15,
    oficina: "Gerencia de Administración Tributaria",
    enLinea: false,
    modalidad: "presencial",
    codigoTupa: "14121",
    formatoUrl: "/documents/formato-declaracion-jurada.pdf",
    formatoNombre: "Formato de declaración jurada",
    baseLegal: ["Texto Único Ordenado del Código Tributario, artículo 36"],
    pasos: [
      {
        titulo: "Solicita tu estado de cuenta",
        descripcion:
          "Acércate a la Gerencia de Administración Tributaria para conocer el monto total de tu deuda.",
      },
      {
        titulo: "Presenta la solicitud",
        descripcion:
          "Entrega la solicitud de fraccionamiento con la declaración jurada de ingresos y el cronograma propuesto.",
      },
      {
        titulo: "Evaluación de la solicitud",
        descripcion:
          "La municipalidad evalúa la capacidad de pago y determina el número de cuotas y el interés aplicable.",
      },
      {
        titulo: "Suscripción del convenio",
        descripcion:
          "Si la solicitud es aprobada, se suscribe el convenio de fraccionamiento y se entrega el cronograma final.",
      },
    ],
  },
  {
    id: "9665",
    slug: "acceder-a-beneficios-tributarios-en-ciencia-tecnologia-e-innovacion",
    nombre: "Acceder a beneficios tributarios en ciencia, tecnología e innovación",
    categoria: "tributos",
    descripcion:
      "Beneficio tributario que permite deducir gastos en proyectos de investigación, desarrollo e innovación en la declaración anual del impuesto a la renta.",
    requisitos: [
      "RUC activo",
      "Proyecto de investigación, desarrollo e innovación aprobado",
      "Documentación sustentatoria de los gastos",
      "Declaración jurada de no vinculación con el proyecto",
    ],
    costo: 0,
    plazoDias: 30,
    oficina: "Gerencia de Desarrollo Económico",
    enLinea: true,
    modalidad: "virtual",
    codigoTupa: "9665",
    baseLegal: ["Ley 30309 — Ley que promueve la investigación científica"],
    pasos: [
      {
        titulo: "Verifica los requisitos",
        descripcion:
          "Revisa que el proyecto cumpla con los criterios de la Ley 30309 y cuente con la aprobación correspondiente.",
      },
      {
        titulo: "Presenta la solicitud",
        descripcion:
          "Envía la solicitud y los documentos sustentatorios por mesa de partes virtual.",
      },
      {
        titulo: "Evaluación municipal",
        descripcion:
          "La municipalidad revisa la documentación y emite la constancia de acogimiento al beneficio.",
      },
    ],
  },
  {
    id: "14130",
    slug: "certificado-de-domicilio",
    nombre: "Certificado de domicilio",
    categoria: "certificados",
    descripcion:
      "Documento que acredita la residencia del solicitante en el distrito de Los Olivos, emitido luego de la verificación domiciliaria.",
    requisitos: [
      "Solicitud de certificado de domicilio",
      "Copia del DNI del solicitante",
      "Recibo de luz, agua o contrato de alquiler",
      "Dos testigos con DNI, si no cuentas con recibo a tu nombre",
    ],
    costo: 32.5,
    plazoDias: 3,
    oficina: "Subgerencia de Registro Civil",
    enLinea: false,
    modalidad: "presencial",
    codigoTupa: "14130",
    formatoUrl: "/documents/formato-declaracion-jurada.pdf",
    formatoNombre: "Formato de declaración jurada",
    baseLegal: ["Ley 27444 — Ley del Procedimiento Administrativo General"],
    pasos: [
      {
        titulo: "Presenta la solicitud",
        descripcion:
          "Entrega la solicitud y los documentos que acrediten tu domicilio en la Subgerencia de Registro Civil.",
      },
      {
        titulo: "Pago del derecho de tramitación",
        descripcion: "Cancela S/ 32.50 en caja de la municipalidad.",
      },
      {
        titulo: "Verificación domiciliaria",
        descripcion:
          "Personal municipal verifica la dirección declarada y deja constancia de la visita.",
      },
      {
        titulo: "Recojo del certificado",
        descripcion:
          "Recoge el certificado en ventanilla o solicita su notificación electrónica.",
      },
    ],
  },
  {
    id: "14131",
    slug: "copia-certificada-de-partida-de-nacimiento",
    nombre: "Copia certificada de partida de nacimiento",
    categoria: "certificados",
    descripcion:
      "Emisión de una copia certificada de la partida de nacimiento inscrita en el Registro Civil del distrito.",
    requisitos: [
      "Solicitud de copia certificada",
      "Copia del DNI del titular o del padre/madre solicitante",
      "Número de acta o datos de la inscripción",
    ],
    costo: 20,
    plazoDias: 1,
    oficina: "Subgerencia de Registro Civil",
    enLinea: false,
    modalidad: "presencial",
    codigoTupa: "14131",
    baseLegal: ["Ley 26497 — Ley Orgánica del Registro Nacional de Identificación"],
    pasos: [
      {
        titulo: "Ubica tu acta",
        descripcion:
          "Proporciona el número de acta o los datos de la inscripción en la ventanilla de Registro Civil.",
      },
      {
        titulo: "Pago del derecho de tramitación",
        descripcion: "Cancela S/ 20.00 en caja de la municipalidad.",
      },
      {
        titulo: "Recojo de la copia",
        descripcion:
          "La copia certificada se entrega el mismo día o al día siguiente hábil, según la carga del área.",
      },
    ],
  },
  {
    id: "14135",
    slug: "constancia-de-pago-de-arbitrios",
    nombre: "Constancia de pago de arbitrios municipales",
    categoria: "certificados",
    descripcion:
      "Documento que acredita el pago de los arbitrios de limpieza pública, parques y jardines y serenazgo del período solicitado.",
    requisitos: [
      "Solicitud de constancia de pago",
      "Copia del DNI del titular",
      "Código de predio",
      "Comprobantes de pago del período solicitado",
    ],
    costo: 25,
    plazoDias: 1,
    oficina: "Gerencia de Administración Tributaria",
    enLinea: true,
    modalidad: "virtual",
    codigoTupa: "14135",
    baseLegal: ["Ordenanza de arbitrios municipales vigente"],
    pasos: [
      {
        titulo: "Ingresa al módulo tributario",
        descripcion:
          "Accede con tu DNI y selecciona el predio y el período del que necesitas la constancia.",
      },
      {
        titulo: "Pago del derecho de tramitación",
        descripcion: "Cancela S/ 25.00 en línea y descarga la constancia en PDF.",
      },
    ],
  },
  {
    id: "14132",
    slug: "certificado-de-numeracion",
    nombre: "Certificado de numeración",
    categoria: "desarrollo-urbano",
    descripcion:
      "Documento que asigna y acredita la numeración municipal de un predio, requerido para trámites notariales y de servicios.",
    requisitos: [
      "Solicitud de certificado de numeración",
      "Copia del DNI del propietario",
      "Título de propiedad o contrato de compraventa",
      "Plano de ubicación del predio",
    ],
    costo: 45,
    plazoDias: 7,
    oficina: "Gerencia de Desarrollo Urbano",
    enLinea: false,
    modalidad: "presencial",
    codigoTupa: "14132",
    baseLegal: ["Ley 29090 — Ley de Regulación de Habilitaciones Urbanas"],
    pasos: [
      {
        titulo: "Presenta la solicitud",
        descripcion:
          "Entrega la solicitud y el plano de ubicación en la Gerencia de Desarrollo Urbano.",
      },
      {
        titulo: "Pago del derecho de tramitación",
        descripcion: "Cancela S/ 45.00 en caja de la municipalidad.",
      },
      {
        titulo: "Inspección del predio",
        descripcion:
          "Un inspector verifica la ubicación y las características del predio declarado.",
      },
      {
        titulo: "Emisión del certificado",
        descripcion:
          "Se emite el certificado con la numeración asignada y se notifica al solicitante.",
      },
    ],
  },
  {
    id: "14133",
    slug: "autorizacion-para-anuncio-publicitario",
    nombre: "Autorización para anuncio publicitario",
    categoria: "desarrollo-urbano",
    descripcion:
      "Autorización municipal para instalar anuncios publicitarios en fachadas, terrenos o espacios autorizados del distrito.",
    requisitos: [
      "Solicitud de autorización",
      "Copia del DNI o RUC del solicitante",
      "Croquis de ubicación y dimensiones del anuncio",
      "Autorización del propietario del inmueble",
      "Póliza de responsabilidad civil, si corresponde",
    ],
    costo: 120,
    plazoDias: 10,
    oficina: "Gerencia de Desarrollo Urbano",
    enLinea: false,
    modalidad: "presencial",
    codigoTupa: "14133",
    formatoUrl: "/documents/formato-declaracion-jurada.pdf",
    formatoNombre: "Formato de declaración jurada",
    baseLegal: ["Ordenanza 318-MDLO — Publicidad exterior"],
    pasos: [
      {
        titulo: "Presenta la solicitud",
        descripcion:
          "Entrega la solicitud con el croquis y la autorización del propietario en Desarrollo Urbano.",
      },
      {
        titulo: "Pago del derecho de tramitación",
        descripcion: "Cancela S/ 120.00 según las dimensiones del anuncio.",
      },
      {
        titulo: "Evaluación técnica",
        descripcion:
          "La municipalidad verifica el cumplimiento de las normas de publicidad exterior.",
      },
      {
        titulo: "Recojo de la autorización",
        descripcion:
          "Se entrega la autorización con la vigencia y las condiciones de instalación.",
      },
    ],
  },
  {
    id: "14134",
    slug: "certificado-de-compatibilidad-de-uso",
    nombre: "Certificado de compatibilidad de uso",
    categoria: "desarrollo-urbano",
    descripcion:
      "Documento que certifica que la actividad económica propuesta es compatible con la zonificación del predio.",
    requisitos: [
      "Solicitud de compatibilidad de uso",
      "Copia del DNI o RUC del solicitante",
      "Plano de ubicación del predio",
      "Descripción de la actividad económica",
    ],
    costo: 160,
    plazoDias: 12,
    oficina: "Gerencia de Desarrollo Urbano",
    enLinea: false,
    modalidad: "presencial",
    codigoTupa: "14134",
    baseLegal: ["Ley 29090", "Plan de Desarrollo Urbano de Los Olivos"],
    pasos: [
      {
        titulo: "Presenta la solicitud",
        descripcion:
          "Adjunta el plano de ubicación y la descripción detallada de la actividad.",
      },
      {
        titulo: "Pago del derecho de tramitación",
        descripcion: "Cancela S/ 160.00 en caja de la municipalidad.",
      },
      {
        titulo: "Evaluación de zonificación",
        descripcion:
          "La municipalidad contrasta la actividad con la zonificación vigente del distrito.",
      },
      {
        titulo: "Emisión del certificado",
        descripcion:
          "Se notifica el resultado y, de ser compatible, se entrega el certificado.",
      },
    ],
  },
  {
    id: "14140",
    slug: "inscripcion-al-programa-vaso-de-leche",
    nombre: "Inscripción al Programa Vaso de Leche",
    categoria: "servicios-sociales",
    descripcion:
      "Registro de beneficiarios del Programa Vaso de Leche, dirigido a niños, madres gestantes y adultos mayores en situación de vulnerabilidad.",
    requisitos: [
      "Copia del DNI del beneficiario o del responsable",
      "Copia de la partida de nacimiento, para menores de edad",
      "Constancia de domicilio en el distrito",
      "Ficha socioeconómica",
    ],
    costo: 0,
    plazoDias: 5,
    oficina: "Gerencia de Desarrollo Social",
    enLinea: false,
    modalidad: "presencial",
    codigoTupa: "14140",
    baseLegal: ["Ley 24059 — Programa Vaso de Leche"],
    pasos: [
      {
        titulo: "Acércate al comité de tu zona",
        descripcion:
          "Consulta en la Gerencia de Desarrollo Social cuál es el comité de Vaso de Leche correspondiente a tu dirección.",
      },
      {
        titulo: "Presenta la documentación",
        descripcion:
          "Entrega los documentos del beneficiario y completa la ficha socioeconómica.",
      },
      {
        titulo: "Evaluación social",
        descripcion:
          "La municipalidad verifica el cumplimiento de los criterios de priorización.",
      },
      {
        titulo: "Incorporación al padrón",
        descripcion:
          "Si la solicitud es aprobada, el beneficiario se incorpora al padrón y recibe la ración correspondiente.",
      },
    ],
  },
  {
    id: "14141",
    slug: "inscripcion-al-centro-integral-del-adulto-mayor",
    nombre: "Inscripción al Centro Integral del Adulto Mayor",
    categoria: "servicios-sociales",
    descripcion:
      "Registro de personas adultas mayores para participar en talleres, actividades recreativas y servicios de acompañamiento del CIAM.",
    requisitos: [
      "Copia del DNI del solicitante",
      "Ficha de inscripción",
      "Constancia de domicilio en el distrito",
      "Evaluación social, si corresponde",
    ],
    costo: 0,
    plazoDias: 3,
    oficina: "Gerencia de Desarrollo Social",
    enLinea: false,
    modalidad: "presencial",
    codigoTupa: "14141",
    baseLegal: ["Ley 30490 — Ley de la Persona Adulta Mayor"],
    pasos: [
      {
        titulo: "Solicita la ficha de inscripción",
        descripcion:
          "Recógela en el CIAM o descárgala desde el portal y complétala con tus datos.",
      },
      {
        titulo: "Presenta la documentación",
        descripcion:
          "Entrega la ficha con la copia de tu DNI y la constancia de domicilio.",
      },
      {
        titulo: "Incorporación a los talleres",
        descripcion:
          "El equipo del CIAM te informa los horarios y talleres disponibles según tu interés.",
      },
    ],
  },
  {
    id: "14142",
    slug: "orientacion-en-demuna",
    nombre: "Orientación en la Defensoría Municipal del Niño y del Adolescente",
    categoria: "servicios-sociales",
    descripcion:
      "Atención gratuita de orientación y acompañamiento en casos de riesgo o vulneración de los derechos de niñas, niños y adolescentes.",
    requisitos: [
      "DNI del adulto responsable",
      "Relato de los hechos o documento que sustente el caso",
      "Partida de nacimiento del menor, si corresponde",
    ],
    costo: 0,
    plazoDias: 1,
    oficina: "Gerencia de Desarrollo Social",
    enLinea: true,
    modalidad: "mixto",
    codigoTupa: "14142",
    baseLegal: ["Código de los Niños y Adolescentes", "Ley 27337"],
    pasos: [
      {
        titulo: "Solicita una cita",
        descripcion:
          "Comunícate con la DEMUNA por teléfono o mediante el formulario en línea para exponer tu caso.",
      },
      {
        titulo: "Entrevista inicial",
        descripcion:
          "Un defensor recibe el relato, evalúa el riesgo y orienta sobre las acciones legales y de protección.",
      },
      {
        titulo: "Acompañamiento del caso",
        descripcion:
          "De ser necesario, la DEMUNA coordina con otras entidades y realiza el seguimiento del caso.",
      },
    ],
  },
  {
    id: "7946",
    slug: "acceder-a-servicios-online-de-seguridad",
    nombre: "Acceder a los servicios en línea de seguridad ciudadana",
    categoria: "servicios-sociales",
    descripcion:
      "Registro para reportar emergencias y solicitar apoyo de Serenazgo a través de la aplicación Los Olivos Seguro y los canales digitales.",
    requisitos: [
      "DNI vigente",
      "Teléfono celular con conexión a internet",
      "Dirección exacta del incidente",
    ],
    costo: 0,
    plazoDias: 0,
    oficina: "Gerencia de Seguridad Ciudadana",
    enLinea: true,
    modalidad: "virtual",
    codigoTupa: "7946",
    baseLegal: ["Ley 27933 — Sistema Nacional de Seguridad Ciudadana"],
    pasos: [
      {
        titulo: "Descarga la aplicación",
        descripcion:
          "Instala Los Olivos Seguro desde la tienda oficial de tu celular y completa tu registro.",
      },
      {
        titulo: "Verifica tu identidad",
        descripcion: "Ingresa tu DNI y el código de verificación enviado a tu teléfono.",
      },
      {
        titulo: "Reporta una emergencia",
        descripcion:
          "Comparte tu ubicación y describe el incidente. La central de videovigilancia deriva el caso a la unidad más cercana.",
      },
    ],
  },
  {
    id: "14082",
    slug: "presentar-documentos-por-mesa-de-partes-virtual",
    nombre: "Presentar documentos por mesa de partes virtual",
    categoria: "mesa-de-partes",
    descripcion:
      "Canal digital para presentar solicitudes y documentos dirigidos a cualquier área de la municipalidad, con código de expediente y seguimiento en línea.",
    requisitos: [
      "DNI vigente del solicitante",
      "Documentos en formato PDF de hasta 25 MB",
      "Correo electrónico para notificaciones",
      "Firma digital o firma manuscrita escaneada, según el trámite",
    ],
    costo: 0,
    plazoDias: 1,
    oficina: "Mesa de Partes Virtual",
    enLinea: true,
    modalidad: "virtual",
    codigoTupa: "14082",
    formatoUrl: "/documents/solicitud-mesa-de-partes.pdf",
    formatoNombre: "Formato de solicitud general",
    baseLegal: [
      "Ley 27444 — Ley del Procedimiento Administrativo General",
      "Decreto Legislativo 1272",
    ],
    pasos: [
      {
        titulo: "Completa tus datos",
        descripcion:
          "Ingresa a la mesa de partes virtual y registra tu DNI, correo y teléfono de contacto.",
      },
      {
        titulo: "Selecciona el área y el trámite",
        descripcion:
          "Indica la oficina destinataria y el tipo de solicitud que vas a presentar.",
      },
      {
        titulo: "Adjunta los documentos",
        descripcion:
          "Sube los archivos en PDF. El sistema valida el tamaño máximo de 25 MB por archivo.",
      },
      {
        titulo: "Recibe tu código de expediente",
        descripcion:
          "Al finalizar, se genera un código de seguimiento y se envía la constancia a tu correo.",
      },
      {
        titulo: "Haz seguimiento",
        descripcion:
          "Consulta el estado de tu expediente en cualquier momento con el código asignado.",
      },
    ],
  },
];
