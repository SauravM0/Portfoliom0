export const BASE_PATH = "/Portfoliom0";

export const SITE = {
  name: "Saurav Madake",
  title: "Software Engineer | Full-Stack · Cloud · Linux & Systems",
  tagline: "Building AI-Powered, Production Grade Applications",
  url: "https://sauravmadake.dev",
  description:
    "Portfolio of Saurav Madake — Full-stack developer building AI-powered, production-grade applications.",
  locale: "en-US",
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Achievements", href: "#achievements" },
  { label: "Resume", href: "#resume" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const;

export const SOCIAL_LINKS = {
  github: "https://github.com/SauravM0",
  linkedin: "https://linkedin.com/in/sauravmadake",
  email: "sauravmadake890@gmail.com",
} as const;

export const HERO_CONTENT = {
  name: "Saurav Madake",
  title: "Software Engineer | Full-Stack · Cloud · Linux & Systems",
  tagline: "Building AI-Powered, Production Grade Applications",
  email: "sauravmadake890@gmail.com",
  resumeUrl: `${BASE_PATH}/resume.pdf`,
} as const;

export const ABOUT_CONTENT = {
  headline: "Computer Science Engineering Student · Aspiring Software Engineer",
  bio: [
    "I am a Computer Science Engineering student at MGM University with a CGPA of 8.16/10, driven by a passion for building robust, production-grade software. My expertise spans full-stack development, AI automation, cloud infrastructure, Linux systems, and mobile applications.",
    "I thrive on solving complex problems with clean architecture and modern tooling. From deploying scalable cloud services to building AI-powered features, I approach every project with an engineer's precision and a builder's creativity.",
    "I am actively seeking job and internship opportunities as a software engineer and am open to relocation. Whether it's crafting backend systems, automating workflows, or securing infrastructure, I am ready to contribute from day one.",
  ],
  highlights: [
    { label: "University CGPA", value: "8.16/10", icon: "academic" },
    { label: "Projects Delivered", value: "10+", icon: "code" },
    { label: "Internships Ready", value: "Active", icon: "stack" },
    { label: "Open to Work", value: "Now", icon: "opportunity" },
  ],
  focusAreas: [
    "Full-Stack Development",
    "AI & Automation",
    "Cloud Infrastructure",
    "Linux & Systems",
    "Cybersecurity",
    "Mobile Applications",
  ],
} as const;
