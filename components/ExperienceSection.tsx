'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { RiBriefcase4Line, RiCodeBoxLine, RiRocketLine, RiArrowRightSLine } from 'react-icons/ri';

const EXPERIENCE_DATA = [
  {
    role: "Backend Development Intern",
    company: "Prodesk IT, Noida",
    date: "Aug 2025 - Present",
    desc: "Engineered 10+ REST API endpoints in Python/Django for R&D production applications, improving data retrieval by 25% via query optimization and indexing strategies.",
    techStack: ["Python", "Django", "MySQL", "Pytest", "Agile/Scrum"],
    impact: "Reduced backend response time by 30% through scalable database workflows.",
    achievements: [
      "Engineered 10+ REST API endpoints.",
      "Achieved 85%+ test coverage with Pytest.",
      "Collaborated in Agile team of 6+ engineers across 3 production releases."
    ],
    icon: <RiBriefcase4Line size={24} />,
    colorClass: "text-accent-copper",
    bgClass: "bg-accent-copper/10",
  },
  {
    role: "Web Developer Intern",
    company: "Code Resite, Prayagraj",
    date: "Jun 2025 - Jul 2025",
    desc: "Delivered full-stack features across 5+ client projects using React.js, JavaScript, Node.js, and REST APIs. Deployed all projects on Vercel with CI/CD pipelines.",
    techStack: ["React.js", "Node.js", "JavaScript", "REST APIs", "Vercel"],
    impact: "Improved page load performance by 35% through frontend optimization.",
    achievements: [
      "Delivered features across 5+ client projects.",
      "Reduced UI bugs by 40% via systematic testing.",
      "Optimized lazy loading, code splitting, and caching."
    ],
    icon: <RiCodeBoxLine size={24} />,
    colorClass: "text-accent-bronze",
    bgClass: "bg-accent-bronze/10",
  },
  {
    role: "Full Stack Development Intern",
    company: "CodeAlpha",
    date: "Jun 2026 - Jul 2026",
    desc: "Developed responsive full-stack web applications using React.js, HTML5, CSS3, and REST API integration as part of the Full Stack Development Internship Program.",
    techStack: ["React.js", "JavaScript", "HTML5", "CSS3", "Git"],
    impact: "Maintained source code using Git/GitHub in an Agile development environment.",
    achievements: [
      "Implemented authentication and CRUD operations.",
      "Built reusable UI components and responsive layouts.",
      "Successfully completed all assigned development tasks."
    ],
    icon: <RiRocketLine size={24} />,
    colorClass: "text-accent-bronze",
    bgClass: "bg-accent-bronze/10",
  },
  {
    role: "Freelance Full Stack Developer",
    company: "Hanuman Pushpavarsha Committee",
    date: "Jan 2024 - Mar 2025",
    desc: "Built bilingual (Hindi-English) production website serving 500+ users. Integrated Razorpay payment gateway, live streaming, member registry, and admin dashboard.",
    techStack: ["Next.js", "Firebase", "Firestore", "Razorpay", "Vercel"],
    impact: "Reduced admin overhead by 60% by automating member registration.",
    achievements: [
      "Developed 6 production modules including live streaming.",
      "Automated member registration via Firestore.",
      "Implemented Firebase Auth with role-based access control (RBAC)."
    ],
    icon: <RiCodeBoxLine size={24} />,
    colorClass: "text-emerald-400",
    bgClass: "bg-emerald-500/10",
  },
];

export default function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="experience" className="py-24 sm:py-32 relative z-10 border-t border-accent-copper/20 overflow-hidden">
      
      {/* Background Decorators */}
      <div className="absolute top-0 right-0 w-200 h-200 bg-accent-copper/5 blur-[120px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-150 h-150 bg-accent-bronze/5 blur-[100px] rounded-full pointer-events-none -translate-x-1/3 translate-y-1/3" />

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10" ref={containerRef}>
        
        <div className="mb-24 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 0.8, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-mono tracking-[0.2em] uppercase text-accent-bronze"
          >
            04 // Timeline
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mt-4"
          >
            Professional <span className="text-transparent bg-clip-text bg-linear-to-r from-accent-copper to-accent-bronze">Experience</span>
          </motion.h2>
        </div>

        <div className="relative">
          {/* Main vertical line background */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-1/2" />
          
          {/* Animated vertical line progress */}
          <motion.div 
            style={{ scaleY, originY: 0 }}
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-linear-to-b from-accent-copper via-accent-bronze to-accent-bronze md:-translate-x-1/2 shadow-[0_0_15px_rgba(184,115,51,0.5)] z-10"
          />

          <div className="space-y-16 md:space-y-24">
            {EXPERIENCE_DATA.map((exp, index) => {
              const isEven = index % 2 === 0;
              return (
                <ExperienceCard key={index} exp={exp} index={index} isEven={isEven} />
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

function ExperienceCard({ exp, index, isEven }: { exp: typeof EXPERIENCE_DATA[0], index: number, isEven: boolean }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50, x: isEven ? -20 : 20 }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`relative flex items-start md:items-center flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} w-full group`}
    >
      
      {/* Timeline Dot */}
      <motion.div 
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="absolute left-6 md:left-1/2 w-8 h-8 rounded-full glass-panel border-2 border-zinc-800 -translate-x-3.75 md:-translate-x-1/2 z-20 group-hover:border-accent-bronze transition-colors duration-500 shadow-xl flex items-center justify-center overflow-hidden" 
      >
        <div className="absolute inset-0 bg-accent-bronze/20 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full" />
        <div className="w-2 h-2 rounded-full bg-zinc-600 group-hover:bg-accent-bronze transition-colors duration-500 relative z-10" />
      </motion.div>

      {/* Empty Space for Grid Layout */}
      <div className={`hidden md:block w-1/2 ${isEven ? 'pr-12 lg:pr-16' : 'pl-12 lg:pl-16'}`} />

      {/* Content Card */}
      <div className={`w-full pl-16 md:pl-0 md:w-1/2 ${isEven ? 'md:pl-12 lg:pl-16' : 'md:pr-12 lg:pr-16'}`}>
        <div 
          onClick={() => setExpanded(!expanded)}
          className={`p-6 sm:p-8 rounded-3xl glass-panel border border-accent-copper/20 transition-all duration-500 hover:border-accent-copper/25 hover:bg-[#121212]/60 hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)] cursor-pointer relative overflow-hidden`}
        >
          {/* Subtle Accent Glow */}
          <div className={`absolute top-0 right-0 w-32 h-32 ${exp.bgClass} rounded-full blur-[50px] pointer-events-none transition-opacity duration-500 ${expanded ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />

          <div className="flex items-start justify-between gap-4 mb-4 relative z-10">
            <div className={`w-12 h-12 rounded-xl glass-panel flex items-center justify-center ${exp.colorClass} shadow-inner bg-black/20 group-hover:scale-110 transition-transform duration-500`}>
              {exp.icon}
            </div>
            <span className="inline-block px-3 py-1 text-xs font-mono rounded-full bg-white/5 text-secondary-text border border-accent-copper/20">
              {exp.date}
            </span>
          </div>

          <div className="relative z-10">
            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-white group-hover:to-zinc-400 transition-all">
              {exp.role}
            </h3>
            <h4 className={`${exp.colorClass} font-medium mb-4 tracking-wide text-sm sm:text-base`}>
              {exp.company}
            </h4>
            
            <p className="text-secondary-text leading-relaxed font-light text-sm sm:text-base mb-6">
              {exp.desc}
            </p>

            {/* Expandable Content */}
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden border-t border-accent-copper/25 pt-4 mt-2 space-y-4"
                >
                  
                  <div>
                    <h5 className="text-xs font-mono uppercase text-secondary-text mb-2">Impact</h5>
                    <p className="text-sm text-ivory font-light">{exp.impact}</p>
                  </div>

                  <div>
                    <h5 className="text-xs font-mono uppercase text-secondary-text mb-2">Key Achievements</h5>
                    <ul className="space-y-2">
                      {exp.achievements.map((ach, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-ivory font-light">
                          <RiArrowRightSLine className={`${exp.colorClass} mt-0.5 shrink-0`} />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="text-xs font-mono uppercase text-secondary-text mb-2 mt-4">Tech Stack</h5>
                    <div className="flex flex-wrap gap-2">
                      {exp.techStack.map((tech, i) => (
                        <span key={i} className="px-2.5 py-1 text-xs font-mono rounded-md bg-black/40 border border-accent-copper/20 text-secondary-text">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>

            {/* Expand indicator */}
            <div className="mt-4 flex items-center justify-center border-t border-accent-copper/20 pt-4">
              <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-600 group-hover:text-secondary-text transition-colors flex items-center gap-2">
                {expanded ? 'Collapse Details' : 'Expand Details'}
              </span>
            </div>
          </div>

        </div>
      </div>
      
    </motion.div>
  );
}
