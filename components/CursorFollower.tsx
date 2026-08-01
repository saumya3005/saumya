'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CursorFollower() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleInteractableEnter = () => setIsHovering(true);
    const handleInteractableLeave = () => setIsHovering(false);

    // Initial check
    setIsVisible(true);

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Add listeners to all interactive elements
    const interactables = document.querySelectorAll('a, button, input, textarea, select, .magnetic-target');
    interactables.forEach((el) => {
      el.addEventListener('mouseenter', handleInteractableEnter);
      el.addEventListener('mouseleave', handleInteractableLeave);
    });

    // We need to re-scan when DOM changes (simple mutation observer)
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length > 0) {
          const newInteractables = document.querySelectorAll('a, button, input, textarea, select, .magnetic-target');
          newInteractables.forEach((el) => {
            el.removeEventListener('mouseenter', handleInteractableEnter);
            el.removeEventListener('mouseleave', handleInteractableLeave);
            el.addEventListener('mouseenter', handleInteractableEnter);
            el.addEventListener('mouseleave', handleInteractableLeave);
          });
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      observer.disconnect();
      interactables.forEach((el) => {
        el.removeEventListener('mouseenter', handleInteractableEnter);
        el.removeEventListener('mouseleave', handleInteractableLeave);
      });
    };
  }, [cursorX, cursorY]);

  // Hide default cursor globally
  useEffect(() => {
    document.documentElement.style.cursor = 'none';
    const interactables = document.querySelectorAll('a, button, input, textarea, select');
    interactables.forEach((el) => {
      (el as HTMLElement).style.cursor = 'none';
    });
    
    return () => {
      document.documentElement.style.cursor = 'auto';
    };
  }, []);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/30 mix-blend-difference pointer-events-none z-9999 flex items-center justify-center"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          scale: isHovering ? 2 : 1,
          backgroundColor: isHovering ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0)',
        }}
        transition={{ duration: 0.2 }}
      >
        <motion.div 
          className="w-1 h-1 bg-white rounded-full"
          animate={{
            scale: isHovering ? 0 : 1,
          }}
        />
      </motion.div>
    </>
  );
}
