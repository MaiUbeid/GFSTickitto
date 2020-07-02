import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { AppViewProvider } from '../ContextProviders/AppViewProvider';
import {
  PopupsProvider,
  PopupsContext,
} from '../ContextProviders/PopupsProvider';

import '../../test/matchmedia.mock';
import PriceSorting from './index';

const fakeData = {
  onSortingChange: () => {},
  value: 1,
  sortTickets: () => {},
};

describe('testing price sorting component', () => {
  it('should render price sorting component ', () => {
    const { getByTestId } = render(
      <AppViewProvider>
        <PopupsProvider>
          <PriceSorting
            value={fakeData.value}
            sortTickets={fakeData.sortTickets}
            onSortingChange={fakeData.onSortingChange}
          />
        </PopupsProvider>
      </AppViewProvider>
    );
    expect(getByTestId('priceSort').textContent).toContain('Sort');
  });

  it('should render sort options when showSortOptions is true ', () => {
    render(
      <AppViewProvider>
        <PopupsProvider>
          <PriceSorting
            value={fakeData.value}
            sortTickets={fakeData.sortTickets}
            onSortingChange={fakeData.onSortingChange}
          />
        </PopupsProvider>
      </AppViewProvider>
    );

    const classes = [].concat(
      ...[...document.querySelectorAll('*')].map(element => [
        ...element.classList,
      ])
    );

    expect(classes).not.toContain('price-sorting__body--hide');
  });

  it('should not render sort options when showSortOptions is false ', () => {
    render(
      <AppViewProvider>
        <PopupsContext.Provider
          value={{
            state: {
              displayPriceSortingOptions: false,
            },
          }}
        >
          <PriceSorting
            value={fakeData.value}
            sortTickets={fakeData.sortTickets}
            onSortingChange={fakeData.onSortingChange}
          />
        </PopupsContext.Provider>
      </AppViewProvider>
    );

    const classes = [].concat(
      ...[...document.querySelectorAll('*')].map(element => [
        ...element.classList,
      ])
    );

    expect(classes).toContain('price-sorting__body--hide');
  });

  it('should only have two options', () => {
    render(
      <AppViewProvider>
        <PopupsContext.Provider
          value={{
            state: {
              displayPriceSortingOptions: false,
            },
          }}
        >
          <PriceSorting
            value={fakeData.value}
            sortTickets={fakeData.sortTickets}
            onSortingChange={fakeData.onSortingChange}
          />
        </PopupsContext.Provider>
      </AppViewProvider>
    );

    const sortOptions = document.getElementsByClassName('radio-button');
    expect(sortOptions.length).toBe(2);
  });

  it('descending button should be high to low', () => {
    const onClick = jest.fn();
    render(
      <AppViewProvider>
        <PopupsContext.Provider
          value={{
            state: {
              displayPriceSortingOptions: false,
            },
          }}
        >
          <PriceSorting
            value={fakeData.value}
            sortTickets={fakeData.sortTickets}
            onSortingChange={onClick}
          />
        </PopupsContext.Provider>
      </AppViewProvider>
    );

    const asceButton = document.getElementsByClassName('radio-button')[0];
    expect(asceButton.textContent).toContain('Price: High to low');
  });

  it('ascending button should be clicked once', () => {
    const onClick = jest.fn();
    render(
      <AppViewProvider>
        <PopupsContext.Provider
          value={{
            state: {
              displayPriceSortingOptions: false,
            },
          }}
        >
          <PriceSorting
            value={fakeData.value}
            sortTickets={fakeData.sortTickets}
            onSortingChange={onClick}
          />
        </PopupsContext.Provider>
      </AppViewProvider>
    );

    const asceButton = document.getElementsByClassName('radio-button')[1];
    asceButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
