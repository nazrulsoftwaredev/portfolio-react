import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
  minDurationMs?: number;
}

export const Preloader = ({ onComplete, minDurationMs = 450 }: PreloaderProps) => {
  const shouldReduceMotion = useReducedMotion();
  const words = useMemo(
    () => ["Innovation", "Precision", "Artistry", "Minimalism", "Portfolio"],
    [],
  );

  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const hasCompletedRef = useRef(false);
  const startedAtRef = useRef<number | null>(null);
  const lastBucketRef = useRef(-1);

  useEffect(() => {
    startedAtRef.current = performance.now();
  }, []);

  useEffect(() => {
    if (shouldReduceMotion) {
      setProgress(1);
      if (!hasCompletedRef.current) {
        hasCompletedRef.current = true;
        onComplete();
      }
      return;
    }

    let rafId = 0;
    const tick = () => {
      const startedAt = startedAtRef.current ?? performance.now();
      const elapsed = performance.now() - startedAt;
      const next = Math.min(1, elapsed / Math.max(300, minDurationMs));
      const nextBucket = Math.floor(next * 100);
      if (nextBucket !== lastBucketRef.current || next >= 1) {
        lastBucketRef.current = nextBucket;
        setProgress(next);
      }

      if (next >= 1) {
        if (!hasCompletedRef.current) {
          hasCompletedRef.current = true;
          onComplete();
        }
        return;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [minDurationMs, onComplete, shouldReduceMotion]);

  useEffect(() => {
    if (shouldReduceMotion) return;
    if (progress >= 1) return;

    // Advance word based on progress buckets (keeps pace consistent).
    const nextIndex = Math.min(words.length - 1, Math.floor(progress * words.length));
    setIndex((prev) => (prev !== nextIndex ? nextIndex : prev));
  }, [progress, shouldReduceMotion, words.length]);

  const percentage = Math.round(progress * 100);

  return (
    <motion.div
      className="fixed inset-0 z-[99999] bg-background text-foreground flex items-center justify-center pointer-events-auto"
      initial={{ clipPath: "inset(0 0 0 0)" }}
      exit={{
        clipPath: "inset(0 0 100% 0)",
        transition: { duration: 1.0, ease: [0.76, 0, 0.24, 1] },
      }}
      aria-busy="true"
      aria-live="polite"
      role="status"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-technical-fade opacity-[0.025]" />
        <div className="absolute inset-0 bg-vignette opacity-100" />
        <div className="absolute -top-32 right-0 w-1/2 h-1/2 bg-primary/[0.03] blur-[56px]" />
        <div className="absolute bottom-[-10rem] left-[-4rem] w-1/2 h-1/2 bg-aura-1/10 blur-[56px] opacity-20" />
      </div>

      <div className="relative z-10 w-full max-w-3xl px-8">
        <div className="flex items-end justify-between gap-8">
          <div className="min-w-0">
            <div className="text-[10px] font-bold tracking-[0.45em] uppercase opacity-50">
              Initializing
            </div>
            <div className="mt-4 h-16 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -16, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.215, 0.61, 0.355, 1] }}
                  className="text-4xl md:text-5xl font-serif italic tracking-tight truncate"
                >
                  {words[index]}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="text-right flex-shrink-0">
            <div className="text-[10px] font-bold tracking-[0.45em] uppercase opacity-40">
              {percentage}%
            </div>
            <div className="mt-3 text-xs text-muted-foreground">
              Loading experience
            </div>
          </div>
        </div>

        <div className="mt-10">
          <div className="h-[2px] w-full bg-border/40 overflow-hidden rounded-full">
            <motion.div
              className="h-full bg-primary origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: progress }}
              transition={{ ease: "linear", duration: 0.1 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
