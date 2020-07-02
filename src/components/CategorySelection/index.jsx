/* eslint-disable react/no-array-index-key */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Col } from 'antd';

import { ThemeContext } from '../ContextProviders/ThemeProvider';
import { PopupsContext } from '../ContextProviders/PopupsProvider';
import Button from '../Button';
import Checkbox from '../Checkbox';

import './style.scss';

export default function CategorySelection({
  categories,
  checkedCategories,
  onCategoryCheck,
  location,
}) {
  const theme = useContext(ThemeContext);
  const { state, actions } = useContext(PopupsContext);

  return (
    <div data-testid="categorySelection">
      <div className="categories__header">
        <h2 className="categories__header-title">Categories</h2>
        <Button
          text=""
          buttonType="link"
          buttonStyle="categories__header-button"
          handleOnClick={() => actions.togglePopup('displayCategories')}
          icon={state.displayCategories ? 'arrowUp' : 'arrowDown'}
          iconColor={theme['primary-color']}
          iconStyle="categories__header-icon"
          testid="categoryArrow"
        />
      </div>
      <Col span={24} className="categories" data-testid="categories">
        {!state.displayCategories
          ? null
          : state.displayAllCategories
          ? categories.map((item, key) => {
              return (
                <Checkbox
                  item={item}
                  isCheckedByDefault={
                    checkedCategories && checkedCategories.includes(item)
                  }
                  checkedCategories={checkedCategories}
                  onChange={onCategoryCheck}
                  key={item + key}
                  className="categories__checkbox"
                  testid="checkbox"
                  location={location}
                />
              );
            })
          : categories.slice(0, 5).map((item, key) => {
              return (
                <Checkbox
                  item={item}
                  isCheckedByDefault={
                    checkedCategories && checkedCategories.includes(item)
                  }
                  checkedCategories={checkedCategories}
                  onChange={onCategoryCheck}
                  key={item + key}
                  className="categories__checkbox"
                  testid="checkbox"
                  location={location}
                />
              );
            })}
      </Col>
      <Col span={24} className="categories__button">
        {!state.displayCategories ? null : state.displayAllCategories ? (
          <Button
            text=" - Show less"
            buttonType="link"
            buttonStyle="categories__checkbox-showAll__button"
            handleOnClick={() => actions.togglePopup('displayAllCategories')}
            testid="showLessButton"
          />
        ) : (
          <Button
            text="Show all"
            buttonType="link"
            buttonStyle="categories__checkbox-showAll__button"
            handleOnClick={() => actions.togglePopup('displayAllCategories')}
            testid="showAllButton"
            icon="plus"
            iconStyle="categories__checkbox-showAll__icon"
            iconColor={theme['secondary-color']}
          />
        )}
      </Col>
    </div>
  );
}

CategorySelection.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  checkedCategories: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onCategoryCheck: PropTypes.func.isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};
