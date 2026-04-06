import React from 'react';
import PropTypes from 'prop-types';

const iconProps = {
  width: '1em',
  height: '1em',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: '2',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

const iconPaths = {
  github: (
    <>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </>
  ),
  linkedin: (
    <>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </>
  ),
  facebook: (
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  ),
  instagram: (
    <>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </>
  ),
  x: (
    <>
      <path d="m4 4 11.733 16H20L8.267 4z" />
      <path d="m4 20 6.768-6.768m2.46-2.46L20 4" />
    </>
  ),
  twitter: (
    <>
      <path d="m4 4 11.733 16H20L8.267 4z" />
      <path d="m4 20 6.768-6.768m2.46-2.46L20 4" />
    </>
  ),
  dribbble: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M4.5 8.5c3 1.5 8.5 2.5 15 1.5" />
      <path d="M8 3.5c1.5 2.5 4 6.5 7.5 13" />
      <path d="M4.5 15.5c2-.5 5-.5 8 .5 3 .8 5.5 2 7 3" />
    </>
  ),
};

export const SocialIcon = React.memo(({ name, className = '', title }) => {
  const key = String(name || '').toLowerCase();
  const icon = iconPaths[key];

  if (!icon) return null;

  return (
    <svg {...iconProps} className={className} aria-hidden={title ? undefined : 'true'} role={title ? 'img' : undefined}>
      {title ? <title>{title}</title> : null}
      {icon}
    </svg>
  );
});

SocialIcon.displayName = 'SocialIcon';

SocialIcon.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  title: PropTypes.string,
};

SocialIcon.defaultProps = {
  className: '',
};
