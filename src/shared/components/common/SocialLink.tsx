import React from 'react';
import PropTypes from 'prop-types';
import { Magnetic } from "@/features/portfolio/components/Magnetic";
import { SocialIcon } from './SocialIcon';

export const SocialLink = React.memo(({
  href = '#',
  label,
  icon,
  iconName,
  iconClassName = '',
  children,
  className = '',
  iconWrapperClassName = '',
  labelClassName = '',
  magneticIntensity = 0.4,
}) => {
  const content = (
    <a
      href={href}
      data-cursor="hover"
      className={className}
    >
      <span className={iconWrapperClassName}>
        {icon || (iconName ? <SocialIcon name={iconName} className={iconClassName} title={label} /> : null)}
      </span>
      {children || <span className={labelClassName}>{label}</span>}
    </a>
  );

  return magneticIntensity === null ? content : <Magnetic intensity={magneticIntensity}>{content}</Magnetic>;
});

SocialLink.displayName = 'SocialLink';

SocialLink.propTypes = {
  href: PropTypes.string,
  label: PropTypes.string,
  icon: PropTypes.node,
  iconName: PropTypes.string,
  iconClassName: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  iconWrapperClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  magneticIntensity: PropTypes.number,
};

SocialLink.defaultProps = {
  href: '#',
  iconClassName: '',
  className: '',
  iconWrapperClassName: '',
  labelClassName: '',
  magneticIntensity: 0.4,
};