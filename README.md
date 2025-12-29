# Sebastian Luna · portafolio

Sitio personal de **Sebastian Luna**, senior frontend developer en Boca del Río, Veracruz. Una sola página en Next.js con cuatro bloques: presentación, proyectos en producción, sobre mí y contacto. Está en español y en inglés (`/` y `/en`); no hay CMS ni base de datos: el contenido vive en el repositorio y el sitio se sirve estático.

## Requisitos

- **Node 20.9+** (requisito de Next 16). CI corre con Node 22.
- Variables de entorno en `.env.local` (copia `.env.example`): sólo `NEXT_PUBLIC_SITE_URL`, la URL pública que usan el sitemap, `robots.txt`, las canónicas y Open Graph. Sin ella se asume el dominio de producción.

## Puesta en marcha

```bash
npm install
cp .env.example .env.local
npm run dev                  # http://localhost:3000 (español) y /en (inglés)
```

## Comandos disponibles

| Comando                                   | Descripción                                             |
| ----------------------------------------- | ------------------------------------------------------- |
| `npm run dev`                             | Servidor de desarrollo.                                 |
| `npm run build`                           | Build de producción (todo estático).                    |
| `npm run start`                           | Sirve el build de producción.                           |
| `npm run lint`                            | ESLint.                                                 |
| `npm run typecheck`                       | `next typegen` + `tsc --noEmit`, lo mismo que corre CI. |
| `npm run test`                            | Vitest, una pasada.                                     |
| `npm run test:watch`                      | Vitest en modo watch.                                   |
| `npm run test:coverage`                   | Vitest con cobertura (v8) sobre `lib` y `constants`.    |
| `npm run format` / `npm run format:check` | Prettier sobre el repo.                                 |

`.github/workflows/ci.yml` corre `lint`, `typecheck`, `test` y `build` en cada push a `main` y en cada pull request.

## Mapa de rutas

Una página en dos idiomas:

- `/` en español (idioma por defecto, sin prefijo) y `/en` en inglés. `proxy.ts` (next-intl) añade el segmento de idioma a cada petición y, en la primera visita sin prefijo, redirige a `/en` si el navegador prefiere inglés.
- Anclas dentro de la página: `#inicio`, `#proyectos`, `#sobre-mi` y `#contacto`. Están en `constants/navigation.const.ts`, de donde las leen la cabecera y el menú del teléfono. Las anclas no se traducen.
- Cualquier otra URL bajo un idioma conocido muestra la 404 de `app/[locale]/not-found.tsx`.

Además Next genera `/robots.txt`, `/sitemap.xml` (las dos URLs con sus alternativas `hreflang`) y `/icon.svg`.

## Contenido e idiomas

Todo lo que lee el visitante está en `messages/es.json` y `messages/en.json`, con las mismas claves (el español es el catálogo de referencia y da el tipo de `t()`; ver `types/next-intl.d.ts`). Cada sección lee su espacio de nombres (`hero`, `projects`, `about`, `contact`…) con `useTranslations` o `getTranslations`. Las listas (etiquetas, párrafos) son arrays JSON y se leen con `t.raw` a través de `lib/message-list.ts`, que comprueba que sean listas de textos.

Lo que no cambia con el idioma está en `constants/`:

- `profile.const.ts`: nombre, LinkedIn, GitHub, retrato, el correo y las rutas del CV por idioma (`CONTACT_EMAILS` y `CV_FILES`), las cifras del inicio (`STATS`) y el año del portafolio.
- `projects.const.ts`: los cuatro productos en orden, con su URL pública (si la hay), su captura y el rótulo de su pestaña en el navegador dibujado. Los textos de cada uno están en `projects.items.<slug>` de los mensajes; un proyecto sin URL muestra «Dominio por confirmar» y sin botón; uno sin captura muestra una tarjeta ámbar de «Captura pendiente». Un producto con más de un sitio los lista en `extraViews`: cada uno añade una pestaña que, al pulsarla, cambia la captura y la dirección (hoy sólo Reto MD, con Reto Pediatría y Reto Dermatología). Las pestañas sólo existen en escritorio: el teléfono no dibuja el navegador y se queda con la primera.
- `navigation.const.ts`: las anclas.

Las imágenes están en `public/images` (JPEG de las capturas a 1600 × 900; el retrato es PNG con transparencia, recortado sobre la tarjeta ámbar) y las fuentes en `public/fonts` (Archivo variable, IBM Plex Mono e Instrument Serif itálica, subconjuntos latinos de Google Fonts servidos en local desde `app/[locale]/fonts.ts`). En esa misma carpeta están `archivo-400.ttf` y `archivo-600.ttf`, que no sirve el navegador: los lee la imagen Open Graph, porque Satori no admite woff2.

Los archivos del CV están en `public/cv/<idioma>/cv-sebastian-luna-senior-frontend-developer.pdf`, uno por idioma (`CV_FILES` en `constants/profile.const.ts`). Una carpeta por idioma en vez de un sufijo, para que las dos descargas lleguen al disco con el mismo nombre.

## Arquitectura en breve

- **`app/[locale]/`**: layout (fuentes, metadatos con canónica y `hreflang`, proveedor de next-intl), `page.tsx`, `landing-page.tsx` (compone las secciones según `config/site.config.ts`), la 404 y `globals.css` (tokens y clases compartidas). `opengraph-image.tsx` dibuja con `ImageResponse` la tarjeta que se ve al compartir el sitio, una por idioma y en tiempo de build. `robots.ts`, `sitemap.ts` e `icon.svg` quedan en `app/`.
- **`proxy.ts`** e **`i18n/`**: rutas por idioma (`routing.ts`), carga de mensajes por petición (`request.ts`) y `Link`/`usePathname` conscientes del idioma (`navigation.ts`).
- **`components/site/sections/`**: `shell/` (cabecera con el menú del teléfono, pie) y `home/` (una carpeta por sección: `hero`, `projects`, `about`, `contact`). Cada `.section.tsx` o `.comp.tsx` importa su propio `.css`.
- **`components/site/shared/`**: piezas que usan varias secciones: la píldora con icono redondo, el anillo de redes, la ventana de navegador dibujada en CSS, el selector de idioma y `Reveal`, el envoltorio que hace aparecer un bloque la primera vez que entra en pantalla.
- **`hooks/`**: `use-reveal.hook.ts`, el `IntersectionObserver` detrás de `Reveal`, y `use-rotation.hook.ts`, el reloj que hace pasar solas las pestañas del navegador dibujado.
- **`lib/`**: funciones puras con test al lado (`*.test.ts`).
- **`constants/`** y **`messages/`**: el contenido (ver arriba).

Hay dos componentes de cliente. El menú del teléfono (`mobile-menu.comp.tsx`), un `<dialog>` modal nativo: el navegador se encarga del foco y de la tecla Escape, y `globals.css` bloquea el scroll de la página mientras está abierto. Y el navegador dibujado (`browser-frame.comp.tsx`), que guarda qué pestaña está abierta; con una sola vista su cromo sigue siendo decorativo (`aria-hidden`), y con varias las pestañas son botones (`tablist`/`tab`, flechas izquierda y derecha) que cambian la captura. Con varias vistas la ventana además pasa sola a la siguiente pestaña cada seis segundos y funde una captura sobre la otra: todas se dibujan apiladas en la misma celda y sólo cambia la opacidad. El reloj lo lleva `hooks/use-rotation.hook.ts`, que sólo corre por encima del corte de teléfono, con el bloque a la vista y la pestaña del navegador activa, y nunca con `prefers-reduced-motion`; se detiene mientras el puntero está encima y para del todo en cuanto el visitante elige una pestaña. Las capturas llegan como props desde la tarjeta, así que `next/image` se sigue resolviendo en el servidor.

## Despliegue en Vercel

Basta con conectar el repositorio: no hay variables obligatorias. Define `NEXT_PUBLIC_SITE_URL` con el dominio final para que el sitemap y las canónicas lo usen.

Las convenciones de código están en `AGENTS.md`; la deuda conocida, en `IMPROVEMENTS.md`; las tareas mecánicas, en `todos.md`.
