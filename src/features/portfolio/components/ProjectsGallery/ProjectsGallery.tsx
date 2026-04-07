import React, { useRef } from "react";
import PropTypes from "prop-types";
import { motion, useScroll, useTransform } from "framer-motion";
import { Magnetic } from "@/features/portfolio/components/Magnetic";
import { PROJECT_GALLERY_ITEM_SHAPE } from "@/shared/types";

const ProjectCard = ({ project, index }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Deep Parallax: Image and Text move in opposing directions slightly
  const textY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const imgY = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const isEven = index % 2 === 0;

  return (
    <div
      ref={containerRef}
      className={`relative w-full mb-24 md:mb-32 flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-12 lg:gap-32 items-center justify-between group/card`}
    >
      {/* Background Project Number (Editorial) */}
      <div
        className={`absolute top-0 ${isEven ? "right-0" : "left-0"} select-none pointer-events-none opacity-[0.03] group-hover/card:opacity-[0.08] transition-opacity duration-1000`}
      >
        <span className="text-[clamp(9rem,28vw,15rem)] md:text-[25rem] font-heading font-black leading-none">
          0{index + 1}
        </span>
      </div>

      {/* Project Image Container */}
      <div className="w-full md:w-[60%] overflow-hidden group rounded-[0.5rem] aspect-[16/10] bg-surface relative shadow-2xl">
        {/* Project Specific Ambient Glow */}
        <div
          className={`absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-[80px] -z-10`}
        />

        <motion.div
          style={{ y: imgY }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full"
        >
          <img
            src={project.img}
            alt={project.title}
            loading="lazy"
            decoding="async"
            className="w-full h-[120%] object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-110 transition-all duration-1000 ease-out -translate-y-[10%]"
            data-cursor="view"
          />
        </motion.div>

        {/* Editorial Pill */}
        <div className="absolute top-10 left-10 z-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="bg-background/20 backdrop-blur-3xl px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] border border-border/40"
          >
            {project.category}
          </motion.span>
        </div>
      </div>

      {/* Project Text Container */}
      <motion.div
        style={{ y: textY }}
        className="w-full md:w-[32%] flex flex-col justify-center relative z-10"
      >
        <div className="relative">
          <span className="text-[10px] font-bold tracking-[0.6em] uppercase opacity-30 mb-8 block group-hover/card:opacity-100 group-hover/card:text-primary transition-[color,opacity] duration-700">
            CASE STUDY // 0{index + 1}
          </span>
          <h3 className="text-[clamp(2.5rem,6vw,5.5rem)] font-heading leading-[0.85] tracking-tight mb-10 group-hover/card:pl-3 transition-[padding,color] duration-1000">
            {project.title}
          </h3>
          <p className="text-on-surface-variant text-xl font-light leading-relaxed mb-16 max-w-sm opacity-60 group-hover/card:opacity-100 transition-opacity duration-700">
            {project.desc}
          </p>

          <Magnetic>
            <a
              href={project.liveUrl || "#"}
              className="group/link flex items-center gap-8 w-fit"
              data-cursor="hover"
            >
              <div className="w-16 h-16 rounded-full border border-border flex items-center justify-center group-hover/link:bg-on-surface group-hover/link:text-background transition-all duration-700 ease-[0.16,1,0.3,1]">
                <span className="material-symbols-outlined text-md">
                  north_east
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-black uppercase tracking-[0.3em] mb-1">
                  Launch Exploration
                </span>
                <span className="text-sm font-serif italic text-on-surface-variant opacity-60 group-hover/link:opacity-100 transition-opacity">
                  case study journal
                </span>
              </div>
            </a>
          </Magnetic>
        </div>
      </motion.div>
    </div>
  );
};

export const ProjectsGallery = ({ data = [] }) => {
  const projects =
    data.length > 0
      ? data
      : [
          {
            img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
            category: "E-Commerce",
            title: "Retail Hub Global",
            desc: "Architecting a high-performance headless ecosystem for next-generation retail experiences.",
          },
          {
            img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop",
            category: "Fintech",
            title: "Horizon Capital",
            desc: "Visualizing complex financial streams through a sleek, data-driven analytics platform.",
          },
          {
            img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2672&auto=format&fit=crop",
            category: "SaaS",
            title: "Venture Core",
            desc: "A proprietary design system built for scalability, performance, and seamless user interaction.",
          },
        ];

  return (
    <section
      className="py-32 md:py-48 px-6 md:px-12 bg-background relative overflow-hidden"
      id="work"
    >
      {/* Dynamic Background Statement */}
      <div className="absolute top-[10%] right-[-5%] rotate-90 select-none pointer-events-none opacity-[0.015] hidden lg:block">
        <span className="text-[18rem] font-heading font-black tracking-tighter leading-none">
          CRAFTED VISION
        </span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Polished Section Header */}
        <div className="mb-24 md:mb-48 flex flex-col md:flex-row md:items-end justify-between gap-16">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 0.3, x: 0 }}
              viewport={{ once: true }}
              className="section-label mb-12 block"
            >
              Curated Selection — 2024 / 2026
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[clamp(3.5rem,9vw,7.5rem)] font-heading leading-[0.8] tracking-tighter"
            >
              SELECTED <br />
              <span className="font-serif italic font-normal tracking-tight text-[0.85em]">
                Journal.
              </span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="max-w-xs md:text-right"
          >
            <p className="text-on-surface-variant font-light text-xl leading-relaxed border-l md:border-l-0 md:border-r border-border pl-12 md:pl-0 md:pr-12">
              A collection of digital narratives where{" "}
              <span className="text-on-surface font-medium italic">motion</span>{" "}
              creates the bridge between user and product.
            </p>
          </motion.div>
        </div>

        {/* Project List */}
        <div className="flex flex-col">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>

      {/* Finishing depth elements */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-aura-1/[0.05] to-transparent pointer-events-none" />
    </section>
  );
};
ProjectsGallery.propTypes = {
  data: PropTypes.arrayOf(PROJECT_GALLERY_ITEM_SHAPE),
};

ProjectsGallery.defaultProps = {
  data: [],
};

