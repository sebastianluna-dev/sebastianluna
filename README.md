# Sebastian Luna · portfolio

Personal site of **Sebastian Luna**, senior frontend developer in Boca del Río, Veracruz. A single Next.js page with four blocks: introduction, projects in production, about me and contact. It is in Spanish and English (`/` and `/en`); there is no CMS and no database: the content lives in the repository and the site is served statically.

## Requirements

- **Node 20.9+** (required by Next 16). CI runs on Node 22.
- Environment variables in `.env.local` (copy `.env.example`): only `NEXT_PUBLIC_SITE_URL`, the public URL used by the sitemap, `robots.txt`, the canonicals and Open Graph. Without it the production domain is assumed.

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev                  # http://localhost:3000 (Spanish) and /en (English)
```

## Available commands

| Command                                   | Description                                           |
| ----------------------------------------- | ----------------------------------------------------- |
| `npm run dev`                             | Development server.                                   |
| `npm run build`                           | Production build (fully static).                      |
| `npm run start`                           | Serves the production build.                          |
| `npm run lint`                            | ESLint.                                               |
| `npm run typecheck`                       | `next typegen` + `tsc --noEmit`, the same as CI.      |
| `npm run test`                            | Vitest, a single run.                                 |
| `npm run test:watch`                      | Vitest in watch mode.                                 |
| `npm run test:coverage`                   | Vitest with coverage (v8) over `lib` and `constants`. |
| `npm run format` / `npm run format:check` | Prettier over the repository.                         |

`.github/workflows/ci.yml` runs `lint`, `typecheck`, `test` and `build` on every push to `main` and on every pull request.

## Route map

One page in two languages:

- `/` in Spanish (the default locale, with no prefix) and `/en` in English. `proxy.ts` (next-intl) adds the locale segment to every request and, on a first visit with no prefix, redirects to `/en` when the browser prefers English.
- Anchors within the page: `#inicio`, `#proyectos`, `#sobre-mi` and `#contacto`. They live in `constants/navigation.const.ts`, where the header and the phone menu read them from. The anchors are not translated.
- Any other URL under a known locale renders the 404 in `app/[locale]/not-found.tsx`.

Next also generates `/robots.txt`, `/sitemap.xml` (both URLs with their `hreflang` alternates) and `/icon.svg`.

## Content and languages

Everything the visitor reads is in `messages/es.json` and `messages/en.json`, with the same keys (Spanish is the reference catalogue and gives `t()` its type; see `types/next-intl.d.ts`). Each section reads its own namespace (`hero`, `projects`, `about`, `contact`…) with `useTranslations` or `getTranslations`. Lists (tags, paragraphs) are JSON arrays and are read with `t.raw` through `lib/message-list.ts`, which checks that they really are lists of strings.

What does not change with the language lives in `constants/`:

- `profile.const.ts`: name, LinkedIn, GitHub, portrait, the email address and the CV paths per language (`CONTACT_EMAILS` and `CV_FILES`), the figures of the hero (`STATS`) and the year of the portfolio.
- `projects.const.ts`: the four products in order, with their public URL (when there is one), their screenshot and the title of their tab in the drawn browser window. The copy of each one is in `projects.items.<slug>` of the messages; a project with no URL shows «Dominio por confirmar» and no button; one with no screenshot shows an amber «Captura pendiente» card. A product with more than one site lists the others in `extraViews`: each one adds a tab that, when pressed, swaps the capture and the address (today only Reto MD, with Reto Pediatría and Reto Dermatología). The tabs exist on the desktop only: the phone does not draw the browser window and keeps the first view.
- `navigation.const.ts`: the anchors.

The images are in `public/images` (JPEG screenshots at 1600 × 900; the portrait is a PNG with transparency, cropped over the amber card) and the fonts in `public/fonts` (variable Archivo, IBM Plex Mono and Instrument Serif italic, the Latin subsets of Google Fonts served locally from `app/[locale]/fonts.ts`). That same folder holds `archivo-400.ttf` and `archivo-600.ttf`, which the browser never serves: the Open Graph image reads them, because Satori does not support woff2.

The CV files are in `public/cv/<language>/cv-sebastian-luna-senior-frontend-developer.pdf`, one per language (`CV_FILES` in `constants/profile.const.ts`). A folder per language instead of a suffix, so that both downloads reach the disk under the same name.

## Architecture in brief

- **`app/[locale]/`**: layout (fonts, metadata with the canonical and `hreflang`, next-intl provider), `page.tsx`, `landing-page.tsx` (composes the sections according to `config/site.config.ts`), the 404 and `globals.css` (tokens and shared classes). `opengraph-image.tsx` draws with `ImageResponse` the card seen when the site is shared, one per language and at build time. `robots.ts`, `sitemap.ts` and `icon.svg` stay in `app/`.
- **`proxy.ts`** and **`i18n/`**: routes per language (`routing.ts`), loading the messages per request (`request.ts`) and locale-aware `Link`/`usePathname` (`navigation.ts`).
- **`components/site/sections/`**: `shell/` (header with the phone menu, footer) and `home/` (one folder per section: `hero`, `projects`, `about`, `contact`). Every `.section.tsx` or `.comp.tsx` imports its own `.css`.
- **`components/site/shared/`**: the pieces several sections use: the pill with a round icon, the ring of social links, the browser window drawn in CSS, the language switch and `Reveal`, the wrapper that fades a block in the first time it enters the viewport.
- **`hooks/`**: `use-reveal.hook.ts`, the `IntersectionObserver` behind `Reveal`, and `use-rotation.hook.ts`, the clock that turns the tabs of the drawn browser on their own.
- **`lib/`**: pure functions with their test beside them (`*.test.ts`).
- **`constants/`** and **`messages/`**: the content (see above).

There are two client components. The phone menu (`mobile-menu.comp.tsx`), a native modal `<dialog>`: the browser takes care of the focus and of the Escape key, and `globals.css` locks the page scroll while it is open. And the drawn browser (`browser-frame.comp.tsx`), which keeps which tab is open; with a single view its chrome stays decorative (`aria-hidden`), and with several the tabs are buttons (`tablist`/`tab`, left and right arrows) that swap the capture. With several views the window also turns to the next tab on its own every six seconds, fading one capture into the other: all of them are drawn stacked in the same cell and only the opacity changes. The clock is `hooks/use-rotation.hook.ts`, which only runs above the phone breakpoint, with the block in view and the browser tab active, and never with `prefers-reduced-motion`; it holds still while the pointer is over the window and stops for good as soon as the visitor picks a tab. The captures arrive as props from the card, so `next/image` is still resolved on the server.

## Deploying on Vercel

Connecting the repository is enough: there are no required variables. Set `NEXT_PUBLIC_SITE_URL` to the final domain so that the sitemap and the canonicals use it, **with the same host the site answers on**: today that is `https://www.sebastianluna.dev`, and the domain without `www` answers with a 308 towards it. A canonical that redirects is no canonical at all: Lighthouse flags it ("Points to another `hreflang` location") and the SEO score drops from 100 to 92.

The code conventions are in `AGENTS.md`; the known debt, in `IMPROVEMENTS.md`; the mechanical tasks, in `todos.md`.
