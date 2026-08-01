'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { RiTrophyLine, RiArticleLine, RiArrowRightUpLine, RiTeamLine } from 'react-icons/ri';

const RESEARCH_DATA = [
  {
    type: "Publication",
    title: "Multi-Class Anomaly Detection in Network Traffic Using Supervised Machine Learning",
    publisher: "Taylor & Francis Group Computer Science",
    date: "Sept 2025 (ICMLDE 2025 | AICCT-2025)",
    desc: "ML-based IDS on CIC UNSW-NB15 (175,000+ records); benchmarked 4 models (Decision Tree, Random Forest, Logistic Regression, XGBoost); 93.78% accuracy with Precision, Recall, F1, ROC-AUC. Selected for international conference presentation.",
    link: "#",
    icon: <RiArticleLine size={24} />,
    colorClass: "text-accent-copper",
    bgClass: "bg-accent-copper/10",
    borderClass: "border-accent-copper/50",
  }
];

const HACKATHON_DATA = [
  {
    title: "UHack 4.0",
    position: "1st Place Winner",
    project: "SignSetu",
    date: "2024",
    desc: "1st out of 500+ participants. Built a real-time ISL AI platform for the deaf and hard-of-hearing community.",
    participants: "500+ Participants",
    icon: <RiTrophyLine size={24} />,
    colorClass: "text-yellow-500",
    bgClass: "bg-yellow-500/10",
    borderClass: "border-yellow-500/50",
  },
  {
    title: "Google Build with AI (GDG)",
    position: "Winner",
    project: "AI-Powered Solution",
    date: "2024",
    desc: "Developed an AI-powered solution recognized by Google Developer Group ecosystem judges for innovation and practical impact.",
    participants: "GDG",
    icon: <RiTrophyLine size={24} />,
    colorClass: "text-accent-bronze",
    bgClass: "bg-accent-bronze/10",
    borderClass: "border-accent-bronze/50",
  },
  {
    title: "NSUT National Hackathon",
    position: "Top 10 Finalist",
    project: "National Level",
    date: "2024",
    desc: "Recognized as a Top 10 Finalist in a highly competitive national-level hackathon at Netaji Subhas University of Technology, New Delhi.",
    participants: "National",
    icon: <RiTrophyLine size={24} />,
    colorClass: "text-emerald-400",
    bgClass: "bg-emerald-500/10",
    borderClass: "border-emerald-500/50",
  },
  {
    title: "HackDiwas 3.0 & TEDx United University",
    position: "Lead Organizer",
    project: "Leadership & Community",
    date: "2024 - Present",
    desc: "Lead Organizer for HackDiwas 3.0 (500+ participant state-level hackathon). Organizer for TEDx United University. Active in GDG Prayagraj, Wikiclub tech, Prerogative pointers 2025, FOSS Prayagraj.",
    participants: "500+ Participants",
    icon: <RiTeamLine size={24} />,
    colorClass: "text-blue-400",
    bgClass: "bg-blue-500/10",
    borderClass: "border-blue-500/50",
  }
];

export default function ResearchHackathonSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="research-hackathons" className="py-24 sm:py-32 relative z-10 border-t border-accent-copper/20 bg-luxury-bg overflow-hidden">
      
      {/* Dynamic Backgrounds */}
      <div className="absolute top-1/4 -left-1/4 w-200 h-200 bg-accent-copper/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-1/4 w-200 h-200 bg-yellow-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10" ref={containerRef}>
        
        {/* Header */}
        <div className="mb-20 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 0.8, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-mono tracking-[0.2em] uppercase text-secondary-text"
          >
            05 // Academics & Competitions
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mt-4"
          >
            Research & <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-500 to-accent-bronze">Wins</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Research Column */}
          <motion.div style={{ y: y1 }} className="flex flex-col gap-8">
            <div className="flex items-center gap-4 mb-4">
              <h3 className="text-2xl font-bold text-zinc-100 tracking-wide">Publications</h3>
              <div className="h-px bg-white/10 flex-1" />
            </div>

            {RESEARCH_DATA.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative"
              >
                <div className={`p-8 rounded-3xl glass-panel border border-accent-copper/20 bg-linear-to-b ${item.bgClass} transition-all duration-500 hover:${item.borderClass} hover:shadow-2xl hover:shadow-${item.colorClass.replace('text-', '')}/20 overflow-hidden`}>
                  
                  {/* Hover Orb */}
                  <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-700 blur-2xl pointer-events-none" style={{ background: 'currentColor' }} />

                  <div className="relative z-10 flex flex-col items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl glass-panel border border-accent-copper/25 flex items-center justify-center ${item.colorClass} shadow-inner`}>
                      {item.icon}
                    </div>
                    
                    <div>
                      <span className={`text-xs font-mono uppercase tracking-wider ${item.colorClass} mb-2 block`}>
                        {item.type} • {item.date}
                      </span>
                      <h4 className="text-xl sm:text-2xl font-bold text-zinc-100 mb-2 leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-sm font-medium text-ivory mb-4 flex items-center gap-2">
                        {item.publisher}
                      </p>
                      <p className="text-secondary-text font-light leading-relaxed mb-6">
                        {item.desc}
                      </p>
                    </div>

                    <a href={item.link} className={`inline-flex items-center gap-2 text-sm font-medium ${item.colorClass} hover:text-white transition-colors group/link`}>
                      View Publication <RiArrowRightUpLine className="group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Hackathons Column */}
          <motion.div style={{ y: y2 }} className="flex flex-col gap-8">
            <div className="flex items-center gap-4 mb-4">
              <h3 className="text-2xl font-bold text-zinc-100 tracking-wide">Hackathons & Leadership</h3>
              <div className="h-px bg-white/10 flex-1" />
            </div>

            {HACKATHON_DATA.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative"
              >
                <div className={`p-8 rounded-3xl glass-panel border border-accent-copper/20 bg-linear-to-b ${item.bgClass} transition-all duration-500 hover:${item.borderClass} hover:shadow-2xl hover:shadow-${item.colorClass.replace('text-', '')}/20 overflow-hidden`}>
                  
                  {/* Hover Orb */}
                  <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-700 blur-2xl pointer-events-none" style={{ background: 'currentColor' }} />

                  <div className="relative z-10 flex flex-col sm:flex-row gap-6 items-start">
                    
                    <div className={`w-14 h-14 shrink-0 rounded-2xl glass-panel border border-accent-copper/25 flex items-center justify-center ${item.colorClass} shadow-inner group-hover:scale-110 transition-transform duration-500`}>
                      {item.icon}
                    </div>
                    
                    <div>
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span className={`px-3 py-1 text-xs font-bold rounded-full ${item.bgClass.replace('/10', '/30')} ${item.colorClass} border border-accent-copper/20`}>
                          {item.position}
                        </span>
                        <span className="text-xs text-secondary-text font-mono">{item.date}</span>
                      </div>
                      
                      <h4 className="text-lg font-bold text-zinc-100 mb-1">
                        {item.title}
                      </h4>
                      <div className="text-sm font-medium text-secondary-text mb-3">
                        {item.project} • {item.participants}
                      </div>
                      
                      <p className="text-secondary-text font-light text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
