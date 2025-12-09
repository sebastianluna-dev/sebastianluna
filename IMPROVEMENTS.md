# Pending improvements

Backlog of the project's technical debt and improvements. Every entry carries an **area**, a
**priority** (low · medium · high) and a guide on how to approach it.

> Last review: 2025-12-08. What is still open is at the top; what is already resolved is left
> noted with what was done, so it is not reopened.

---

## HIGH priority

### 1. Confirm the domains and the Vallarta WKND screenshot — [Content]

Three of the four projects have `url: null` in `constants/projects.const.ts`: the card prints
«Dominio por confirmar» and shows no «Visitar el sitio» button. Vallarta WKND also has
`image: null` and shows the amber placeholder, so its browser window — and with it the
«Vallarta WKND» and «Reservas» tabs — never renders. Once the products' public URLs are
confirmed, set them (the domain line, the button and the browser frame's address bar follow),
and add a 1600 px JPEG of Vallarta's home to `public/images`.

## LOW priority

### 2. Language negotiation only on the first visit — [i18n]

`proxy.ts` runs next-intl's middleware with `localePrefix: "as-needed"`: a request with no prefix
is negotiated against `Accept-Language` and the choice is remembered in a cookie. So a visitor
who explicitly picks «ES» from `/en` lands on `/` and stays in Spanish.

This cannot be verified locally: cookies do not carry across `localhost` ports, and the
negotiation only happens on a request without a prefix. Check it on the deployed domain — a fresh
browser with English as its language should land on `/en`, and the switch to «ES» should hold
across a reload — and document here if it behaves differently.

---

## Resolved

### The CV files — [Content] · resolved 2025-12-08

The «Descargar CV» buttons pointed at files that were not in the repository. Both PDFs are now in
`public/cv/<locale>/cv-sebastian-luna-senior-frontend-developer.pdf`: a folder per locale rather
than a suffix, so the two downloads land on disk with the same name.

### Open Graph image — [SEO] · resolved 2025-12-08

`app/[locale]/opengraph-image.tsx` draws the card with `ImageResponse`, one per locale at build
time. Satori reads ttf, otf and woff but never woff2, and the three fonts of the site are woff2
only, so the route loads `public/fonts/archivo-{400,600}.ttf` — the static cuts of the same
family, used by nothing else and never shipped to the browser.

### Reveal on scroll — [UX] · resolved 2025-12-08

`hooks/use-reveal.hook.ts` and `components/site/shared/reveal.comp.tsx`: the blocks of «Sobre mí»,
«Proyectos» and «Contacto» fade in the first time they enter the viewport, and the project cards
come in one by one through a per-card delay. The hidden state lives under
`@media (scripting: enabled)`, so with JavaScript off nothing is ever invisible; whoever asks for
reduced motion gets everything at once.

### Browser frame tab titles were copy — [i18n] · resolved 2025-12-08

The tabs of the drawn browser window were translated whole, product names included. The names
moved to `tabs` in `constants/projects.const.ts` and only the tabs that really are copy («+ 7
sitios de la red», «Reservas») stayed in the catalogues, as `extraTabs`.
