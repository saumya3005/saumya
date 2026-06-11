'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { RiArrowRightUpLine, RiGithubLine } from 'react-icons/ri';

const PROJECTS = [
  {
    title: "SignSetu",
    desc: "A highly optimized sign language translation system leveraging machine learning architectures and real-time computer vision. Bridges communication gaps using AI-powered gesture recognition.",
    link: "https://signsetu-x-2.vercel.app/",
    github: "https://github.com/saumya3005",
    tech: ["Next.js", "TensorFlow.js", "MediaPipe", "WebGL"],
    gradient: "from-indigo-900 via-zinc-900 to-zinc-950",
    accent: "#6366f1",
    number: "01",
  },
  {
    title: "Hanuman Pushpavarsha",
    desc: "Official committee website for Hanuman Pushpavarsha — featuring immersive 3D WebGL scenes, smooth GSAP animations, and a modern spiritual aesthetic built with React Three Fiber.",
    link: "https://hanumanpushpavarsha.vercel.app/",
    github: "https://github.com/saumya3005",
    tech: ["Three.js", "React Three Fiber", "Framer Motion", "GSAP"],
    gradient: "from-orange-900 via-zinc-900 to-zinc-950",
    accent: "#f97316",
    number: "02",
  },
  {
    title: "Aarogyam",
    desc: "A comprehensive health-tech platform with modern UI architecture, seamless state management, and optimized API layers — designed to simplify healthcare access for users.",
    link: "https://aarogyam-nu.vercel.app/",
    github: "https://github.com/saumya3005",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    gradient: "from-emerald-900 via-zinc-900 to-zinc-950",
    accent: "#10b981",
    number: "03",
  },
  {
    title: "QuickSeva",
    desc: "A fast, accessible service delivery application built with responsive design patterns and semantic HTML/CSS structures — focused on speed and simplicity.",
    link: "https://ayush26011.github.io/quickseva/",
    github: "https://github.com/saumya3005",
    tech: ["HTML5", "CSS3", "JavaScript"],
    gradient: "from-cyan-900 via-zinc-900 to-zinc-950",
    accent: "#06b6d4",
    number: "04",
  },
  {
    title: "Personal Portfolio",
    desc: "This very portfolio — a cinematic, Awwwards-inspired developer portfolio built with Next.js, GSAP, Lenis smooth scrolling, Framer Motion, and Tailwind CSS v4.",
    link: "#hero",
    github: "https://github.com/saumya3005",
    tech: ["Next.js", "GSAP", "Framer Motion", "Tailwind CSS v4"],
    gradient: "from-yellow-900 via-zinc-900 to-zinc-950",
    accent: "#facc15",
    number: "05",
  },
];

export default function ProjectsSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const yShift = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section id="projects" className="py-24 sm:py-32 bg-zinc-950 text-white border-t border-white/5 relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-yellow-500/5 rounded-full blur-[120px] pointer-events-none" />

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
              02 // Work
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mt-4"
            >
              Selected Projects
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-zinc-500 max-w-xs text-sm font-light leading-relaxed hidden md:block"
          >
            A curated showcase of my most impactful work across AI/ML, full-stack, and creative development.
          </motion.p>
        </div>

        {/* Mobile Swipe Carousel / Desktop Grid */}
        <div className="flex overflow-x-auto pb-8 -mx-6 px-6 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-2 xl:grid-cols-3 gap-6 snap-x snap-mandatory hide-scrollbar">
          {PROJECTS.map((project, idx) => (
            <motion.div 
              key={project.title} 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: idx * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="min-w-[82vw] sm:min-w-95 lg:min-w-0 snap-center lg:snap-align-none"
            >
              <div className="group relative flex flex-col h-full glass-panel rounded-3xl overflow-hidden border border-white/5 transition-all duration-500 hover:border-yellow-400/25 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                
                {/* Project Image / Gradient Preview */}
                <div className="relative w-full aspect-video overflow-hidden">
                  {/* Gradient background */}
                  <div className={`absolute inset-0 bg-linear-to-br ${project.gradient} transform group-hover:scale-105 transition-transform duration-700`} />
                  
                  {/* Grid overlay for tech feel */}
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: `linear-gradient(${project.accent}33 1px, transparent 1px), linear-gradient(90deg, ${project.accent}33 1px, transparent 1px)`,
                      backgroundSize: '40px 40px',
                    }}
                  />

                  {/* Project number */}
                  <div className="absolute top-4 left-4 text-[6rem] font-black leading-none opacity-10 text-white select-none tracking-tighter">
                    {project.number}
                  </div>

                  {/* Project title watermark */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold tracking-tighter text-white/30 text-center px-4">{project.title}</span>
                  </div>

                  {/* Hover overlay with live link */}
                  <div className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-20">
                    <a
                      href={project.link}
                      target={project.link.startsWith('http') ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                      className="w-16 h-16 rounded-full bg-yellow-400 text-zinc-950 flex items-center justify-center shadow-[0_0_30px_rgba(250,204,21,0.6)] scale-75 group-hover:scale-100 transition-all duration-500 hover:bg-yellow-300"
                    >
                      <RiArrowRightUpLine size={26} />
                    </a>
                  </div>

                  {/* Accent glow at bottom */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 h-16 opacity-40"
                    style={{ background: `linear-gradient(to top, ${project.accent}40, transparent)` }}
                  />
                </div>

                {/* Card Content */}
                <div className="flex flex-col flex-1 p-6 sm:p-7">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tighter text-white group-hover:text-yellow-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-600 hover:text-white transition-colors ml-3 mt-0.5 shrink-0"
                      aria-label={`GitHub — ${project.title}`}
                    >
                      <RiGithubLine size={22} />
                    </a>
                  </div>
                  
                  <p className="text-zinc-400 leading-relaxed font-light text-sm mb-6 flex-1">
                    {project.desc}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tag) => (
                      <span 
                        key={tag}
                        className="px-3 py-1 text-xs font-mono rounded-full bg-zinc-900/80 border border-white/5 text-zinc-500 group-hover:border-yellow-400/15 group-hover:text-zinc-400 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
        
      </motion.div>
    </section>
  );
}
