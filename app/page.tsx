import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import WhyHireMe from '@/components/WhyHireMe';
import ProjectsSection from '@/components/ProjectsSection';
import ExperienceSection from '@/components/ExperienceSection';
import ResearchHackathonSection from '@/components/ResearchHackathonSection';
import GithubSection from '@/components/GithubSection';
import SkillsSection from '@/components/SkillsSection';
import AchievementsSection from '@/components/AchievementsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="bg-zinc-950 min-h-screen text-zinc-300 selection:bg-yellow-500/30 selection:text-white">
      <Navbar />
      <Hero />
      <WhyHireMe />
      <AchievementsSection />
      <ProjectsSection />
      <ExperienceSection />
      <ResearchHackathonSection />
      <SkillsSection />
      <GithubSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
