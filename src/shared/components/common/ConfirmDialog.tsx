import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * ConfirmDialog Component
 * Accessible replacement for window.confirm()
 * Provides better UX and keyboard support
 */
export const ConfirmDialog = ({
  isOpen,
  title = 'Confirm Action',
  message = 'Are you sure?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDangerous = false,
  isLoading = false,
  onConfirm,
  onCancel,
  children,
}) => {
  const focusTrapRef = useRef(null);
  const confirmButtonRef = useRef(null);
  const cancelButtonRef = useRef(null);

  // Focus trap: Keep focus within modal
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      // ESC to close
      if (e.key === 'Escape') {
        onCancel?.();
      }

      // Tab to trap focus
      if (e.key === 'Tab') {
        const focusableElements = focusTrapRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusableElements || focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    // Focus on confirm button when opened
    setTimeout(() => {
      if (isDangerous) {
        cancelButtonRef.current?.focus();
      } else {
        confirmButtonRef.current?.focus();
      }
    }, 100);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel, isDangerous]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="fixed inset-0 bg-foreground/50 z-[1040]"
            aria-hidden="true"
          />

          {/* Dialog */}
          <motion.div
            ref={focusTrapRef}
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="confirm-title"
            aria-describedby="confirm-message"
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1050] w-full max-w-md bg-surface rounded-lg shadow-xl border border-outline/20"
          >
            <div className="p-6">
              {/* Header */}
              <h2
                id="confirm-title"
                className={`text-xl font-bold mb-2 ${
                  isDangerous ? 'text-red-500' : 'text-on-background'
                }`}
              >
                {title}
              </h2>

              {/* Message */}
              <p
                id="confirm-message"
                className="text-on-surface-variant mb-6 leading-relaxed"
              >
                {message}
              </p>

              {/* Custom content */}
              {children && (
                <div className="mb-6 p-3 bg-background/50 rounded border border-outline/10">
                  {children}
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-3 justify-end">
                <button
                  ref={cancelButtonRef}
                  onClick={onCancel}
                  disabled={isLoading}
                  className="px-4 py-2 rounded-lg border border-outline bg-surface text-on-background hover:bg-surface/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                  aria-label={`Cancel: ${title}`}
                >
                  {cancelText}
                </button>
                <button
                  ref={confirmButtonRef}
                  onClick={onConfirm}
                  disabled={isLoading}
                  className={`px-4 py-2 rounded-lg font-medium text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 ${
                    isDangerous
                      ? 'bg-red-500 hover:bg-red-600'
                      : 'bg-primary hover:bg-primary/90'
                  }`}
                  aria-label={`Confirm: ${title}`}
                >
                  {isLoading && (
                    <svg
                      className="w-4 h-4 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="2"
                        opacity="0.25"
                      />
                      <path
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                  )}
                  {confirmText}
                </button>
              </div>

              {/* Help text */}
              <p className="text-xs text-on-surface-variant mt-4">
                💡 Press <kbd className="px-2 py-1 bg-background rounded border border-outline/30 font-mono">ESC</kbd> to cancel
              </p>
            </div>
          </motion.div>
        </>
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

ConfirmDialog.defaultProps = {
  title: 'Confirm Action',
  message: 'Are you sure?',
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  isDangerous: false,
  isLoading: false,
};

export default ConfirmDialog;
