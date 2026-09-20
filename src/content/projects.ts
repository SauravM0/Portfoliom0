import type { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    id: "interview-ai-agent",
    title: "Interview AI Agent",
    description:
      "AI-powered interview automation platform using full-stack and AI agent architecture.",
    problem:
      "Manual interview preparation is time-consuming and lacks personalized, real-time feedback — candidates struggle to practice effectively without a simulated environment.",
    solution:
      "Built an AI agent that conducts mock interviews with adaptive questioning, evaluates responses via LLM scoring, and generates performance reports with improvement insights.",
    tags: [
      "Next.js",
      "FastAPI",
      "LangChain",
      "LLM Integration",
      "PostgreSQL",
      "WebSockets",
    ],
    repoUrl: "https://github.com/SauravM0/Interview-AI-Agent",
  },
  {
    id: "telematics-app",
    title: "Telematics App",
    description:
      "Real-time vehicle tracking and diagnostics app using Flutter, Firebase, IoT, and OBD-II.",
    problem:
      "Vehicle owners and fleet managers lack an affordable, real-time solution for tracking location, engine diagnostics, and driver behavior analytics.",
    solution:
      "Developed a cross-platform mobile app that reads OBD-II data via Bluetooth, streams telemetry to Firebase, and visualizes real-time location, speed, fuel usage, and fault codes.",
    tags: [
      "Flutter",
      "Dart",
      "Firebase",
      "IoT",
      "OBD-II",
      "Google Maps API",
      "Bluetooth",
    ],
    repoUrl: "https://github.com/SauravM0/Telematics_APP",
  },
  {
    id: "usb-keylogger",
    title: "USB Keylogger / Security Research Tool",
    description:
      "Security research and system-level monitoring project for understanding USB input interception.",
    problem:
      "Understanding USB-based input interception is critical for cybersecurity research, but existing tools are either closed-source or lack clear documentation for educational use.",
    solution:
      "Created an open-source research tool that captures and logs USB HID input events at the system level, with a focus on educational transparency and security awareness.",
    tags: [
      "C",
      "C++",
      "USB HID",
      "Linux Internals",
      "System Programming",
      "Security",
    ],
    repoUrl: "https://github.com/SauravM0/USB-keylogger-.git",
  },
  {
    id: "real-time-security-monitor",
    title: "Real-Time Security Monitor",
    description:
      "Network and system security monitoring dashboard with real-time threat detection and alerts.",
    problem:
      "Small to mid-size organizations lack affordable, real-time visibility into network anomalies, unauthorized access attempts, and system-level security events.",
    solution:
      "Built a lightweight monitoring system that captures network packets, parses system logs, and triggers real-time alerts via a web dashboard — with YARA-based pattern matching for threat identification.",
    tags: [
      "Python",
      "YARA",
      "WebSockets",
      "Linux",
      "Network Security",
      "Firewalls",
    ],
  },
  {
    id: "recruitment-ai-platform",
    title: "Recruitment AI Automation Platform",
    description:
      "AI-driven recruitment platform automating resume screening, candidate matching, and interview scheduling.",
    problem:
      "Recruiters spend 60% of their time manually screening resumes and scheduling interviews — leading to slow hiring cycles and biased candidate shortlisting.",
    solution:
      "Developed an end-to-end platform with AI-powered resume parsing, skill-matching algorithms, automated email workflows, and a kanban-style pipeline dashboard for recruitment teams.",
    tags: [
      "React.js",
      "FastAPI",
      "PostgreSQL",
      "LangChain",
      "RAG Pipelines",
      "Docker",
      "REST APIs",
    ],
  },
];
