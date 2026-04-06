/**
 * SkipLink Component
 * Accessibility feature for keyboard users to skip navigation
 * and jump directly to main content (WCAG 2.1 Level A)
 */

import React from 'react';

export const SkipLink = ({ targetId = 'main-content' }) => {
  const handleSkip = (e) => {
    e.preventDefault();
    const mainContent = document.getElementById(targetId);
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <a
      href={`#${targetId}`}
      onClick={handleSkip}
      className="sr-only focus:not-sr-only focus:fixed focus:top-0 focus:left-0 focus:z-[9999] focus:p-4 focus:bg-cyan-500 focus:text-black focus:font-bold focus:rounded-md"
      aria-label="Skip to main content"
    >
      Skip to main content
    </a>
  );
};
