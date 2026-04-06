import React, { useRef } from "react";
import PropTypes from "prop-types";
import { motion, useScroll, useTransform } from "framer-motion";
import { Magnetic } from "@/features/portfolio/components/Magnetic";
import { HERO_CONTENT_SHAPE } from "@/shared/types";

const WordReveal = ({ text, delay = 0, className = "" }) => {
  const words = text.split(" ");
  return (
    <div className={`flex flex-wrap py-2 ${className}`}>
      {words.map((word, i) => (
        <span
          key={i}
          className="relative overflow-hidden mr-[0.25em] px-1 pb-2 group inline-block perspective"
        >
          <motion.span
            initial={{ y: "120%", opacity: 0, rotateZ: -10, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, rotateZ: 0, scale: 1 }}
            transition={{
              delay: delay + i * 0.12,
              duration: 1.3,
              ease: [0.34, 1.56, 0.64, 1],
              type: "spring",
              stiffness: 80,
            }}
            className="inline-block group-hover:text-primary group-hover:scale-110 transition-all duration-300"
            style={{ transformOrigin: "bottom center" }}
          >
            {word}
          </motion.span>

          {/* Floating accent behind text */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 0.15, 0], scale: [0, 1, 1.5] }}
            transition={{
              delay: delay + i * 0.12 + 0.5,
              duration: 1.2,
              ease: "easeOut",
            }}
            className="absolute inset-0 bg-primary rounded-full blur-xl -z-10"
          />
        </span>
      ))}
    </div>
  );
};

export const Hero = ({ loading, data = {} }) => {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 500], [0, 150]);
  // Extended range for mobile visibility: [0, 1000] ensures it doesn't fade too early
  const opacityFade = useTransform(scrollY, [0, 1000], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-28 md:pt-24 pb-24 md:pb-32"
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
              <WordReveal text="CRAFTING" delay={0.6} />
              <div className="flex flex-col lg:flex-row lg:items-end gap-x-6 gap-y-4">
                <WordReveal text="UNIQUE" delay={0.8} />
                <motion.span
                  initial={{
                    opacity: 0,
                    x: -40,
                    y: 20,
                    rotateZ: -15,
                    scale: 0.5,
                  }}
                  animate={
                    !loading
                      ? { opacity: 1, x: 0, y: 0, rotateZ: 0, scale: 1 }
                      : {}
                  }
                  transition={{
                    delay: 1.4,
                    duration: 1.2,
                    type: "spring",
                    stiffness: 120,
                    damping: 12,
                  }}
                  className="font-serif text-[0.6em] lowercase tracking-normal leading-none mb-[0.15em] lg:mb-[0.1em] group-hover:text-primary transition-colors duration-300"
                  whileHover={{ scale: 1.15, rotateZ: 5 }}
                >
                  experiences
                </motion.span>
              </div>
            </h1>
          </div>

          {/* Subtext & CTA - Offset */}
          <motion.div
            style={{ y: yParallax, opacity: opacityFade }}
            className="lg:col-span-5 lg:col-start-1 order-2 lg:order-1 z-20 will-change-transform"
          >
            <motion.p
              initial={{ opacity: 0, y: 40, filter: "blur(15px)" }}
              animate={
                !loading ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}
              }
              transition={{
                delay: 1.6,
                duration: 1.4,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              className="text-on-surface-variant text-lg md:text-xl font-light leading-relaxed mb-12 max-w-sm"
              data-cursor="text"
            >
              Building digital products that balance{" "}
              <motion.span
                className="text-on-surface font-medium italic relative"
                animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                technical precision
              </motion.span>{" "}
              with{" "}
              <motion.span
                className="font-serif text-2xl"
                animate={{
                  scale: [1, 1.12, 1],
                  rotateZ: [-1, 2, -1],
                }}
                transition={{ duration: 1.8, repeat: Infinity, delay: 0.2 }}
              >
                artful
              </motion.span>{" "}
              interaction.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.7, y: 30 }}
              animate={!loading ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{
                delay: 2,
                duration: 1.3,
                type: "spring",
                stiffness: 120,
                damping: 12,
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
                  <div className="relative w-20 h-20 rounded-full border border-border flex items-center justify-center overflow-hidden group-hover:border-primary transition-colors duration-700 group-hover:shadow-[0_0_30px_rgba(186,158,255,0.4)]">
                    <motion.div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.76, 0, 0.24, 1]" />
                    <motion.span
                      className="material-symbols-outlined text-xl relative z-10 group-hover:text-background transition-colors duration-700"
                      animate={{ y: [0, 6, 0] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                    >
                      arrow_downward
                    </motion.span>
                  </div>
                  <div className="flex flex-col">
                    <motion.span
                      className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 group-hover:opacity-100 transition-opacity duration-500"
                      animate={{ letterSpacing: ["0.3em", "0.6em", "0.3em"] }}
                      transition={{ duration: 2.2, repeat: Infinity }}
                    >
                      View Selected
                    </motion.span>
                    <motion.span
                      className="text-sm font-serif italic"
                      whileHover={{ scale: 1.1, x: 5 }}
                    >
                      Works (2024-2026)
                    </motion.span>
                  </div>
                </button>
              </Magnetic>
            </motion.div>
          </motion.div>

          {/* Hero Image - Decentered & Large */}
          <motion.div
            initial={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            animate={
              !loading ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}
            }
            transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
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

              {/* Year Floating Label */}
              <div className="absolute top-10 right-10 z-20">
                <span className="text-[clamp(4rem,8vw,8rem)] font-heading leading-none opacity-10 select-none">
                  '26
                </span>
              </div>
            </div>

            {/* Decorative Element */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-10 -left-10 w-32 h-32 border border-border/20 rounded-full flex items-center justify-center pointer-events-none"
            >
              <div className="w-1 h-20 bg-gradient-to-t from-primary/20 to-transparent" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Background Section Number */}
      <div className="absolute left-12 bottom-12 hidden lg:block z-0 overflow-hidden">
        <motion.span
          initial={{ y: "100%" }}
          animate={!loading ? { y: 0 } : {}}
          transition={{ delay: 2.2, duration: 1.5 }}
          className="text-[12rem] font-heading font-black opacity-[0.02] leading-none block select-none"
        >
          01
        </motion.span>
      </div>
    </section>
  );
};

Hero.propTypes = {
  loading: PropTypes.bool,
  data: HERO_CONTENT_SHAPE,
};

Hero.defaultProps = {
  loading: false,
  data: {},
};
