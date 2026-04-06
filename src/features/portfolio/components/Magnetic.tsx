import React, { useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { motion, useSpring, useTransform } from 'framer-motion';

export const Magnetic = ({ children, padding = 100, intensity = 0.35, cursor = "hover" }) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    
    // Center point
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    // Movement distance
    const moveX = (clientX - centerX) * intensity;
    const moveY = (clientY - centerY) * intensity;

    x.set(moveX);
    y.set(moveY);
  }, [intensity, x, y]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  }, [x, y]);

  const handleMouseEnter = () => setIsHovered(true);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ x, y, position: 'relative', display: 'inline-block' }}
      data-cursor={cursor}
    >
      {children}
    </motion.div>
  );
};

Magnetic.propTypes = {
  children: PropTypes.node.isRequired,
  padding: PropTypes.number,
  intensity: PropTypes.number,
  cursor: PropTypes.string,
};

Magnetic.defaultProps = {
  padding: 100,
  intensity: 0.35,
  cursor: 'hover',
};
