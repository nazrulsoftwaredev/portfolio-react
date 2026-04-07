import React, { useRef } from "react";
import PropTypes from 'prop-types';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ABOUT_CONTENT_SHAPE } from "@/shared/types";

const Word = ({ word, scrollYProgress, index, total }) => {
  const start = index / total;
  const end = start + (1 / total);
  
  // Bloom effect: Opacity + Y-translation (removed blur for better performance)
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

const ScrubText = ({ text }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "end 50%"]
  });

  const words = text.split(" ");

  return (
    <p
      ref={containerRef}
      className={`text-[clamp(1.8rem,4.8vw,4.2rem)] font-heading leading-[1.05] tracking-tighter flex flex-wrap gap-x-[0.35em] gap-y-2 mb-12 lg:mb-20`}
      data-cursor="hover"
    >
      {words.map((word, i) => (
        <Word 
          key={i} 
          word={word} 
          scrollYProgress={scrollYProgress} 
          index={i} 
          total={words.length} 
        />
      ))}
    </p>
  );
};

export const About = ({ data = {} }) => {
  const focusItems = data.focusItems || [
    { title: 'Spatial Interfaces', description: 'Developing immersive, physics-driven UI systems that redefine digital interaction boundaries.' },
    { title: 'System Architecture', description: 'Building high-scale, resilient backend ecosystems with sub-second latency targets.' }
  ];

  const scrubText = data.scrubText || "Every line of code is a brushstroke in the digital landscape of tomorrow.";

  return (
    <section
      className="py-24 md:py-48 px-6 md:px-12 bg-background relative overflow-hidden"
      id="about"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-12 lg:gap-32">
        
        {/* Left column: Philosophy and Narrative (Asymmetric larger width) */}
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
              {data.bioText || "A Digital Architect specialized in crafting high-end web experiences where technical excellence meets artistic vision. I believe in minimalism, performance, and the subtle power of motion."}
            </p>
            <span className="font-serif text-6xl absolute -top-4 -left-4 opacity-5 select-none font-bold">“</span>
          </motion.div>
        </div>

        {/* Right column: Specific focus areas (Editorial sidebar style) */}
        <div className="lg:w-4/12 w-full lg:sticky lg:top-40">
          <div className="space-y-12">
            {focusItems.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 * idx }}
              >
                <div className="group border-t border-border/20 pt-10">
                  <div className="flex items-center gap-6 mb-6">
                    <span className="text-[10px] font-serif italic opacity-30 group-hover:opacity-100 transition-opacity">0{idx + 1}</span>
                    <h4 className="font-heading text-xl md:text-2xl tracking-tight leading-none group-hover:pl-2 transition-[padding] duration-500">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-on-surface-variant text-[15px] leading-relaxed font-light opacity-60 group-hover:opacity-100 transition-opacity">
                    {item.description}
                  </p>
                </div>
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
            <span className="text-[9px] font-bold uppercase tracking-[0.5em]">System Aesthetics</span>
          </motion.div>
        </div>
      </div>

      {/* Decorative Aura Overlay */}
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

