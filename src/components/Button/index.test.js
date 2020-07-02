import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import Button from './index';

describe('test Button Component', () => {
  let container = null;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('renders Button component', () => {
    const toggleShowAll = jest.fn();

    act(() => {
      render(
        <Button
          text="Show all"
          buttonType="link"
          handleOnClick={toggleShowAll}
          testid="showAllButton"
          icon="plus"
          iconStyle="categories__checkbox-showAll__icon"
          iconColor="#4f5157"
        />,
        container
      );
    });

    expect(container.textContent).toContain('Show all');
  });

  it('check class names in Button', () => {
    const toggleShowAll = jest.fn();

    act(() => {
      render(
        <Button
          text="Show all"
          buttonType="link"
          handleOnClick={() => toggleShowAll()}
          testid="showAllButton"
          icon="plus"
          iconStyle="categories__checkbox-showAll__icon"
          iconColor="#4f5157"
        />,
        container
      );
    });

    const showAllButton = document.querySelector('[data-testid=showAllButton]');

    expect(showAllButton.classList.contains('button-link')).toBeTruthy();
  });

  it('check arrow primary Button', () => {
    const handleButtonClick = jest.fn();

    act(() => {
      render(
        <Button
          text="Go"
          buttonType="primary"
          handleOnClick={handleButtonClick}
          isWithArrow
          iconColor="#FFFFFF"
          arrowStyle="search-bar__sub-container__button-icon"
          testid="searchButton"
        />,
        container
      );
    });

    const searchButton = document.querySelector('[data-testid=searchButton]');

    expect(searchButton.classList.contains('button-primary')).toBeTruthy();
  });
});
