import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { Select } from 'antd';
import Icon from '../Icon';

export default function Dropdown({
  options = [],
  onSelect,
  placeholder,
  iconColor,
  dropdownStyle,
}) {
  const dropdownRef = useRef('dropdown');

  const reformatOptions = options.map(option => {
    return {
      label: option.label,
      value: JSON.stringify(option.value),
    };
  });

  return (
    <div className={`dropdown ${dropdownStyle}`} ref={dropdownRef}>
      <Select
        suffixIcon={<Icon id="leftAngle" color={iconColor} />}
        onSelect={value => {
          onSelect(JSON.parse(value));
        }}
        showSearch
        placeholder={placeholder}
        className="dropdown__select"
        options={reformatOptions}
        getPopupContainer={() => dropdownRef.current}
        data-testid="select"
      />
    </div>
  );
}

Dropdown.defaultProps = {
  dropdownStyle: '',
  onSelect: () => {},
  iconColor: '',
};

Dropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  onSelect: PropTypes.func,
  placeholder: PropTypes.string.isRequired,
  iconColor: PropTypes.string,
  dropdownStyle: PropTypes.string,
};
