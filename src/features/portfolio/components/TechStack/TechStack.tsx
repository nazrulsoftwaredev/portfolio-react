import React, { useMemo } from "react";
import { motion } from "motion/react";
import { usePortfolioMotionSettings } from "../../hooks/usePortfolioMotionSettings";

const getTechLogo = (name) => {
  const mapping = {
    Kotlin: "kotlin",
    Java: "openjdk",
    SwiftUI: "swift",
    "Jetpack Compose": "jetpackcompose",
    "Spring Boot": "springboot",
    Ktor: "ktor",
    "Next.js": "nextdotjs",
    React: "react",
    "Node.js": "nodedotjs",
    Spring: "spring",
    Docker: "docker",
    Kubernetes: "kubernetes",
    AWS: "amazonwebservices",
    Firebase: "firebase",
    "Framer Motion": "framer",
  };

  if (name === "C#") {
    return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' fill='none'%3E%3Crect width='64' height='64' rx='16' fill='%23111111'/%3E%3Cpath d='M24 22h2.5l-1.4 4h4.2l1.4-4h2.5l-1.4 4h3.8v2.3h-4.6l-1.4 4h4.2v2.3h-5l-1.4 4h-2.5l1.4-4h-4.2l-1.4 4H20l1.4-4h-3.8v-2.3h4.6l1.4-4h-4.2V26h5l1.4-4Zm2 6.3-1.4 4h4.2l1.4-4H26Zm14.2-6.3h2.4l-1 2.8h2.3l1-2.8h2.4l-1 2.8H48v2h-2.3l-.8 2.2H48v2h-3l-1 2.8h-2.4l1-2.8h-2.3l-1 2.8h-2.4l1-2.8H36v-2h2.3l.8-2.2H36v-2h3l1-2.8Zm1.6 4.8-.8 2.2h2.3l.8-2.2h-2.3Z' fill='%23ffffff'/%3E%3C/svg%3E";
  }

  const slug = mapping[name] || name.toLowerCase().replace(/[\s./]/g, "");
  return `https://cdn.simpleicons.org/${slug}`;
};

const Tag = React.memo(({ tech, shouldUseEnhancedMotion }) => {
  /**
   * Avoid hover-toggling CSS filters on external SVGs (Simple Icons) because it
   * can cause rasterization flicker in some browsers, especially for dark-mode
   * inverted marks (e.g. Next.js). We keep the logo treatment stable and only
   * animate opacity/transform.
   */
  const naturallyDark = [
    "Next.js",
    "Vite",
    "C#",
    "Java",
    "Node.js",
    "GitHub",
    "Apple",
    "Netlify",
  ];
  const isDarkTech = naturallyDark.includes(tech);

  return (
    <motion.span
      whileHover={
        shouldUseEnhancedMotion
          ? {
              scale: 1.02,
              backgroundColor: "var(--aura-1)",
              borderColor: "var(--primary)",
            }
          : undefined
      }
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="group/tag flex items-center gap-2 px-4 py-2 rounded-full border border-border/60 text-sm md:text-base font-medium tracking-tight whitespace-nowrap transition-colors duration-300 cursor-default"
    >
      <img
        src={getTechLogo(tech)}
        alt={`${tech} logo`}
        width={20}
        height={20}
        fetchPriority="low"
        className={`w-4 h-4 md:w-5 md:h-5 object-contain opacity-50 group-hover/tag:opacity-100 transition-[opacity,transform] duration-300 will-change-transform ${
          isDarkTech ? "dark:brightness-0 dark:invert" : "dark:invert-0"
        }`}
        onError={(e) => (e.currentTarget.style.display = "none")}
        loading="lazy"
        decoding="async"
      />
      <span className="group-hover/tag:text-primary transition-colors duration-300">
        {tech}
      </span>
    </motion.span>
  );
});

const DomainCard = React.memo(({ title, techs, index, shouldUseEnhancedMotion }) => {

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1.0],
        staggerChildren: 0.05,
      },
    },
  };

  const tagVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      whileHover={shouldUseEnhancedMotion ? { y: -2 } : undefined}
      transition={{ type: "spring", stiffness: 260, damping: 26 }}
      className="group relative rounded-3xl border border-border/40 bg-surface/20 p-7 md:p-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.05] to-transparent pointer-events-none opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-primary/10 blur-[48px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      <div className="absolute -bottom-28 -left-28 w-72 h-72 rounded-full bg-aura-1/10 blur-[48px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      <div className="relative z-10 flex flex-col gap-8">
        <div className="flex items-start justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-bold tracking-[0.45em] uppercase opacity-30">
                0{index + 1}
              </span>
              <div className="w-10 h-px bg-border/60" />
              <span className="text-[10px] font-bold tracking-[0.45em] uppercase opacity-30">
                Software Domain
              </span>
            </div>
            <h3 className="text-3xl md:text-4xl font-heading tracking-tight leading-none group-hover:text-primary transition-colors duration-500">
              {title}
            </h3>
            <p className="text-on-surface-variant font-light text-base md:text-lg opacity-55 leading-relaxed max-w-xl">
              Purpose-built tooling with strong fundamentals: maintainability,
              performance, and crisp interfaces.
            </p>
          </div>

          <div className="hidden md:flex flex-col items-end gap-3 pt-2">
            <span className="text-[10px] font-bold tracking-[0.45em] uppercase opacity-25">
              {techs.length} Tools
            </span>
            <div className="w-14 h-14 rounded-full border border-border/40 bg-background/20 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity">
              <span className="text-xl font-serif italic text-primary">↗</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {techs.map((tech) => (
            <motion.div key={tech} variants={tagVariants}>
              <Tag tech={tech} shouldUseEnhancedMotion={shouldUseEnhancedMotion} />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute inset-x-10 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center" />
    </motion.div>
  );
});

export const TechStack = ({ data = [] }) => {
  const { shouldUseEnhancedMotion } = usePortfolioMotionSettings();
  const domains =
    data.length > 0
      ? data
      : [
          {
            category: "App Development",
            items: ["Kotlin", "Java", "C#", "SwiftUI", "Jetpack Compose"],
          },
          {
            category: "Web Development",
            items: ["Spring Boot", "Ktor", "Next.js", "React", "Node.js"],
          },
        ];

  const headline = useMemo(() => {
    const count = domains.reduce((acc, d) => acc + (d?.items?.length || 0), 0);
    return { count };
  }, [domains]);

  return (
    <section
      className="py-24 md:py-32 px-6 md:px-12 bg-background relative overflow-hidden"
      id="tech-stack"
    >
      <div className="max-w-7xl mx-auto">
        <header className="mb-14 md:mb-20">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 0.4, x: 0 }}
            viewport={{ once: true }}
            className="section-label mb-4 block"
          >
            Software Domains
          </motion.span>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="space-y-6">
              <h2 className="text-5xl md:text-7xl font-heading leading-[0.9] tracking-tight">
                Clean stacks. <br /> Real delivery.
              </h2>
              <p className="text-on-surface-variant text-lg font-light tracking-wide leading-relaxed opacity-55 max-w-2xl">
                A curated set of tools across domains — selected for speed,
                stability, and maintainable product evolution.
              </p>
            </div>
            <div className="hidden lg:flex items-center gap-10 text-[10px] font-bold uppercase tracking-[0.45em] opacity-30">
              <span>{domains.length} Domains</span>
              <div className="w-12 h-px bg-border/60" />
              <span>{headline.count} Tools</span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {domains.map((domain, index) => (
            <DomainCard
              key={domain.category}
              title={domain.category}
              techs={domain.items}
              index={index}
              shouldUseEnhancedMotion={shouldUseEnhancedMotion}
            />
          ))}
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute -top-40 right-0 w-1/3 h-1/3 bg-primary/[0.03] blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border/10 to-transparent pointer-events-none" />
    </section>
  );
};
