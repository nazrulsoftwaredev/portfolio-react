/**
 * SectionLabel Component
 * Unified label component for all section headers
 * Ensures consistent typography, spacing, and styling across all sections
 */

import React from 'react';
import PropTypes from 'prop-types';

function SectionLabel({ text = "SECTION", accent = false }) {
  return (
    <div className={`section-label ${accent ? 'section-label--accent' : ''}`}>
      {text}
    </div>
  );
}

SectionLabel.propTypes = {
  text: PropTypes.string,
  accent: PropTypes.bool,
};

SectionLabel.defaultProps = {
  text: 'SECTION',
  accent: false,
};

export default React.memo(SectionLabel);
