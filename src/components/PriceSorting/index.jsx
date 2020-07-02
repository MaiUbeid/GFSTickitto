import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Radio } from 'antd';

import { ThemeContext } from '../ContextProviders/ThemeProvider';
import { PopupsContext } from '../ContextProviders/PopupsProvider';
import Button from '../Button';
import './style.scss';

export default function PriceSorting({ value, onSortingChange, sortTickets }) {
  const theme = useContext(ThemeContext);
  const { state, actions } = useContext(PopupsContext);

  return (
    <div className="price-sorting" data-testid="priceSort">
      <div className="price-sorting__header">
        <span className="price-sorting__title">Sort</span>
        <Button
          text=""
          buttonType="link"
          buttonStyle="price-sorting__header-button"
          handleOnClick={() =>
            actions.togglePopup('displayPriceSortingOptions')
          }
          icon={state.displayPriceSortingOptions ? 'arrowUp' : 'arrowDown'}
          iconColor={theme['primary-color']}
          iconStyle="price-sorting__header-icon"
          testid="toggleButton"
        />
      </div>

      <Radio.Group
        className={
          state.displayPriceSortingOptions
            ? 'price-sorting__body'
            : 'price-sorting__body--hide'
        }
        onChange={e => onSortingChange(e.target.value)}
        value={value}
      >
        <Radio
          value={1}
          className="radio-button"
          checked
          onClick={() => sortTickets()}
        >
          Price: High to low
        </Radio>
        <Radio
          value={2}
          className="radio-button second-radio"
          onClick={() => sortTickets()}
        >
          Price: Low to high
        </Radio>
      </Radio.Group>
    </div>
  );
}

PriceSorting.propTypes = {
  value: PropTypes.number.isRequired,
  onSortingChange: PropTypes.func.isRequired,
  sortTickets: PropTypes.func.isRequired,
};
