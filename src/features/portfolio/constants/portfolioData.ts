import type { PortfolioData } from "@/shared/types";

export const portfolioData: PortfolioData = {
  hero: {
    name: "MD Nazrul Islam",
    email: "hello@mdnazrul.com",
    availability: "BASED IN DHAKA - AVAILABLE WORLDWIDE",
    navigation: [
      { label: "About", href: "#about" },
      { label: "Work", href: "#work" },
      { label: "Expertise", href: "#expertise" },
      { label: "Tech Stack", href: "#tech-stack" },
      { label: "Contact", href: "#contact" },
      { label: "Dashboard", href: "/dashboard", isRoute: true },
    ],
  },
  about: {
    scrubText:
      "I design and build polished digital products where motion, usability, and performance work together.",
    bioText:
      "Frontend-focused software developer crafting memorable interfaces and fast, accessible user experiences.",
    focusItems: [
      {
        title: "Product-Focused UI",
        description:
          "Designing clean interaction flows and expressive visual systems that support real user goals.",
      },
      {
        title: "Performance-First Frontend",
        description:
          "Building responsive React applications with careful rendering, animation, and loading strategies.",
      },
    ],
  },
  expertise: [
    {
      title: "Frontend Engineering",
      description:
        "Building scalable React interfaces with maintainable component architecture and strong UX fundamentals.",
      category: "Web",
    },
    {
      title: "Interaction Design",
      description:
        "Creating purposeful motion and tactile micro-interactions that improve clarity and delight.",
      category: "Design",
    },
    {
      title: "Design Systems",
      description:
        "Developing reusable UI patterns and tokens to keep products visually consistent and easy to evolve.",
      category: "System",
    },
    {
      title: "Accessibility",
      description:
        "Applying semantic structure, keyboard-friendly behavior, and readable contrast for inclusive interfaces.",
      category: "Quality",
    },
  ],
  techStack: [
    {
      category: "Frontend",
      items: [
        "React",
        "Next.js",
        "JavaScript",
        "Tailwind CSS",
        "Framer Motion",
      ],
    },
    {
      category: "Tooling",
      items: ["Vite", "ESLint", "Git", "Figma", "Netlify"],
    },
  ],
  testimonials: [
    {
      quote:
        "Nazrul combines product thinking and craft-level frontend execution better than most developers we have worked with.",
      author: "Product Lead",
      company: "Studio Partner",
    },
  ],
  projects: [
    {
      img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
      category: "SaaS",
      title: "FlowBoard",
      desc: "A focused analytics dashboard experience designed for clarity, speed, and confident decision making.",
      liveUrl: "#",
      status: "Published",
    },
    {
      img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop",
      category: "Fintech",
      title: "LedgerView",
      desc: "A clean finance interface that simplifies complex datasets through strong hierarchy and motion.",
      liveUrl: "#",
      status: "Draft",
    },
    {
      img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2672&auto=format&fit=crop",
      category: "Portfolio",
      title: "Northline Studio",
      desc: "A storytelling-first website system balancing typography, animation, and conversion-focused UX.",
      liveUrl: "#",
      status: "Published",
    },
  ],
};
