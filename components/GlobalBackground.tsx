'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function GlobalBackground() {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const x1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 600]);
  const x3 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  
  // Deterministic particles
  const particles = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: ((i * 17) % 100),
      y: ((i * 23) % 100),
      size: ((i * 3) % 4) + 1,
      duration: ((i * 11) % 15) + 15,
      delay: (i * 13) % 10,
    }));
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden mix-blend-normal opacity-100 bg-[#FBF7FF]">
      
      {/* Soft Light Pulse Pearl Blobs */}
      <motion.div 
        style={{ y: y1, x: x1 }}
        className="absolute top-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-linear-to-br from-[#E8D8EE]/60 to-[#DDC6E6]/30 blur-[120px] animate-pulse" 
        transition={{ duration: 12, repeat: Infinity, ease: 'linear', repeatType: "reverse" }}
      />
      <motion.div 
        style={{ y: y2, x: x2 }}
        className="absolute bottom-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-linear-to-tr from-[#D0B1DD]/40 to-[#BB8ECD]/20 blur-[140px] animate-pulse" 
        transition={{ duration: 15, delay: 2, repeat: Infinity, ease: 'linear', repeatType: "reverse" }}
      />
      <motion.div 
        style={{ y: y3, x: x3 }}
        className="absolute top-[30%] left-[40%] w-[40vw] h-[40vw] rounded-full bg-linear-to-tr from-[#F8F1FC]/80 to-[#E8D8EE]/40 blur-[100px] animate-pulse" 
        transition={{ duration: 10, delay: 5, repeat: Infinity, ease: 'linear', repeatType: "reverse" }}
      />

      {/* Floating Particles Parallax Layer */}
      <motion.div style={{ y: y2 }} className="absolute inset-0 w-full h-full">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-[#BB8ECD]/30 blur-[1px]"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, 50, 0],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </motion.div>

      {/* Animated noise overlay for film grain effect */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none"
        style={{ backgroundImage: `url('data:image/svg+xml;utf8,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')` }}
      />
    </div>
  );
}
