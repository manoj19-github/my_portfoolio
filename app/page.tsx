import { Navigation } from '@/components/navigation';
import { HeroSection } from '@/components/sections/hero';
import { AboutSection } from '@/components/sections/about';

import { ProjectsSection } from '@/components/sections/projects';
import { ContactSection } from '@/components/sections/contact';
import { Footer } from '@/components/sections/footer';
import SkillsSection from '@/components/sections/SkillsSection';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
