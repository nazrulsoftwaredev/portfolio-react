import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bell } from "lucide-react";
import { Portal } from "@/shared/components";

type NotificationsMenuProps = {
  open: boolean;
  onOpenChange: (next: boolean) => void;
  anchorRef: React.RefObject<HTMLElement | null>;
  unreadCount?: number;
};

const spring = {
  type: "spring",
  stiffness: 360,
  damping: 34,
};

type MenuPosition = {
  top: number;
  left: number;
  width: number;
};

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

export function NotificationsMenu({
  open,
  onOpenChange,
  anchorRef,
  unreadCount = 0,
}: NotificationsMenuProps) {
  const panelRef = React.useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = React.useState<MenuPosition | null>(null);

  const updatePosition = React.useCallback(() => {
    const anchor = anchorRef.current;
    if (!anchor) return;

    const rect = anchor.getBoundingClientRect();
    const width = 320; // matches w-80
    const margin = 12;

    const leftPreferred = rect.right - width;
    const left = clamp(leftPreferred, margin, window.innerWidth - width - margin);
    const top = rect.bottom + 12;

    setPos({ top, left, width });
  }, [anchorRef]);

  React.useEffect(() => {
    if (!open) return;
    updatePosition();

    const pointerOpts = { capture: true } as const;
    const scrollOpts = { passive: true } as const;
    let rafId: number | null = null;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };

    const onPointerDown = (e: PointerEvent) => {
      const panel = panelRef.current;
      const anchor = anchorRef.current;
      const target = e.target as Node | null;
      if (!target) return;
      if (panel?.contains(target)) return;
      if (anchor?.contains(target)) return;
      onOpenChange(false);
    };

    const onReposition = () => {
      if (rafId != null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        updatePosition();
      });
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown, pointerOpts);
    window.addEventListener("resize", onReposition);
    window.addEventListener("scroll", onReposition, scrollOpts);

    return () => {
      if (rafId != null) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onReposition);
      window.removeEventListener("scroll", onReposition, scrollOpts);
      window.removeEventListener("pointerdown", onPointerDown, pointerOpts);
    };
  }, [open, onOpenChange, updatePosition, anchorRef]);

  return (
    <Portal>
      <AnimatePresence initial={false}>
        {open ? (
          <>
            {/* Overlay (kept lightweight to avoid flash) */}
            <motion.div
              key="noti-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-transparent pointer-events-none"
              aria-hidden="true"
            />

            <motion.div
              key="noti-panel"
              ref={panelRef}
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={spring}
              role="menu"
              aria-label="Notifications"
              style={
                pos
                  ? { position: "fixed", top: pos.top, left: pos.left, width: pos.width }
                  : { position: "fixed", top: 0, left: -9999, width: 320 }
              }
              className="z-[70] rounded-2xl bg-popover shadow-xl overflow-hidden"
            >
              <div className="p-4 border-b border-border/60 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  <span className="text-sm font-semibold">Notifications</span>
                  {unreadCount > 0 ? (
                    <span className="ml-1 rounded-full bg-primary/10 text-primary px-2 py-0.5 text-[11px] font-semibold">
                      {unreadCount}
                    </span>
                  ) : null}
                </div>

                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="rounded-lg bg-muted/40 px-2 py-1 text-[11px] font-semibold text-muted-foreground hover:text-foreground hover:bg-muted transition"
                >
                  Close
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto">
                <div className="p-6 text-center">
                  <p className="text-sm font-semibold text-foreground">No notifications</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    The notifications system was removed.
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </Portal>
  );
}

