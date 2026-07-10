import { expertiseItems } from "@/content/expertise";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { News } from "@/components/sections/News";
import { Process } from "@/components/sections/Process";
import { Projects } from "@/components/sections/Projects";
import { Reviews } from "@/components/sections/Reviews";
import { Team } from "@/components/sections/Team";
import { getHomePageData } from "@/lib/cms";

export const revalidate = 60;

export default async function Home() {
  const data = await getHomePageData();

  return (
    <>
      <Hero hero={data.hero} services={data.services} expertise={expertiseItems} />
      <Projects projects={data.projects} />
      <Process processSteps={data.processSteps} processStats={data.processStats} />
      <Reviews testimonials={data.testimonials} site={data.site} />
      <Team teamMembers={data.teamMembers} teamSection={data.teamSection} />
      <News newsItems={data.newsItems} />
      <Contact faqItems={data.faqItems} site={data.site} />
    </>
  );
}
