'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Layout, Server, Database, Brain, Wrench, Palette } from 'lucide-react';

const SKILLS_DATA = [
  {
    category: 'Frontend',
    icon: <Layout className="text-yellow-500 w-6 h-6" />,
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'Tailwind CSS']
  },
  {
    category: 'Backend',
    icon: <Server className="text-yellow-500 w-6 h-6" />,
    skills: ['Node.js', 'Express.js', 'REST APIs', 'Python']
  },
  {
    category: 'Database / Cloud',
    icon: <Database className="text-yellow-500 w-6 h-6" />,
    skills: ['Firebase', 'Supabase', 'MongoDB', 'PostgreSQL', 'Vercel']
  },
  {
    category: 'AI / ML',
    icon: <Brain className="text-yellow-500 w-6 h-6" />,
    skills: ['Python', 'OpenCV', 'Machine Learning', 'XGBoost', 'Random Forest']
  },
  {
    category: 'Tools',
    icon: <Wrench className="text-yellow-500 w-6 h-6" />,
    skills: ['Git', 'GitHub', 'VS Code', 'Canva', 'Docker']
  },
  {
    category: 'Creative',
    icon: <Palette className="text-yellow-500 w-6 h-6" />,
    skills: ['Content Writing', 'Social Media Handling', 'Graphic Design', 'Prompt Engineering']
  }
];

export default function SkillsSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const yShift = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section id="skills" className="py-24 sm:py-32 bg-zinc-950 text-white relative border-t border-white/5">
      <motion.div ref={containerRef} style={{ y: yShift }} className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 0.6, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-mono tracking-[0.2em] uppercase text-yellow-500"
            >
              03 // Expertise
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mt-4"
            >
              Technical Arsenal
            </motion.h2>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILLS_DATA.map((group, idx) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: idx * 0.1 }}
              className="h-full"
            >
              <div className="h-full glass-panel rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 hover:border-yellow-400/30 hover:bg-zinc-900/60 group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20 group-hover:scale-110 transition-transform duration-500">
                    {group.icon}
                  </div>
                  <h3 className="text-xl font-bold tracking-tighter text-white">
                    {group.category}
                  </h3>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span 
                      key={skill}
                      className="px-4 py-2 text-sm font-mono rounded-xl bg-zinc-900/50 border border-white/5 text-zinc-400 group-hover:border-yellow-400/20 group-hover:text-zinc-300 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </motion.div>
    </section>
  );
}
