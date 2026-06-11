import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import ServicesSection from '@/components/ServicesSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="bg-zinc-950 min-h-screen text-zinc-300 selection:bg-yellow-500/30 selection:text-white">
      <Navbar />
      <Hero />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <ServicesSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
