import React, { useState, useEffect } from 'react';
import './style.scss';
import PropTypes from 'prop-types';
import { Radio } from 'antd';
import TextWithSubtext from '../../../TextWithSubtext';
import Dropdown from '../../../Dropdown';

export default function SlotSelect({ slots, handleSelection }) {
  const [checkedVal, setCheckedVal] = useState(null);
  useEffect(() => {
    if (checkedVal != null) {
      handleSelection(checkedVal);
    }
  }, [handleSelection, checkedVal]);

  // render the options as checkboxes or dropdown
  let renderSlotRows = null;
  if (slots.length < 7) {
    renderSlotRows = slots.map(slot => {
      return (
        <Radio
          onClick={() => {
            setCheckedVal(slot.data);
          }}
          key={slot.displayName}
          checked={JSON.stringify(slot.data) === JSON.stringify(checkedVal)}
        >
          <TextWithSubtext mainText={slot.displayName} />
        </Radio>
      );
    });
  } else {
    const dropdownOptions = slots.map(slot => {
      return {
        label: slot.displayName,
        value: slot.data,
      };
    });

    renderSlotRows = (
      <Dropdown
        options={dropdownOptions}
        onSelect={slot => {
          setCheckedVal(slot);
        }}
      />
    );
  }

  return (
    <div className="slot-select">
      <h2 className="slot-select__title">Select your entry time</h2>
      <div className="slot-select__options">{renderSlotRows}</div>
    </div>
  );
}

SlotSelect.defaultProps = {
  slots: [],
  handleSelection: () => {},
};

SlotSelect.propTypes = {
  slots: PropTypes.arrayOf(
    PropTypes.shape({
      displayName: PropTypes.string.isRequired,
      data: PropTypes.object.isRequired,
    })
  ),
  handleSelection: PropTypes.func,
};
