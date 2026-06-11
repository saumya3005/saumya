'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IntroExperience() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Exactly 1.8s to 2.5s duration as requested
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-100 flex items-center justify-center bg-[#FBF7FF] overflow-hidden"
        >
          {/* Pastel background blobs */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full bg-linear-to-br from-[#E8D8EE] to-[#D0B1DD] blur-[100px] opacity-40 mix-blend-multiply"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 text-center"
          >
            <h1 className="text-4xl md:text-6xl font-light text-[#1F1726] tracking-widest uppercase flex items-center gap-4">
              <span>Saumya</span>
              <span className="w-2 h-2 rounded-full bg-[#BB8ECD]" />
              <span className="italic text-[#5D4A68]">Agrahari</span>
            </h1>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.2, delay: 0.6, ease: "easeInOut" }}
              className="h-px bg-linear-to-r from-transparent via-[#BB8ECD] to-transparent mt-8"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
