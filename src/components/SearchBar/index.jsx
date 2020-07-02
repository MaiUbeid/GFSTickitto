import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

import * as ROUTES from '../../constants/routes';

import { ThemeContext } from '../ContextProviders/ThemeProvider';
import DatePickers from '../DatePickers';
import Button from '../Button';
import Icon from '../Icon';

import './style.scss';

export default function SearchBar({ handleButtonClick }) {
  const theme = useContext(ThemeContext);
  const [selectedDates, setSelectedDates] = useState(null);

  return (
    <div className="search-bar">
      <Input.Group className="search-bar__sub-container" size="large" compact>
        <Input
          placeholder="Search destination, event name or category"
          className="search-bar__sub-container__input"
          data-testid="searchInput"
          prefix={
            <Icon
              id="search"
              iconStyle="search-bar__sub-container__input__icon"
              color={theme['primary-color']}
            />
          }
        />
        <DatePickers
          className="default__picker"
          onSelection={dates => {
            if (Array.isArray(dates) && dates.length > 1) {
              setSelectedDates({ t1: dates[0], t2: dates[1] });
            }
          }}
        />
        <Button
          text="Go"
          buttonType="primary"
          handleOnClick={() => {
            if (selectedDates && selectedDates !== null) {
              handleButtonClick(
                `${ROUTES.SEARCH_RESULTS}?from_date=${selectedDates.t1.format(
                  'YYYY-MM-DD'
                )}&to_date=${selectedDates.t2.format('YYYY-MM-DD')}`
              );
            }
          }}
          isWithArrow
          iconColor={theme['secondary-icon-color']}
          arrowStyle="search-bar__sub-container__button-icon"
          testid="searchButton"
        />
      </Input.Group>
    </div>
  );
}

SearchBar.propTypes = {
  handleButtonClick: PropTypes.func.isRequired,
};
