/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { ThemeContext } from '../ContextProviders/ThemeProvider';
import { EventsContext } from '../ContextProviders/EventsProvider';

import Icon from '../Icon';

import './style.scss';

export default function Checkbox({
  checkedCategories,
  location,
  onChange,
  isCheckedByDefault,
  item,
  className,
  testid,
}) {
  const fromDate = moment(new Date()).format('YYYY-MM-DD');
  const toDate = moment(new Date())
    .add(11, 'months')
    .format('YYYY-MM-DD');

  const [isChecked, toggleChecked] = useState(isCheckedByDefault);

  const theme = useContext(ThemeContext);
  const [{ categories }, setParameters] = useContext(EventsContext);

  return (
    <div className={className} data-testid={testid}>
      <label htmlFor={item} className="checkbox__label">
        <div
          className="checkbox__span"
          onClick={() => {
            toggleChecked(!isChecked);
            onChange(!isChecked, item);
            setParameters({
              t1: fromDate,
              t2: toDate,
              categories: checkedCategories,
              city: location.city,
              country: location.country,
              country_code: location.country_code,
            });
          }}
          onKeyDown={() => {
            toggleChecked(!isChecked);
            onChange(!isChecked, item);
            setParameters({
              t1: fromDate,
              t2: toDate,
              categories: checkedCategories,
              city: location.city,
              country: location.country,
              country_code: location.country_code,
            });
          }}
        >
          {isChecked && (
            <Icon
              id="coloredCheck"
              iconStyle="checkbox__span-inner"
              color={theme['primary-color']}
            />
          )}
        </div>
        <div className="checkbox__value">{item}</div>
      </label>
    </div>
  );
}

Checkbox.defaultProps = {
  testid: '',
  isCheckedByDefault: false,
};

Checkbox.propTypes = {
  checkedCategories: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  item: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  testid: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  isCheckedByDefault: PropTypes.bool,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};
