/**
 * AccessibleInput Component
 * Provides accessible form input with:
 * - Associated label element
 * - ARIA attributes for required/invalid states
 * - Error message with aria-describedby
 * - Focus ring styling
 * - Keyboard support
 */

import React from 'react';

interface AccessibleInputProps {
  id?: string;
  label?: string;
  type?: string;
  required?: boolean;
  error?: string | null;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  hint?: string | null;
}

export const AccessibleInput = ({
  id,
  label,
  type = 'text',
  required = false,
  error = null,
  value,
  onChange,
  onBlur,
  placeholder = '',
  disabled = false,
  className = '',
  hint = null,
}: AccessibleInputProps) => {
  const inputId = id || `input-${Math.random().toString(36).slice(2, 11)}`;
  const errorId = `${inputId}-error`;
  const hintId = `${inputId}-hint`;

  const ariaDescribedBy = [
    error ? errorId : null,
    hint ? hintId : null,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-foreground/80"
        >
          {label}
          {required && (
            <span className="ml-1 text-red-400" aria-label="required">
              *
            </span>
          )}
        </label>
      )}

      <input
        id={inputId}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={ariaDescribedBy || undefined}
        className={`w-full bg-card/60 text-foreground border rounded-xl px-4 py-3 outline-none transition-all placeholder:text-muted-foreground/70
          ${
            error
              ? 'border-red-400/50 focus:border-red-400 focus:ring-2 focus:ring-red-400/20'
              : 'border-border/40 focus:border-primary focus:ring-2 focus:ring-cyan-400/20'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          ${className}`}
      />

      {error && (
        <div
          id={errorId}
          className="flex items-center gap-2 text-sm text-red-400 mt-1"
          role="alert"
        >
          <span aria-hidden="true">⚠</span>
          <span>{error}</span>
        </div>
      )}

      {hint && (
        <div
          id={hintId}
          className="text-xs text-muted-foreground mt-1"
        >
          {hint}
        </div>
      )}
    </div>
  );
};

interface SelectOption {
  value?: string;
  label?: string;
}

interface AccessibleSelectProps {
  id?: string;
  label?: string;
  required?: boolean;
  error?: string | null;
  value: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  onBlur?: React.FocusEventHandler<HTMLSelectElement>;
  options?: Array<string | SelectOption>;
  disabled?: boolean;
  className?: string;
  hint?: string | null;
}

/**
 * AccessibleSelect Component
 * Accessible select dropdown with labels and ARIA support
 */
export const AccessibleSelect = ({
  id,
  label,
  required = false,
  error = null,
  value,
  onChange,
  onBlur,
  options = [],
  disabled = false,
  className = '',
  hint = null,
}: AccessibleSelectProps) => {
  const selectId = id || `select-${Math.random().toString(36).slice(2, 11)}`;
  const errorId = `${selectId}-error`;
  const hintId = `${selectId}-hint`;

  const ariaDescribedBy = [
    error ? errorId : null,
    hint ? hintId : null,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={selectId}
          className="block text-sm font-medium text-foreground/80"
        >
          {label}
          {required && (
            <span className="ml-1 text-red-400" aria-label="required">
              *
            </span>
          )}
        </label>
      )}

      <select
        id={selectId}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        required={required}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={ariaDescribedBy || undefined}
        className={`w-full bg-card/60 text-foreground border rounded-xl px-4 py-3 outline-none transition-all
          ${
            error
              ? 'border-red-400/50 focus:border-red-400 focus:ring-2 focus:ring-red-400/20'
              : 'border-border/40 focus:border-primary focus:ring-2 focus:ring-cyan-400/20'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          ${className}`}
      >
        {options.map((opt) => {
          const val = typeof opt === 'string' ? opt : (opt.value ?? '');
          const lbl = typeof opt === 'string' ? opt : (opt.label ?? val);
          return (
            <option key={val} value={val}>
              {lbl}
            </option>
          );
        })}
      </select>

      {error && (
        <div
          id={errorId}
          className="flex items-center gap-2 text-sm text-red-400 mt-1"
          role="alert"
        >
          <span aria-hidden="true">⚠</span>
          <span>{error}</span>
        </div>
      )}

      {hint && (
        <div
          id={hintId}
          className="text-xs text-muted-foreground mt-1"
        >
          {hint}
        </div>
      )}
    </div>
  );
};

interface AccessibleTextareaProps {
  id?: string;
  label?: string;
  required?: boolean;
  error?: string | null;
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
  placeholder?: string;
  disabled?: boolean;
  rows?: number;
  className?: string;
  hint?: string | null;
}

/**
 * AccessibleTextarea Component
 * Textarea with accessibility features
 */
export const AccessibleTextarea = ({
  id,
  label,
  required = false,
  error = null,
  value,
  onChange,
  onBlur,
  placeholder = '',
  disabled = false,
  rows = 4,
  className = '',
  hint = null,
}: AccessibleTextareaProps) => {
  const textareaId = id || `textarea-${Math.random().toString(36).slice(2, 11)}`;
  const errorId = `${textareaId}-error`;
  const hintId = `${textareaId}-hint`;

  const ariaDescribedBy = [
    error ? errorId : null,
    hint ? hintId : null,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-sm font-medium text-foreground/80"
        >
          {label}
          {required && (
            <span className="ml-1 text-red-400" aria-label="required">
              *
            </span>
          )}
        </label>
      )}

      <textarea
        id={textareaId}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        rows={rows}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={ariaDescribedBy || undefined}
        className={`w-full bg-card/60 text-foreground border rounded-xl px-4 py-3 outline-none transition-all resize-none placeholder:text-muted-foreground/70
          ${
            error
              ? 'border-red-400/50 focus:border-red-400 focus:ring-2 focus:ring-red-400/20'
              : 'border-border/40 focus:border-primary focus:ring-2 focus:ring-cyan-400/20'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          ${className}`}
      />

      {error && (
        <div
          id={errorId}
          className="flex items-center gap-2 text-sm text-red-400 mt-1"
          role="alert"
        >
          <span aria-hidden="true">⚠</span>
          <span>{error}</span>
        </div>
      )}

      {hint && (
        <div
          id={hintId}
          className="text-xs text-muted-foreground mt-1"
        >
          {hint}
        </div>
      )}
    </div>
  );
};
