import React, { useRef } from "react";
import PropTypes from "prop-types";
import { motion, useInView } from "framer-motion";
import { TECH_DOMAIN_SHAPE } from "@/shared/types";

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
  };

  if (name === "C#") {
    return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' fill='none'%3E%3Crect width='64' height='64' rx='16' fill='%23111111'/%3E%3Cpath d='M24 22h2.5l-1.4 4h4.2l1.4-4h2.5l-1.4 4h3.8v2.3h-4.6l-1.4 4h4.2v2.3h-5l-1.4 4h-2.5l1.4-4h-4.2l-1.4 4H20l1.4-4h-3.8v-2.3h4.6l1.4-4h-4.2V26h5l1.4-4Zm2 6.3-1.4 4h4.2l1.4-4H26Zm14.2-6.3h2.4l-1 2.8h2.3l1-2.8h2.4l-1 2.8H48v2h-2.3l-.8 2.2H48v2h-3l-1 2.8h-2.4l1-2.8h-2.3l-1 2.8h-2.4l1-2.8H36v-2h2.3l.8-2.2H36v-2h3l1-2.8Zm1.6 4.8-.8 2.2h2.3l.8-2.2h-2.3Z' fill='%23ffffff'/%3E%3C/svg%3E";
  }

  const slug = mapping[name] || name.toLowerCase().replace(/[\s./]/g, "");
  return `https://cdn.simpleicons.org/${slug}`;
};

const Tag = ({ tech }) => {
  // Common technologies that have black logos and need inverting in dark mode
  const naturallyDark = [
    "Next.js",
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
      whileHover={{
        scale: 1.05,
        backgroundColor: "var(--aura-1)",
        borderColor: "var(--primary)",
      }}
      className="group/tag flex items-center gap-2 px-4 py-2 rounded-full border border-border/60 text-sm md:text-base font-medium tracking-tight whitespace-nowrap transition-all duration-300 backdrop-blur-sm cursor-default"
    >
      <img
        src={getTechLogo(tech)}
        alt={`${tech} logo`}
        className={`w-4 h-4 md:w-5 md:h-5 object-contain grayscale opacity-40 group-hover/tag:grayscale-0 group-hover/tag:opacity-100 transition-all duration-500 
          ${isDarkTech ? "dark:brightness-0 dark:invert group-hover/tag:dark:brightness-0 group-hover/tag:dark:invert" : "dark:brightness-100 dark:invert-0"}
        `}
        style={
          isDarkTech
            ? { filter: "var(--logo-filter, grayscale(1) opacity(0.4))" }
            : {}
        }
        onError={(e) => (e.target.style.display = "none")}
      />
      <span className="group-hover/tag:text-primary transition-colors duration-300">
        {tech}
      </span>
    </motion.span>
  );
};

const DomainCard = ({ title, techs, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="group relative border-b border-border/40 py-12 md:py-20 first:border-t"
    >
      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-12">
        <div className="max-w-xl">
          <h3 className="text-5xl md:text-6xl font-serif italic tracking-tighter leading-none mb-6 group-hover:text-primary transition-colors duration-500">
            {title}
          </h3>
          <p className="text-on-surface-variant font-light text-lg opacity-40 group-hover:opacity-80 transition-opacity duration-500">
            Spearheading complex architectures and refined user experiences in
            the {title.toLowerCase()} ecosystem.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 md:max-w-md justify-start md:justify-end">
          {techs.map((tech, i) => (
            <motion.div key={i} variants={tagVariants}>
              <Tag tech={tech} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Aura hover glow */}
      <div className="absolute inset-x-0 -bottom-[1px] h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000" />
    </motion.div>
  );
};

export const TechStack = ({ data = [] }) => {
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

  return (
    <section
      className="py-24 md:py-32 px-6 md:px-12 bg-background relative overflow-hidden"
      id="tech-stack"
    >
      <div className="max-w-7xl mx-auto">
        <header className="mb-20 md:mb-32">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 0.4, x: 0 }}
            viewport={{ once: true }}
            className="section-label mb-4 block"
          >
            Software Domains
          </motion.span>
          <h2 className="text-5xl md:text-7xl font-heading leading-[0.9] tracking-tight">
            Specialized in <br /> Modern Verticals.
          </h2>
        </header>

        <div className="flex flex-col">
          {domains.map((domain, index) => (
            <DomainCard
              key={index}
              title={domain.category}
              techs={domain.items}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-border/10 to-transparent pointer-events-none" />
    </section>
  );
};

TechStack.propTypes = {
  data: PropTypes.arrayOf(TECH_DOMAIN_SHAPE),
};

TechStack.defaultProps = {
  data: [],
};
