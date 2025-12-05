# Pending improvements

Backlog of the project's technical debt and improvements. Every entry carries an **area**, a
**priority** (low · medium · high) and a guide on how to approach it.

> Last review: 2025-12-05. What is still open is at the top; what is already resolved is left
> noted with what was done, so it is not reopened.

---

## HIGH priority

### 1. The CV files — [Content]

Every «Descargar CV» button points to `public/cv/sebastian-luna-<locale>.pdf` (`CV_FILES` in
`constants/profile.const.ts`) and the files are not in the repository yet, so the links 404. Add
the two PDFs (or one, and point both locales to it). If they should not be committed, host them
elsewhere and turn `CV_FILES` into absolute URLs.

### 2. Confirm the domains and the Vallarta WKND screenshot — [Content]

Three of the four projects have `url: null` in `constants/projects.const.ts`: the card prints
«Dominio por confirmar» and shows no «Visitar el sitio» button. Vallarta WKND also has
`image: null` and shows the amber placeholder. Once the products' public URLs are confirmed, set
them (the domain line, the button and the browser frame's address bar follow), and add a 1600 px
JPEG of Vallarta's home to `public/images`.

## MEDIUM priority

### 3. Open Graph image — [SEO]

The metadata has no image: shares on LinkedIn and WhatsApp show the title alone. Add an
`app/[locale]/opengraph-image.tsx` with `ImageResponse` (name, role, amber circle) and load
Archivo from `public/fonts` inside it; the layout's `metadataBase` already makes the relative URL
absolute.

### 4. Reveal on scroll — [UX]

The sections appear all at once. A small `IntersectionObserver` hook (`hooks/use-reveal.hook.ts`)
and a shared `Reveal` wrapper, as in the sibling projects, would let the project cards fade in
one by one. Keep it off under `prefers-reduced-motion`.

## LOW priority

### 5. Language negotiation only on the first visit — [i18n]

next-intl's proxy reads `Accept-Language` when there is no prefix and remembers the choice in a
cookie. A visitor who explicitly picks «ES» from `/en` lands on `/` and keeps it; verify this on
the deployed domain (cookies do not carry across `localhost` ports) and document it if it
differs.

### 6. Browser frame tab titles are copy — [i18n]

The tabs of the drawn browser window (`projects.items.<slug>.tabs`) are translated like any other
text, although most of them are product names. If maintaining them in two files becomes a chore,
move them to `projects.const.ts` and keep only the "+ 7 sites" style labels in the messages.
