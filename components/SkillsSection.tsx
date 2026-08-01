'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SiReact, SiNextdotjs, SiNodedotjs, SiPython, SiTensorflow, 
  SiDocker, SiFirebase, SiDjango, SiPostgresql, 
  SiTypescript, SiOpencv, SiTailwindcss 
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';

const SKILLS = [
  { name: 'Python', icon: SiPython, color: '#3776AB', level: 'Language', desc: 'Backend & Data Science.' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6', level: 'Language', desc: 'Type-safe JavaScript.' },
  { name: 'React.js', icon: SiReact, color: '#61DAFB', level: 'Frontend', desc: 'Interactive UIs.' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#ffffff', level: 'Frontend', desc: 'Production React.' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#339933', level: 'Backend', desc: 'Scalable services.' },
  { name: 'Django', icon: SiDjango, color: '#092E20', level: 'Backend', desc: 'Robust web frameworks.' },
  { name: 'TensorFlow', icon: SiTensorflow, color: '#FF6F00', level: 'AI/ML', desc: 'Deep learning models.' },
  { name: 'OpenCV', icon: SiOpencv, color: '#5C3EE8', level: 'AI/ML', desc: 'Computer vision.' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1', level: 'Database', desc: 'Relational data.' },
  { name: 'Firebase', icon: SiFirebase, color: '#FFCA28', level: 'Database', desc: 'NoSQL & Real-time.' },
  { name: 'AWS', icon: FaAws, color: '#FF9900', level: 'Cloud/DevOps', desc: 'Cloud infrastructure.' },
  { name: 'Docker', icon: SiDocker, color: '#2496ED', level: 'Cloud/DevOps', desc: 'Containerization.' },
];

const radius = 220; 

const POSITIONS = SKILLS.map((_, index) => {
  const angle = (index / SKILLS.length) * 360;
  const angleRad = (angle * Math.PI) / 180;
  // Use toFixed to eliminate float precision differences between SSR and client
  const x = (radius * Math.cos(angleRad)).toFixed(3);
  const y = (radius * Math.sin(angleRad)).toFixed(3);
  return { x, y };
});

export default function SkillsSection() {
  const [hoveredSkill, setHoveredSkill] = useState<typeof SKILLS[0] | null>(null);

  return (
    <section id="skills" className="py-24 sm:py-32 relative z-10 border-t border-accent-copper/20 overflow-hidden min-h-screen flex items-center">
      
      {/* Background Decorators */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-accent-copper/5 via-zinc-950 to-zinc-950 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
        
        <div className="mb-12 text-center md:text-left">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 0.8, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-mono tracking-[0.2em] uppercase text-accent-copper"
          >
            03 // Expertise
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mt-4"
          >
            Interactive <span className="text-transparent bg-clip-text bg-linear-to-r from-accent-copper to-accent-bronze">Skill Orbit</span>
          </motion.h2>
        </div>

        <div className="relative flex justify-center items-center h-150 md:h-175 perspective-[1500px]">
          
          <div className="relative w-full h-full flex justify-center items-center" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(60deg)' }}>
            {/* Orbital Rings */}
            <div className="absolute w-110 h-110 rounded-full border border-accent-copper/20 border-dashed animate-[spin_60s_linear_infinite]" />
            <div className="absolute w-75 h-75 rounded-full border border-accent-copper/20 border-dotted animate-[spin_40s_linear_infinite_reverse]" />
            <div className="absolute w-150 h-150 rounded-full border border-white/2 border-solid animate-[spin_90s_linear_infinite]" />

            {/* Center Content */}
            <div 
              className="absolute z-20 flex items-center justify-center w-64 h-64 rounded-full glass-panel border-accent-copper/25 shadow-[0_0_50px_rgba(184,115,51,0.1)] transition-all duration-500"
              style={{ transform: 'rotateX(-60deg) translateZ(50px)' }}
            >
            <AnimatePresence mode="wait">
              {!hoveredSkill ? (
                <motion.div
                  key="default"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <h3 className="text-4xl font-bold tracking-widest text-transparent bg-clip-text bg-linear-to-b from-white to-zinc-500">
                    SAUMYA
                  </h3>
                  <p className="text-xs font-mono text-secondary-text mt-2 uppercase tracking-widest">
                    Core Stack
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="hovered"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="text-center flex flex-col items-center justify-center p-6 w-full h-full rounded-full"
                  style={{
                    background: `radial-gradient(circle, ${hoveredSkill.color}22 0%, transparent 70%)`
                  }}
                >
                  <hoveredSkill.icon size={48} color={hoveredSkill.color} className="mb-3 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
                  <h4 className="text-xl font-bold text-foreground mb-1">{hoveredSkill.name}</h4>
                  <span className="text-[10px] uppercase tracking-widest font-mono text-secondary-text mb-2 px-3 py-1 rounded-full border border-accent-copper/25 bg-black/30">
                    {hoveredSkill.level}
                  </span>
                  <p className="text-xs text-ivory leading-tight">
                    {hoveredSkill.desc}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Orbiting Icons */}
          <div className="absolute w-110 h-110 animate-[spin_40s_linear_infinite] hover:[animation-play-state:paused] group z-30">
            {SKILLS.map((skill, index) => {
              const { x, y } = POSITIONS[index];

              return (
                <div
                  key={skill.name}
                  className="absolute left-1/2 top-1/2 cursor-pointer"
                  style={{
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  }}
                  onMouseEnter={() => setHoveredSkill(skill)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  {/* Counter-rotate to keep icon upright */}
                  <div className="animate-[spin_40s_linear_infinite_reverse] group-hover:[animation-play-state:paused]" style={{ transform: 'rotateX(-60deg) translateZ(30px)', transformStyle: 'preserve-3d' }}>
                    <div 
                      className={`w-14 h-14 rounded-2xl glass-panel border border-accent-copper/25 flex items-center justify-center transition-all duration-300 ${
                        hoveredSkill?.name === skill.name ? 'scale-125 border-white/40 -translate-y-4 shadow-[0_20px_40px_rgba(0,0,0,0.5)]' : 'hover:scale-110'
                      }`}
                      style={{
                        boxShadow: hoveredSkill?.name === skill.name ? `0 20px 40px ${skill.color}66` : 'none',
                        borderColor: hoveredSkill?.name === skill.name ? skill.color : 'rgba(255,255,255,0.1)'
                      }}
                    >
                      <skill.icon 
                        size={24} 
                        color={hoveredSkill?.name === skill.name ? skill.color : '#a1a1aa'} 
                        className="transition-colors duration-300"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          </div>
        </div>
      </div>
    </section>
  );
}
