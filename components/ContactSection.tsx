'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  RiGithubLine,
  RiLinkedinLine,
  RiInstagramLine,
  RiMailLine,
  RiWhatsappLine,
  RiArrowRightUpLine,
  RiDownloadLine,
  RiMapPinLine,
} from 'react-icons/ri';

const SOCIALS = [
  {
    icon: <RiGithubLine size={20} />,
    href: "https://github.com/saumya3005",
    label: "GitHub",
    hoverClass: "hover:border-white/30 hover:text-white hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]",
  },
  {
    icon: <RiLinkedinLine size={20} />,
    href: "https://www.linkedin.com/in/saumya-agrahari-924900347",
    label: "LinkedIn",
    hoverClass: "hover:border-blue-400/40 hover:text-blue-400 hover:shadow-[0_0_20px_rgba(96,165,250,0.2)]",
  },
  {
    icon: <RiInstagramLine size={20} />,
    href: "https://www.instagram.com/saumyaagrahari._",
    label: "Instagram",
    hoverClass: "hover:border-pink-400/40 hover:text-pink-400 hover:shadow-[0_0_20px_rgba(244,114,182,0.2)]",
  },
  {
    icon: <RiMailLine size={20} />,
    href: "mailto:saumyaagrahari262730@gmail.com",
    label: "Email",
    hoverClass: "hover:border-yellow-400/40 hover:text-yellow-400 hover:shadow-[0_0_20px_rgba(250,204,21,0.2)]",
  },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const yShift = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const [formState, setFormState] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, message } = formState;

    const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    window.open(`mailto:asaumya25@gmail.com?subject=${subject}&body=${body}`, '_self');
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 sm:py-36 bg-luxury-bg text-white border-t border-accent-copper/20 overflow-hidden"
    >
      {/* Large background "CONNECT" text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span
          className="text-[18vw] font-black tracking-tighter whitespace-nowrap"
          style={{ color: 'transparent', WebkitTextStroke: '1px rgba(250,204,21,0.06)' }}
        >
          CONNECT
        </span>
      </div>

      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-150 h-100 bg-yellow-500/5 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        style={{ y: yShift }}
        className="max-w-7xl mx-auto px-6 md:px-12 relative z-10"
      >
        {/* Section Header */}
        <div className="mb-16 md:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 0.6, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-mono tracking-[0.2em] uppercase text-yellow-500"
          >
            05 // Contact
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter mt-4 leading-none"
          >
            Let&apos;s Talk.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-secondary-text font-light text-lg max-w-md"
          >
            Open for roles, freelance projects, and exciting collaborations. Drop a message and I&apos;ll get back to you soon.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* LEFT — Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <form
              onSubmit={handleSubmit}
              className="glass-panel rounded-3xl p-8 sm:p-10 border border-accent-copper/20 flex flex-col gap-5"
            >
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-name" className="text-xs font-mono uppercase tracking-widest text-secondary-text">
                  Name *
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your full name"
                  value={formState.name}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-email" className="text-xs font-mono uppercase tracking-widest text-secondary-text">
                  Email *
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={formState.email}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-message" className="text-xs font-mono uppercase tracking-widest text-secondary-text">
                  Message *
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  required
                  placeholder="Tell me about your project..."
                  value={formState.message}
                  onChange={handleChange}
                  className="form-input resize-none"
                />
              </div>

              <button
                type="submit"
                className="group relative mt-2 flex items-center justify-center gap-3 px-8 py-4 bg-yellow-500 text-zinc-950 rounded-full font-semibold text-base overflow-hidden transition-all duration-300 hover:bg-yellow-400 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(250,204,21,0.35)] active:scale-95"
              >
                <span>Send Message</span>
                <RiArrowRightUpLine
                  size={20}
                  className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                />
              </button>
            </form>
          </motion.div>

          {/* RIGHT — Info & Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between gap-10"
          >
            {/* Direct Contact */}
            <div className="flex flex-col gap-5">
              <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-secondary-text">
                Direct Contact
              </h3>

              <a
                href="mailto:saumyaagrahari262730@gmail.com"
                className="group flex items-center gap-4 text-ivory hover:text-yellow-400 transition-colors duration-300"
              >
                <div className="w-10 h-10 rounded-full border border-accent-copper/25 flex items-center justify-center text-secondary-text group-hover:border-yellow-400/30 group-hover:text-yellow-400 transition-all duration-300">
                  <RiMailLine size={18} />
                </div>
                <span className="text-sm sm:text-base font-light">saumyaagrahari262730@gmail.com</span>
              </a>

              {/* Location */}
              <div className="flex items-center gap-4 text-secondary-text">
                <div className="w-10 h-10 rounded-full border border-accent-copper/25 flex items-center justify-center text-secondary-text">
                  <RiMapPinLine size={18} />
                </div>
                <span className="text-sm sm:text-base font-light">Prayagraj, Uttar Pradesh, India</span>
              </div>

              {/* WhatsApp Button */}
              <a
                href="https://wa.me/918318286501"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-6 py-3 rounded-full border border-green-500/30 text-green-400 text-sm font-medium transition-all duration-300 hover:bg-green-500/10 hover:border-green-400/50 hover:shadow-[0_0_20px_rgba(34,197,94,0.2)] hover:scale-[1.02] w-fit"
              >
                <RiWhatsappLine size={20} className="group-hover:scale-110 transition-transform" />
                Message on WhatsApp
              </a>

              {/* Resume Download */}
              <a
                href="/Saumya_Agrahari_Resume.pdf"
                download
                className="group inline-flex items-center gap-3 px-6 py-3 rounded-full glass-panel border border-accent-copper/25 text-ivory text-sm font-medium transition-all duration-300 hover:border-yellow-400/40 hover:text-yellow-400 hover:shadow-[0_0_20px_rgba(250,204,21,0.15)] hover:scale-[1.02] w-fit"
              >
                <RiDownloadLine size={18} className="group-hover:-translate-y-0.5 transition-transform" />
                Download Resume
              </a>
            </div>

            {/* Social Links */}
            <div className="flex flex-col gap-5">
              <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-secondary-text">
                Find Me Online
              </h3>
              <div className="flex items-center gap-3 flex-wrap">
                {SOCIALS.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    whileHover={{ y: -4, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-12 h-12 flex items-center justify-center rounded-full border border-accent-copper/25 text-secondary-text transition-all duration-300 ${social.hoverClass}`}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
              <p className="text-zinc-600 text-xs font-mono">
                Currently available for new opportunities — let&apos;s build something great.
              </p>
            </div>

            {/* Decorative stat */}
            <div className="glass-panel rounded-2xl p-6 border border-accent-copper/20 group hover:border-yellow-400/20 transition-colors duration-300">
              <div className="text-4xl font-black tracking-tighter text-white mb-1">
                &lt; 24h
              </div>
              <div className="text-sm text-secondary-text font-mono uppercase tracking-widest">
                Average Response Time
              </div>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
