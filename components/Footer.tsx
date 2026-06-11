'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { RiGithubLine, RiLinkedinLine, RiArrowUpLine } from 'react-icons/ri';

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

const MARQUEE_TEXT = 'SAUMYA AGRAHARI \u2736 FULL STACK DEVELOPER \u2736 AI/ML ENGINEER \u2736 OPEN SOURCE \u2736 HACKATHON WINNER \u2736 ';

export default function Footer() {
  const [year, setYear] = React.useState(2026);

  React.useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative bg-zinc-950 border-t border-white/5 overflow-hidden">

      {/* ── Marquee Strip ── */}
      <div className="marquee-wrapper border-y border-white/5 bg-yellow-500/4 py-4 overflow-hidden cursor-default">
        <div className="flex whitespace-nowrap">
          {/* Duplicate text so the seamless loop works at any viewport width */}
          <span className="animate-marquee inline-flex gap-0 text-2xl sm:text-3xl font-black tracking-tight text-yellow-400/20 select-none">
            {MARQUEE_TEXT.repeat(4)}
          </span>
          <span className="animate-marquee inline-flex gap-0 text-2xl sm:text-3xl font-black tracking-tight text-yellow-400/20 select-none" aria-hidden="true">
            {MARQUEE_TEXT.repeat(4)}
          </span>
        </div>
      </div>

      {/* ── Main Footer Content ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">

          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <button
              onClick={scrollToTop}
              className="text-2xl font-black tracking-tighter text-white hover:text-yellow-400 transition-colors text-left"
            >
              SAUMYA AGRAHARI
            </button>
            <p className="text-zinc-500 text-sm font-light leading-relaxed max-w-55">
              Building modern, intelligent, and visually stunning digital experiences.
            </p>
            <div className="flex items-center gap-3 mt-2">
              <motion.a
                href="https://github.com/saumya1st"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-9 h-9 flex items-center justify-center rounded-full border border-white/10 text-zinc-500 hover:text-white hover:border-white/30 transition-all duration-300"
              >
                <RiGithubLine size={18} />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/saumyaagrahari"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-9 h-9 flex items-center justify-center rounded-full border border-white/10 text-zinc-500 hover:text-blue-400 hover:border-blue-400/30 transition-all duration-300"
              >
                <RiLinkedinLine size={18} />
              </motion.a>
            </div>
          </div>

          {/* Nav Links Column */}
          <div className="flex flex-col gap-4">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-600">
              Navigation
            </span>
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="group flex items-center gap-2 text-zinc-500 hover:text-white transition-colors duration-300 text-sm"
                  >
                    <span className="w-3 h-px bg-zinc-700 group-hover:w-5 group-hover:bg-yellow-400 transition-all duration-300" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / CTA Column */}
          <div className="flex flex-col gap-4">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-600">
              Let&apos;s Work Together
            </span>
            <a
              href="mailto:saumyaagrahari262730@gmail.com"
              className="group text-zinc-400 hover:text-yellow-400 transition-colors text-sm font-light break-all"
            >
              saumyaagrahari262730@gmail.com
            </a>
            <button
              onClick={() => scrollTo('#contact')}
              className="group mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-yellow-400/30 text-yellow-400 text-sm font-medium transition-all duration-300 hover:bg-yellow-400/10 hover:border-yellow-400/60 w-fit"
            >
              Start a Project
              <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
            </button>
          </div>

        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-zinc-600 text-xs font-mono">
            © {year} Saumya Agrahari. All rights reserved.
          </span>
          <div className="flex items-center gap-6">
            <span className="text-zinc-700 text-xs font-mono">
              Designed &amp; Built by Saumya
            </span>
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="group w-9 h-9 flex items-center justify-center rounded-full border border-white/10 text-zinc-600 hover:text-yellow-400 hover:border-yellow-400/30 transition-all duration-300 hover:-translate-y-1"
            >
              <RiArrowUpLine size={16} />
            </button>
          </div>
        </div>
      </div>

    </footer>
  );
}
