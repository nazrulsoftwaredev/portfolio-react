import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Toast Notification Component
 * Non-intrusive feedback for user actions
 */
export const Toast = ({
  isOpen,
  message = "",
  type = "info", // 'info', 'success', 'error', 'warning'
  duration = 4000, // auto-close in ms, 0 = no auto-close
  onClose,
  action,
  actionLabel = "Undo",
  inline = false,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  const typeConfig = {
    info: {
      bg: "bg-blue-500/90",
      icon: "💡",
      accent: "bg-blue-600",
    },
    success: {
      bg: "bg-green-500/90",
      icon: "✓",
      accent: "bg-green-600",
    },
    error: {
      bg: "bg-red-500/90",
      icon: "✕",
      accent: "bg-red-600",
    },
    warning: {
      bg: "bg-amber-500/90",
      icon: "⚠",
      accent: "bg-amber-600",
    },
  };

  const config = typeConfig[type] || typeConfig.info;

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, x: -20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 20, x: -20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className={`${inline ? "relative w-full" : "fixed bottom-6 left-6 z-[1060] max-w-sm"} ${config.bg} text-white rounded-lg shadow-lg px-4 py-3 flex items-center gap-3 backdrop-blur-sm border border-white/10`}
        >
          {/* Icon */}
          <span
            className={`text-lg flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full ${config.accent} bg-opacity-20`}
          >
            {config.icon}
          </span>

          {/* Message */}
          <p className="flex-1 text-sm font-medium">{message}</p>

          {/* Action Button */}
          {action && (
            <button
              onClick={action}
              className="text-xs font-semibold px-3 py-1 rounded bg-white/20 hover:bg-white/30 transition-colors flex-shrink-0"
              aria-label={actionLabel}
            >
              {actionLabel}
            </button>
          )}

          {/* Close Button */}
          <button
            onClick={onClose}
            className="text-lg leading-none opacity-70 hover:opacity-100 transition-opacity flex-shrink-0"
            aria-label="Close notification"
          >
            ×
          </button>

          {/* Progress bar for auto-close */}
          {duration > 0 && (
            <motion.div
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: duration / 1000, ease: "linear" }}
              className="absolute bottom-0 left-0 right-0 h-1 bg-white/30 origin-left"
              style={{ transformOrigin: "left" }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

Toast.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  message: PropTypes.string,
  type: PropTypes.oneOf(["info", "success", "error", "warning"]),
  duration: PropTypes.number,
  onClose: PropTypes.func.isRequired,
  action: PropTypes.func,
  actionLabel: PropTypes.string,
  inline: PropTypes.bool,
};

Toast.defaultProps = {
  message: "",
  type: "info",
  duration: 4000,
  actionLabel: "Undo",
  inline: false,
};

export default Toast;
