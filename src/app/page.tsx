import { site } from "@/lib/site";
import { ComingSoon } from "@/components/sections/ComingSoon";
import { Hero } from "@/components/sections/Hero";
import { Work } from "@/components/sections/Work";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  // Holding page until the full site is ready (toggle in src/lib/site.ts).
  if (site.comingSoon) {
    return <ComingSoon />;
  }

  return (
    <>
      <Hero />
      <Work />
      <About />
      <Contact />
    </>
  );
}
