import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import QuantitySelector from '../QuantitySelector';
import TextWithSubtext from '../TextWithSubtext';

export default function QuantitySelectRow({
  mainText,
  subText,
  handleChange,
  maxValue,
  defaultValue,
}) {
  return (
    <div className="quantity-select-row">
      <TextWithSubtext
        mainText={mainText}
        subText={subText && `(${subText})`}
      />
      <div className="quantity-select-row__selector">
        <QuantitySelector
          handleChange={handleChange}
          maxValue={maxValue}
          defaultValue={defaultValue}
        />
      </div>
    </div>
  );
}

QuantitySelectRow.defaultProps = {
  subText: null,
  handleChange: () => {},
  maxValue: null,
  defaultValue: 0,
};

QuantitySelectRow.propTypes = {
  mainText: PropTypes.string.isRequired,
  subText: PropTypes.string,
  handleChange: PropTypes.func,
  maxValue: PropTypes.number,
  defaultValue: PropTypes.number,
};
