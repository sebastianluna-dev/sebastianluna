import { HOME_SECTIONS } from "@/config/site.config";
import { Footer } from "@/components/site/sections/shell/footer/footer.section";
import { Header } from "@/components/site/sections/shell/header/header.section";

// Composes the page: header, the sections listed in config/site.config.ts
// and the footer.
export default function LandingPage() {
  return (
    <>
      <Header />
      <main id="contenido">
        {HOME_SECTIONS.map(({ id, Section }) => (
          <Section key={id} />
        ))}
      </main>
      <Footer />
    </>
  );
}
