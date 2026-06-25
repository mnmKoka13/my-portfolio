import TopSection from '@/components/sections/TopSection';
import AboutSection from '@/components/sections/AboutSection';
import WorksSection from '@/components/sections/WorksSection';
import PersonalWorksSection from '@/components/sections/PersonalWorksSection';
import ProfileSection from '@/components/sections/ProfileSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ContactSection from '@/components/sections/ContactSection';

export default function Home() {
  return (
    <main className="min-h-screen">
      <TopSection />
      <AboutSection />
      <WorksSection />
      <PersonalWorksSection />
      <ProfileSection />
      <SkillsSection />
      <ContactSection />
    </main>
  );
}

