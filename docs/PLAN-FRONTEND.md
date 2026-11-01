# Plan de Frontend — Portal Web de la Municipalidad Distrital de Los Olivos (MDLO)

| Campo                     | Valor                                                                    |
| ------------------------- | ------------------------------------------------------------------------ |
| Proyecto                  | Portal Web de la Municipalidad Distrital de Los Olivos                   |
| Alcance de este documento | Planificación del frontend (diseño, rutas, arquitectura, pruebas)        |
| Stack frontend            | Next.js 16 (App Router) + TypeScript + Tailwind CSS v4                   |
| Backend                   | Laravel (PHP 8.x) + MySQL 8.0 — desarrollado en paralelo por otro equipo |
| Referencias               | https://www.gob.pe/munilosolivos · https://www.munlima.gob.pe/           |
| Fecha                     | Noviembre 2026                                                           |
| Versión                   | 1.0                                                                      |

---

## 1. Resumen ejecutivo

El presente documento define la planificación completa del **frontend** del Portal Web de la Municipalidad Distrital de Los Olivos. El portal debe digitalizar la relación entre el ciudadano olivense y la municipalidad: informar, orientar y permitir realizar trámites en línea.

El frontend se construye como una **aplicación desacoplada** que consume una API REST provista por el backend Laravel. Mientras el backend no esté disponible, el desarrollo avanza con un **contrato OpenAPI** y datos simulados mediante **MSW**, de modo que la integración final solo implique cambiar la URL base de la API.

### Objetivos

1. Portal informativo completo: institucional, trámites, normas, noticias, campañas, transparencia, participación vecinal.
2. Módulos transaccionales simulados: pago de tributos, mesa de partes virtual, libro de reclamaciones y citas.
3. Cumplir los requisitos no funcionales del proyecto: carga < 2 s en móvil de gama media, accesibilidad WCAG 2.1 AA y legibilidad para adultos mayores.
4. Entregar una app funcional navegable **más una suite de pruebas** (unitarias, integración, E2E, accesibilidad y performance).

### Fuera de alcance

- Backend, base de datos, pasarela de pagos real (Yape/Plin) y validación real contra RENIEC.
- Panel administrativo (`/admin/*`): lo cubre el Blade del equipo backend.
- Contenido legal definitivo: se usa contenido de referencia de gob.pe marcado como demostrativo.

---

## 2. Corrección de stack: Bootstrap 5 → Tailwind CSS

> **Nota importante.** El documento `docs/EVA Criterio Los Olivos.docx` indica como stack "Laravel (PHP 8.x), MySQL y Bootstrap 5". La mención a **Bootstrap 5 corresponde a un error** en la redacción original de ese documento. El frontend del portal ciudadano se implementará con **Tailwind CSS v4**.

### Justificación

- El portal ciudadano se construye como aplicación **Next.js desacoplada**; no usa vistas Blade, por lo que no existe razón técnica para cargar Bootstrap.
- Tailwind permite un **sistema de diseño propio** (paleta institucional, tipografía accesible, componentes a medida) sin el peso ni la rigidez de un framework de componentes.
- Se reducen dependencias CSS y se mejora el rendimiento en móvil (objetivo < 2 s).
- **Bootstrap 5 se mantiene** únicamente en el **panel administrativo Blade** desarrollado por el equipo backend, por lo que la decisión no invalida esa parte del documento.

### Consecuencias

- Se documenta la decisión en el ADR incluido en el Anexo A.
- Se exportan **design tokens** en CSS variables para que el panel Blade pueda reutilizar la paleta y tipografía.
- Si el curso exige estrictamente Bootstrap en el frontend, el componente visual puede portarse: los tokens y la estructura de componentes están aislados en `src/components/ui` y `src/styles`.

---

## 3. Stack tecnológico

| Capa               | Tecnología                                                                    | Justificación                                                                  |
| ------------------ | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Framework          | **Next.js 16 (App Router) + TypeScript**                                      | SSR/ISR para SEO en noticias, normas y trámites; mejor LCP en móvil gama media |
| Estilos            | **Tailwind CSS v4** + CSS variables                                           | Design tokens compartibles con el panel Blade                                  |
| Componentes UI     | **shadcn/ui (Radix UI) + lucide-react**                                       | Accesibilidad nativa (foco, teclado, ARIA) sin lock-in                         |
| Estado de servidor | **TanStack Query**                                                            | Cache, revalidación, estados de carga y error                                  |
| Formularios        | **React Hook Form + Zod**                                                     | Validación de DNI/RUC, PDF ≤ 25 MB, mensajes en español                        |
| Contratos / mocks  | **OpenAPI 3.1 + MSW**                                                         | Desarrollo sin backend y contract testing                                      |
| Filtros en URL     | **nuqs**                                                                      | Filtros compartibles y rastreables por buscadores                              |
| Fechas / gráficos  | **date-fns** + **Recharts**                                                   | Formato es-PE y gráficos de transparencia presupuestal                         |
| i18n               | **next-intl** (solo `es` por ahora)                                           | Estructura preparada para quechua/inglés                                       |
| SEO                | Metadata API, JSON-LD, `next-sitemap`                                         | Indexación y datos estructurados `GovernmentOrganization`                      |
| Calidad            | ESLint, Prettier, Husky + lint-staged                                         | Consistencia de código                                                         |
| Pruebas            | **Vitest + Testing Library**, **Playwright**, **axe-core**, **Lighthouse CI** | Alineado al plan de pruebas del proyecto                                       |
| Runtime            | Node.js 22 + pnpm                                                             | Rendimiento y reproducibilidad                                                 |

### Variables de entorno

```env
NEXT_PUBLIC_API_URL=https://api.munilosolivos.gob.pe/v1
NEXT_PUBLIC_SITE_URL=https://www.munilosolivos.gob.pe
NEXT_PUBLIC_USE_MOCKS=true
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=...
```

`NEXT_PUBLIC_USE_MOCKS=true` activa MSW en desarrollo; en producción se desactiva y todo apunta a la API Laravel.

---

## 4. Arquitectura

```
┌──────────────────────────────┐
│  Navegador (ciudadano)       │
└──────────────┬───────────────┘
               │ HTTPS
┌──────────────▼───────────────┐
│  Next.js 16 (App Router)     │
│  ├─ Server Components (SSR)  │
│  ├─ ISR: noticias/normas     │
│  ├─ Client Components        │
│  └─ Route Handlers (BFF)     │
└──────────────┬───────────────┘
               │ REST / JSON (OpenAPI)
┌──────────────▼───────────────┐
│  API Laravel (equipo backend)│
│  ├─ Auth DNI + OTP           │
│  ├─ Tributos                 │
│  ├─ Mesa de partes (PDF)     │
│  └─ Contenido institucional  │
└──────────────┬───────────────┘
               │
┌──────────────▼───────────────┐
│  MySQL 8.0                   │
└──────────────────────────────┘
```

### Estrategia de datos

- **Contrato primero:** el equipo frontend define `docs/api/openapi.yaml` (ver Anexo B) y lo valida con el equipo backend antes de codificar pantallas.
- **Mocks:** MSW intercepta las peticiones en desarrollo y en pruebas, sirviendo datos semilla realistas.
- **Render por tipo de contenido:**

| Contenido                           | Estrategia       | `revalidate` |
| ----------------------------------- | ---------------- | ------------ |
| Home                                | ISR              | 300 s        |
| Noticias, campañas                  | ISR              | 300 s        |
| Normas, informes                    | ISR              | 3600 s       |
| Trámites, servicios, TUPA           | ISR              | 3600 s       |
| Institucional, sedes, funcionarios  | ISR              | 86400 s      |
| Buscador                            | SSR dinámico     | —            |
| Mi cuenta, tributos, mesa de partes | SSR + `no-store` | —            |

- **Seguridad:** el token de sesión se maneja en cookies `HttpOnly` emitidas por el backend; el frontend nunca almacena credenciales en `localStorage`. El middleware de Next protege `/mi-cuenta/*` y los flujos transaccionales.
- **Feature flags:** cada módulo transaccional se activa con una bandera (`tributos`, `mesa-de-partes`, `citas`) para poder desplegar el portal informativo aunque el backend transaccional no esté listo.

---

## 5. Mapa de rutas

**Total: ~72 rutas** (≈ 57 páginas + 12 plantillas dinámicas + 3 de sistema).

### A. Núcleo y navegación (8)

| Ruta                               | Tipo     | Render  | Descripción                                                                  |
| ---------------------------------- | -------- | ------- | ---------------------------------------------------------------------------- |
| `/`                                | estática | ISR     | Home con hero, accesos rápidos, campaña vigente, noticias y normas recientes |
| `/buscar`                          | estática | SSR     | Buscador global unificado con filtros por tipo y año                         |
| `/mapa-del-sitio`                  | estática | ISR     | Índice de todas las secciones                                                |
| `/contacto`                        | estática | ISR     | Canales de atención, formulario y mapa de sede central                       |
| `/emergencias`                     | estática | ISR     | Comisarías, Serenazgo, teléfonos y WhatsApp                                  |
| `/preguntas-frecuentes`            | estática | ISR     | FAQ con acordeón y búsqueda                                                  |
| `/libro-de-reclamaciones`          | estática | cliente | Formulario estilo INDECOPI y generación de constancia                        |
| `/libro-de-reclamaciones/consulta` | estática | cliente | Consulta de reclamo por código                                               |

### B. Institucional (9)

| Ruta                                            | Tipo     | Descripción                               |
| ----------------------------------------------- | -------- | ----------------------------------------- |
| `/institucional`                                | estática | ¿Qué hacemos? Misión, visión y funciones  |
| `/institucional/organizacion`                   | estática | Estructura orgánica y gerencias           |
| `/institucional/organigrama`                    | estática | Organigrama (imagen/PDF con visor)        |
| `/institucional/autoridades`                    | estática | Alcalde y regidores                       |
| `/institucional/directorio-funcionarios`        | estática | Directorio con búsqueda y filtro por área |
| `/institucional/directorio-funcionarios/[slug]` | dinámica | Ficha del funcionario                     |
| `/institucional/sedes`                          | estática | Listado de sedes con mapa                 |
| `/institucional/sedes/[slug]`                   | dinámica | Detalle de sede, horario y servicios      |
| `/institucional/documentos-de-gestion`          | estática | ROF, MOF, PEI, POI, CAP, etc.             |

### C. Trámites y servicios (6)

| Ruta                         | Tipo     | Descripción                                                               |
| ---------------------------- | -------- | ------------------------------------------------------------------------- |
| `/tramites`                  | estática | Catálogo con búsqueda y filtros por categoría                             |
| `/tramites/[slug]`           | dinámica | Detalle: requisitos, costos, plazos, pasos, oficina y descarga de formato |
| `/tramites/categoria/[slug]` | dinámica | Trámites por categoría (licencias, tributos, matrimonio, etc.)            |
| `/tramites/tupa`             | estática | TUPA con tabla filtrable y descarga PDF                                   |
| `/servicios`                 | estática | Servicios municipales (limpieza, serenazgo, programas)                    |
| `/servicios/[slug]`          | dinámica | Detalle del servicio                                                      |

### D. Normas y documentos (6)

| Ruta                                  | Tipo     | Descripción                                                         |
| ------------------------------------- | -------- | ------------------------------------------------------------------- |
| `/normas`                             | estática | Normas legales con filtros por tipo, año y palabra clave            |
| `/normas/[slug]`                      | dinámica | Detalle de norma con visor PDF y descarga                           |
| `/normas/tipo/[slug]`                 | dinámica | Ordenanzas, decretos de alcaldía, acuerdos de concejo, resoluciones |
| `/informes-publicaciones`             | estática | Informes y publicaciones                                            |
| `/informes-publicaciones/[slug]`      | dinámica | Detalle de publicación                                              |
| `/informes-publicaciones/tipo/[slug]` | dinámica | Formato, formulario, informe                                        |

### E. Noticias y campañas (5)

| Ruta                         | Tipo     | Descripción                                            |
| ---------------------------- | -------- | ------------------------------------------------------ |
| `/noticias`                  | estática | Listado con destacados y paginación                    |
| `/noticias/[slug]`           | dinámica | Nota con galería, fecha, etiquetas y relacionadas      |
| `/noticias/categoria/[slug]` | dinámica | Noticias por categoría (seguridad, salud, obras, etc.) |
| `/campanas`                  | estática | Campañas y eventos vigentes y pasados                  |
| `/campanas/[slug]`           | dinámica | Detalle de campaña con fechas y enlace de acción       |

### F. Transparencia (6)

| Ruta                                     | Tipo     | Descripción                                              |
| ---------------------------------------- | -------- | -------------------------------------------------------- |
| `/transparencia`                         | estática | Portal de Transparencia Estándar: accesos y enlace a PTE |
| `/transparencia/presupuesto`             | estática | Ejecución presupuestal con gráficos                      |
| `/transparencia/contrataciones`          | estática | Contrataciones y adquisiciones                           |
| `/transparencia/poi`                     | estática | Plan Operativo Institucional                             |
| `/transparencia/planilla`                | estática | Planilla y personal                                      |
| `/transparencia/acceso-a-la-informacion` | estática | Solicitud de acceso a la información pública             |

### G. Participación vecinal y programas (7)

| Ruta                                               | Tipo     | Descripción                                              |
| -------------------------------------------------- | -------- | -------------------------------------------------------- |
| `/participacion-vecinal`                           | estática | Espacios de participación                                |
| `/participacion-vecinal/presupuesto-participativo` | estática | Presupuesto participativo: etapas y documentos           |
| `/participacion-vecinal/codisec`                   | estática | CODISE                                                   |
| `/programas`                                       | estática | Programas sociales (Vaso de Leche, OMAPED, DEMUNA, etc.) |
| `/programas/[slug]`                                | dinámica | Detalle del programa                                     |
| `/convocatorias`                                   | estática | Convocatorias CAS y procesos                             |
| `/convocatorias/[slug]`                            | dinámica | Detalle de convocatoria y bases                          |

### H. Autenticación (4)

| Ruta               | Tipo     | Descripción                                          |
| ------------------ | -------- | ---------------------------------------------------- |
| `/login`           | estática | Acceso con DNI + contraseña                          |
| `/registro`        | estática | Registro con validación de residencia en el distrito |
| `/recuperar-clave` | estática | Recuperación por correo/OTP                          |
| `/verificar-dni`   | estática | Verificación OTP                                     |

### I. Mi cuenta — área privada (7)

Layout protegido por middleware; redirección a `/login?redirect=`.

| Ruta                             | Descripción                                               |
| -------------------------------- | --------------------------------------------------------- |
| `/mi-cuenta`                     | Dashboard: deuda total, vencimientos, expedientes activos |
| `/mi-cuenta/perfil`              | Datos personales y dirección                              |
| `/mi-cuenta/tributos`            | Predios y vehículos registrados                           |
| `/mi-cuenta/tributos/[predioId]` | Detalle de deuda por predio                               |
| `/mi-cuenta/pagos`               | Historial de pagos y constancias                          |
| `/mi-cuenta/expedientes`         | Expedientes de mesa de partes                             |
| `/mi-cuenta/expedientes/[id]`    | Detalle y timeline del expediente                         |
| `/mi-cuenta/notificaciones`      | Notificaciones electrónicas                               |

### J. Tributos — flujo transaccional (6)

| Ruta                            | Descripción                                    |
| ------------------------------- | ---------------------------------------------- |
| `/tributos`                     | Landing: qué se puede pagar y cómo             |
| `/tributos/consulta`            | Consulta por DNI, código de predio o placa     |
| `/tributos/[contribuyenteId]`   | Deuda consolidada (predial, arbitrios, multas) |
| `/tributos/pago/[ordenId]`      | Checkout: Yape/Plin (QR), tarjeta, efectivo    |
| `/tributos/pago/confirmacion`   | Resultado del pago                             |
| `/tributos/constancia/[pagoId]` | Constancia PDF descargable                     |

Estados manejados: `PENDIENTE`, `PAGADO`, `VENCIDO`, `EN_PROCESO`, `RECHAZADO`.

### K. Mesa de partes virtual (4)

| Ruta                                   | Descripción                                                           |
| -------------------------------------- | --------------------------------------------------------------------- |
| `/mesa-de-partes`                      | Landing con requisitos y enlaces                                      |
| `/mesa-de-partes/nuevo`                | Wizard 4 pasos: datos → trámite → adjuntos PDF ≤ 25 MB → confirmación |
| `/mesa-de-partes/seguimiento`          | Consulta por código de expediente                                     |
| `/mesa-de-partes/seguimiento/[codigo]` | Timeline de estados y observaciones                                   |

### L. Citas (3)

| Ruta                  | Descripción                               |
| --------------------- | ----------------------------------------- |
| `/citas`              | Servicios que requieren cita              |
| `/citas/nueva`        | Selección de servicio, sede, fecha y hora |
| `/citas/confirmacion` | Comprobante de cita con QR                |

### M. Sistema (3)

`not-found.tsx` (404) · `error.tsx` (500) · `loading.tsx` (skeleton global).

### Resumen por grupo

| Grupo                        | Rutas  |
| ---------------------------- | ------ |
| A. Núcleo y navegación       | 8      |
| B. Institucional             | 9      |
| C. Trámites y servicios      | 6      |
| D. Normas y documentos       | 6      |
| E. Noticias y campañas       | 5      |
| F. Transparencia             | 6      |
| G. Participación y programas | 7      |
| H. Autenticación             | 4      |
| I. Mi cuenta                 | 7      |
| J. Tributos                  | 6      |
| K. Mesa de partes            | 4      |
| L. Citas                     | 3      |
| M. Sistema                   | 3      |
| **Total**                    | **74** |

---

## 6. Estructura de carpetas

```
portalweb-muni-losolivos/
├─ docs/
│  ├─ PLAN-FRONTEND.md
│  ├─ EVA Criterio Los Olivos.docx
│  └─ api/
│     └─ openapi.yaml
├─ public/
│  ├─ fonts/
│  ├─ images/
│  └─ documents/
├─ src/
│  ├─ app/
│  │  ├─ (public)/
│  │  │  ├─ layout.tsx
│  │  │  ├─ page.tsx
│  │  │  ├─ institucional/
│  │  │  ├─ tramites/
│  │  │  ├─ servicios/
│  │  │  ├─ normas/
│  │  │  ├─ informes-publicaciones/
│  │  │  ├─ noticias/
│  │  │  ├─ campanas/
│  │  │  ├─ transparencia/
│  │  │  ├─ participacion-vecinal/
│  │  │  ├─ programas/
│  │  │  ├─ convocatorias/
│  │  │  ├─ contacto/
│  │  │  ├─ emergencias/
│  │  │  ├─ preguntas-frecuentes/
│  │  │  ├─ libro-de-reclamaciones/
│  │  │  ├─ buscar/
│  │  │  └─ mapa-del-sitio/
│  │  ├─ (auth)/
│  │  │  ├─ layout.tsx
│  │  │  ├─ login/
│  │  │  ├─ registro/
│  │  │  ├─ recuperar-clave/
│  │  │  └─ verificar-dni/
│  │  ├─ (cuenta)/
│  │  │  └─ mi-cuenta/
│  │  ├─ (tramites)/
│  │  │  ├─ tributos/
│  │  │  ├─ mesa-de-partes/
│  │  │  └─ citas/
│  │  ├─ api/                    # Route Handlers (BFF)
│  │  ├─ layout.tsx
│  │  ├─ not-found.tsx
│  │  ├─ error.tsx
│  │  ├─ loading.tsx
│  │  ├─ sitemap.ts
│  │  └─ robots.ts
│  ├─ components/
│  │  ├─ ui/                     # shadcn/ui
│  │  ├─ layout/                 # Header, MegaMenu, Footer, Breadcrumbs, SkipLink
│  │  ├─ home/                   # Hero, AccesosRapidos, NoticiasDestacadas, CampanaBanner
│  │  ├─ tramites/               # TramiteCard, RequisitosList, CostosTable, PasosTimeline
│  │  ├─ tributos/               # DeudaTable, PredioSelector, MetodoPago, QRPay
│  │  ├─ mesa-partes/            # PdfUploader, ExpedienteTimeline, CodigoSeguimiento
│  │  └─ shared/                 # SearchBar, Pagination, EmptyState, Skeleton, FileDownload
│  ├─ lib/
│  │  ├─ api/                    # client.ts, endpoints/, schemas (zod)
│  │  ├─ auth/                   # sesión, middleware helpers
│  │  ├─ seo/                    # metadata builders, JSON-LD
│  │  ├─ format/                 # moneda PEN, fechas es-PE, DNI/RUC
│  │  └─ constants/              # navegación, categorías, tipos de norma
│  ├─ mocks/                     # handlers MSW + seeds JSON
│  ├─ styles/
│  │  └─ globals.css
│  └─ middleware.ts
├─ tests/
│  ├─ unit/
│  ├─ integration/
│  └─ e2e/
├─ next.config.ts
├─ tailwind.config.ts
├─ vitest.config.ts
├─ playwright.config.ts
└─ package.json
```

### Patrón de página

- `page.tsx` → **Server Component**: fetch de datos y `generateMetadata`.
- Componentes `"use client"` solo para interactividad (filtros, formularios, pagos, carruseles).
- Carga de datos con `fetch` extendido de Next (cache + `revalidate`) en servidor; TanStack Query en cliente para mutaciones y datos privados.
- Cada ruta dinámica define `generateStaticParams` cuando el contenido lo permite.

---

## 7. Sistema de diseño

### Paleta institucional

| Token                   | Valor         | Uso                              |
| ----------------------- | ------------- | -------------------------------- |
| `--color-primary`       | `#4B7F52`     | Verde olivo institucional        |
| `--color-primary-dark`  | `#1F3D24`     | Header, textos de énfasis        |
| `--color-primary-light` | `#E8F0E9`     | Fondos de sección                |
| `--color-accent`        | `#C9A227`     | Dorado de acento, CTA secundario |
| `--color-danger`        | `#B3261E`     | Alertas y estados vencidos       |
| `--color-success`       | `#2E7D32`     | Pagos exitosos                   |
| `--color-neutral-*`     | escala cálida | Textos, bordes y fondos          |

### Tipografía

- Familia: **Inter** o **Manrope** (self-hosted, `next/font/local`).
- Base **17–18 px** (no 14 px), `line-height: 1.6`, escalas con `clamp()`.
- Máximo ~70 caracteres por línea en contenido editorial.

### Reglas de accesibilidad (WCAG 2.1 AA)

- Contraste mínimo 4.5:1 en texto y 3:1 en componentes.
- Foco visible en todos los elementos interactivos.
- Navegación completa por teclado y `skip-link` al contenido principal.
- Etiquetas explícitas, `aria-*` correctos y mensajes de error en español sin tecnicismos.
- `prefers-reduced-motion` respetado en todas las animaciones.
- Objetivos táctiles ≥ 44 × 44 px.
- Formularios con instrucciones antes del campo, no solo placeholders.

### Responsive

- Mobile-first con breakpoints Tailwind (`sm 640`, `md 768`, `lg 1024`, `xl 1280`).
- Header con mega-menú colapsable y accesible.
- Tablas de deuda y TUPA se transforman en tarjetas en móvil.

### Componentes reutilizables

`PageHeader` (con breadcrumbs), `SectionTitle`, `CardGrid`, `DocumentList`, `AlertBanner`, `QuickAccessGrid`, `Pagination`, `EmptyState`, `Skeleton`, `FileDownload`, `StatCard`, `Timeline`.

---

## 8. Módulos funcionales

### 8.1 Home

- Hero con imagen institucional y buscador.
- Accesos rápidos: Tributos, Mesa de partes, Libro de reclamaciones, Seguimiento de trámites.
- Banner de campaña tributaria vigente (ISR).
- Últimas noticias, normas recientes, campañas y enlaces de interés.
- Bloque de contacto y números de emergencia.

### 8.2 Tributos

1. Consulta por DNI, código de predio o placa.
2. Deuda consolidada: impuesto predial, arbitrios, multas.
3. Selección de conceptos a pagar.
4. Checkout con **Yape/Plin (QR simulado)**, tarjeta y efectivo.
5. Confirmación y constancia PDF.
6. Estados: `PENDIENTE`, `PAGADO`, `VENCIDO`, `EN_PROCESO`, `RECHAZADO`.

### 8.3 Mesa de partes virtual

- Wizard de 4 pasos: datos del solicitante → tipo de trámite → adjuntos → confirmación.
- **Validación de PDF ≤ 25 MB**: extensión, MIME y _magic bytes_ (`%PDF-`) en cliente; la validación definitiva ocurre en el backend.
- Código de expediente generado y envío por correo.
- Seguimiento por código con timeline de estados y observaciones.

### 8.4 Libro de reclamaciones

- Formulario conforme a la estructura de INDECOPI (consumidor, proveedor, bien/servicio, detalle, pedido).
- Generación de constancia con código y descarga PDF.
- Consulta de reclamo por código.

### 8.5 Mi cuenta

- Dashboard con deuda total, próximos vencimientos, expedientes activos y notificaciones.
- Perfil, predios/vehículos, historial de pagos, expedientes y notificaciones electrónicas.

### 8.6 Buscador global

- Índice unificado: trámites, normas, noticias, publicaciones y campañas.
- Filtros por tipo, año y categoría; estado en URL (nuqs) y paginación server-side.
- Estado vacío con sugerencias y enlaces a secciones populares.

### 8.7 Datos simulados

- Seeds realistas extraídos de https://www.gob.pe/munilosolivos: trámites, normas, noticias, campañas, sedes y funcionarios.
- Todos los datos marcados como **demostrativos** hasta la integración con la API.

---

## 9. Fases y estimación

| Fase                                                         | Entregable                                                             | Horas     |
| ------------------------------------------------------------ | ---------------------------------------------------------------------- | --------- |
| 0. Setup                                                     | Next + TS + Tailwind, shadcn, ESLint/Prettier, MSW, CI, tokens         | 12        |
| 1. Design system + layouts                                   | Header/mega-menú, footer, breadcrumbs, componentes base, home          | 30        |
| 2. Contenido institucional                                   | Institucional, sedes, funcionarios, organigrama, contacto, emergencias | 26        |
| 3. Trámites, normas, noticias, campañas                      | Listados + detalle + filtros + búsqueda                                | 38        |
| 4. Transparencia + participación + programas + convocatorias | 6 secciones con datos y gráficos                                       | 26        |
| 5. Auth + Mi cuenta                                          | Login DNI, OTP, middleware, dashboard y subsecciones                   | 28        |
| 6. Transaccional                                             | Tributos (consulta/pago/constancia), mesa de partes, citas, reclamos   | 44        |
| 7. SEO, a11y, performance                                    | Metadata, JSON-LD, sitemap, axe/Lighthouse, optimización de imágenes   | 16        |
| 8. Pruebas                                                   | Vitest/RTL, Playwright E2E, contract tests, Lighthouse CI              | 30        |
| **Total**                                                    |                                                                        | **250 h** |

### Cronograma sugerido (5 sprints de 2 semanas)

| Sprint | Fases     | Foco                                       |
| ------ | --------- | ------------------------------------------ |
| S1     | 0 + 1     | Base técnica, design system y home         |
| S2     | 2 + 3     | Contenido institucional y editorial        |
| S3     | 4         | Transparencia, participación y programas   |
| S4     | 5         | Autenticación y área privada               |
| S5     | 6 + 7 + 8 | Módulos transaccionales, calidad y pruebas |

**Riesgo principal:** la Fase 6 depende del contrato OpenAPI y de la disponibilidad del backend. Se mitiga con MSW y feature flags.

---

## 10. Estrategia de pruebas

### 10.1 Unitarias — Vitest + Testing Library

- Formateo de moneda PEN y fechas es-PE.
- Validadores de DNI, RUC y código de predio.
- Cálculo de moras y descuentos en la capa de presentación.
- Estados de componentes (`loading`, `error`, `empty`, `success`).

### 10.2 Integración — MSW + TanStack Query

- Flujo consulta → selección → checkout de tributos.
- Filtros y paginación del buscador y de normas.
- Subida de archivos en mesa de partes (validaciones de tipo y tamaño).

### 10.3 E2E — Playwright

| Caso      | Escenario                               | Resultado esperado                                                         |
| --------- | --------------------------------------- | -------------------------------------------------------------------------- |
| **CP-01** | Subir PDF de 30 MB en mesa de partes    | Rechazo inmediato con mensaje "Error: El tamaño máximo permitido es 25 MB" |
| **CP-02** | Registro con DNI de otro distrito       | Bloqueo con "Solo residentes del distrito pueden crear una cuenta"         |
| **CP-03** | Pago con QR Yape simulado               | Estado del predio cambia de `PENDIENTE` a `PAGADO` y se emite constancia   |
| CP-04     | Navegación completa por teclado en home | Todos los elementos alcanzables y con foco visible                         |
| CP-05     | Búsqueda sin resultados                 | Estado vacío con sugerencias                                               |
| CP-06     | Acceso a `/mi-cuenta` sin sesión        | Redirección a `/login?redirect=/mi-cuenta`                                 |

### 10.4 Accesibilidad

- `axe-core` integrado en Playwright sobre todas las rutas: 0 violaciones críticas.
- Revisión manual de contraste, foco y lectores de pantalla en home, trámites y tributos.

### 10.5 Performance

- Lighthouse CI con presupuestos:
  - LCP < 2.5 s en 4G simulada.
  - CLS < 0.1.
  - Bundle inicial < 200 KB gzip.
  - Imágenes en AVIF/WebP con `next/image` y `sizes` correctos.
- Análisis de bundle con `@next/bundle-analyzer`.

### 10.6 Contract testing

- Validación de respuestas de la API contra `openapi.yaml` con Zod.
- Ejecución en CI contra el entorno de staging del backend.

### 10.7 CI/CD

- GitHub Actions: lint → typecheck → unit → integration → build → E2E → Lighthouse.
- Despliegue de preview por pull request.

---

## 11. Riesgos y mitigaciones

| Riesgo                                            | Impacto | Mitigación                                                                    |
| ------------------------------------------------- | ------- | ----------------------------------------------------------------------------- |
| El docx del curso exige Bootstrap 5               | Medio   | ADR + tokens compatibles; Bootstrap se mantiene en el panel Blade             |
| Backend atrasado o contrato cambiante             | Alto    | OpenAPI primero, MSW y feature flags para aislar cada módulo                  |
| SEO deficiente                                    | Alto    | SSR/ISR de Next, JSON-LD, sitemap y metadata por ruta                         |
| Validación de PDF solo en cliente no es seguridad | Alto    | Validación en backend; el frontend solo mejora la UX; documentado en pruebas  |
| Conectividad móvil limitada                       | Medio   | Imágenes optimizadas, fuentes locales, code-splitting y cache ISR             |
| Datos oficiales no disponibles                    | Medio   | Seeds desde gob.pe marcados como demostrativos                                |
| Brecha digital (adultos mayores)                  | Medio   | Tipografía grande, lenguaje claro, formularios guiados y pruebas con usuarios |
| Integración Yape/Plin no real                     | Bajo    | Flujo simulado con QR de prueba y estados mock                                |

---

## 12. Criterios de aceptación

1. Las ~74 rutas responden con contenido (real o mock) y sin errores de consola.
2. Todas las rutas pasan `axe-core` sin violaciones críticas.
3. Lighthouse ≥ 90 en Performance, Accessibility, Best Practices y SEO en home, trámites y noticias.
4. CP-01, CP-02 y CP-03 pasan en Playwright.
5. El build de producción compila sin errores de TypeScript y con bundle inicial < 200 KB gzip.
6. El frontend funciona con `NEXT_PUBLIC_USE_MOCKS=true` sin backend y con `false` apuntando a la API.
7. Documentación de rutas, componentes y contrato API disponible en `docs/`.

---

## 13. Próximos pasos

1. Aprobar este plan y el ADR del Anexo A.
2. Definir con el equipo backend el **contrato OpenAPI v1** (Anexo B).
3. ~~Iniciar Fase 0–1: setup del proyecto, design system y home con datos mock.~~ **Completado** (ver sección 14).
4. Configurar CI y los primeros casos Playwright (CP-01, CP-02, CP-06).
5. Revisar semanalmente el avance contra el cronograma de 5 sprints.

---

## 14. Estado de implementación

### Fase 0 — Setup técnico (completada)

| Elemento           | Versión / decisión                                               |
| ------------------ | ---------------------------------------------------------------- |
| Next.js            | **16.4.3** (App Router, Turbopack, Cache Components)             |
| React              | 19.3.0                                                           |
| TypeScript         | 5.9.3                                                            |
| Tailwind CSS       | 4.3.3 (`@tailwindcss/turbopack`)                                 |
| shadcn/ui          | CLI 4.23.0 · estilo `radix-nova` · base neutral · librería Radix |
| Gestor de paquetes | pnpm 10.22.0 · Node 24.20                                        |
| Fuente             | Inter (autohospedada vía `next/font`)                            |

**Componentes shadcn instalados:** button, card, input, label, select, checkbox,
radio-group, dialog, sheet, dropdown-menu, navigation-menu, accordion, tabs, table,
badge, alert, breadcrumb, pagination, field, textarea, sonner, skeleton, separator,
tooltip, avatar, calendar, popover, command, input-group.

> Nota: en shadcn v4 el componente `form` fue reemplazado por `field`; los formularios
> se construyen con `field` + React Hook Form + Zod.

**Dependencias base:** `@tanstack/react-query`, `react-hook-form`, `zod`,
`@hookform/resolvers`, `date-fns`, `recharts`, `nuqs`, `next-themes`.

**Calidad:** ESLint 9, Prettier + `prettier-plugin-tailwindcss`, Husky + lint-staged,
Vitest + Testing Library + jsdom, Playwright + axe-core.

### Fase 1 — Design system y home (completada)

- Tokens institucionales en `src/app/globals.css`: paleta olivo (`#4B7F52`),
  verde oscuro (`#1F3D24`), dorado (`#C9A227`), radios y tipografía base de 17 px.
- Accesibilidad: `skip-link`, foco visible, objetivos táctiles ≥ 44 px,
  `prefers-reduced-motion`, `lang="es-PE"` y jerarquía de encabezados.
- Layout raíz: `Header` (barra superior, mega-menú Radix, menú móvil en `Sheet`,
  buscador y acceso a Mi cuenta) y `Footer` institucional con canales y redes.
- Home con datos simulados: hero con buscador, 6 accesos rápidos, campaña vigente,
  últimas noticias, normas recientes y canales de atención/emergencias.
- Páginas de sistema: `not-found`, `error`, `loading`, `robots.txt`, `sitemap.xml`.
- Protección de `/mi-cuenta` mediante `src/proxy.ts` (convención de Next 16 que
  reemplaza a `middleware.ts`).
- Capa de datos: `src/lib/api` con cliente tipado y conmutación mock/API mediante
  `NEXT_PUBLIC_USE_MOCKS`; seeds en `src/mocks/data`.
- Pruebas: 12 unitarias de formato/validación y 2 E2E de control de acceso (CP-06).

### Verificación ejecutada

| Comando                      | Resultado                                                   |
| ---------------------------- | ----------------------------------------------------------- |
| `pnpm typecheck`             | Sin errores                                                 |
| `pnpm lint`                  | Sin errores                                                 |
| `pnpm test`                  | 12/12 pruebas aprobadas                                     |
| `pnpm build`                 | Build de producción correcto (home estática prerenderizada) |
| `pnpm start` + request a `/` | HTTP 200 con todas las secciones                            |
| Request a `/mi-cuenta`       | HTTP 307 → `/login?redirect=/mi-cuenta`                     |

### Siguiente fase

Fase 2 — contenido institucional (`/institucional`, sedes, funcionarios, organigrama,
contacto y emergencias) reutilizando los componentes base ya creados.

---

## Anexo A — ADR 0001: Stack del frontend

**Título:** Adopción de Next.js + Tailwind para el portal ciudadano
**Estado:** Aceptado
**Fecha:** Noviembre 2026

### Contexto

El documento de plan de pruebas del proyecto menciona Bootstrap 5 como framework frontend. El portal ciudadano requiere SEO, carga rápida en móvil, accesibilidad y un sistema de diseño institucional propio. El backend Laravel lo desarrolla otro equipo en paralelo.

### Decisión

- El portal ciudadano se implementa con **Next.js 16 (App Router) + TypeScript + Tailwind CSS v4**.
- La mención a **Bootstrap 5 en el documento original se considera un error**.
- **Bootstrap 5 permanece** en el panel administrativo Blade del equipo backend.
- Se comparten **design tokens** (CSS variables) entre ambos.

### Consecuencias

- **Positivas:** mejor SEO y rendimiento, sistema de diseño propio, componentes accesibles, menor peso CSS.
- **Negativas:** curva de aprendizaje de Next.js/Tailwind para el equipo; se requiere contrato API estable.
- **Neutras:** el panel administrativo no se ve afectado.

---

## Anexo B — Esqueleto del contrato OpenAPI

```yaml
openapi: 3.1.0
info:
  title: API Portal Web MDLO
  version: 0.1.0
  description: Contrato preliminar entre el frontend Next.js y el backend Laravel.

servers:
  - url: https://api.munilosolivos.gob.pe/v1
    description: Producción
  - url: https://staging-api.munilosolivos.gob.pe/v1
    description: Staging

tags:
  - name: auth
  - name: tributos
  - name: mesa-partes
  - name: contenido
  - name: transparencia

components:
  securitySchemes:
    cookieAuth:
      type: apiKey
      in: cookie
      name: mdlo_session

  schemas:
    Error:
      type: object
      required: [code, message]
      properties:
        code: { type: string, example: VALIDATION_ERROR }
        message: { type: string, example: "El tamaño máximo permitido es 25 MB" }
        details:
          type: array
          items: { type: string }

    Paginacion:
      type: object
      properties:
        page: { type: integer, example: 1 }
        perPage: { type: integer, example: 20 }
        total: { type: integer, example: 134 }
        totalPages: { type: integer, example: 7 }

    Norma:
      type: object
      properties:
        id: { type: string }
        tipo: { type: string, example: ordenanza }
        numero: { type: string, example: "123-2026-MDLO" }
        titulo: { type: string }
        fecha: { type: string, format: date }
        resumen: { type: string }
        archivoUrl: { type: string, format: uri }

    Tramite:
      type: object
      properties:
        id: { type: string }
        slug: { type: string }
        nombre: { type: string }
        categoria: { type: string }
        descripcion: { type: string }
        requisitos:
          type: array
          items: { type: string }
        costo: { type: number, example: 0 }
        plazoDias: { type: integer, example: 15 }
        oficina: { type: string }

paths:
  /auth/login:
    post:
      tags: [auth]
      summary: Inicio de sesión con DNI
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required: [dni, password]
              properties:
                dni: { type: string, pattern: "^[0-9]{8}$" }
                password: { type: string, format: password }
      responses:
        "200":
          description: Sesión iniciada (cookie HttpOnly)
        "401":
          description: Credenciales inválidas
          content:
            application/json:
              schema: { $ref: "#/components/schemas/Error" }

  /auth/registro:
    post:
      tags: [auth]
      summary: Registro validando residencia en el distrito
      responses:
        "201": { description: Cuenta creada }
        "422":
          description: DNI no residente o datos inválidos
          content:
            application/json:
              schema: { $ref: "#/components/schemas/Error" }

  /tributos/consulta:
    get:
      tags: [tributos]
      summary: Consulta de deuda por DNI, predio o placa
      parameters:
        - { in: query, name: documento, schema: { type: string } }
        - { in: query, name: codigoPredio, schema: { type: string } }
        - { in: query, name: placa, schema: { type: string } }
      responses:
        "200": { description: Deuda consolidada }
        "404": { description: Contribuyente no encontrado }

  /tributos/pagos:
    post:
      tags: [tributos]
      summary: Registrar pago (Yape/Plin simulado)
      security: [{ cookieAuth: [] }]
      responses:
        "201": { description: Orden de pago creada }
        "409": { description: Orden ya pagada }

  /tributos/constancias/{pagoId}:
    get:
      tags: [tributos]
      summary: Descargar constancia de pago en PDF
      security: [{ cookieAuth: [] }]
      parameters:
        - { in: path, name: pagoId, required: true, schema: { type: string } }
      responses:
        "200":
          description: PDF
          content:
            application/pdf:
              schema: { type: string, format: binary }

  /mesa-partes/expedientes:
    post:
      tags: [mesa-partes]
      summary: Registrar expediente con adjuntos PDF
      security: [{ cookieAuth: [] }]
      requestBody:
        content:
          multipart/form-data:
            schema:
              type: object
              properties:
                tipoTramite: { type: string }
                asunto: { type: string }
                archivos:
                  type: array
                  items: { type: string, format: binary }
      responses:
        "201": { description: Expediente creado con código de seguimiento }
        "422": { description: Archivo inválido o mayor a 25 MB }

  /mesa-partes/expedientes/{codigo}:
    get:
      tags: [mesa-partes]
      summary: Seguimiento de expediente
      parameters:
        - { in: path, name: codigo, required: true, schema: { type: string } }
      responses:
        "200": { description: Estado y timeline del expediente }
        "404": { description: Código no encontrado }

  /contenido/normas:
    get:
      tags: [contenido]
      summary: Listado de normas con filtros
      parameters:
        - { in: query, name: tipo, schema: { type: string } }
        - { in: query, name: anio, schema: { type: integer } }
        - { in: query, name: q, schema: { type: string } }
        - { in: query, name: page, schema: { type: integer, default: 1 } }
      responses:
        "200":
          description: Listado paginado
          content:
            application/json:
              schema:
                allOf:
                  - $ref: "#/components/schemas/Paginacion"
                  - type: object
                    properties:
                      items:
                        type: array
                        items: { $ref: "#/components/schemas/Norma" }

  /contenido/tramites:
    get:
      tags: [contenido]
      summary: Catálogo de trámites
      responses:
        "200":
          description: Listado de trámites
          content:
            application/json:
              schema:
                type: array
                items: { $ref: "#/components/schemas/Tramite" }

  /transparencia/presupuesto:
    get:
      tags: [transparencia]
      summary: Ejecución presupuestal agregada
      parameters:
        - { in: query, name: anio, schema: { type: integer } }
      responses:
        "200": { description: Datos para gráficos de ejecución }
```

---

## Anexo C — Convenciones de desarrollo

- **Commits:** Conventional Commits (`feat:`, `fix:`, `docs:`, `test:`, `refactor:`).
- **Ramas:** `main`, `develop`, `feature/<nombre>`, `fix/<nombre>`.
- **Nombres:** componentes en PascalCase, hooks `useX`, utilidades en camelCase, rutas en kebab-case.
- **Componentes:** Server Component por defecto; `"use client"` solo cuando sea necesario.
- **Textos:** todo el contenido visible en español (es-PE), sin tecnicismos.
- **Fechas y moneda:** `dd/MM/yyyy` y `S/ 1,234.56` mediante `lib/format`.
- **Imágenes:** siempre `next/image` con `alt` descriptivo y dimensiones explícitas.
- **No comentarios innecesarios en el código**; la documentación vive en `docs/`.
