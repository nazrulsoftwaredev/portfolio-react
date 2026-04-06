import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useSpring } from 'framer-motion';

export const CustomCursor = () => {
  const [variant, setVariant] = useState('default');
  const [hasMoved, setHasMoved] = useState(false);
  const [clickPulse, setClickPulse] = useState(0);

  // Configuration for ultra-smooth momentum
  const mainConfig = { stiffness: 450, damping: 45, mass: 0.1 };
  const trailConfig = { stiffness: 200, damping: 25, mass: 0.2 };

  const mouseX = useSpring(0, mainConfig);
  const mouseY = useSpring(0, mainConfig);
  const trailX = useSpring(0, trailConfig);
  const trailY = useSpring(0, trailConfig);

  const handleMouseMove = useCallback((e) => {
    if (!hasMoved) setHasMoved(true);
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
    trailX.set(e.clientX);
    trailY.set(e.clientY);
  }, []);

  const handleMouseDown = () => setClickPulse(prev => prev + 1);

  const handleMouseOver = useCallback((e) => {
    const el = e.target.closest('[data-cursor]');
    if (el) {
      setVariant(el.getAttribute('data-cursor'));
    } else {
      setVariant('default');
    }
  }, []);

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    document.body.classList.add('has-custom-cursor');
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, [handleMouseMove, handleMouseOver]);

  const variants = {
    default: { 
      width: 8, 
      height: 8, 
      backgroundColor: 'var(--on-surface)',
      mixBlendMode: 'difference',
      scale: 1,
    },
    hover: { 
      width: 80, 
      height: 80, 
      backgroundColor: 'var(--on-surface)',
      mixBlendMode: 'difference',
      scale: 1.2,
    },
    view: { 
      width: 120, 
      height: 120, 
      backgroundColor: 'var(--on-surface)',
      mixBlendMode: 'normal',
      color: 'var(--background)',
      scale: 1,
    },
    text: {
      width: 2,
      height: 24,
      borderRadius: '2px',
      backgroundColor: 'var(--on-surface)',
      mixBlendMode: 'difference',
      scale: 1,
    }
  };

  return (
    <>
      {/* Primary Dot (Main Interaction) */}
      <motion.div
        className="fixed top-0 left-0 rounded-full z-[10001] pointer-events-none flex items-center justify-center text-[10px] font-bold uppercase tracking-[0.2em] overflow-hidden backdrop-blur-[1px]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: hasMoved ? 1 : 0,          willChange: "transform",        }}
        initial={false}
        animate={variant}
        variants={variants}
        transition={{ type: 'spring', stiffness: 450, damping: 40 }}
      >
        <AnimatePresence mode="wait">
          {variant === 'view' && (
            <motion.span
              key="view-text"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="font-heading"
            >
              PROJECT
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Trailing Ghost Ring (Atmospheric) */}
      <motion.div 
        className="fixed top-0 left-0 w-12 h-12 border border-on-surface/20 rounded-full z-[10000] pointer-events-none"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: hasMoved ? 0.3 : 0,
          willChange: "transform",
        }}
        animate={{
          scale: variant === 'hover' ? 2 : 1,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      />

      {/* Click Pulse Effect */}
      <AnimatePresence>
        {clickPulse > 0 && (
          <motion.div
            key={clickPulse}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed top-0 left-0 w-8 h-8 border border-primary rounded-full z-[9999] pointer-events-none"
            style={{
              x: mouseX,
              y: mouseY,
              translateX: "-50%",
              translateY: "-50%",
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
};
