'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { RiGithubFill, RiStarLine, RiGitRepositoryLine, RiGitCommitLine, RiCodeLine } from 'react-icons/ri';

type Repo = {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  updated_at: string;
};

export default function GithubSection() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [stats, setStats] = useState({ followers: 0, public_repos: 0 });
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  useEffect(() => {
    async function fetchGithubData() {
      try {
        // Fetch User Stats
        const userRes = await fetch('https://api.github.com/users/saumya3005');
        const userData = await userRes.json();
        setStats({ followers: userData.followers, public_repos: userData.public_repos });

        // Fetch Repos
        const reposRes = await fetch('https://api.github.com/users/saumya3005/repos?sort=updated&per_page=4');
        const reposData = await reposRes.json();
        setRepos(reposData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
        setLoading(false);
      }
    }
    fetchGithubData();
  }, []);

  return (
    <section id="github" className="py-24 sm:py-32 relative z-10 border-t border-accent-copper/20 bg-luxury-bg overflow-hidden">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-950 to-zinc-950 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10" ref={containerRef}>
        
        {/* Header */}
        <div className="mb-20 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-16 h-16 rounded-full glass-panel flex items-center justify-center mb-6 text-white border border-accent-copper/25"
          >
            <RiGithubFill size={36} />
          </motion.div>
          
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 0.8, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-mono tracking-[0.2em] uppercase text-secondary-text"
          >
            07 // Open Source
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mt-4"
          >
            GitHub <span className="text-secondary-text">Activity</span>
          </motion.h2>
        </div>

        <motion.div style={{ y }} className="flex flex-col gap-16">
          
          {/* Top Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Repositories", value: stats.public_repos || "25+", icon: <RiGitRepositoryLine size={20} /> },
              { label: "Total Commits", value: "1.2k+", icon: <RiGitCommitLine size={20} /> },
              { label: "Followers", value: stats.followers || "50+", icon: <RiStarLine size={20} /> },
              { label: "Lines of Code", value: "500k+", icon: <RiCodeLine size={20} /> }
            ].map((stat, idx) => (
              <div key={idx} className="p-6 rounded-2xl glass-panel border border-accent-copper/20 flex flex-col items-center text-center group hover:border-white/20 transition-colors">
                <div className="text-secondary-text mb-3 group-hover:text-white transition-colors">{stat.icon}</div>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs font-mono uppercase tracking-widest text-zinc-600">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Contributions Graph */}
          <div className="p-8 rounded-3xl glass-panel border border-accent-copper/20 overflow-hidden relative group">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <RiGitCommitLine className="text-accent-copper" /> Contribution Graph
            </h3>
            <div className="w-full overflow-x-auto hide-scrollbar pb-4">
              {/* GHChart API renders an SVG of the contribution graph */}
              <img 
                src="https://ghchart.rshah.org/saumya3005" 
                alt="Saumya's Github Chart" 
                className="w-full min-w-150 brightness-125 contrast-125 hue-rotate-15 opacity-80 group-hover:opacity-100 transition-opacity duration-500"
              />
            </div>
            {/* Overlay to blend the image perfectly into the dark theme */}
            <div className="absolute inset-0 bg-luxury-bg/20 pointer-events-none" />
          </div>

          {/* Live Recent Repos */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <RiGitRepositoryLine className="text-accent-bronze" /> Recent Activity
              </h3>
              <a href="https://github.com/saumya3005" target="_blank" rel="noreferrer" className="text-sm font-mono text-secondary-text hover:text-white transition-colors">
                View All Repos →
              </a>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {loading ? (
                [1, 2, 3, 4].map(i => (
                  <div key={i} className="h-32 rounded-2xl glass-panel border border-accent-copper/20 animate-pulse bg-white/5" />
                ))
              ) : (
                repos.map((repo) => (
                  <a 
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-6 rounded-2xl glass-panel border border-accent-copper/20 hover:border-white/20 transition-all hover:-translate-y-1 hover:shadow-xl group flex flex-col h-full"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-lg font-bold text-white group-hover:text-accent-bronze transition-colors truncate pr-4">
                        {repo.name}
                      </h4>
                      <div className="flex items-center gap-1 text-secondary-text text-sm">
                        <RiStarLine /> {repo.stargazers_count}
                      </div>
                    </div>
                    <p className="text-sm text-secondary-text mb-4 line-clamp-2 font-light flex-1">
                      {repo.description || "No description provided."}
                    </p>
                    <div className="flex items-center justify-between text-xs font-mono text-zinc-600 mt-auto pt-4 border-t border-accent-copper/20">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-accent-bronze" />
                        {repo.language || "Markdown"}
                      </span>
                      <span>Updated {new Date(repo.updated_at).toLocaleDateString()}</span>
                    </div>
                  </a>
                ))
              )}
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
