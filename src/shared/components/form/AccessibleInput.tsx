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
import PropTypes from 'prop-types';

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
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
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
          className="block text-sm font-medium text-white/80"
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
        className={`w-full bg-black/50 border rounded-xl px-4 py-3 outline-none transition-all
          ${
            error
              ? 'border-red-400/50 focus:border-red-400 focus:ring-2 focus:ring-red-400/20'
              : 'border-white/10 focus:border-primary focus:ring-2 focus:ring-cyan-400/20'
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
          className="text-xs text-white/50 mt-1"
        >
          {hint}
        </div>
      )}
    </div>
  );
};

AccessibleInput.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  hint: PropTypes.string,
};

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
}) => {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
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
          className="block text-sm font-medium text-white/80"
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
        className={`w-full bg-black/50 border rounded-xl px-4 py-3 outline-none transition-all
          ${
            error
              ? 'border-red-400/50 focus:border-red-400 focus:ring-2 focus:ring-red-400/20'
              : 'border-white/10 focus:border-primary focus:ring-2 focus:ring-cyan-400/20'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          ${className}`}
      >
        {options.map((opt) => (
          <option key={opt.value || opt} value={opt.value || opt}>
            {opt.label || opt}
          </option>
        ))}
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
          className="text-xs text-white/50 mt-1"
        >
          {hint}
        </div>
      )}
    </div>
  );
};

AccessibleSelect.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string,
      }),
    ])
  ),
  disabled: PropTypes.bool,
  className: PropTypes.string,
  hint: PropTypes.string,
};

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
}) => {
  const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
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
          className="block text-sm font-medium text-white/80"
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
        className={`w-full bg-black/50 border rounded-xl px-4 py-3 outline-none transition-all resize-none
          ${
            error
              ? 'border-red-400/50 focus:border-red-400 focus:ring-2 focus:ring-red-400/20'
              : 'border-white/10 focus:border-primary focus:ring-2 focus:ring-cyan-400/20'
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
          className="text-xs text-white/50 mt-1"
        >
          {hint}
        </div>
      )}
    </div>
  );
};

AccessibleTextarea.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  rows: PropTypes.number,
  className: PropTypes.string,
  hint: PropTypes.string,
};
