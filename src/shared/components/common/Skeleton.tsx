import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

/**
 * Skeleton Loader Component
 * Placeholder for content while loading
 */
export const Skeleton = ({
  width = 'w-full',
  height = 'h-4',
  variant = 'text', // 'text', 'circle', 'rect', 'line'
  count = 1,
  className = '',
  animate = true,
}) => {
  const shapeClasses = {
    text: 'rounded',
    circle: 'rounded-full',
    rect: 'rounded-lg',
    line: 'rounded-full',
  };

  const shape = shapeClasses[variant] || shapeClasses.text;

  const skeletonItem = (
    <motion.div
      animate={
        animate
          ? { opacity: [0.6, 1, 0.6] }
          : {}
      }
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={`bg-surface-variant/40 ${width} ${height} ${shape} ${className}`}
    />
  );

  if (count === 1) {
    return skeletonItem;
  }

  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i}>{skeletonItem}</div>
      ))}
    </div>
  );
};

Skeleton.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  variant: PropTypes.oneOf(['text', 'circle', 'rect', 'line']),
  count: PropTypes.number,
  className: PropTypes.string,
  animate: PropTypes.bool,
};

Skeleton.defaultProps = {
  width: 'w-full',
  height: 'h-4',
  variant: 'text',
  count: 1,
  className: '',
  animate: true,
};

/**
 * Table Row Skeleton
 * Useful for loading table rows
 */
export const SkeletonRow = ({ columns = 5 }) => (
  <div className="flex gap-4 p-4">
    {Array.from({ length: columns }).map((_, i) => (
      <Skeleton
        key={i}
        width={i === 0 ? 'w-24' : 'w-32'}
        height="h-4"
        className="flex-1"
      />
    ))}
  </div>
);

SkeletonRow.propTypes = {
  columns: PropTypes.number,
};

SkeletonRow.defaultProps = {
  columns: 5,
};

/**
 * Card Skeleton
 * Useful for loading card components
 */
export const SkeletonCard = () => (
  <div className="bg-surface rounded-lg p-6 border border-outline/20 space-y-4">
    {/* Header */}
    <Skeleton width="w-2/3" height="h-6" />

    {/* Image placeholder */}
    <Skeleton width="w-full" height="h-40" variant="rect" />

    {/* Text lines */}
    <div className="space-y-3">
      <Skeleton width="w-full" height="h-4" />
      <Skeleton width="w-4/5" height="h-4" />
      <Skeleton width="w-3/5" height="h-4" />
    </div>

    {/* Button placeholder */}
    <Skeleton width="w-1/3" height="h-10" variant="rect" />
  </div>
);

export default Skeleton;
