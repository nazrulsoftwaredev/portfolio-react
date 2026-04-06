/**
 * Design System & Configuration (TypeScript)
 * Centralized design tokens and theme configuration
 */

export interface ColorPalette {
  primary: string;
  primaryContrast: string;
  secondary: string;
  background: string;
  surface: string;
  onBackground: string;
  onSurface: string;
  onSurfaceVariant: string;
  border: string;
  outline: string;
  aura1: string;
  aura2: string;
  aura3: string;
}

export interface SpacingScale {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
  xxxl: string;
}

export interface FontSettings {
  family: string;
  size: string;
  weight: number;
  lineHeight: number;
}

// Color palette (matches CSS variables in index.css)
export const COLORS: ColorPalette = {
  primary: "var(--primary)",
  primaryContrast: "var(--primary-contrast)",
  secondary: "var(--secondary)",
  background: "var(--background)",
  surface: "var(--surface)",
  onBackground: "var(--on-background)",
  onSurface: "var(--on-surface)",
  onSurfaceVariant: "var(--on-surface-variant)",
  border: "var(--border)",
  outline: "var(--outline)",
  aura1: "var(--aura-1)",
  aura2: "var(--aura-2)",
  aura3: "var(--aura-3)",
};

// Spacing scale
export const SPACING: SpacingScale = {
  xs: "0.25rem", // 4px
  sm: "0.5rem", // 8px
  md: "1rem", // 16px
  lg: "1.5rem", // 24px
  xl: "2rem", // 32px
  xxl: "3rem", // 48px
  xxxl: "4rem", // 64px
};

// Typography
export const TYPOGRAPHY = {
  fontFamily: {
    default: "system-ui, -apple-system, sans-serif",
    serif: 'Georgia, Cambria, "Times New Roman", Times, serif',
    mono: 'Menlo, Monaco, Consolas, "Courier New", monospace',
  },
  fontSize: {
    xs: "0.75rem", // 12px
    sm: "0.875rem", // 14px
    base: "1rem", // 16px
    lg: "1.125rem", // 18px
    xl: "1.25rem", // 20px
    "2xl": "1.5rem", // 24px
    "3xl": "1.875rem", // 30px
    "4xl": "2.25rem", // 36px
    "5xl": "3rem", // 48px
  },
  lineHeight: {
    tight: 1.1,
    normal: 1.5,
    relaxed: 1.75,
    loose: 2,
  },
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
} as const;

// Breakpoints for responsive design
export const BREAKPOINTS = {
  mobile: "480px",
  tablet: "768px",
  desktop: "1024px",
  wide: "1280px",
  ultraWide: "1536px",
} as const;

// Z-index scale
export const Z_INDEX = {
  hide: -1,
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  backdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
  customCursor: 10000,
  customCursorTrail: 10001,
} as const;

// Border radius scale
export const BORDER_RADIUS = {
  none: "0",
  sm: "0.25rem", // 4px
  md: "0.5rem", // 8px
  lg: "0.75rem", // 12px
  xl: "1rem", // 16px
  "2xl": "1.5rem", // 24px
  full: "9999px",
} as const;

// Shadow scale
export const SHADOWS = {
  none: "none",
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
} as const;

// Opacity scale
export const OPACITY = {
  0: "0",
  5: "0.05",
  10: "0.1",
  20: "0.2",
  25: "0.25",
  30: "0.3",
  40: "0.4",
  50: "0.5",
  60: "0.6",
  70: "0.7",
  75: "0.75",
  80: "0.8",
  90: "0.9",
  95: "0.95",
  100: "1",
} as const;

// Transition times
export const TRANSITION_DURATION = {
  fastest: "50ms",
  faster: "100ms",
  fast: "150ms",
  normal: "200ms",
  slow: "300ms",
  slower: "500ms",
} as const;

// Focus ring style (for accessibility)
export const FOCUS_VISIBLE = {
  outline: "2px solid var(--primary)",
  outlineOffset: "2px",
};
