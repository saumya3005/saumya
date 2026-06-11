'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { RiArrowRightUpLine, RiGithubLine, RiLinkedinLine, RiInstagramLine, RiMailLine } from 'react-icons/ri';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DynamicName from './DynamicName';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ROLLING_WORDS = [
  "AIML Student",
  "Full Stack Developer",
  "Creative Developer",
  "Open Source Enthusiast",
  "Hackathon Winner"
];

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const yOffset = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax for image
      gsap.to(imageRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });

      // Parallax for background text
      gsap.to(bgTextRef.current, {
        yPercent: 40,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-zinc-950 pt-20"
      style={{ opacity, y: yOffset }}
    >
      {/* Huge Background Text */}
      <div 
        ref={bgTextRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-bold tracking-tighter text-stroke select-none z-0 whitespace-nowrap"
      >
        SAUMYA
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-16 lg:gap-8">
        
        {/* LEFT SIDE: Typography & Content */}
        <div className="w-full lg:w-[55%] flex flex-col justify-center text-left relative z-20">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 flex items-center gap-3"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
            </span>
            <span className="text-sm uppercase tracking-widest text-zinc-400 font-medium">Available for Roles</span>
          </motion.div>

          <div className="text-5xl sm:text-7xl lg:text-[5.5rem] font-bold tracking-tighter text-white mb-2 leading-[1.1]">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              Hi, I'm
            </motion.div>
            <DynamicName firstName="Saumya" lastName="Agrahari" />
          </div>

          {/* Rolling Words */}
          <div className="h-12 overflow-hidden mt-4 mb-6">
            <motion.div
              animate={{ y: [0, -48, -48, -96, -96, -144, -144, -192, -192, -240, -240] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col text-xl sm:text-2xl font-light text-yellow-400"
            >
              {[...ROLLING_WORDS, ROLLING_WORDS[0]].map((word, i) => (
                <div key={i} className="h-12 flex items-center gap-2">
                  <span className="text-yellow-500/40 font-mono text-sm">▸</span>
                  {word}
                </div>
              ))}
            </motion.div>
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl text-zinc-400 max-w-xl leading-relaxed font-light mb-10"
          >
            I build modern, interactive and intelligent web experiences using AI, full-stack development, and creative UI design.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap items-center gap-6"
          >
            <a href="#projects" className="group relative inline-flex items-center justify-center px-8 py-4 bg-yellow-500 text-zinc-950 rounded-full font-semibold transition-transform hover:scale-105">
              <span className="flex items-center gap-2">
                View Projects <RiArrowRightUpLine className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </span>
            </a>
            
            <a href="#contact" className="group relative inline-flex items-center justify-center px-8 py-4 bg-transparent text-white rounded-full border border-zinc-700 transition-all hover:border-yellow-400 hover:text-yellow-400">
              <span>Contact Me</span>
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex items-center gap-6 mt-12 text-zinc-500"
          >
            <a href="https://github.com/saumya1st" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:-translate-y-1 transition-all"><RiGithubLine size={24} /></a>
            <a href="https://linkedin.com/in/saumyaagrahari" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 hover:-translate-y-1 transition-all"><RiLinkedinLine size={24} /></a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 hover:-translate-y-1 transition-all"><RiInstagramLine size={24} /></a>
            <a href="mailto:saumya.agrahari1@gmail.com" className="hover:text-yellow-400 hover:-translate-y-1 transition-all"><RiMailLine size={24} /></a>
          </motion.div>
        </div>

        {/* RIGHT SIDE: Portrait */}
        <div className="w-full lg:w-[45%] flex items-center justify-center lg:justify-end relative z-10 mt-10 lg:mt-0">
          <div ref={imageRef} className="relative w-70 h-90 sm:w-95 sm:h-120">
            {/* Glowing Backdrop */}
            <div className="absolute inset-0 bg-yellow-500/20 blur-[100px] rounded-full animate-pulse" />
            
            <div className="absolute inset-0 glass-panel rounded-3xl overflow-hidden border border-white/10 group">
              <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-transparent to-transparent opacity-60 z-10 pointer-events-none" />
              <img 
                src="https://i.postimg.cc/zGqh8fwk/IMG-20260608-WA0015.jpg" 
                alt="Saumya Agrahari"
                className="w-full h-full object-cover scale-105 transition-transform duration-700 group-hover:scale-100 grayscale hover:grayscale-0"
              />
            </div>
            
            {/* Decorative Element */}
            <motion.div 
              animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-8 -right-8 w-24 h-24 glass-panel rounded-full flex items-center justify-center border border-white/10 shadow-2xl backdrop-blur-xl"
            >
              <div className="w-12 h-12 rounded-full bg-yellow-500/30 blur-md" />
            </motion.div>
          </div>
        </div>

      </div>

    </motion.section>
  );
}
