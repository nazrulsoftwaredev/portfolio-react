import React from "react";
import { motion } from "motion/react";
import { Magnetic } from "@/features/portfolio/components/Magnetic";
import { usePortfolioMotionSettings } from "../../hooks/usePortfolioMotionSettings";
import type { HeroContent } from "@/shared/types";

interface WordRevealProps {
  text: string;
  delay?: number;
  className?: string;
  shouldUseEnhancedMotion: boolean;
}

interface HeroProps {
  loading?: boolean;
  data?: HeroContent;
}

const WordReveal = ({
  text,
  delay = 0,
  className = "",
  shouldUseEnhancedMotion,
}: WordRevealProps) => {
  const words = text.split(" ");
  return (
    <div className={`flex flex-wrap py-2 ${className}`}>
      {words.map((word, i) => (
        <span
          key={i}
          className="relative overflow-hidden mr-[0.25em] px-1 pb-2 group inline-block perspective"
        >
          <motion.span
            initial={
              shouldUseEnhancedMotion
                ? { y: "120%", opacity: 0, rotateZ: -6, scale: 0.95 }
                : { opacity: 0, y: 12 }
            }
            animate={{ y: 0, opacity: 1, rotateZ: 0, scale: 1 }}
            transition={{
              delay: delay + i * (shouldUseEnhancedMotion ? 0.08 : 0.04),
              duration: shouldUseEnhancedMotion ? 0.9 : 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={shouldUseEnhancedMotion ? { scale: 1.03 } : undefined}
            className="inline-block group-hover:text-primary transition-colors duration-300"
            style={{ transformOrigin: "bottom center" }}
          >
            {word}
          </motion.span>

          {shouldUseEnhancedMotion && (
            <motion.div
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: [0, 0.1, 0], scale: [0.75, 1, 1.15] }}
              transition={{
                delay: delay + i * 0.08 + 0.35,
                duration: 0.9,
                ease: "easeOut",
              }}
              className="absolute inset-0 bg-primary/20 rounded-full blur-lg -z-10"
            />
          )}
        </span>
      ))}
    </div>
  );
};

export const Hero = ({ loading = false, data = {} }: HeroProps) => {
  const { shouldUseEnhancedMotion } = usePortfolioMotionSettings();

  return (
    <section
      className="relative min-h-screen flex items-start lg:items-center justify-center overflow-hidden bg-background pt-40 md:pt-48 lg:pt-36 pb-24 md:pb-32"
      id="home"
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-start">
          {/* Main Headline - High Impact */}
          <div className="lg:col-span-12 mb-12 lg:mb-20 z-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={!loading ? { opacity: 0.5, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 1.5 }}
              className="section-label mb-8 text-center lg:text-left"
            >
              {data.availability || "BASED IN DHAKA — AVAILABLE WORLDWIDE"}
            </motion.div>

            <h1
              className="text-[clamp(2.5rem,11vw,9.5rem)] leading-[0.85] font-heading tracking-tight text-center lg:text-left flex flex-col"
              data-cursor="text"
            >
              <WordReveal
                text="CRAFTING"
                delay={0.35}
                shouldUseEnhancedMotion={shouldUseEnhancedMotion}
              />
              <div className="flex flex-col lg:flex-row lg:items-end gap-x-6 gap-y-4">
                <WordReveal
                  text="UNIQUE"
                  delay={0.48}
                  shouldUseEnhancedMotion={shouldUseEnhancedMotion}
                />
                <motion.span
                  initial={{
                    opacity: 0,
                    x: shouldUseEnhancedMotion ? -24 : 0,
                    y: 20,
                    rotateZ: shouldUseEnhancedMotion ? -8 : 0,
                    scale: shouldUseEnhancedMotion ? 0.8 : 1,
                  }}
                  animate={
                    !loading
                      ? { opacity: 1, x: 0, y: 0, rotateZ: 0, scale: 1 }
                      : {}
                  }
                  transition={{
                    delay: 0.8,
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="font-serif text-[0.6em] lowercase tracking-normal leading-none mb-[0.15em] lg:mb-[0.1em] group-hover:text-primary transition-colors duration-300"
                  whileHover={
                    shouldUseEnhancedMotion ? { scale: 1.06, rotateZ: 2 } : undefined
                  }
                >
                  experiences
                </motion.span>
              </div>
            </h1>
          </div>

          <motion.div
            className="lg:col-span-5 lg:col-start-1 order-2 lg:order-1 z-20 will-change-transform"
            initial={{ opacity: 0, y: 20 }}
            animate={!loading ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.65, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.p
              initial={{ opacity: 0, y: 28 }}
              animate={!loading ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.75,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-on-surface-variant text-lg md:text-xl font-light leading-relaxed mb-12 max-w-sm"
              data-cursor="text"
            >
              Building digital products that balance{" "}
              <motion.span
                className="text-on-surface font-medium italic relative"
                animate={shouldUseEnhancedMotion ? { opacity: 1 } : undefined}
                transition={{ duration: 0.25 }}
              >
                technical precision
              </motion.span>{" "}
              with{" "}
              <motion.span
                className="font-serif text-2xl"
                animate={shouldUseEnhancedMotion ? { rotateZ: 0 } : undefined}
                transition={{ duration: 0.25 }}
              >
                artful
              </motion.span>{" "}
              interaction.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.7, y: 30 }}
              animate={!loading ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{
                delay: 0.9,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex"
            >
              <Magnetic>
                <button
                  onClick={() =>
                    document
                      .querySelector("#work")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="group flex items-center gap-8"
                  data-cursor="hover"
                >
                  <div className="relative w-20 h-20 rounded-full border border-border flex items-center justify-center overflow-hidden group-hover:border-primary transition-colors duration-500">
                    <motion.div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.76,0,0.24,1]" />
                    <motion.span
                      className="material-symbols-outlined text-xl relative z-10 group-hover:text-background transition-colors duration-700"
                      whileHover={shouldUseEnhancedMotion ? { y: 2 } : undefined}
                      transition={{ duration: 0.2 }}
                    >
                      arrow_downward
                    </motion.span>
                  </div>
                  <div className="flex flex-col">
                    <motion.span
                      className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 group-hover:opacity-100 transition-opacity duration-500"
                    >
                      View Selected
                    </motion.span>
                    <motion.span
                      className="text-sm font-serif italic transition-transform duration-300 group-hover:translate-x-0.5"
                    >
                      Works (2024-2026)
                    </motion.span>
                  </div>
                </button>
              </Magnetic>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: shouldUseEnhancedMotion ? 1.04 : 1 }}
            animate={!loading ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="lg:col-span-6 lg:col-start-7 order-1 lg:order-2 relative"
          >
            <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden group shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent z-10" />
              <img
                src="/identity.png"
                alt="MD Nazrul Islam"
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-[2s] ease-out scale-110 group-hover:scale-100"
              />

              <div className="absolute top-10 right-10 z-20">
                <span className="text-[clamp(4rem,8vw,8rem)] font-heading leading-none opacity-10 select-none">
                  '26
                </span>
              </div>
            </div>

            <div className="absolute -bottom-10 -left-10 w-32 h-32 border border-border/20 rounded-full flex items-center justify-center pointer-events-none">
              <div className="w-1 h-20 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute left-12 bottom-12 hidden lg:block z-0 overflow-hidden">
        <motion.span
          initial={{ y: shouldUseEnhancedMotion ? "100%" : 16 }}
          animate={!loading ? { y: 0 } : {}}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-[12rem] font-heading font-black opacity-[0.02] leading-none block select-none"
        >
          01
        </motion.span>
      </div>
    </section>
  );
};
