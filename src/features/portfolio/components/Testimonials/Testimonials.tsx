import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

export const Testimonials = ({ data = [] }) => {
  const reviews = data.length > 0 ? data : [{
    quote: "Nazrul's ability to simplify complex data structures into elegant, interactive user journeys is unparalleled.",
    author: "Senior Product Director",
    company: "Global Innovation Lab"
  }];

  const quote = reviews[0];

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-background relative overflow-hidden group" id="testimonials">
      
      {/* Background Decorative Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.015]">
        <span className="text-[clamp(10rem,30vw,20rem)] md:text-[35rem] font-heading font-black tracking-tighter leading-none block">
          VOICES
        </span>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 0.3 }}
           viewport={{ once: true }}
           className="section-label mb-12 text-center block"
        >
          Partner Validation
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center"
        >
          <p className="text-[clamp(2rem,6vw,5rem)] font-serif italic leading-[1.05] tracking-tight font-light mb-12 text-balanced group-hover:text-primary transition-colors duration-1000">
            “{quote.quote}”
          </p>

          <footer className="flex flex-col items-center gap-4">
             <div className="w-12 h-px bg-border mb-6" />
             <cite className="not-italic font-bold text-xs md:text-sm tracking-[0.3em] uppercase">
               {quote.author}
             </cite>
             <span className="text-[10px] md:text-xs text-on-surface-variant tracking-[0.4em] uppercase opacity-40">
               {quote.company}
             </span>
          </footer>
        </motion.div>
      </div>

      {/* Atmospheric localized aura */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-aura-2 blur-[200px] opacity-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-full bg-aura-3 blur-[200px] opacity-10 pointer-events-none" />
    </section>
  );
};
Testimonials.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      quote: PropTypes.string,
      author: PropTypes.string,
      company: PropTypes.string,
    })
  ),
};

Testimonials.defaultProps = {
  data: [],
};

