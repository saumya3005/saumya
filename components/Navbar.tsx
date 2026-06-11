'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { RiMenuLine, RiCloseLine } from 'react-icons/ri';
import gsap from 'gsap';

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Hide navbar on scroll down, show on scroll up
    if (latest > 100) {
      setIsScrolled(true);
      if (latest > lastScrollY.current && !isMobileMenuOpen) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
    } else {
      setIsScrolled(false);
      setIsHidden(false);
    }
    lastScrollY.current = latest;
  });

  const scrollTo = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: isHidden ? -100 : 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'py-4 glass-panel border-b border-white/5' 
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          <div className="text-xl font-bold tracking-tighter text-white cursor-pointer hover:text-yellow-400 transition-colors" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            SAUMYA
          </div>

          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <button
                  onClick={() => scrollTo(link.href)}
                  className="relative text-sm font-medium tracking-wide text-zinc-300 hover:text-yellow-400 transition-colors duration-300 group"
                >
                  {link.label}
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full" />
                </button>
              </li>
            ))}
          </ul>

          <button 
            className="md:hidden text-zinc-300 hover:text-yellow-400 transition-colors p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <RiCloseLine size={28} /> : <RiMenuLine size={28} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-zinc-950/95 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  onClick={() => scrollTo(link.href)}
                  className="text-4xl sm:text-5xl font-light tracking-tight text-white hover:text-yellow-400 transition-colors"
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
