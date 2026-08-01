'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { RiArrowRightUpLine, RiDownloadLine, RiMailLine, RiArrowDownLine } from 'react-icons/ri';
import DynamicName from './DynamicName';

const ROLES = [
  "Software Development Engineer",
  "Full Stack Developer",
  "AI/ML Engineer",
  "Python Developer"
];

// Magnetic Button Wrapper
function MagneticButton({ children, className = "", href }: { children: React.ReactNode, className?: string, href?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouse = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.2); // 20% pull
    y.set(middleY * 0.2);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={href}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x: mouseXSpring, y: mouseYSpring }}
      className={`magnetic-target inline-block ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.a>
  );
}

// Split text for character reveal
const textRevealVariants = {
  hidden: { opacity: 0, y: 50, rotateX: -90 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: "spring" as const,
      damping: 12,
      stiffness: 200,
      delay: i * 0.05
    }
  })
};

function SplitText({ text, delayOffset = 0 }: { text: string, delayOffset?: number }) {
  const words = text.split(" ");
  return (
    <div className="flex flex-wrap">
      {words.map((word, wIdx) => (
        <span key={wIdx} className="mr-4 flex overflow-hidden">
          {word.split("").map((char, cIdx) => (
            <motion.span
              custom={cIdx + wIdx * 5 + delayOffset}
              variants={textRevealVariants}
              initial="hidden"
              animate="visible"
              key={cIdx}
              className="inline-block origin-bottom"
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </div>
  );
}

export default function Hero() {
  const [currentRole, setCurrentRole] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % ROLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // 3D Tilt Effect
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-20deg", "20deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-16 lg:gap-8">
        
        {/* LEFT SIDE: Typography & Content */}
        <div className="w-full lg:w-[60%] flex flex-col justify-center text-left">
          
          <div className="text-5xl sm:text-7xl lg:text-[5.5rem] font-bold tracking-tighter text-foreground mb-4 leading-[1.1] perspective-[1000px]">
            <SplitText text="Hello," />
            <div className="flex flex-wrap gap-x-4 mt-2">
              <SplitText text="I'm" delayOffset={5} /> 
              <motion.div
                initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 1, delay: 0.8, type: "spring" }}
                className="text-transparent bg-clip-text bg-linear-to-r from-accent-copper via-ivory to-accent-bronze inline-block"
              >
                Saumya Agrahari
              </motion.div>
            </div>
          </div>

          {/* Morphing Roles */}
          <div className="h-16 relative overflow-hidden mb-8 flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentRole}
                initial={{ opacity: 0, y: 40, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, y: -40, rotateX: 90 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 20 }}
                className="text-2xl sm:text-4xl font-light text-accent-bronze absolute origin-center"
              >
                {ROLES[currentRole]}
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mb-12"
          >
            <p className="text-xl sm:text-2xl text-ivory font-medium mb-4 flex items-center gap-3">
              Taylor & Francis Group 
              <span className="w-1.5 h-1.5 rounded-full bg-accent-copper" /> 
              3x Hackathon Winner
            </p>
            <p className="text-lg sm:text-xl text-secondary-text max-w-2xl leading-relaxed font-light">
              Final-year AI/ML engineer. Published researcher. 10+ production APIs. 93.78% ML accuracy. I ship software that works.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-wrap items-center gap-6"
          >
            <MagneticButton href="#projects" className="group relative inline-flex items-center justify-center px-8 py-4 bg-ivory text-black rounded-full font-bold transition-all hover:shadow-[0_0_40px_rgba(248,245,240,0.4)]">
              <span className="flex items-center gap-2">
                Explore Work <RiArrowRightUpLine className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </span>
            </MagneticButton>
            
            <MagneticButton
              href="/Assets/Saumyaresume2026updated.pdf"
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full glass-panel border border-accent-copper/25 text-ivory font-medium transition-all duration-300 hover:border-accent-copper/50 hover:text-accent-copper hover:shadow-[0_0_25px_rgba(184,115,51,0.2)]"
            >
              <RiDownloadLine size={20} className="group-hover:-translate-y-0.5 transition-transform" />
              Download Resume
            </MagneticButton>

          </motion.div>
        </div>

        {/* RIGHT SIDE: 3D Premium Profile Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          className="w-full lg:w-[40%] flex items-center justify-center lg:justify-end relative z-10 mt-10 lg:mt-0" 
          style={{ perspective: "1500px" }}
        >
          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative w-75 h-100 sm:w-87.5 sm:h-120 rounded-4xl glass-panel border border-accent-copper/25 p-4 cursor-none shadow-2xl"
          >
            {/* Ambient Shadow behind card */}
            <div className="absolute inset-0 bg-accent-copper/20 blur-[100px] -z-10 rounded-full mix-blend-screen pointer-events-none" style={{ transform: "translateZ(-50px)" }} />

            {/* Inner Image translated forward for 3D depth */}
            <div 
              className="w-full h-full rounded-3xl overflow-hidden relative border border-accent-copper/25"
              style={{ transform: "translateZ(60px)" }}
            >
              <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent z-10 pointer-events-none opacity-80" />
              
              {/* Floating tech badges */}
              <div className="absolute bottom-6 left-6 z-20 flex gap-2">
                <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-mono">React</span>
                <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-mono">Python</span>
                <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-mono">AWS</span>
              </div>

              <img 
                src="https://i.postimg.cc/zGqh8fwk/IMG-20260608-WA0015.jpg" 
                alt="Saumya Agrahari"
                className="w-full h-full object-cover scale-105 transition-transform duration-1000 hover:scale-110"
              />
              
              {/* Overlay glow reacting to mouse */}
              <motion.div 
                className="absolute inset-0 z-20 pointer-events-none mix-blend-overlay opacity-50"
                style={{
                  background: useTransform(
                    [x, y],
                    ([latestX, latestY]) => `radial-gradient(circle at ${(latestX as number + 0.5) * 100}% ${(latestY as number + 0.5) * 100}%, rgba(255,255,255,0.4) 0%, transparent 60%)`
                  )
                }}
              />
            </div>
            
            {/* Decorator elements translated even further */}
            <div 
              className="absolute -right-8 -top-8 w-24 h-24 rounded-full glass-panel border border-white/20 flex items-center justify-center backdrop-blur-xl shadow-2xl"
              style={{ transform: "translateZ(100px)" }}
            >
              <div className="text-3xl">✨</div>
            </div>
            
            <div 
              className="absolute -left-6 top-1/2 w-16 h-16 rounded-2xl glass-panel border border-white/20 flex items-center justify-center backdrop-blur-xl shadow-2xl"
              style={{ transform: "translateZ(80px)" }}
            >
              <div className="text-2xl font-bold font-mono">10+</div>
            </div>

          </motion.div>
        </motion.div>

      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-secondary-text"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-mono">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <RiArrowDownLine size={20} />
        </motion.div>
      </motion.div>

    </section>
  );
}
