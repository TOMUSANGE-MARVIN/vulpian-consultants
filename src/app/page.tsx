import Blog from "@/components/Home/Blog";
import Commitment from "@/components/Home/Commitment";
import Companies from "@/components/Home/Companies";
import Hero from "@/components/Home/Hero";
import Pricing from "@/components/Home/Pricing";
import Process from "@/components/Home/Process";
import Projects from "@/components/Home/Projects";
import Solution from "@/components/Home/Solution";
import Team from "@/components/Home/Team";
import Testimonials from "@/components/Home/Testimonials";
import { getLeadConsultant, getServices, getSiteContent } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [site, services, lead] = await Promise.all([
    getSiteContent(),
    getServices(),
    getLeadConsultant(),
  ]);

  return (
    <>
      <main>
        <Hero
          title={site.hero.title}
          quote={site.hero.quote}
          ctaText={site.hero.ctaText}
          ctaHref={site.hero.ctaHref}
          since={site.since}
        />
        <Solution services={services.slice(0, 8)} />
        <Companies />
        <Commitment paragraphs={site.whoWeAre.paragraphs} values={site.values} since={site.since} />
        <Process approach={site.approach} />
        <Projects />
        <Testimonials />
        <Pricing />
        <Team member={lead} compact />
        <Blog />
      </main>
    </>
  )
}
