import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

export default function ErrorOverlay({ content }) {
  return <div className="error-overlay"> {content} </div>;
}

ErrorOverlay.propTypes = {
  content: PropTypes.element.isRequired,
};
