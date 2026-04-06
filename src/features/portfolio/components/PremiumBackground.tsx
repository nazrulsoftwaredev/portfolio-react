import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const PremiumBackground = () => {
  const { scrollYProgress } = useScroll();
  
  // Subtle parallax for the background blobs
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-background">
      {/* Aura Blobs - Optimized for Mobile */}
      <motion.div 
        style={{ y: y1 }}
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.4, 0.3],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-5%] w-[80vw] md:w-[60vw] h-[80vw] md:h-[60vw] rounded-full blur-[80px] md:blur-[120px] bg-[var(--aura-1)] will-change-transform"
      />
      
      <motion.div 
        style={{ y: y2 }}
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[10%] right-[-10%] w-[70vw] md:w-[50vw] h-[70vw] md:h-[50vw] rounded-full blur-[100px] md:blur-[140px] bg-[var(--aura-2)] will-change-transform"
      />
      
      <motion.div 
        style={{ y: y3 }}
        animate={{ 
          scale: [1, 1.15, 1],
          opacity: [0.25, 0.35, 0.25],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-[40%] left-[30%] w-[40vw] h-[40vw] rounded-full blur-[80px] md:blur-[110px] bg-[var(--aura-3)] hidden md:block will-change-transform"
      />

      {/* Vignette Overlay */}
      <div className="absolute inset-0 bg-vignette opacity-100" />
    </div>
  );
};
