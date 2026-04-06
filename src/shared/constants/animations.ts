/**
 * Animation Presets & Configurations (TypeScript)
 * Centralized animation configurations used across the app
 * Ensures consistency and makes tweaking easier
 */

export interface SpringConfig {
  type: "spring";
  stiffness: number;
  damping: number;
  mass: number;
}

export const SPRING_CONFIGS: Record<string, SpringConfig> = {
  // Gentle bounce
  gentle: {
    type: "spring",
    stiffness: 100,
    damping: 20,
    mass: 0.5,
  },
  // Standard smooth
  smooth: {
    type: "spring",
    stiffness: 300,
    damping: 30,
    mass: 0.2,
  },
  // Snappy response
  snappy: {
    type: "spring",
    stiffness: 450,
    damping: 40,
    mass: 0.1,
  },
  // Magnetic pull
  magnetic: {
    type: "spring",
    stiffness: 450,
    damping: 45,
    mass: 0.1,
  },
  // Custom cursor trail
  trail: {
    type: "spring",
    stiffness: 200,
    damping: 25,
    mass: 0.2,
  },
  // Bounce effect
  bounce: {
    type: "spring",
    stiffness: 320,
    damping: 15,
    mass: 0.3,
  },
};

// Easing curves
export const EASING = {
  easeInOutQuad: [0.455, 0.03, 0.515, 0.955],
  easeInOutCubic: [0.645, 0.045, 0.355, 1],
  easeInOutExpo: [1, 0, 0, 1],
  easeInOutCirc: [0.85, 0, 0.15, 1],
  easeInOutBack: [0.68, -0.55, 0.265, 1.55],
  customCurve: [0.34, 1.56, 0.64, 1],
} as const;

// Transition durations (in seconds)
export const DURATIONS = {
  fast: 0.15,
  normal: 0.3,
  slow: 0.5,
  slower: 0.8,
  slowest: 1.2,
  verySlow: 1.5,
  extreme: 2,
} as const;

// Scroll animation variants
export const SCROLL_REVEAL = {
  initial: { opacity: 0, y: 40, filter: "blur(15px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: {
    duration: DURATIONS.slow,
    ease: EASING.customCurve,
  },
};

// Fade animation variants
export const FADE = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

// Slide animation variants
export const SLIDE_UP = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const SLIDE_DOWN = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

export const SLIDE_LEFT = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

export const SLIDE_RIGHT = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

// Scale animation variants
export const SCALE_IN = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

// Page transition
export const PAGE_TRANSITION = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: DURATIONS.normal },
};
