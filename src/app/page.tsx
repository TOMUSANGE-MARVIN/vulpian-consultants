import Blog from "@/components/Home/Blog";
import Commitment from "@/components/Home/Commitment";
import Companies from "@/components/Home/Companies";
import Hero from "@/components/Home/Hero";
import WhyChooseUs from "@/components/Home/WhyChooseUs";
import Process from "@/components/Home/Process";
import Projects from "@/components/Home/Projects";
import Solution from "@/components/Home/Solution";
import Team from "@/components/Home/Team";
import Testimonials from "@/components/Home/Testimonials";
import Values from "@/components/Home/Values";
import {
  getLeadConsultant, getServices, getSiteContent,
  getFocusAreas, getStandards, getTestimonials, getPosts,
} from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [site, services, lead, focusAreas, standards, testimonials, posts] = await Promise.all([
    getSiteContent(),
    getServices(),
    getLeadConsultant(),
    getFocusAreas(),
    getStandards(),
    getTestimonials(),
    getPosts(),
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
        <Commitment paragraphs={site.whoWeAre.paragraphs} since={site.since} />
        <Values values={site.values} />
        <Solution services={services.slice(0, 8)} />
        <Companies standards={standards} />
        <Process approach={site.approach} />
        <Projects projects={focusAreas} />
        <Testimonials testimonials={testimonials} />
        <WhyChooseUs />
        <Team member={lead} compact />
        <Blog blogs={posts.slice(0, 3)} />
      </main>
    </>
  )
}
