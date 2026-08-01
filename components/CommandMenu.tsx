'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiSearchLine, RiFileTextLine, RiMailLine, RiCodeLine, RiGithubLine, RiBrainLine, RiArrowRightSLine, RiCloseLine } from 'react-icons/ri';

const COMMANDS = [
  { id: 'home', title: 'Home', section: 'Navigation', icon: <RiArrowRightSLine />, action: () => window.location.hash = '#hero' },
  { id: 'why-hire-me', title: 'Why Hire Me', section: 'Navigation', icon: <RiArrowRightSLine />, action: () => window.location.hash = '#about' },
  { id: 'projects', title: 'Featured Projects', section: 'Navigation', icon: <RiArrowRightSLine />, action: () => window.location.hash = '#projects' },
  { id: 'skills', title: 'Skills & Stack', section: 'Navigation', icon: <RiArrowRightSLine />, action: () => window.location.hash = '#skills' },
  { id: 'resume', title: 'Download Resume', section: 'Actions', icon: <RiFileTextLine />, action: () => window.open('/Assets/Saumyaresume2026updated.pdf', '_blank') },
  { id: 'github', title: 'GitHub Profile', section: 'Actions', icon: <RiGithubLine />, action: () => window.open('https://github.com/saumya3005', '_blank') },
  { id: 'contact', title: 'Send Email', section: 'Actions', icon: <RiMailLine />, action: () => window.location.href = 'mailto:saumya@example.com' },
];

export default function CommandMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredCommands = COMMANDS.filter((cmd) => 
    cmd.title.toLowerCase().includes(query.toLowerCase())
  );

  const sections = Array.from(new Set(filteredCommands.map(c => c.section)));

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-none"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-xl overflow-hidden rounded-2xl glass-panel border border-white/10 shadow-2xl flex flex-col max-h-[80vh]"
            >
              <div className="flex items-center px-4 py-4 border-b border-white/10 gap-3">
                <RiSearchLine className="text-zinc-400" size={20} />
                <input
                  type="text"
                  placeholder="Type a command or search..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-zinc-100 placeholder-zinc-500 font-mono text-sm"
                  autoFocus
                />
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-md hover:bg-white/10 text-zinc-400 transition-colors cursor-none magnetic-target"
                >
                  <RiCloseLine size={20} />
                </button>
              </div>

              <div className="overflow-y-auto p-4 flex-1 custom-scrollbar">
                {sections.length === 0 ? (
                  <div className="text-center py-8 text-zinc-500 font-mono text-sm">
                    No results found.
                  </div>
                ) : (
                  sections.map((section) => (
                    <div key={section} className="mb-6 last:mb-0">
                      <div className="px-2 text-xs font-mono uppercase text-zinc-500 tracking-wider mb-2">
                        {section}
                      </div>
                      <div className="flex flex-col gap-1">
                        {filteredCommands
                          .filter((cmd) => cmd.section === section)
                          .map((cmd) => (
                            <button
                              key={cmd.id}
                              onClick={() => {
                                cmd.action();
                                setIsOpen(false);
                              }}
                              className="w-full text-left flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/10 text-zinc-300 hover:text-white transition-colors cursor-none magnetic-target group"
                            >
                              <div className="text-accent-purple group-hover:text-accent-cyan transition-colors">
                                {cmd.icon}
                              </div>
                              <span className="font-medium text-sm">{cmd.title}</span>
                            </button>
                          ))}
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="px-4 py-3 border-t border-white/10 bg-black/20 flex items-center justify-between text-xs font-mono text-zinc-500">
                <div className="flex items-center gap-2">
                  <span>Navigate</span>
                  <span className="px-1.5 py-0.5 rounded-md bg-white/10 border border-white/5">↑↓</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Select</span>
                  <span className="px-1.5 py-0.5 rounded-md bg-white/10 border border-white/5">Enter</span>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
