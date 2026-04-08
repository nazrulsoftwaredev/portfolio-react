import React from 'react';
import { motion } from 'motion/react';

export const Testimonials = ({ data = [] }) => {
  const reviews = data.length > 0 ? data : [{
    quote: "Nazrul's ability to simplify complex data structures into elegant, interactive user journeys is unparalleled.",
    author: "Senior Product Director",
    company: "Global Innovation Lab"
  }];

  const quote = reviews[0];

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-background relative overflow-hidden" id="testimonials">
      
      {/* Background Decorative Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.01]">
        <span className="text-[clamp(10rem,30vw,20rem)] md:text-[35rem] font-heading font-black tracking-tighter leading-none block">
          VOICES
        </span>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 0.3 }}
           viewport={{ once: true }}
           className="section-label mb-8 md:mb-10 text-center block text-on-surface-variant/90"
        >
          Partner Validation
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center gap-2"
        >
          <p className="max-w-[18ch] md:max-w-[20ch] text-[clamp(1.6rem,4.8vw,4rem)] font-serif italic leading-[1.2] md:leading-[1.16] tracking-[-0.01em] font-light mb-10 md:mb-12 text-balance text-on-surface">
            “{quote.quote}”
          </p>

          <footer className="flex flex-col items-center gap-2 md:gap-3">
             <div className="w-16 h-px bg-border/80 mb-3 md:mb-4" />
             <cite className="not-italic font-semibold text-xs md:text-sm text-on-surface tracking-[0.2em] uppercase">
               {quote.author}
             </cite>
             <span className="text-[11px] md:text-xs text-on-surface-variant tracking-[0.24em] uppercase opacity-80">
               {quote.company}
             </span>
          </footer>
        </motion.div>
      </div>

      {/* Atmospheric localized aura */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-aura-2 blur-[220px] opacity-5 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-full bg-aura-3 blur-[220px] opacity-5 pointer-events-none" />
    </section>
  );
};
