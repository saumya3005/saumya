'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

export default function SectionSwap({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax the background container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const contentY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  
  // Subtle side panel movement on desktop
  const panelY = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  return (
    <div ref={containerRef} className={`relative w-full overflow-hidden ${className}`}>
      
      {/* Background layer shift */}
      <motion.div 
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none z-0"
      >
        <div className="absolute -left-1/4 top-0 w-1/2 h-full bg-linear-to-b from-[#F8F1FC]/20 to-[#F3EDF7]/20 blur-3xl opacity-50" />
      </motion.div>

      {/* Subtle Desktop Left Cover Panel (Inspired by reference) */}
      <motion.div 
        style={{ y: panelY }}
        className="hidden lg:block absolute left-0 top-0 bottom-0 w-[5vw] border-r border-[#DDC6E6]/20 bg-linear-to-b from-white/30 via-transparent to-white/30 backdrop-blur-xs z-10"
      >
        <div className="h-full w-full flex items-center justify-center opacity-30">
          <div className="w-px h-1/3 bg-linear-to-b from-transparent via-[#BB8ECD] to-transparent" />
        </div>
      </motion.div>

      {/* Main Content Area */}
      <motion.div 
        style={{ y: contentY }}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 w-full lg:pl-[5vw]"
      >
        {children}
      </motion.div>

    </div>
  );
}
