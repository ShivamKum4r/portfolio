import { ContactSection } from "@/components/sections/contact-section";
import { EducationSection } from "@/components/sections/education-section";
import { IntroSection } from "@/components/sections/Intro-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ServicesSection } from "@/components/sections/services-section";
import { SkillsSection } from "@/components/sections/skills-section";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-40">
      <IntroSection />
      <hr className="w-full border-gray-300/90 dark:border-gray-300/10 mt-10" />
      <SkillsSection />
      <hr className="w-full border-gray-300/90 dark:border-gray-300/10 mt-10" />
      <ProjectsSection />
      <hr className="w-full border-gray-300/90 dark:border-gray-300/10 mt-10" />
      <EducationSection />
      <hr className="w-full border-gray-300/90 dark:border-gray-300/10 mt-10" />
      <ServicesSection />
      <hr className="w-full border-gray-300/90 dark:border-gray-300/10 mt-10" />
      <ContactSection />
    </main>
  );
}
