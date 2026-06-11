'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import SectionWrapper from './SectionWrapper';
import SpotlightCard from './SpotlightCard';
import { fadeUp, staggerContainer, cardReveal } from '@/lib/motion';
import { RiTrophyLine, RiMedalLine, RiTeamLine, RiMicLine } from 'react-icons/ri';

const ACHIEVEMENTS = [
  {
    title: "UHack 4.0 Winner",
    category: "Hackathon",
    icon: <RiTrophyLine size={24} className="text-white" />,
    color: "from-[#BB8ECD] to-[#D0B1DD]",
    metric: 1,
    size: "large"
  },
  {
    title: "Google Build with AI Winner",
    category: "Competition",
    icon: <RiMedalLine size={24} className="text-[#BB8ECD]" />,
    color: "from-[#F8F1FC] to-[#DDC6E6]",
    metric: 1,
    size: "small"
  },
  {
    title: "NSUT Top 10 Finalist",
    category: "Hackathon",
    icon: <RiTrophyLine size={24} className="text-[#BB8ECD]" />,
    color: "from-[#F3E7FA] to-[#E8D8EE]",
    metric: 10,
    size: "small"
  },
  {
    title: "Lead Organizer",
    category: "HackDiwas 3.0",
    icon: <RiTeamLine size={24} className="text-[#BB8ECD]" />,
    color: "from-[#FBF7FF] to-[#D0B1DD]",
    metric: 500,
    prefix: "+",
    size: "large"
  },
  {
    title: "Organizer",
    category: "TEDx United University",
    icon: <RiMicLine size={24} className="text-[#BB8ECD]" />,
    color: "from-[#F8F1FC] to-[#BB8ECD]",
    metric: 1,
    size: "small"
  }
];

const Counter = ({ from, to }: { from: number; to: number }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-100px" });

  React.useEffect(() => {
    if (!inView) return;
    const node = nodeRef.current;
    if (!node) return;

    let start = from;
    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (to - start) * easeProgress);
      
      node.textContent = current.toString();

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [from, to, inView]);

  return <span ref={nodeRef}>{from}</span>;
};

export default function AchievementsSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const yShift = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <SectionWrapper id="achievements" className="py-20 sm:py-32 bg-[#FBF7FF] text-[#1F1726] border-t border-[#DDC6E6]/30">
      <motion.div ref={containerRef} style={{ y: yShift }} className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        <div className="mb-16 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 0.6, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#5D4A68]"
          >
            05 / Milestones
          </motion.span>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-light tracking-tight mt-2 mb-6"
          >
            Achievements & Leadership
          </motion.h2>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-5%" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-6"
        >
          {ACHIEVEMENTS.map((item, idx) => {
            const isLarge = item.size === "large";
            return (
              <motion.div 
                key={idx} 
                variants={cardReveal} 
                className={`w-full ${isLarge ? 'md:col-span-8' : 'md:col-span-4'}`}
              >
                <SpotlightCard 
                  glowColor="rgba(208, 177, 221, 0.15)"
                  className="p-6 md:p-10 rounded-[2.5rem] border border-[#DDC6E6]/50 bg-white/60 backdrop-blur-md shadow-[0_8px_30px_rgba(208,177,221,0.05)] group cursor-hover-target transition-all hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(187,142,205,0.15)] h-full overflow-hidden relative flex flex-col justify-between"
                >
                  <div className={`absolute -right-20 -top-20 w-64 h-64 rounded-full bg-linear-to-br ${item.color} blur-[60px] opacity-30 group-hover:opacity-60 transition-opacity duration-500`} />
                  
                  <div className="flex justify-between items-start mb-12 relative z-10">
                    <div className={`w-14 h-14 rounded-[20px] ${item.icon.props.className.includes('text-white') ? 'bg-[#BB8ECD] border-[#BB8ECD]' : 'bg-white border-[#DDC6E6]/40'} border flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                      {item.icon}
                    </div>
                    
                    <div className="text-right">
                      <div className="text-4xl md:text-5xl font-light text-[#1F1726] tracking-tighter">
                        {item.prefix}<Counter from={0} to={item.metric} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative z-10">
                    <p className="text-xs text-[#5D4A68] font-mono uppercase tracking-widest mb-2 opacity-80">
                      {item.category}
                    </p>
                    <h3 className="text-2xl md:text-3xl font-medium text-[#1F1726] leading-tight group-hover:text-[#BB8ECD] transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </motion.div>

      </motion.div>
    </SectionWrapper>
  );
}
