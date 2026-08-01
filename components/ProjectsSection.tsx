'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { RiGithubLine, RiExternalLinkLine, RiArrowRightLine, RiCodeSSlashLine, RiBarChartBoxLine, RiCpuLine, RiGlobalLine } from 'react-icons/ri';

const PROJECTS = [
  {
    title: "SignSetu",
    desc: "AI Bidirectional Sign Language Platform. Winner of UHack 4.0 (1st/500+ participants). Real-time bidirectional ISL communication platform for the deaf and hard-of-hearing community.",
    link: "https://signsetu-x-2.vercel.app/",
    github: "https://github.com/saumya3005",
    tech: ["Python", "TensorFlow", "OpenCV", "MediaPipe", "React.js", "Flask", "Firebase", "Docker"],
    metrics: [
      { label: "Accuracy", value: "91%+" },
      { label: "Dataset", value: "5,000+" },
      { label: "Frame Rate", value: "24fps" }
    ],
    features: [
      "Sign-to-Text & Speech",
      "Text-to-Sign 3D avatar",
      "TensorFlow CNN + MediaPipe"
    ],
    color: "accent-purple",
    bgClass: "bg-accent-purple/10",
    textClass: "text-accent-purple",
    borderClass: "border-accent-purple/50",
  },
  {
    title: "Vynk",
    desc: "Full-Stack Social Networking Platform. Features secure JWT authentication, user profiles, post creation, likes, comments, media sharing, and personalized feeds.",
    link: "#",
    github: "https://github.com/saumya3005",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "Tailwind CSS", "Socket.io"],
    metrics: [
      { label: "Architecture", value: "REST API" },
      { label: "Real-time", value: "Socket.io" },
      { label: "Auth", value: "JWT RBAC" }
    ],
    features: [
      "Modular backend architecture",
      "Instant real-time notifications",
      "Optimized MongoDB CRUD"
    ],
    color: "accent-blue",
    bgClass: "bg-accent-blue/10",
    textClass: "text-accent-blue",
    borderClass: "border-accent-blue/50",
  },
  {
    title: "FlowSync",
    desc: "Collaborative Project Management Platform. A Trello/Asana-inspired tool supporting project creation, task assignment, progress tracking, deadlines, and team collaboration.",
    link: "#",
    github: "https://github.com/saumya3005",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "Tailwind CSS"],
    metrics: [
      { label: "UI", value: "Responsive" },
      { label: "Access", value: "Role-based" },
      { label: "Components", value: "Reusable" }
    ],
    features: [
      "Project boards & tasks",
      "Secure JWT authentication",
      "Interactive dashboard"
    ],
    color: "accent-cyan",
    bgClass: "bg-accent-cyan/10",
    textClass: "text-accent-cyan",
    borderClass: "border-accent-cyan/50",
  },
  {
    title: "Hanuman Pushpavarsha",
    desc: "Freelance production bilingual (Hindi-English) website serving 500+ users. Features Razorpay gateway, live streaming, member registry, and admin dashboard.",
    link: "https://hanumanpushpavarsha.vercel.app",
    github: "https://github.com/saumya3005",
    tech: ["Next.js", "Firebase", "Firestore", "Razorpay", "Vercel"],
    metrics: [
      { label: "Users", value: "500+" },
      { label: "Admin Overhead", value: "-60%" },
      { label: "Modules", value: "6" }
    ],
    features: [
      "Razorpay payment gateway",
      "Automated member registration",
      "Firebase Auth RBAC"
    ],
    color: "emerald-500",
    bgClass: "bg-emerald-500/10",
    textClass: "text-emerald-400",
    borderClass: "border-emerald-500/50",
  }
];

const MacBookMockup = ({ bgClass, borderClass }: { bgClass: string, borderClass: string }) => {
  return (
    <div className="relative w-full max-w-2xl mx-auto perspective-1000 mt-10 lg:mt-0 shadow-2xl transition-transform duration-700 hover:scale-105">
      {/* Laptop Screen */}
      <div className={`relative w-full aspect-16/10 rounded-t-xl glass-panel border-4 ${borderClass} overflow-hidden shadow-2xl`}>
        {/* Browser Top Bar */}
        <div className={`w-full h-6 ${bgClass} flex items-center px-3 gap-1.5 border-b border-white/10 backdrop-blur-md`}>
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        </div>
        
        {/* Mock Content */}
        <div className="absolute inset-0 top-6 flex flex-col p-6 gap-4 bg-zinc-900/80 backdrop-blur-xl">
          <div className="w-3/4 h-8 bg-white/5 rounded-lg animate-pulse" />
          <div className="w-full h-32 bg-white/5 rounded-lg border border-white/5" />
          <div className="grid grid-cols-2 gap-4">
            <div className="h-16 bg-white/5 rounded-lg" />
            <div className="h-16 bg-white/5 rounded-lg" />
          </div>
        </div>
        
        <div className={`absolute inset-0 ${bgClass} mix-blend-overlay opacity-30`} />
      </div>
      
      {/* Laptop Base */}
      <div className="relative w-[110%] translate-x-[-4.5%] h-4 bg-zinc-800 rounded-b-2xl border-t border-zinc-700 shadow-2xl flex justify-center">
        <div className="w-32 h-1 bg-zinc-900 rounded-b-md" />
      </div>
    </div>
  );
};

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  return (
    <section id="projects" ref={containerRef} className="relative w-full bg-zinc-950">
      
      {/* Header stuck at top */}
      <div className="sticky top-0 z-20 w-full pt-32 pb-10 bg-linear-to-b from-zinc-950 via-zinc-950/80 to-transparent pointer-events-none">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center pointer-events-auto">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 0.8, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-mono tracking-[0.2em] uppercase text-zinc-500"
          >
            02 // Selected Works
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tighter mt-4"
          >
            Featured <span className="text-transparent bg-clip-text bg-linear-to-r from-accent-purple to-accent-cyan">Projects.</span>
          </motion.h2>
        </div>
      </div>

      <div className="relative z-10 w-full pb-32">
        {PROJECTS.map((project, i) => {
          return (
            <div key={i} className="min-h-screen flex flex-col justify-center sticky top-0 bg-zinc-950" style={{ paddingTop: '80px', zIndex: i + 10 }}>
              {/* Dynamic top shadow to blend overlapping sections */}
              {i > 0 && <div className="absolute top-0 inset-x-0 h-32 bg-linear-to-b from-black to-transparent pointer-events-none opacity-50" />}
              
              <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                
                {/* Left Content */}
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-6">
                    <span className={`w-12 h-12 rounded-full glass-panel flex items-center justify-center font-mono font-bold ${project.textClass} border ${project.borderClass}`}>
                      0{i + 1}
                    </span>
                    <h3 className="text-4xl md:text-5xl font-bold">{project.title}</h3>
                  </div>

                  <p className="text-lg text-zinc-400 font-light leading-relaxed mb-8">
                    {project.desc}
                  </p>

                  <div className="grid grid-cols-3 gap-4 mb-8">
                    {project.metrics.map((metric, idx) => (
                      <div key={idx} className={`p-4 rounded-2xl glass-panel border border-white/5 ${project.bgClass}`}>
                        <div className={`text-2xl font-bold ${project.textClass} mb-1`}>{metric.value}</div>
                        <div className="text-xs font-mono text-zinc-500 uppercase">{metric.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-10">
                    {project.tech.map((tech, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-full text-xs font-mono border border-white/10 bg-white/5 text-zinc-300">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <a href={project.link} className={`magnetic-target group relative inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-semibold transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]`}>
                      Live Demo <RiExternalLinkLine className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </a>
                    
                    <a href={project.github} className="magnetic-target group relative inline-flex items-center gap-2 px-8 py-4 rounded-full glass-panel border border-white/10 text-zinc-300 font-medium transition-all hover:text-white hover:border-white/30 hover:scale-105">
                      <RiGithubLine size={20} />
                      Source Code
                    </a>
                  </div>
                </div>

                {/* Right Content - Mockup */}
                <div className="w-full flex items-center justify-center lg:justify-end">
                  <MacBookMockup bgClass={project.bgClass} borderClass={project.borderClass} />
                </div>
                
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
