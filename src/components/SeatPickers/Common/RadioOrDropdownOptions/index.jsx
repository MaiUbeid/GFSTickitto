import React, { useState, useEffect } from 'react';
import './style.scss';
import PropTypes from 'prop-types';
import { Radio } from 'antd';
import className from 'classnames';
import TextWithSubtext from '../../../TextWithSubtext';
import Dropdown from '../../../Dropdown';

export default function RadioOrDropdownOptions({
  options = [],
  handleSelection,
  isDisabled,
  title,
}) {
  const [checkedVal, setCheckedVal] = useState(null);
  useEffect(() => {
    if (checkedVal != null) {
      handleSelection(checkedVal); // return the data passed to it
    }
  }, [handleSelection, checkedVal]);
  // render the options as checkboxes or dropdown
  let renderSlotRows = null;
  if (options.length < 7) {
    const slotItems = options.map(option => {
      return (
        <Radio
          onClick={() => {
            if (!isDisabled) {
              setCheckedVal(option.data);
            }
          }}
          key={option.displayName}
          checked={JSON.stringify(option.data) === JSON.stringify(checkedVal)}
        >
          <TextWithSubtext
            mainText={option.displayName}
            subText={option.extraDisplayName}
          />
        </Radio>
      );
    });

    const firstPart = slotItems.slice(0, 3);
    const secondPart = slotItems.slice(3, 6);
    renderSlotRows = [];
    if (firstPart.length !== 0) {
      renderSlotRows.push(
        <div key={firstPart} className="radio-dropdown-options__part">
          {firstPart}
        </div>
      );
    }
    if (secondPart.length !== 0) {
      renderSlotRows.push(
        <div key={secondPart} className="radio-dropdown-options__part">
          {secondPart}
        </div>
      );
    }
  } else {
    const dropdownOptions = options.map(slot => {
      return {
        label: `${slot.displayName} ${
          slot.extraDisplayName ? slot.extraDisplayName : ''
        }`,
        value: slot.data,
      };
    });

    renderSlotRows = (
      <Dropdown
        options={dropdownOptions}
        onSelect={data => {
          if (!isDisabled) {
            setCheckedVal(data);
          }
        }}
      />
    );
  }

  const mainClass = className({
    'radio-dropdown-options': true,
    'radio-dropdown-options--disabled': isDisabled,
  });

  return (
    <div className={mainClass}>
      {title && <h2 className="radio-dropdown-options__title">{title}</h2>}
      {renderSlotRows}
    </div>
  );
}

RadioOrDropdownOptions.defaultProps = {
  isDisabled: false,
  title: null,
};

RadioOrDropdownOptions.propTypes = {
  isDisabled: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      data: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
        .isRequired,
      displayName: PropTypes.string.isRequired,
      extraDisplayName: PropTypes.string,
    })
  ).isRequired,
  handleSelection: PropTypes.func.isRequired,
  title: PropTypes.string,
};
