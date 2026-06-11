'use client';

import React, { useEffect, useRef } from 'react';

export default function OverlaySystem() {
  const block0Ref = useRef<HTMLDivElement>(null);
  const block1Ref = useRef<HTMLDivElement>(null);
  const block2Ref = useRef<HTMLDivElement>(null);
  const block3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const parent = document.getElementById('scrolly-container');
      if (!parent) return;

      const rect = parent.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));

      // Calculate styles for each block
      updateBlockStyle(block0Ref.current, progress, 0.0, 0.33, 0.08, 0.25);
      updateBlockStyle(block1Ref.current, progress, 0.33, 0.66, 0.41, 0.58);
      updateBlockStyle(block2Ref.current, progress, 0.66, 1.0, 0.74, 0.91);
    };

    const updateBlockStyle = (
      el: HTMLDivElement | null,
      progress: number,
      start: number,
      end: number,
      peakStart: number,
      peakEnd: number
    ) => {
      if (!el) return;

      if (progress < start || progress > end) {
        el.style.opacity = '0';
        el.style.pointerEvents = 'none';
        el.style.transform = 'translateY(40px) scale(0.95)';
        return;
      }

      let opacity = 0;
      if (progress >= start && progress < peakStart) {
        // Fade in
        opacity = (progress - start) / (peakStart - start);
      } else if (progress >= peakStart && progress <= peakEnd) {
        // Fully visible
        opacity = 1;
      } else if (progress > peakEnd && progress <= end) {
        // Fade out
        opacity = 1 - (progress - peakEnd) / (end - peakEnd);
      }

      // Smooth zero-gravity floating transform
      const rangeProgress = (progress - start) / (end - start);
      const translateY = 40 - rangeProgress * 80;
      const scale = 0.95 + opacity * 0.05;

      el.style.opacity = opacity.toFixed(3);
      el.style.pointerEvents = opacity > 0.2 ? 'auto' : 'none';
      el.style.transform = `translateY(${translateY.toFixed(1)}px) scale(${scale.toFixed(3)})`;
    };

    window.addEventListener('scroll', handleScroll);
    // Initial call
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-20 pointer-events-none">
      {/* Sticky container matching the Canvas viewport */}
      <div className="sticky top-0 left-0 w-full h-dvh flex items-center justify-center px-4 md:px-8 overflow-hidden pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
        
        {/* Block 0: Hero Block */}
        <div
          ref={block0Ref}
          className="absolute max-w-4xl text-center flex flex-col items-center justify-center transition-all duration-100 ease-out opacity-0 pointer-events-none"
        >
          <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-[#D0B1DD] mb-4 bg-[#BB8ECD]/10 px-3.5 py-1.5 rounded-full border border-[#D0B1DD]/15 backdrop-blur-xl shadow-[0_0_15px_rgba(208,177,221,0.05)] inline-block">
            Creative Developer & AI/ML Engineer
          </span>
          <h2 className="text-[clamp(1.75rem,6vw,4.5rem)] font-extralight tracking-tight text-white mb-4 sm:mb-6 leading-tight">
            Saumya Agrahari
          </h2>
          <p className="text-sm md:text-base text-neutral-300 font-light max-w-2xl leading-relaxed mb-6 sm:mb-8 px-4 sm:px-0">
            3x hackathon winner specializing in advanced Machine Learning models, Computer Vision, and highly scalable production backend architectures.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-[10px] font-mono text-neutral-500">
            <span>UHack 4.0 Champion (#1/500+)</span>
            <span className="text-neutral-700">•</span>
            <span>B.Tech AI/ML (CGPA: 8.4)</span>
          </div>
        </div>

        {/* Block 1: Experience Timeline */}
        <div
          ref={block1Ref}
          className="absolute max-w-4xl text-center flex flex-col items-center justify-center transition-all duration-100 ease-out opacity-0 pointer-events-none"
        >
          <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-[#E8D8EE] mb-4 bg-[#BB8ECD]/10 px-3.5 py-1.5 rounded-full border border-[#E8D8EE]/15 backdrop-blur-xl shadow-[0_0_15px_rgba(208,177,221,0.05)] inline-block">
            Professional Experience
          </span>
          <h2 className="text-[clamp(1.75rem,5vw,3.75rem)] font-extralight tracking-tight text-white mb-4 sm:mb-6 leading-tight">
            Engineering Production APIs
          </h2>
          <p className="text-sm md:text-base text-neutral-300 font-light max-w-2xl leading-relaxed mb-4 sm:mb-6 px-4 sm:px-0">
            Developing robust Django architectures as a Backend Intern at <span className="text-white">Prodesk IT</span> and building optimized full-stack systems serving hundreds of users in production.
          </p>
          <p className="text-xs text-neutral-400 max-w-xl mb-6 sm:mb-8 leading-relaxed px-4 sm:px-0">
            Optimized query performance by 25% and reduced backend response latencies by 30% through advanced indexing and structural schema updates.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5 text-[10px] font-mono text-neutral-400 px-4 sm:px-0">
            <span className="border border-[#E8D8EE]/10 bg-white/1 px-3 py-1 rounded-full">Python / Django</span>
            <span className="border border-[#E8D8EE]/10 bg-white/1 px-3 py-1 rounded-full">Node.js</span>
            <span className="border border-[#E8D8EE]/10 bg-white/1 px-3 py-1 rounded-full">MySQL</span>
          </div>
        </div>

        {/* Block 2: Key Hackathons */}
        <div
          ref={block2Ref}
          className="absolute max-w-4xl text-center flex flex-col items-center justify-center transition-all duration-100 ease-out opacity-0 pointer-events-none"
        >
          <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-[#BB8ECD] mb-4 bg-[#BB8ECD]/10 px-3.5 py-1.5 rounded-full border border-[#BB8ECD]/15 backdrop-blur-xl shadow-[0_0_15px_rgba(208,177,221,0.05)] inline-block">
            Hackathons & Innovation
          </span>
          <h2 className="text-[clamp(1.75rem,5vw,3.75rem)] font-extralight tracking-tight text-white mb-4 sm:mb-6 leading-tight">
            Award Winning AI Projects
          </h2>
          <p className="text-sm md:text-base text-neutral-300 font-light max-w-2xl leading-relaxed mb-4 sm:mb-6 px-4 sm:px-0">
            1st place at <span className="text-white font-normal">UHack 4.0</span> with SignSetu (AI Bidirectional Sign Language translation) and Google Developer Group's <span className="text-white font-normal">Build with AI Hackathon</span> with QuickSeva.
          </p>
          <p className="text-xs text-neutral-400 max-w-xl mb-6 sm:mb-8 leading-relaxed px-4 sm:px-0">
            Trained custom CNN model + MediaPipe pipeline for gesture recognition at 24 FPS with 91%+ gesture accuracy.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5 text-[10px] font-mono text-neutral-400 px-4 sm:px-0">
            <span className="border border-[#BB8ECD]/10 bg-white/1 px-3 py-1 rounded-full">Gemini API</span>
            <span className="border border-[#BB8ECD]/10 bg-white/1 px-3 py-1 rounded-full">MediaPipe</span>
            <span className="border border-[#BB8ECD]/10 bg-white/1 px-3 py-1 rounded-full">Docker</span>
          </div>
        </div>

      </div>
    </div>
  );
}
