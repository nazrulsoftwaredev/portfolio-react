import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { AlertTriangle, Info, Loader2 } from "lucide-react"; // Assuming Lucide is available
import { cn } from "@/lib/utils"; // Standard shadcn utility or replace with template strings

export const ConfirmDialog = ({
  isOpen,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  isDangerous = false,
  isLoading = false,
  onConfirm,
  onCancel,
  children,
}) => {
  const focusTrapRef = useRef(null);
  const confirmButtonRef = useRef(null);
  const cancelButtonRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  // Fast, crisp transitions for a responsive feel
  const variants = {
    backdrop: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    modal: {
      initial: { opacity: 0, scale: 0.98, y: 8 },
      animate: { opacity: 1, scale: 1, y: 0 },
      exit: { opacity: 0, scale: 0.98, y: 8 },
    },
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onCancel?.();
      if (e.key === "Tab") {
        const els = focusTrapRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (!els?.length) return;
        const first = els[0];
        const last = els[els.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      isDangerous
        ? cancelButtonRef.current?.focus()
        : confirmButtonRef.current?.focus();
    }, 50);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onCancel, isDangerous]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop - High contrast neutral */}
          <motion.div
            variants={variants.backdrop}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={!isLoading ? onCancel : undefined}
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-[1px]"
            aria-hidden="true"
          />

          {/* Dialog Container */}
          <motion.div
            ref={focusTrapRef}
            variants={prefersReducedMotion ? {} : variants.modal}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            role="alertdialog"
            aria-modal="true"
            className="relative w-full max-w-[440px] overflow-hidden rounded-lg border border-border bg-background shadow-2xl"
          >
            <div className="p-6">
              <div className="flex items-start gap-4">
                {/* Semantic Icon Indicator */}
                <div
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                    isDangerous
                      ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-500"
                      : "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-500",
                  )}
                >
                  {isDangerous ? (
                    <AlertTriangle className="h-5 w-5" />
                  ) : (
                    <Info className="h-5 w-5" />
                  )}
                </div>

                <div className="flex-1">
                  <h2 className="text-lg font-semibold leading-none tracking-tight text-foreground">
                    {title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {message}
                  </p>
                </div>
              </div>

              {children && (
                <div className="mt-4 rounded-md border border-border/50 bg-muted/20 p-3 text-sm">
                  {children}
                </div>
              )}
            </div>

            {/* Actions Footer - Standard enterprise pattern */}
            <div className="flex flex-col-reverse gap-2 border-t border-border bg-muted/30 px-6 py-4 sm:flex-row sm:justify-end sm:gap-3">
              <button
                ref={cancelButtonRef}
                onClick={onCancel}
                disabled={isLoading}
                className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
              >
                {cancelText}
              </button>
              <button
                ref={confirmButtonRef}
                onClick={onConfirm}
                disabled={isLoading}
                className={cn(
                  "inline-flex h-9 items-center justify-center gap-2 rounded-md px-4 text-sm font-medium text-white shadow-sm transition-colors disabled:opacity-50",
                  isDangerous
                    ? "bg-red-600 hover:bg-red-700 active:bg-red-800"
                    : "bg-primary hover:bg-primary/90 active:bg-primary/95",
                )}
              >
                {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                {confirmText}
              </button>
            </div>

            {/* Minimal Keyboard Hint */}
            <div className="absolute right-4 top-4 hidden sm:block">
              <kbd className="pointer-events-none select-none rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                ESC
              </kbd>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

ConfirmDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  isDangerous: PropTypes.bool,
  isLoading: PropTypes.bool,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default ConfirmDialog;
