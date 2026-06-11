'use client';

import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const cursorX = useSpring(0, { stiffness: 500, damping: 28, mass: 0.5 });
  const cursorY = useSpring(0, { stiffness: 500, damping: 28, mass: 0.5 });
  
  const cursorOuterX = useSpring(0, { stiffness: 250, damping: 20, mass: 0.8 });
  const cursorOuterY = useSpring(0, { stiffness: 250, damping: 20, mass: 0.8 });

  useEffect(() => {
    setIsMounted(true);
    if (window.innerWidth < 768) {
      setIsMobile(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      cursorOuterX.set(e.clientX);
      cursorOuterY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-hover-target') ||
        target.closest('.cursor-hover-target')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [cursorX, cursorY, cursorOuterX, cursorOuterY]);

  if (!isMounted || isMobile) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-[#BB8ECD] rounded-full pointer-events-none z-9999 origin-center"
        style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          scale: isHovering ? 0 : (isClicked ? 0.5 : 1),
          opacity: isHovering ? 0 : 1
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-[#DDC6E6] rounded-full pointer-events-none z-9998 flex items-center justify-center bg-[#F8F1FC]/20 backdrop-blur-xs shadow-sm origin-center"
        style={{ x: cursorOuterX, y: cursorOuterY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          scale: isHovering ? 2.5 : (isClicked ? 0.8 : 1),
          borderColor: isHovering ? 'rgba(187, 142, 205, 0.4)' : 'rgba(221, 198, 230, 0.8)',
          backgroundColor: isHovering ? 'rgba(187, 142, 205, 0.05)' : 'rgba(248, 241, 252, 0.2)',
        }}
        transition={{ type: 'spring', stiffness: 250, damping: 20, mass: 0.8 }}
      >
        <motion.div
          animate={{ scale: isHovering ? 1 : 0 }}
          className="w-1.5 h-1.5 bg-[#BB8ECD] rounded-full"
        />
      </motion.div>
    </>
  );
}
