'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';

export default function AnimatedBackground() {
  const [mounted, setMounted] = useState(false);

  // Use a fixed deterministic array to prevent hydration mismatch
  const particles = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      width: (i % 3) * 3 + 2,
      height: (i % 3) * 3 + 2,
      top: `${(i * 17) % 100}%`,
      left: `${(i * 23) % 100}%`,
      duration: 12 + (i % 5) * 3,
      delay: i * 0.4,
    }));
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden mix-blend-normal opacity-100">
      <motion.div 
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-linear-to-br from-[#E8D8EE]/40 to-[#BB8ECD]/15 blur-[100px] animate-pulse" 
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div 
        className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-linear-to-tr from-[#DDC6E6]/30 to-[#D0B1DD]/15 blur-[120px] animate-pulse" 
        transition={{ duration: 16, delay: 4, repeat: Infinity, ease: 'linear' }}
      />
      
      {/* Soft animated particles */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[#BB8ECD]/40 blur-[1px]"
          style={{
            width: p.width,
            height: p.height,
            top: p.top,
            left: p.left,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.6, 0.1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: p.delay,
          }}
        />
      ))}

      {/* Subtle radial grid/noise overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] mix-blend-multiply"
        style={{ backgroundImage: `url('data:image/svg+xml;utf8,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')` }}
      />
    </div>
  );
}
