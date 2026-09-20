export interface Project {
  id: string;
  title: string;
  description: string;
  problem: string;
  solution: string;
  tags: string[];
  image?: string;
  liveUrl?: string;
  repoUrl?: string;
}

export interface Skill {
  name: string;
  category:
    | "fullstack"
    | "backend"
    | "ai-rag"
    | "cloud-devops"
    | "linux-systems"
    | "security"
    | "mobile";
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: "achievement" | "certification";
  icon?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
  tags: string[];
}

