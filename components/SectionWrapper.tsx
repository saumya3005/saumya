'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { staggerContainer } from '@/lib/motion';

interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export default function SectionWrapper({ id, children, className = '' }: SectionWrapperProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section id={id} ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Optional parallax background wrapper layer */}
      <motion.div style={{ y }} className="absolute inset-0 z-0 pointer-events-none opacity-20">
         {/* Insert background elements here if needed inside the section */}
      </motion.div>
      
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10%" }}
        className="relative z-10 w-full"
      >
        {children}
      </motion.div>
    </section>
  );
}
