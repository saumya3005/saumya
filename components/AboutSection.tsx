'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import {
  RiTrophyLine,
  RiCodeSSlashLine,
  RiTimeLine,
  RiGraduationCapLine,
  RiUserStarLine,
} from 'react-icons/ri';

/* ─── Animated Counter ─── */
const Counter = ({ from, to }: { from: number; to: number }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-100px" });

  React.useEffect(() => {
    if (!inView) return;
    const node = nodeRef.current;
    if (!node) return;

    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
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

/* ─── Data ─── */
const STATS = [
  { icon: <RiCodeSSlashLine size={22} />, value: 5, suffix: '+', label: 'Projects', delay: 0 },
  { icon: <RiTrophyLine size={22} />, value: 3, suffix: 'x', label: 'Hackathon Winner', delay: 0.1 },
  { icon: <RiTimeLine size={22} />, value: 2, suffix: '+', label: 'Years Experience', delay: 0.2 },
  { icon: <RiGraduationCapLine size={22} />, value: 0, suffix: '', label: 'Final Year AIML', delay: 0.3, isText: true },
];

const SKILL_BADGES = [
  'React', 'Next.js', 'Python', 'Machine Learning',
  'OpenCV', 'Firebase', 'Supabase', 'GSAP',
  'Tailwind CSS', 'Framer Motion',
];

/* ─── Component ─── */
export default function AboutSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const yShift = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section id="about" className="py-24 sm:py-32 bg-zinc-950 text-white relative z-10 border-t border-white/5 overflow-hidden">

      {/* Floating gradient blobs */}
      <div className="absolute top-20 -left-32 w-80 h-80 bg-yellow-500/5 rounded-full blur-[100px] pointer-events-none animate-float" />
      <div className="absolute bottom-20 -right-32 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" style={{ animationDelay: '3s', animationDuration: '8s' }} />

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

        {/* ─── Main Content Grid ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Main Bio Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <div className="h-full p-8 md:p-12 glass-panel rounded-3xl group transition-all duration-500 hover:border-yellow-400/30 hover:bg-zinc-900/60">
              <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center mb-8 text-yellow-500 group-hover:scale-110 transition-transform duration-500">
                <RiUserStarLine size={24} />
              </div>
              <p className="text-xl md:text-2xl text-zinc-300 leading-relaxed font-light mb-6">
                Final-year B.Tech Artificial Intelligence &amp; Machine Learning student at{' '}
                <span className="text-white font-medium">United University, Prayagraj</span>.
                Passionate about full-stack development, AI/ML, modern web experiences, hackathons, open-source communities, and building impactful digital products.
              </p>
              <p className="text-base md:text-lg text-zinc-400 leading-relaxed font-light mb-8">
                Experienced in React, Next.js, Python, Machine Learning, OpenCV, Firebase, Supabase, and modern UI animations.
                I enjoy creating products that combine clean design, intelligent systems, and real-world problem solving.
              </p>

              {/* Skill Badges */}
              <div className="flex flex-wrap gap-2">
                {SKILL_BADGES.map((skill, idx) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.04, duration: 0.4 }}
                    className="px-4 py-1.5 text-xs font-mono rounded-full bg-zinc-900/60 border border-white/5 text-zinc-400 transition-all duration-300 hover:border-yellow-400/30 hover:text-yellow-400/80 hover:bg-yellow-500/5 cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Stats Column */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {STATS.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: stat.delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, scale: 1.03 }}
                className="group"
              >
                <div className="h-full w-full p-6 glass-panel rounded-3xl flex flex-col justify-center items-center text-center transition-all duration-500 hover:border-yellow-400/30 hover:bg-zinc-900/60 hover:shadow-[0_10px_40px_rgba(250,204,21,0.08)]">
                  <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center mb-3 text-yellow-500 group-hover:scale-110 transition-transform duration-500">
                    {stat.icon}
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold tracking-tighter text-white mb-1">
                    {stat.isText ? (
                      <span className="text-2xl sm:text-3xl">🎓</span>
                    ) : (
                      <><Counter from={0} to={stat.value} />{stat.suffix}</>
                    )}
                  </div>
                  <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-zinc-500 leading-tight">
                    {stat.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </motion.div>
    </section>
  );
}
