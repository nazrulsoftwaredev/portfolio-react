import PropTypes from 'prop-types';
import { motion } from 'motion/react';
import { Magnetic } from "@/features/portfolio/components/Magnetic";
import { EXPERTISE_SHAPE } from "@/shared/types";

const ExpertItem = ({ item, idx }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ 
        duration: 1, 
        delay: 0.05 * idx,
        ease: [0.16, 1, 0.3, 1]
      }}
      className="group relative border-b border-border/10 py-12 md:py-24 transition-colors hover:bg-surface/[0.04]"
      style={{ willChange: "transform, opacity" }}
    >
      <div className="flex flex-col md:flex-row gap-8 md:gap-32 items-start relative z-10 px-4 md:px-8">
        {/* Index Number & Status */}
        <div className="flex flex-col gap-4 min-w-[80px]">
          <Magnetic intensity={0.2} cursor="hover">
            <div className="flex items-center gap-3">
               <span className="text-[10px] font-mono font-bold tracking-[0.3em] opacity-30 group-hover:opacity-100 group-hover:text-primary transition-all duration-500">
                 {String(idx + 1).padStart(2, '0')}
               </span>
               <div className="h-[1px] w-8 bg-primary/10 group-hover:w-12 group-hover:bg-primary/40 transition-all duration-700" />
            </div>
          </Magnetic>
          <span className="text-[9px] font-mono opacity-20 group-hover:opacity-60 transition-opacity">
            [READY_STATUS_04]
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 max-w-3xl">
          <h4 className="heading-lg font-heading tracking-tighter mb-8 group-hover:translate-x-4 transition-transform duration-1000 ease-[0.16,1,0.3,1] leading-[0.9]">
            {item.title}
          </h4>
          <p className="text-on-surface-variant text-base md:text-xl font-light leading-relaxed opacity-40 group-hover:opacity-90 transition-opacity duration-1000 max-w-2xl">
            {item.description}
          </p>
        </div>

        {/* Category Tag - Technical Style */}
        <div className="ml-auto mt-4 md:mt-0 self-start md:self-center">
          <Magnetic intensity={0.3} cursor="hover">
            <div className="font-mono text-[10px] tracking-widest opacity-20 group-hover:opacity-100 transition-opacity flex items-center gap-2">
              <span className="text-primary/40">[</span>
              <span className="uppercase">{item.category}</span>
              <span className="text-primary/40">]</span>
            </div>
          </Magnetic>
        </div>
      </div>

      {/* Hover Background Accent - Cinematic Sweep */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.02] via-transparent to-transparent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-1000 ease-[0.16,1,0.3,1] pointer-events-none" />
    </motion.div>
  );
};

export const Expertise = ({ data = [] }) => {
  const items = data.length > 0 ? data : [
    { title: 'Performance Engineering', description: 'Optimizing rendering loops and reducing memory leaks for 60fps React experiences globally. Focused on high-throughput data visualization.', category: 'Web' },
    { title: 'Spatial Interactivity', description: 'Bridging Figma layouts into 3D DOM environments using Three.js and Framer Motion. Crafting physics-based tactile experiences.', category: 'Creative' },
    { title: 'System Architecture', description: 'Building resilient, high-scale backend ecosystems. Specializing in low-latency event sourcing and distributed microservices.', category: 'Engineering' },
    { title: 'Visual Narratives', description: 'Crafting immersive brand stories through code-driven high-end motion design and cinematic interaction patterns.', category: 'Design' }
  ];

  return (
    <section 
      className="py-24 md:py-48 px-6 md:px-12 bg-background relative overflow-hidden" 
      id="expertise"
    >
      {/* Technical Background Grid Integration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-grid-technical-fade opacity-[0.03]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        
        <div className="absolute inset-x-0 top-0 h-[10vh] bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Block - Cinematic & Technical */}
        <div className="flex flex-col mb-20 md:mb-40 gap-12">
          <div className="flex items-center gap-6 overflow-hidden">
            <div className="h-[2px] w-24 bg-primary/20" />
            <motion.span 
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 0.5 }}
              className="section-label whitespace-nowrap"
            >
              TECHNICAL_ARSENAL_MODULE_v2.0
            </motion.span>
          </div>

          <div className="flex flex-col gap-12">
            <h2 className="text-[clamp(4.5rem,11vw,10.5rem)] font-heading leading-[0.8] tracking-[-0.06em] uppercase">
              BENDING <br />
              <span className="flex items-baseline gap-4">
                <motion.span 
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1.5, ease: [0.87, 0, 0.13, 1] }}
                  className="h-[0.11em] w-[0.25em] bg-primary origin-left mb-6 hidden md:block"
                />
                <motion.span 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="font-serif italic font-normal text-[0.75em] lowercase tracking-normal text-on-surface-variant line-offset-1"
                >
                  code to vision.
                </motion.span>
              </span>
            </h2>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 border-l border-primary/10 pl-8 ml-2">
               <p className="text-on-surface-variant text-base md:text-xl font-light leading-relaxed opacity-60 max-w-xl">
                 Architecting experiences where precision engineering meets high-end artistic expression. No templates, just pure digital craft.
               </p>
               <div className="flex gap-4 pb-2">
                 {[1, 2, 3].map(i => (
                   <div key={i} className="h-1.5 w-10 bg-primary/10 rounded-full overflow-hidden">
                     <div className="h-full w-full bg-primary/30 opacity-70" />
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </div>

        {/* List items block */}
        <div className="w-full relative border-t border-border/10">
           {items.map((item, idx) => (
             <ExpertItem 
               key={item.title} 
               item={item} 
               idx={idx} 
             />
           ))}
        </div>
      </div>

      {/* Subtle Aura */}
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-primary opacity-[0.015] blur-[96px] rounded-full pointer-events-none" />
    </section>
  );
};

Expertise.propTypes = {
  data: PropTypes.arrayOf(EXPERTISE_SHAPE),
};

Expertise.defaultProps = {
  data: [],
};

