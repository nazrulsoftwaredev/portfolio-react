import { useEffect, useRef } from "react";
import { motion, useSpring, useMotionValue, useAnimation } from "framer-motion";
import { usePortfolioMotionSettings } from "../hooks/usePortfolioMotionSettings";

export const CustomCursor = () => {
  const { shouldUseEnhancedMotion } = usePortfolioMotionSettings();

  const controls = useAnimation();

  const pointer = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const lastCursorTypeRef = useRef("default");

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 420, damping: 40, mass: 0.12 };

  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const trailX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const trailY = useSpring(mouseY, { stiffness: 120, damping: 20 });

  useEffect(() => {
    if (!shouldUseEnhancedMotion) return;

    document.body.classList.add("has-custom-cursor");

    const update = () => {
      rafRef.current = null;
      mouseX.set(pointer.current.x);
      mouseY.set(pointer.current.y);
    };

    const handleMove = (e: MouseEvent) => {
      pointer.current.x = e.clientX;
      pointer.current.y = e.clientY;

      if (rafRef.current == null) {
        rafRef.current = requestAnimationFrame(update);
      }
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as Element;
      if (!target) return;

      const type =
        target.closest("[data-cursor]")?.getAttribute("data-cursor") ||
        "default";

      if (type === lastCursorTypeRef.current) return;
      lastCursorTypeRef.current = type;
      controls.start(type);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mouseover", handleHover, { passive: true });

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleHover);

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [shouldUseEnhancedMotion, mouseX, mouseY, controls]);

  if (!shouldUseEnhancedMotion) return null;

  const variants = {
    default: { scale: 1, backgroundColor: "var(--on-surface)" },
    hover: { scale: 2.5, backgroundColor: "var(--primary)" },
    view: {
      scale: 4,
      backgroundColor: "transparent",
      border: "1px solid var(--primary)",
    },
    text: { scale: 0.5, backgroundColor: "var(--primary)" },
  };

  return (
    <>
      {/* MAIN DOT */}
      <motion.div
        className="fixed top-0 left-0 z-[10001] pointer-events-none rounded-full"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          width: 8,
          height: 8,
          willChange: "transform",
        }}
        animate={controls}
        variants={variants}
        transition={{ type: "spring", stiffness: 420, damping: 40 }}
      />

      {/* TRAILING CURSOR */}
      <motion.div
        className="fixed top-0 left-0 z-[10000] pointer-events-none rounded-full border border-primary/40"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
          width: 32,
          height: 32,
          willChange: "transform",
        }}
      />
    </>
  );
};