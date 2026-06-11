'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { RiArrowRightUpLine } from 'react-icons/ri';

const SERVICES_DATA = [
  {
    title: 'Portfolio Website',
    desc: 'Cinematic, high-performance portfolios for creatives and developers.',
    number: '01'
  },
  {
    title: 'Business Website',
    desc: 'Conversion-optimized landing pages and scalable business fronts.',
    number: '02'
  },
  {
    title: 'Full Stack Web App',
    desc: 'Complex data-driven web applications with robust backend architectures.',
    number: '03'
  },
  {
    title: 'UI/UX Redesign',
    desc: 'Modernizing existing interfaces into premium, user-friendly experiences.',
    number: '04'
  },
  {
    title: 'AI/ML Project',
    desc: 'Integrating computer vision, NLP, or custom machine learning models.',
    number: '05'
  },
  {
    title: 'Content Design',
    desc: 'Social media handling, content writing, and prompt engineering.',
    number: '06'
  }
];

export default function ServicesSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const yShift = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section id="services" className="py-24 sm:py-32 bg-zinc-950 text-white relative border-t border-white/5 overflow-hidden">
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
              04 // Offerings
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mt-4"
            >
              Premium Services
            </motion.h2>
          </div>
        </div>

        {/* Services List */}
        <div className="flex flex-col border-t border-white/10">
          {SERVICES_DATA.map((service, idx) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ delay: idx * 0.1 }}
              className="group border-b border-white/10 relative overflow-hidden"
            >
              {/* Hover Background Reveal */}
              <div className="absolute inset-0 bg-yellow-500 -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] z-0" />

              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between p-8 sm:py-12 sm:px-8 gap-6 group-hover:px-12 transition-all duration-500">
                <div className="flex items-start md:items-center gap-6 md:gap-12 w-full md:w-auto">
                  <span className="text-xl sm:text-2xl font-mono text-zinc-500 group-hover:text-yellow-900 transition-colors duration-500">
                    {service.number}
                  </span>
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-white group-hover:text-zinc-950 transition-colors duration-500">
                    {service.title}
                  </h3>
                </div>
                
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 md:w-1/2 justify-between">
                  <p className="text-zinc-400 group-hover:text-yellow-900/80 transition-colors duration-500 max-w-sm text-sm sm:text-base font-light">
                    {service.desc}
                  </p>
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white group-hover:border-zinc-950/20 group-hover:bg-zinc-950 group-hover:text-yellow-500 transition-all duration-500 -rotate-45 group-hover:rotate-0">
                    <RiArrowRightUpLine size={24} />
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
