# Portal Web — Municipalidad Distrital de Los Olivos

Frontend del portal institucional de la MDLO, construido como aplicación desacoplada
que consume la API del backend Laravel.

- **Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · shadcn/ui (Radix)
- **Datos:** capa `src/lib/api` con conmutación entre datos simulados y API real
- **Documentación:** [`docs/PLAN-FRONTEND.md`](docs/PLAN-FRONTEND.md)

## Requisitos

- Node.js 24+
- pnpm 10+

## Puesta en marcha

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Variables de entorno

| Variable                | Descripción                                           |
| ----------------------- | ----------------------------------------------------- |
| `NEXT_PUBLIC_API_URL`   | URL base de la API Laravel (`/api/v1`)                |
| `NEXT_PUBLIC_SITE_URL`  | URL pública del portal (metadata, sitemap, JSON-LD)   |
| `NEXT_PUBLIC_USE_MOCKS` | `true` usa seeds locales; `false` consume la API real |

## Comandos

| Comando          | Descripción                                 |
| ---------------- | ------------------------------------------- |
| `pnpm dev`       | Servidor de desarrollo                      |
| `pnpm build`     | Build de producción                         |
| `pnpm start`     | Servir el build                             |
| `pnpm lint`      | ESLint                                      |
| `pnpm typecheck` | Verificación de tipos                       |
| `pnpm format`    | Prettier sobre todo el proyecto             |
| `pnpm test`      | Pruebas unitarias y de integración (Vitest) |
| `pnpm test:e2e`  | Pruebas end-to-end (Playwright)             |

Las pruebas E2E requieren instalar los navegadores una vez:

```bash
pnpm exec playwright install
```

## Estructura

```
src/
  app/            # rutas (App Router), metadata, sitemap y robots
  components/
    ui/           # componentes shadcn/ui
    layout/       # header, footer, navegación, contenedor
    home/         # secciones de la portada
    shared/       # componentes reutilizables
  lib/
    api/          # cliente HTTP, tipos y acceso a contenido
    constants/    # configuración del sitio, navegación y etiquetas
    format/       # moneda PEN, fechas es-PE y validaciones
    seo/          # metadata y JSON-LD
  mocks/          # datos simulados y handlers MSW
  proxy.ts        # protección de rutas privadas
tests/
  unit/ integration/ e2e/
```

## Estado

Fases 0 y 1 completadas: setup técnico, sistema de diseño, layout institucional,
home con datos simulados, páginas de sistema y suite inicial de pruebas.
El detalle del avance y las siguientes fases está en
[`docs/PLAN-FRONTEND.md`](docs/PLAN-FRONTEND.md).
