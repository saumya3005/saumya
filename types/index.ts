export interface Project {
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  liveLink?: string;
  githubLink?: string;
  isWinner?: boolean;
}

export interface Experience {
  company: string;
  role: string;
  duration: string;
  location: string;
  type: string;
  highlights: string[];
}

export interface SkillGroup {
  category: string;
  items: string[];
}
