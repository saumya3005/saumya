'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiRobot2Line, RiCloseLine, RiSendPlaneLine, RiSparklingLine } from 'react-icons/ri';

// Hardcoded resume knowledge base for instant responses
const RESUME_KB: Record<string, string> = {
  skills: "Saumya's technical skills include:\n• Languages: Python, JavaScript, TypeScript, Java, C\n• Frontend: React.js, Next.js, Redux, Tailwind CSS\n• Backend: Node.js, Django, Flask, REST API Design, JWT\n• Databases: MySQL, PostgreSQL, Firebase Firestore\n• AI/ML: TensorFlow, Scikit-learn, XGBoost, OpenCV, MediaPipe\n• GenAI: Google Gemini API, LLM Integration, Prompt Engineering\n• Cloud: AWS (S3, EC2), GCP, Docker, GitHub Actions CI/CD\n• Testing: Jest, Pytest, TDD",
  
  experience: "Saumya has professional experience at:\n\n1. Prodesk IT, Noida — Backend Dev Intern (Aug 2025 – Present)\n   • 10+ REST APIs in Python/Django, 85%+ test coverage, 30% response time reduction\n   • Agile team of 6+ engineers, 3 production releases\n\n2. Code Resite — Web Dev Intern (Jun–Jul 2025)\n   • 5+ client projects, 40% fewer UI bugs, 35% faster page loads\n\n3. CodeAlpha — Full Stack Intern (Jun–Jul 2026)\n   • React.js full-stack apps, authentication, CRUD, REST APIs\n\n4. Hanuman Pushpavarsha — Freelance (Jan 2024 – Mar 2025)\n   • Bilingual Next.js/Firebase site, 500+ users, 60% admin overhead reduction, Razorpay payments",
  
  projects: "Featured projects:\n\n• SignSetu — AI Sign Language Platform (UHack 4.0 Winner, 1st/500+). TensorFlow CNN + MediaPipe, 91%+ accuracy, 5,000+ custom dataset, 24fps real-time.\n\n• Vynk — Social Networking Platform. React.js, Node.js, MongoDB, Socket.io real-time, JWT auth.\n\n• FlowSync — Project Management Tool. Trello-inspired, React.js, Express.js, MongoDB, role-based access.\n\n• Hanuman Pushpavarsha — Production freelance bilingual site, Next.js, Firebase, Razorpay, 500+ users.",
  
  education: "B.Tech — Artificial Intelligence & Machine Learning\nUnited University, Prayagraj (Aug 2023 – May 2027)\nCGPA: 8.4/10 | SGPA: 9.0\n\nCoursework: Machine Learning, Deep Learning, Computer Vision, DSA, DBMS, OS, Computer Networks, System Design, Agile Software Development",
  
  research: "Published researcher with Taylor & Francis Group:\n\n\"Multi-Class Anomaly Detection in Network Traffic Using Supervised Machine Learning\"\nAuthors: Saumya Agrahari, Ayush Tiwari, Priyanka\nConference: ICMLDE 2025 | AICCT-2025, Sept 2025\n\n• ML-based IDS on CIC UNSW-NB15 dataset (175,000+ records)\n• Benchmarked 4 models: Decision Tree, Random Forest, Logistic Regression, XGBoost\n• Achieved 93.78% accuracy with Precision, Recall, F1, ROC-AUC\n• Selected for international conference presentation",
  
  achievements: "• 🏆 Winner, UHack 4.0 — SignSetu, 1st/500+ participants\n• 🏆 Winner, Google Build with AI (GDG)\n• 🏆 Top 10 Finalist, NSUT National Hackathon, New Delhi\n• 📚 Taylor & Francis Research Publication\n• 🎤 Lead Organizer, HackDiwas 3.0 (500+ participants)\n• 🎤 TEDx United University Organizer\n• 🤝 GDG Prayagraj, Wikiclub tech, FOSS Prayagraj",
  
  contact: "📧 Email: saumyaagrahari262730@gmail.com\n📱 Phone: +91-8318286501\n📍 Location: Prayagraj, Uttar Pradesh\n🔗 LinkedIn: linkedin.com/in/saumya-agrahari\n💻 GitHub: github.com/saumya3005",
  
  about: "Saumya Agrahari is a final-year B.Tech (AI/ML) student at United University, Prayagraj. A published researcher with Taylor & Francis Group and 3x hackathon winner, experienced in building scalable REST APIs, AI/ML pipelines, and full-stack applications. Strong foundation in System Design, Agile/Scrum, and SDLC. Seeking SDE, Full Stack Developer, and AI/ML Engineer opportunities.",
  
  hire: "Why hire Saumya?\n\n✅ 3x Hackathon Winner (UHack 4.0 #1/500+, Google Build with AI, NSUT Top 10)\n✅ Published Researcher — Taylor & Francis, 93.78% accuracy ML model\n✅ Production Backend Experience — 10+ APIs, 85%+ test coverage at Prodesk IT\n✅ AI/ML + Full Stack — TensorFlow, React, Node.js, Django, Flask\n✅ Real-World Freelance — 500+ users, Razorpay, Firebase Auth RBAC\n✅ System Design & DevOps — Docker, AWS, CI/CD, Agile/Scrum"
};

function findBestResponse(query: string): string {
  const q = query.toLowerCase();
  
  // Direct keyword matching with priority
  if (q.includes('hire') || q.includes('why') && q.includes('me')) return RESUME_KB.hire;
  if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('language')) return RESUME_KB.skills;
  if (q.includes('experience') || q.includes('work') || q.includes('intern') || q.includes('job')) return RESUME_KB.experience;
  if (q.includes('project') || q.includes('signsetu') || q.includes('vynk') || q.includes('flowsync')) return RESUME_KB.projects;
  if (q.includes('education') || q.includes('degree') || q.includes('university') || q.includes('cgpa') || q.includes('college')) return RESUME_KB.education;
  if (q.includes('research') || q.includes('paper') || q.includes('publish') || q.includes('taylor')) return RESUME_KB.research;
  if (q.includes('achieve') || q.includes('award') || q.includes('hackathon') || q.includes('winner') || q.includes('uhack')) return RESUME_KB.achievements;
  if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('linkedin') || q.includes('github') || q.includes('reach')) return RESUME_KB.contact;
  if (q.includes('about') || q.includes('who') || q.includes('tell me') || q.includes('introduce') || q.includes('hello') || q.includes('hi')) return RESUME_KB.about;
  
  return "I can tell you about Saumya's skills, experience, projects, education, research, achievements, or contact info. What would you like to know?";
}

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function AiAssistantPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi! I'm Saumya's AI assistant. Ask me anything about his skills, projects, experience, or achievements. ✨" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsTyping(true);

    // Simulate brief thinking delay
    await new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 800));
    
    const response = findBestResponse(userMsg);
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsTyping(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-90 w-14 h-14 rounded-full bg-linear-to-br from-accent-copper to-accent-bronze flex items-center justify-center text-white shadow-2xl shadow-accent-copper/30 hover:shadow-accent-copper/50 transition-shadow cursor-none magnetic-target"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: "spring" }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <RiCloseLine size={24} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <RiRobot2Line size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-28 right-8 z-90 w-100 max-w-[calc(100vw-2rem)] h-130 rounded-3xl glass-panel border border-accent-copper/25 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-accent-copper/25 flex items-center gap-3 bg-black/20">
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-accent-copper to-accent-bronze flex items-center justify-center">
                <RiSparklingLine size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Saumya's AI Assistant</h3>
                <p className="text-xs text-secondary-text">Ask about skills, projects, or experience</p>
              </div>
              <div className="ml-auto flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-secondary-text">Online</span>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                      msg.role === 'user'
                        ? 'bg-accent-copper/30 border border-accent-copper/30 text-white rounded-br-md'
                        : 'bg-white/5 border border-accent-copper/25 text-ivory rounded-bl-md'
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/5 border border-accent-copper/25 px-4 py-3 rounded-2xl rounded-bl-md flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-accent-copper animate-bounce [animation-delay:0ms]" />
                    <div className="w-2 h-2 rounded-full bg-accent-copper animate-bounce [animation-delay:150ms]" />
                    <div className="w-2 h-2 rounded-full bg-accent-copper animate-bounce [animation-delay:300ms]" />
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-accent-copper/25 bg-black/20">
              <div className="flex items-center gap-2 bg-white/5 rounded-xl border border-accent-copper/25 px-4 py-2 focus-within:border-accent-copper/50 transition-colors">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Ask about Saumya..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent border-none outline-none text-sm text-zinc-100 placeholder-zinc-500"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="p-2 rounded-lg bg-accent-copper/30 text-accent-copper hover:bg-accent-copper/50 disabled:opacity-30 transition-all cursor-none magnetic-target"
                >
                  <RiSendPlaneLine size={16} />
                </button>
              </div>
              <p className="text-[10px] text-zinc-600 mt-2 text-center font-mono">
                Powered by resume knowledge • Try "What are his skills?"
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
