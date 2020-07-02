import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import classNames from 'classnames';

export default function TextWithSubtext({ mainText, subText, isDisabled }) {
  const mainClass = classNames({
    'text-with-subtext': true,
    'text-with-subtext--disabled': isDisabled,
  });

  return (
    <div className={mainClass}>
      <div className="text-with-subtext__main">{mainText}</div>
      <div className="text-with-subtext__sub">{subText && `${subText}`}</div>
    </div>
  );
}

TextWithSubtext.defaultProps = {
  subText: '',
  isDisabled: false,
};

TextWithSubtext.propTypes = {
  mainText: PropTypes.string.isRequired,
  subText: PropTypes.string,
  isDisabled: PropTypes.bool,
};
