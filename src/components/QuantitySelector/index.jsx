import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import Icon from '../Icon';
import { ThemeContext } from '../ContextProviders/ThemeProvider';

export default function QuantitySelector({
  handleChange,
  defaultValue,
  maxValue,
}) {
  const [currVal, setVal] = useState(defaultValue);
  const theme = useContext(ThemeContext);
  const updateVal = newVal => {
    if (maxValue === null && newVal >= 0) {
      handleChange(newVal);
      setVal(newVal);
    } else if (maxValue !== null && newVal <= maxValue && newVal >= 0) {
      handleChange(newVal);
      setVal(newVal);
    }
  };

  return (
    <div className="number-input">
      <div
        data-testid="minus-button"
        className={`number-input__minus number-input__minus${
          currVal === 0 ? '--disabled' : '--active'
        }`}
        onClick={() => {
          updateVal(currVal - 1);
        }}
        onKeyPress={() => {
          updateVal(currVal - 1);
        }}
        role="button"
        tabIndex="0"
      >
        <Icon id="minusCircle" color={theme['primary-color']} />
      </div>
      <input
        data-testid="number-input"
        className="number-input__text-box"
        type="number"
        min="0"
        value={String(currVal)}
        onChange={e => {
          let inputVal = e.target.value;
          if (e.target.value !== null && inputVal[0] === '0') {
            inputVal = inputVal.slice(1);
          }
          updateVal(Number(inputVal));
        }}
      />
      <div
        data-testid="plus-button"
        className={`number-input__plus number-input__plus${
          maxValue !== null && currVal >= maxValue ? '--disabled' : '--active'
        }`}
        onClick={() => {
          updateVal(currVal + 1);
        }}
        onKeyPress={() => {
          updateVal(currVal + 1);
        }}
        role="button"
        tabIndex="0"
      >
        <Icon id="plusCircle" color={theme['primary-color']} />
      </div>
    </div>
  );
}

QuantitySelector.defaultProps = {
  handleChange: () => {},
  defaultValue: 0,
  maxValue: null,
};

QuantitySelector.propTypes = {
  handleChange: PropTypes.func,
  maxValue: PropTypes.number,
  defaultValue: PropTypes.number,
};
