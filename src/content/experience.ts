import type { Experience } from "@/lib/types";

export const experiences: Experience[] = [
  {
    id: "sagescale",
    company: "SageScale Solutions LLP",
    role: "Software Engineering Intern / Network Engineering",
    period: "Dec 2025 – Present",
    description:
      "Building browser automation infrastructure and real-time backend systems with AI-powered DOM intelligence. Managing Linux and network environments for scalable deployments.",
    highlights: [
      "Built a browser automation engine handling 500+ daily headless sessions with real-time WebSocket relay for DOM streaming and state sync.",
      "Developed AI-driven DOM mapping that auto-classifies page regions using transformer embeddings — reducing manual selectors by 60%.",
      "Designed a WebSocket-based backend in Node.js supporting 10k+ concurrent connections for live session mirroring and debugging.",
      "Administered Linux servers with custom networking configurations, VLAN segmentation, and firewall policies to isolate automation workers.",
    ],
    tags: [
      "Playwright",
      "Node.js",
      "WebSockets",
      "AI / ML",
      "Docker",
      "Linux",
      "Networking",
    ],
  },
  {
    id: "naukri-safar",
    company: "Naukri Safar / Spandan",
    role: "Full Stack Developer Intern / Systems Engineer Intern",
    period: "Apr 2024 – May 2025",
    description:
      "Delivered full-stack platform features and APIs that drove 2× organic traffic growth. Simultaneously managed Linux server infrastructure and network administration.",
    highlights: [
      "Implemented a full-stack job platform with role-based dashboards, resume parsing, and automated email workflows — serving 10k+ monthly users.",
      "Developed RESTful APIs with FastAPI and PostgreSQL, cutting average response times by 35% through query optimization and caching strategies.",
      "Executed an SEO overhaul (structured data, SSR, sitemap optimization) that increased organic traffic from 8k to 16k monthly visits within four months.",
      "Managed Ubuntu servers, DNS zones, Apache virtual hosts, and DHCP scopes — achieving 99.8% uptime across staging and production environments.",
    ],
    tags: [
      "FastAPI",
      "React.js",
      "PostgreSQL",
      "REST APIs",
      "SEO",
      "Linux",
      "Apache",
      "DNS",
    ],
  },
];
