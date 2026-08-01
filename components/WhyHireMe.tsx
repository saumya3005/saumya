'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { RiTrophyLine, RiArticleLine, RiServerLine, RiBrainLine, RiGlobeLine, RiSettings3Line } from 'react-icons/ri';

const HIRE_REASONS = [
  {
    title: "3x Hackathon Winner",
    description: "UHack 4.0 (#1/500+ Participants), Google Build with AI (GDG), and NSUT Top 10 Finalist.",
    icon: <RiTrophyLine size={32} />,
    color: "from-yellow-500/30 to-yellow-500/0",
    iconColor: "text-yellow-400",
    shadow: "shadow-yellow-500/20"
  },
  {
    title: "Taylor & Francis Published",
    description: "Multi-Class Anomaly Detection in Network Traffic (93.78% accuracy, 175K+ records), ICMLDE 2025.",
    icon: <RiArticleLine size={32} />,
    color: "from-purple-500/30 to-purple-500/0",
    iconColor: "text-purple-400",
    shadow: "shadow-purple-500/20"
  },
  {
    title: "Production Backend Eng",
    description: "10+ REST APIs at Prodesk IT (Python/Django), 85%+ test coverage, 30% backend response time reduction.",
    icon: <RiServerLine size={32} />,
    color: "from-blue-500/30 to-blue-500/0",
    iconColor: "text-blue-400",
    shadow: "shadow-blue-500/20"
  },
  {
    title: "AI/ML + Full Stack",
    description: "TensorFlow CNN, 91%+ gesture recognition. React.js + Node.js + Django + Flask + Next.js.",
    icon: <RiBrainLine size={32} />,
    color: "from-cyan-500/30 to-cyan-500/0",
    iconColor: "text-cyan-400",
    shadow: "shadow-cyan-500/20"
  },
  {
    title: "Real-World Architecture",
    description: "Bilingual production site (Next.js/Firebase), Razorpay integration, 500+ users, 60% admin overhead reduction.",
    icon: <RiGlobeLine size={32} />,
    color: "from-emerald-500/30 to-emerald-500/0",
    iconColor: "text-emerald-400",
    shadow: "shadow-emerald-500/20"
  },
  {
    title: "System Design & DevOps",
    description: "DSA, OOP, System Design, SDLC, Agile/Scrum, Docker, AWS, GCP, CI/CD pipelines.",
    icon: <RiSettings3Line size={32} />,
    color: "from-pink-500/30 to-pink-500/0",
    iconColor: "text-pink-400",
    shadow: "shadow-pink-500/20"
  }
];

function BentoCard({ item, index }: { item: typeof HIRE_REASONS[0], index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spotlight effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top } = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 50, rotateX: 20 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: index * 0.1, type: "spring", stiffness: 100 }}
      className={`group relative h-full rounded-4xl glass-panel border border-accent-copper/20 overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 hover:${item.shadow} hover:shadow-2xl`}
    >
      {/* Spotlight Follower */}
      <motion.div 
        className="pointer-events-none absolute -inset-px rounded-4xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, rgba(255,255,255,0.1), transparent 40%)`
          )
        }}
      />
      
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-linear-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
      
      <div className="relative z-10 p-8 flex flex-col h-full justify-between">
        <div className="flex justify-between items-start mb-12">
          <div className={`w-16 h-16 rounded-2xl glass-panel border border-accent-copper/25 flex items-center justify-center ${item.iconColor} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-inner`}>
            {item.icon}
          </div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-600 group-hover:text-white/50 transition-colors">
            0{index + 1}
          </span>
        </div>
        
        <div>
          <h3 className="text-2xl font-bold text-zinc-100 mb-3 group-hover:text-white transition-colors">
            {item.title}
          </h3>
          <p className="text-sm font-medium text-secondary-text leading-relaxed group-hover:text-ivory transition-colors">
            {item.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function WhyHireMe() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="about" className="py-24 sm:py-32 relative z-10 border-t border-accent-copper/20 bg-luxury-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10" ref={containerRef}>
        
        <div className="mb-24 flex flex-col items-center text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 0.8, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono tracking-[0.3em] uppercase text-secondary-text mb-6"
          >
            01 // Value Proposition
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter"
          >
            Why Hire <span className="text-transparent bg-clip-text bg-linear-to-r from-accent-copper to-accent-bronze">Me.</span>
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="w-24 h-1 bg-linear-to-r from-accent-copper to-accent-bronze mt-10 rounded-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {HIRE_REASONS.map((item, index) => (
            <BentoCard key={index} item={item} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}
