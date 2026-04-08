import {
  createElement,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useReducedMotion } from "motion/react";

interface MotionSettings {
  shouldReduceMotion: boolean;
  isTouchDevice: boolean;
  hasFinePointer: boolean;
  isDesktop: boolean;
  shouldUseEnhancedMotion: boolean;
}

const defaultSettings: MotionSettings = {
  shouldReduceMotion: false,
  isTouchDevice: false,
  hasFinePointer: true,
  isDesktop: true,
  shouldUseEnhancedMotion: true,
};

const MotionSettingsContext = createContext<MotionSettings | null>(null);

const getMotionSettings = () => {
  if (typeof window === "undefined") {
    return {
      isTouchDevice: false,
      hasFinePointer: true,
      isDesktop: true,
    };
  }

  const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
  const isTouchDevice =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;
  const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

  return {
    isTouchDevice,
    hasFinePointer,
    isDesktop,
  };
};

const useMotionSettingsValue = (): MotionSettings => {
  const shouldReduceMotion = useReducedMotion();
  const [settings, setSettings] = useState(getMotionSettings);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const pointerMedia = window.matchMedia("(pointer: fine)");
    const desktopMedia = window.matchMedia("(min-width: 1024px)");

    let rafId: number | null = null;
    const update = () => {
      const next = getMotionSettings();
      setSettings((prev) =>
        prev.isTouchDevice === next.isTouchDevice &&
        prev.hasFinePointer === next.hasFinePointer &&
        prev.isDesktop === next.isDesktop
          ? prev
          : next,
      );
    };
    const scheduleUpdate = () => {
      if (rafId != null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        update();
      });
    };

    update();
    pointerMedia.addEventListener("change", scheduleUpdate);
    desktopMedia.addEventListener("change", scheduleUpdate);
    window.addEventListener("resize", scheduleUpdate, { passive: true });

    return () => {
      if (rafId != null) {
        window.cancelAnimationFrame(rafId);
      }
      pointerMedia.removeEventListener("change", scheduleUpdate);
      desktopMedia.removeEventListener("change", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  return useMemo(
    () => ({
      shouldReduceMotion,
      ...settings,
      shouldUseEnhancedMotion:
        !shouldReduceMotion && settings.hasFinePointer && settings.isDesktop,
    }),
    [settings, shouldReduceMotion],
  );
};

interface PortfolioMotionProviderProps {
  children: ReactNode;
}

export const PortfolioMotionProvider = ({
  children,
}: PortfolioMotionProviderProps) => {
  const value = useMotionSettingsValue();

  return createElement(MotionSettingsContext.Provider, { value }, children);
};

export const usePortfolioMotionSettings = (): MotionSettings => {
  const contextValue = useContext(MotionSettingsContext);
  return contextValue ?? defaultSettings;
};
