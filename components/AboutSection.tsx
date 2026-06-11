'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { RiTrophyLine, RiCodeSSlashLine, RiUserStarLine } from 'react-icons/ri';

const Counter = ({ from, to }: { from: number; to: number }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-100px" });

  React.useEffect(() => {
    if (!inView) return;
    const node = nodeRef.current;
    if (!node) return;

    let start = from;
    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (to - start) * easeProgress);
      
      node.textContent = current.toString();

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [from, to, inView]);

  return <span ref={nodeRef}>{from}</span>;
};

export default function AboutSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const yShift = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section id="about" className="py-24 sm:py-32 bg-zinc-950 text-white relative z-10 border-t border-white/5">
      <motion.div ref={containerRef} style={{ y: yShift }} className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 0.6, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-mono tracking-[0.2em] uppercase text-yellow-500"
            >
              01 // Profile
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mt-4"
            >
              Bridging Machine Learning<br />
              <span className="text-zinc-500 font-light">with Interactive Engineering.</span>
            </motion.h2>
          </div>
        </div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Bio */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-8"
          >
            <div className="h-full p-8 md:p-12 glass-panel rounded-3xl group transition-all duration-500 hover:border-yellow-400/30 hover:bg-zinc-900/60">
              <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center mb-8 text-yellow-500">
                <RiUserStarLine size={24} />
              </div>
              <p className="text-xl md:text-2xl text-zinc-300 leading-relaxed font-light mb-8">
                I am a final-year B.Tech AI/ML student and passionate software engineer with a deep focus on building intelligent, highly optimized, and visually stunning digital experiences. 
              </p>
              <p className="text-lg text-zinc-400 leading-relaxed font-light">
                My work spans from developing high-performance mathematical models to building full-stack applications with Next.js. I believe that the best software exists at the intersection of performance, elegant design, and reliable architecture. Actively contributing to open-source and thriving in hackathon environments.
              </p>
            </div>
          </motion.div>
          
          {/* Stats Column */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="h-1/2"
            >
              <div className="h-full w-full p-8 glass-panel rounded-3xl flex flex-col justify-center items-center group transition-all duration-500 hover:border-yellow-400/30 hover:-translate-y-2 hover:bg-zinc-900/60">
                <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center mb-4 text-yellow-500 group-hover:scale-110 transition-transform duration-500">
                  <RiTrophyLine size={28} />
                </div>
                <div className="text-5xl font-bold tracking-tighter text-white mb-2">
                  <Counter from={0} to={3} />+
                </div>
                <span className="text-sm font-mono uppercase tracking-widest text-zinc-500">Hackathon Wins</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="h-1/2"
            >
              <div className="h-full w-full p-8 glass-panel rounded-3xl flex flex-col justify-center items-center group transition-all duration-500 hover:border-yellow-400/30 hover:-translate-y-2 hover:bg-zinc-900/60">
                <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center mb-4 text-yellow-500 group-hover:scale-110 transition-transform duration-500">
                  <RiCodeSSlashLine size={28} />
                </div>
                <div className="text-5xl font-bold tracking-tighter text-white mb-2">
                  <Counter from={0} to={20} />+
                </div>
                <span className="text-sm font-mono uppercase tracking-widest text-zinc-500">Projects Built</span>
              </div>
            </motion.div>

          </div>
        </div>

      </motion.div>
    </section>
  );
}
