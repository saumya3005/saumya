'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export default function SpotlightCard({
  children,
  className = '',
  glowColor = 'rgba(208, 177, 221, 0.12)', // new theme color accent glow
  ...props
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [supportsHover, setSupportsHover] = useState(true);

  useEffect(() => {
    // Detect touch screens / hover support
    const mediaQuery = window.matchMedia('(hover: hover)');
    setSupportsHover(mediaQuery.matches);
  }, []);

  // Framer Motion values for 3D physics
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const springConfig = { damping: 25, stiffness: 120 };
  const rotateX = useSpring(useTransform(y, [0, 1], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(x, [0, 1], [-5, 5]), springConfig);
  const translateZ = useSpring(hovered ? 8 : 0, springConfig);
  const scale = useSpring(hovered ? 1.02 : 1, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate mouse position relative to card (0 to 1)
    const mouseX = (e.clientX - rect.left) / width;
    const mouseY = (e.clientY - rect.top) / height;

    x.set(mouseX);
    y.set(mouseY);

    // Also update CSS variables for the radial spotlight gradient
    cardRef.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <div 
      className={`perspective-[1000px] w-full h-full ${className}`}
      {...props}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: supportsHover ? rotateX : 0,
          rotateY: supportsHover ? rotateY : 0,
          scale: supportsHover ? scale : 1,
          translateZ: supportsHover ? translateZ : 0,
          transformStyle: 'preserve-3d',
        }}
        className="relative overflow-hidden rounded-2xl border border-white/[0.04] bg-white/[0.02] backdrop-blur-[8px] md:backdrop-blur-[20px] transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.5)] avp-glass w-full h-full"
      >
        {/* Glow spotlight ring */}
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 z-0"
          style={{
            opacity: hovered && supportsHover ? 1 : 0,
            background: `radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), ${glowColor}, transparent 80%)`,
          }}
        />

        {/* Outer glass border reflection */}
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 z-0"
          style={{
            opacity: hovered && supportsHover ? 1 : 0,
            background: `radial-gradient(250px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(232, 216, 238, 0.15), transparent 85%)`,
            maskImage: 'linear-gradient(black, black)',
            WebkitMaskImage: 'linear-gradient(black, black)',
            maskClip: 'content-box',
            WebkitMaskClip: 'content-box',
          }}
        />

        {/* Static touch glow / border for non-hover devices */}
        {!supportsHover && (
          <div
            className="pointer-events-none absolute -inset-px rounded-2xl z-0 border border-[#DDC6E6]/15 bg-gradient-to-r from-[#E8D8EE]/[0.02] to-[#BB8ECD]/[0.02]"
          />
        )}

        {/* 3D Depth Content container */}
        <motion.div 
          style={{ translateZ: hovered && supportsHover ? 10 : 0 }} 
          className="relative z-10 h-full w-full transform-3d"
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}
