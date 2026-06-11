'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';

export default function DynamicName({ firstName = "Saumya", lastName = "Agrahari" }: { firstName?: string, lastName?: string }) {
  const lettersFirst = firstName.split('');
  const lettersLast = lastName.split('');

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2
      }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 40, rotateX: -90 },
    show: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <div className="flex flex-col select-none cursor-default">
      {/* First Name */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="flex overflow-hidden perspective-1200"
      >
        {lettersFirst.map((letter, i) => (
          <motion.span 
            key={`first-${i}`}
            variants={item}
            whileHover={{ y: -5, color: '#facc15', textShadow: '0 0 20px rgba(250,204,21,0.4)', transition: { duration: 0.2 } }}
            className="inline-block transition-colors duration-500 font-light tracking-tighter text-white"
          >
            {letter}
          </motion.span>
        ))}
      </motion.div>
      
      {/* Last Name */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="flex overflow-hidden perspective-1200 -mt-2 sm:-mt-4"
      >
        {lettersLast.map((letter, i) => (
          <motion.span 
            key={`last-${i}`}
            variants={item}
            whileHover={{ y: -5, color: '#facc15', textShadow: '0 0 20px rgba(250,204,21,0.4)', transition: { duration: 0.2 } }}
            className="inline-block transition-colors duration-500 font-medium tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-white to-zinc-500"
          >
            {letter}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}
