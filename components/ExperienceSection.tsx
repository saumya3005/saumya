'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import SectionWrapper from './SectionWrapper';
import SpotlightCard from './SpotlightCard';
import { fadeUp } from '@/lib/motion';

const EXPERIENCE_DATA = [
  {
    role: "Full Stack Engineer Intern",
    company: "TuteDude",
    date: "Dec 2024 - Present",
    desc: "Developing and optimizing core backend infrastructure, user-facing UI components, and API routing. Improving system performance and state management across the application stack.",
  },
  {
    role: "Open Source Contributor",
    company: "GirlScript Summer of Code",
    date: "Oct 2024 - Nov 2024",
    desc: "Authored and merged substantial pull requests solving issues across multiple open-source repositories. Engineered algorithms and improved web UI accessibility standards.",
  },
  {
    role: "Full Stack Development Intern",
    company: "IBM SkillsBuild",
    date: "Jun 2024 - Jul 2024",
    desc: "Designed and implemented scalable web architectures. Developed REST APIs and connected dynamic front-end interfaces to robust backend databases.",
  },
];

export default function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Progress bar logic
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const yShift = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <SectionWrapper id="experience" className="py-20 sm:py-40 bg-[#F8F1FC] text-[#1F1726] relative z-10 border-t border-[#DDC6E6]/30">
      <motion.div style={{ y: yShift }} className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 relative z-10" ref={containerRef}>
        
        {/* Section Header */}
        <div className="mb-24 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 0.6, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#5D4A68]"
          >
            02 / Timeline
          </motion.span>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-light tracking-tight mt-2"
          >
            Professional Experience
          </motion.h2>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Lavender Timeline Track */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-[#DDC6E6] to-transparent md:-translate-x-1/2 opacity-50" />
          
          {/* Animated Progress Line */}
          <motion.div 
            style={{ scaleY, originY: 0 }}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-linear-to-b from-[#BB8ECD] to-[#D0B1DD] md:-translate-x-1/2 shadow-[0_0_15px_rgba(187,142,205,0.5)] rounded-full z-10"
          />

          {EXPERIENCE_DATA.map((exp, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50, x: isEven ? -50 : 50, rotateY: isEven ? 10 : -10 }}
                whileInView={{ opacity: 1, y: 0, x: 0, rotateY: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className={`relative flex items-center mb-16 md:mb-24 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} w-full group cursor-hover-target transform-3d perspective-1000`}
              >
                
                {/* Timeline Dot */}
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-[#FBF7FF] border-2 border-[#BB8ECD] md:-translate-x-1/2 z-20 group-hover:scale-150 group-hover:bg-[#BB8ECD] transition-all duration-500 shadow-[0_0_10px_rgba(187,142,205,0.4)]" 
                />

                {/* Content Card */}
                <div className={`pl-12 md:pl-0 w-full md:w-1/2 ${isEven ? 'md:pr-16 lg:pr-24' : 'md:pl-16 lg:pl-24'}`}>
                  <SpotlightCard 
                    glowColor="rgba(208, 177, 221, 0.15)"
                    className="p-6 sm:p-8 rounded-4xl border border-[#DDC6E6]/40 bg-white/70 backdrop-blur-xl shadow-[0_10px_40px_rgba(208,177,221,0.08)] transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_20px_50px_rgba(208,177,221,0.15)] group-hover:border-[#BB8ECD]/50 hover:rotate-1"
                  >
                    <span className="inline-block px-3 py-1 text-xs font-mono rounded-full bg-[#F3E7FA] text-[#5D4A68] border border-[#DDC6E6]/50 mb-4 transition-colors group-hover:bg-[#BB8ECD]/10">
                      {exp.date}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-medium text-[#1F1726] mb-1">
                      {exp.role}
                    </h3>
                    <h4 className="text-[#BB8ECD] font-medium mb-4 tracking-wide text-sm sm:text-base">
                      {exp.company}
                    </h4>
                    <p className="text-[#5D4A68] leading-relaxed font-light text-sm sm:text-base">
                      {exp.desc}
                    </p>
                  </SpotlightCard>
                </div>
                
              </motion.div>
            );
          })}
        </div>

      </motion.div>
    </SectionWrapper>
  );
}
