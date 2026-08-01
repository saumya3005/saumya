'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { RiTrophyLine, RiSwordLine, RiFocus2Line, RiDatabase2Line, RiTestTubeLine, RiDashboard3Line } from 'react-icons/ri';

const ACHIEVEMENTS = [
  {
    title: "Hackathon Wins",
    icon: <RiTrophyLine size={28} />,
    color: "from-accent-copper/20 to-transparent",
    iconColor: "text-accent-copper",
    borderColor: "group-hover:border-accent-copper/50",
    metric: 3,
    suffix: ""
  },
  {
    title: "Participants Competed Against",
    icon: <RiSwordLine size={28} />,
    color: "from-accent-bronze/20 to-transparent",
    iconColor: "text-accent-bronze",
    borderColor: "group-hover:border-accent-bronze/50",
    metric: 500,
    suffix: "+"
  },
  {
    title: "ML Model Accuracy",
    icon: <RiFocus2Line size={28} />,
    color: "from-accent-bronze/20 to-transparent",
    iconColor: "text-accent-bronze",
    borderColor: "group-hover:border-accent-bronze/50",
    metric: 93,
    suffix: ".78%"
  },
  {
    title: "Production API Endpoints",
    icon: <RiDatabase2Line size={28} />,
    color: "from-emerald-500/20 to-transparent",
    iconColor: "text-emerald-400",
    borderColor: "group-hover:border-emerald-500/50",
    metric: 10,
    suffix: "+"
  },
  {
    title: "Test Coverage",
    icon: <RiTestTubeLine size={28} />,
    color: "from-pink-500/20 to-transparent",
    iconColor: "text-pink-400",
    borderColor: "group-hover:border-pink-500/50",
    metric: 85,
    suffix: "%+"
  },
  {
    title: "Data Retrieval Improvement",
    icon: <RiDashboard3Line size={28} />,
    color: "from-yellow-500/20 to-transparent",
    iconColor: "text-yellow-400",
    borderColor: "group-hover:border-yellow-500/50",
    metric: 25,
    suffix: "%"
  }
];

const Counter = ({ from, to }: { from: number; to: number }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    const node = nodeRef.current;
    if (!node) return;

    const duration = 2500; // 2.5s for smooth dramatic count
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 4); // Quartic ease out
      const current = Math.floor(from + (to - from) * easeProgress);
      
      node.textContent = current.toString();

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [from, to, inView]);

  return <span ref={nodeRef}>{from}</span>;
};

export default function AchievementsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const yShift = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="achievements" className="py-24 sm:py-32 relative z-10 border-t border-accent-copper/20 overflow-hidden">
      
      {/* Background Decorators */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-150 bg-accent-bronze/5 blur-[150px] pointer-events-none rounded-full" />
      
      <motion.div ref={containerRef} style={{ y: yShift }} className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <div className="mb-20 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 0.8, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-mono tracking-[0.2em] uppercase text-accent-bronze"
          >
            02 // Milestones
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mt-4"
          >
            By The <span className="text-transparent bg-clip-text bg-linear-to-r from-accent-bronze to-accent-bronze">Numbers</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {ACHIEVEMENTS.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, type: "spring", stiffness: 100, damping: 20 }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              <div className={`h-full p-8 rounded-3xl glass-panel border border-accent-copper/20 transition-all duration-500 bg-linear-to-b ${item.color} ${item.borderColor} overflow-hidden`}>
                
                {/* Background glow on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2" />
                </div>

                <div className="relative z-10 flex flex-col items-center text-center h-full justify-center">
                  <div className={`w-16 h-16 rounded-2xl glass-panel flex items-center justify-center mb-6 shadow-inner ${item.iconColor} group-hover:scale-110 transition-transform duration-500`}>
                    {item.icon}
                  </div>
                  
                  <div className="text-5xl md:text-6xl font-bold tracking-tighter text-foreground mb-4 drop-shadow-xl flex items-baseline justify-center">
                    <Counter from={0} to={item.metric} />
                    <span className={`text-4xl ml-1 ${item.iconColor}`}>{item.suffix}</span>
                  </div>
                  
                  <h3 className="text-lg md:text-xl font-light text-secondary-text tracking-wide uppercase group-hover:text-zinc-200 transition-colors">
                    {item.title}
                  </h3>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </motion.div>
    </section>
  );
}
