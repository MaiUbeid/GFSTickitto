import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import classNames from 'classnames';
import Icon from '../Icon';
import { ThemeContext } from '../ContextProviders/ThemeProvider';
import TextWithSubtext from '../TextWithSubtext';

export default function OptionSelect({
  mainText,
  subText,
  handleClick,
  isDisabled,
}) {
  const theme = useContext(ThemeContext);

  const mainClass = classNames({
    'option-select': true,
    'option-select--disabled': isDisabled,
  });

  return (
    <div className={mainClass}>
      <TextWithSubtext
        mainText={mainText}
        subText={subText}
        isDisabled={isDisabled}
      />
      <button
        className="option-select__button"
        type="button"
        onClick={() => !isDisabled && handleClick(mainText)}
      >
        <span className="option-select__button__label">Select</span>
        <div className="option-select__button__icon">
          <Icon id="rightAngle" color={theme['primary-color']} />
        </div>
      </button>
    </div>
  );
}

OptionSelect.defaultProps = {
  subText: '',
  isDisabled: false,
};

OptionSelect.propTypes = {
  mainText: PropTypes.string.isRequired,
  subText: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
};
