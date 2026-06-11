'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiCloseLine, RiGithubFill, RiExternalLinkLine } from 'react-icons/ri';

export interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    id: string;
    title: string;
    categories: string[];
    description: string;
    technologies: string[];
    isWinner?: boolean;
    demoUrl?: string;
    githubUrl?: string;
  } | null;
}

export default function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#07060A]/80 backdrop-blur-xl"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl bg-white/2 border border-white/10 rounded-3xl overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.8)]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 border border-white/10 text-white hover:bg-white hover:text-black transition-colors cursor-hover-target"
            >
              <RiCloseLine size={24} />
            </button>

            <div className="flex flex-col md:flex-row h-full max-h-[85vh] overflow-y-auto custom-scrollbar">
              {/* Image/Visual Side */}
              <div className="w-full md:w-1/2 min-h-75 md:min-h-full bg-[#07060A] relative flex items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-white/5">
                <div className="absolute inset-0 bg-linear-to-br from-[#BB8ECD]/20 to-transparent" />
                {/* Fallback pattern for project image */}
                <div className="w-full h-full opacity-30" style={{ backgroundImage: 'radial-gradient(circle at center, #DDC6E6 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                <h3 className="absolute text-3xl font-light text-white/20 uppercase tracking-widest px-8 text-center">{project.title}</h3>
              </div>

              {/* Content Side */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.categories.map((cat) => (
                      <span key={cat} className="text-[10px] font-mono bg-white/5 border border-white/10 rounded px-2 py-1 text-neutral-300">
                        {cat}
                      </span>
                    ))}
                    {project.isWinner && (
                      <span className="text-[10px] font-mono bg-[#D0B1DD]/20 border border-[#D0B1DD]/40 rounded px-2 py-1 text-[#D0B1DD]">
                        WINNER
                      </span>
                    )}
                  </div>

                  <h2 className="text-3xl md:text-4xl font-light text-white mb-6 tracking-tight">
                    {project.title}
                  </h2>

                  <p className="text-neutral-400 leading-relaxed font-light mb-8">
                    {project.description}
                  </p>

                  <div className="mb-10">
                    <h4 className="text-xs uppercase tracking-widest text-neutral-500 mb-4 font-semibold">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="text-xs font-mono text-neutral-300 bg-white/5 border border-white/5 rounded px-3 py-1.5">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 bg-white text-black py-4 rounded-xl font-semibold hover:bg-[#E8D8EE] transition-colors cursor-hover-target"
                    >
                      <RiExternalLinkLine size={18} />
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-14 h-14 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white hover:text-black transition-colors cursor-hover-target"
                    >
                      <RiGithubFill size={22} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
