import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import './style.scss';

export default function Overlay({ showComponent, displayComponent }) {
  useEffect(() => {
    if (showComponent) {
      document.body.classList.add('noscroll');
    }
    return () => document.body.classList.remove('noscroll');
  }, [showComponent]);
  return (
    <div
      role="button"
      tabIndex="0"
      aria-pressed="false"
      aria-label="overlay"
      className={showComponent ? 'overlay' : null}
      onClick={() => displayComponent()}
      onKeyPress={() => displayComponent()}
    />
  );
}

Overlay.propTypes = {
  showComponent: PropTypes.bool.isRequired,
  displayComponent: PropTypes.func.isRequired,
};
