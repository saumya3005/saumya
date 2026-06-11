'use client';

import React from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const opacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  return (
    <motion.div
      style={{ opacity }}
      className="fixed top-0 left-0 right-0 h-1 z-100 origin-left pointer-events-none"
    >
      <motion.div 
        className="h-full w-full bg-linear-to-r from-[#D0B1DD] via-[#BB8ECD] to-[#DDC6E6]"
        style={{ scaleX }}
      />
      {/* Glow layer */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-4 bg-linear-to-r from-[#D0B1DD]/40 via-[#BB8ECD]/40 to-[#DDC6E6]/40 blur-md"
        style={{ scaleX }}
      />
    </motion.div>
  );
}
