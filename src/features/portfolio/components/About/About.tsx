import React, { useMemo, useRef } from "react";
import PropTypes from "prop-types";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ABOUT_CONTENT_SHAPE } from "@/shared/types";

type FocusItem = {
  title: string;
  description: string;
};

const DEFAULT_SCRUB_TEXT =
  "I design and build polished digital products where motion, usability, and performance work together.";

const DEFAULT_BIO_TEXT =
  "Frontend-focused software developer crafting memorable interfaces and fast, accessible user experiences.";

const DEFAULT_FOCUS_ITEMS: FocusItem[] = [
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
];

const Word = ({
  word,
  scrollYProgress,
  index,
  total,
}: {
  word: string;
  scrollYProgress: MotionValue<number>;
  index: number;
  total: number;
}) => {
  const start = index / total;
  const end = start + 1 / total;

  const opacity = useTransform(scrollYProgress, [start, end], [0.1, 1]);
  const y = useTransform(scrollYProgress, [start, end], [10, 0]);

  return (
    <motion.span
      style={{ opacity, y }}
      className="inline-block transition-none"
    >
      {word}
    </motion.span>
  );
};

const ScrubText = ({ text }: { text: string }) => {
  const containerRef = useRef<HTMLParagraphElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "end 50%"],
  });
  const words = useMemo(() => text.trim().split(/\s+/), [text]);

  const totalWords = Math.max(words.length, 1);

  return (
    <p
      ref={containerRef}
      className="text-[clamp(1.8rem,4.8vw,4.2rem)] font-heading leading-[1.05] tracking-tighter flex flex-wrap gap-x-[0.35em] gap-y-2 mb-12 lg:mb-20"
      data-cursor="hover"
    >
      {words.map((word, i) => (
        <Word
          key={`${word}-${i}`}
          word={word}
          scrollYProgress={scrollYProgress}
          index={i}
          total={totalWords}
        />
      ))}
    </p>
  );
};

const FocusCard = ({ item, idx }: { item: FocusItem; idx: number }) => (
  <article className="rounded-2xl border border-border/35 bg-surface/15 px-6 py-7 md:px-7 md:py-8">
    <div className="flex items-center gap-4 mb-5">
      <span className="font-heading text-lg tracking-tight text-on-surface/65">
        {String(idx + 1).padStart(2, "0")}
      </span>
      <div className="h-px flex-1 bg-border/60" />
    </div>
    <h4 className="font-heading text-[clamp(1.15rem,1.7vw,1.5rem)] tracking-tight leading-[1.05] mb-3">
      {item.title}
    </h4>
    <p className="text-on-surface-variant text-[15px] leading-relaxed font-light opacity-85">
      {item.description}
    </p>
  </article>
);

export const About = ({ data = {} }) => {
  const scrubText = data.scrubText || DEFAULT_SCRUB_TEXT;
  const bioText = data.bioText || DEFAULT_BIO_TEXT;
  const focusItems = useMemo(() => {
    const validItems = (data.focusItems || []).filter(
      (item: FocusItem) => item?.title && item?.description,
    );
    return validItems.length > 0
      ? (validItems.slice(0, 2) as FocusItem[])
      : DEFAULT_FOCUS_ITEMS;
  }, [data.focusItems]);

  return (
    <section
      className="py-24 md:py-48 px-6 md:px-12 bg-background relative overflow-hidden"
      id="about"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-12 lg:gap-32">
        <div className="lg:w-8/12 w-full">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 0.3 }}
            viewport={{ once: true }}
            className="section-label mb-16 block"
          >
            Philosophy
          </motion.div>

          <ScrubText text={scrubText} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="relative lg:pl-16 border-l border-border/40 ml-2 lg:ml-0"
          >
            <p className="text-xl md:text-2xl text-on-surface-variant font-light italic leading-relaxed max-w-xl">
              {bioText}
            </p>
            <span className="font-serif text-6xl absolute -top-4 -left-4 opacity-5 select-none font-bold">
              "
            </span>
          </motion.div>
        </div>

        <div className="lg:w-4/12 w-full lg:sticky lg:top-40">
          <div className="space-y-5 md:space-y-6">
            {focusItems.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
              >
                <FocusCard item={item} idx={idx} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="flex items-center gap-6 opacity-20 hover:opacity-100 transition-opacity pt-20"
          >
            <div className="w-12 h-[1px] bg-on-surface shrink-0" />
            <span className="text-[9px] font-bold uppercase tracking-[0.5em]">
              System Aesthetics
            </span>
          </motion.div>
        </div>
      </div>

      <div className="absolute -bottom-40 -left-20 w-[60%] h-1/2 bg-aura-1 blur-[150px] pointer-events-none opacity-20" />
    </section>
  );
};
About.propTypes = {
  data: ABOUT_CONTENT_SHAPE,
};

About.defaultProps = {
  data: {},
};

