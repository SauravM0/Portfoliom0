import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* ─── Production hardening ─── */
  poweredByHeader: false,
  reactStrictMode: true,

  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        {
          key: "X-Frame-Options",
          value: "DENY",
        },
        {
          key: "Referrer-Policy",
          value: "strict-origin-when-cross-origin",
        },
      ],
    },
    {
      source: "/resume.pdf",
      headers: [
        {
          key: "Content-Disposition",
          value: "inline",
        },
      ],
    },
  ],

  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
