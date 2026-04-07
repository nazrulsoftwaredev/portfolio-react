import React, { useRef, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { motion, useSpring } from "framer-motion";
import { usePortfolioMotionSettings } from "../hooks/usePortfolioMotionSettings";

export const Magnetic = ({
  children,
  intensity = 0.35,
  cursor = "hover",
}) => {
  const ref = useRef(null);
  const { shouldUseEnhancedMotion } = usePortfolioMotionSettings();
  const rectRef = useRef<DOMRect | null>(null);
  const rafRef = useRef<number | null>(null);
  const pointerRef = useRef({ x: 0, y: 0 });

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);
  const safeIntensity = Math.min(intensity, 0.2);

  const refreshBounds = useCallback(() => {
    if (!ref.current) return;
    rectRef.current = ref.current.getBoundingClientRect();
  }, []);

  useEffect(() => {
    if (!shouldUseEnhancedMotion) return undefined;
    const handleResize = () => {
      refreshBounds();
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [refreshBounds, shouldUseEnhancedMotion]);

  const handleMouseMove = useCallback(
    (e) => {
      if (!shouldUseEnhancedMotion || !ref.current) return;
      if (!rectRef.current) {
        refreshBounds();
      }
      pointerRef.current.x = e.clientX;
      pointerRef.current.y = e.clientY;

      if (rafRef.current != null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const bounds = rectRef.current;
        if (!bounds) return;

        const centerX = bounds.left + bounds.width / 2;
        const centerY = bounds.top + bounds.height / 2;
        const moveX = (pointerRef.current.x - centerX) * safeIntensity;
        const moveY = (pointerRef.current.y - centerY) * safeIntensity;

        x.set(moveX);
        y.set(moveY);
      });
    },
    [refreshBounds, safeIntensity, shouldUseEnhancedMotion, x, y],
  );

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    rectRef.current = null;
    x.set(0);
    y.set(0);
  }, [x, y]);

  if (!shouldUseEnhancedMotion) {
    return <div data-cursor={cursor}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseEnter={refreshBounds}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y, position: "relative", display: "inline-block" }}
      data-cursor={cursor}
    >
      {children}
    </motion.div>
  );
};

Magnetic.propTypes = {
  children: PropTypes.node.isRequired,
  intensity: PropTypes.number,
  cursor: PropTypes.string,
};

Magnetic.defaultProps = {
  intensity: 0.35,
  cursor: "hover",
};
