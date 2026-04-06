import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

export const Preloader = ({ onComplete }) => {
  const [index, setIndex] = useState(0);
  const words = ["Innovation", "Precision", "Artistry", "Minimalism", "Portfolio"];

  useEffect(() => {
    if (index === words.length - 1) {
      setTimeout(onComplete, 1000);
      return;
    }
    const timeout = setTimeout(() => {
      setIndex(prev => prev + 1);
    }, index === 0 ? 1000 : 150);

    return () => clearTimeout(timeout);
  }, [index, onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-[99999] bg-[#080808] flex items-center justify-center text-[#fdfdfd] pointer-events-auto"
      initial={{ clipPath: "inset(0 0 0 0)" }}
      exit={{ 
        clipPath: "inset(0 0 100% 0)",
        transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } 
      }}
    >
      <div className="relative h-20 overflow-hidden flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div 
            key={index}
            initial={{ y: 40, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
            className="text-4xl md:text-5xl font-serif italic tracking-tight"
          >
            {words[index]}
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.div 
        initial={{ scaleX: 0 }} 
        animate={{ scaleX: (index + 1) / words.length }} 
        className="absolute bottom-0 left-0 w-full h-[2px] bg-primary origin-left opacity-20"
      />
    </motion.div>
  );
};

Preloader.propTypes = {
  onComplete: PropTypes.func.isRequired,
};
