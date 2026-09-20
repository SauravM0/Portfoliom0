import type { Skill } from "@/lib/types";

export const SKILL_CATEGORIES = [
  {
    id: "fullstack" as const,
    label: "Full Stack",
    description: "Building end-to-end web applications with modern frameworks.",
    color: "primary" as const,
  },
  {
    id: "backend" as const,
    label: "Backend",
    description: "Scalable server-side systems and APIs.",
    color: "secondary" as const,
  },
  {
    id: "ai-rag" as const,
    label: "AI / RAG",
    description: "LLM integration, retrieval-augmented generation & AI agents.",
    color: "accent" as const,
  },
  {
    id: "cloud-devops" as const,
    label: "Cloud & DevOps",
    description: "Infrastructure, containerization & CI/CD pipelines.",
    color: "orange" as const,
  },
  {
    id: "linux-systems" as const,
    label: "Linux & Systems",
    description: "System administration, networking & server management.",
    color: "rose" as const,
  },
  {
    id: "security" as const,
    label: "Security",
    description: "Threat detection, cryptography & network defense.",
    color: "amber" as const,
  },
  {
    id: "mobile" as const,
    label: "Mobile",
    description: "Cross-platform apps with Flutter & Firebase.",
    color: "teal" as const,
  },
] as const;

export const skills: Skill[] = [
  // ─── Full Stack ───
  { name: "React.js", category: "fullstack" },
  { name: "Next.js", category: "fullstack" },
  { name: "Redux", category: "fullstack" },
  { name: "Tailwind CSS", category: "fullstack" },
  { name: "REST APIs", category: "fullstack" },

  // ─── Backend ───
  { name: "FastAPI", category: "backend" },
  { name: "Node.js", category: "backend" },
  { name: "PostgreSQL", category: "backend" },
  { name: "MySQL", category: "backend" },
  { name: "Microservices", category: "backend" },

  // ─── AI / RAG ───
  { name: "LLM Integration", category: "ai-rag" },
  { name: "LangChain", category: "ai-rag" },
  { name: "RAG Pipelines", category: "ai-rag" },
  { name: "Vector Databases", category: "ai-rag" },

  // ─── Cloud & DevOps ───
  { name: "AWS EC2 / S3 / IAM", category: "cloud-devops" },
  { name: "Docker", category: "cloud-devops" },
  { name: "Kubernetes", category: "cloud-devops" },
  { name: "CI / CD", category: "cloud-devops" },

  // ─── Linux & Systems ───
  { name: "Linux Internals", category: "linux-systems" },
  { name: "Networking", category: "linux-systems" },
  { name: "DNS & DHCP", category: "linux-systems" },
  { name: "Apache", category: "linux-systems" },

  // ─── Security ───
  { name: "YARA", category: "security" },
  { name: "AES-GCM", category: "security" },
  { name: "Firewalls", category: "security" },
  { name: "VPN Concepts", category: "security" },

  // ─── Mobile ───
  { name: "Flutter", category: "mobile" },
  { name: "Dart", category: "mobile" },
  { name: "Firebase", category: "mobile" },
  { name: "Android Development", category: "mobile" },
];
