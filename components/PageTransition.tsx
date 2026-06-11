'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Small delay to allow the loading animation to play
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            key="page-transition"
            initial={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-200 flex items-center justify-center bg-[#FBF7FF] origin-right pointer-events-none"
          >
            {/* Panel sweep effect */}
            <motion.div
              initial={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
              className="absolute inset-0 bg-[#F3EDF7] origin-left"
            />
            <motion.div
              initial={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
              className="absolute inset-0 bg-[#D0B1DD] origin-left"
            />
            
            {/* Loading text/spinner inside the last panel */}
            <motion.div 
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 flex flex-col items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full border-2 border-white border-t-[#1F1726] animate-spin" />
              <span className="text-[#1F1726] font-mono uppercase tracking-[0.3em] text-xs font-medium">Loading Experience</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Page Content fades in after the transition sweeps away */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </>
  );
}
