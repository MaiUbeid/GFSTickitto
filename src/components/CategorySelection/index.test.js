import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { PopupsContext } from '../ContextProviders/PopupsProvider';
import { EventsProvider } from '../ContextProviders/EventsProvider';

import CategorySelection from './index';

const fakeData = {
  categories: [
    'Category 1',
    'Category 2',
    'Category 3',
    'Category 4',
    'Category 5',
    'Category 6',
  ],
  checkedCategories: [],
  onCategoryCheck: () => {},
};

it('renders checkbox component', () => {
  const popupValues = {
    state: {
      displayCategories: true,
      displayAllCategories: false,
    },
  };
  const { getByTestId } = render(
    <PopupsContext.Provider value={popupValues}>
      <EventsProvider>
        <CategorySelection
          categories={fakeData.categories}
          checkedCategories={fakeData.checkedCategories}
          onCategoryCheck={fakeData.onCategoryCheck}
        />
      </EventsProvider>
    </PopupsContext.Provider>
  );
  expect(getByTestId('categorySelection').textContent).toContain('Categories');
});

it('renders category checkbox', () => {
  const popupValues = {
    state: {
      displayCategories: true,
      displayAllCategories: false,
    },
  };
  const { getByTestId } = render(
    <PopupsContext.Provider value={popupValues}>
      <EventsProvider>
        <CategorySelection
          categories={fakeData.categories}
          checkedCategories={fakeData.checkedCategories}
          onCategoryCheck={fakeData.onCategoryCheck}
        />
      </EventsProvider>
    </PopupsContext.Provider>
  );
  expect(
    getByTestId('categories').classList.contains('categories')
  ).toBeTruthy();
});

it('showAll test', async () => {
  const popupValues = {
    state: {
      displayCategories: true,
      displayAllCategories: true,
    },
  };

  const { findAllByTestId } = render(
    <PopupsContext.Provider value={popupValues}>
      <EventsProvider>
        <CategorySelection
          categories={fakeData.categories}
          checkedCategories={fakeData.checkedCategories}
          onCategoryCheck={fakeData.onCategoryCheck}
        />
      </EventsProvider>
    </PopupsContext.Provider>
  );

  const checkboxes = await findAllByTestId('checkbox');
  expect(checkboxes.length).toBe(fakeData.categories.length);
});

it('change checkedCategories when checked', async () => {
  const popupValues = {
    state: {
      displayCategories: true,
      displayAllCategories: true,
    },
  };

  const { findAllByTestId } = render(
    <PopupsContext.Provider value={popupValues}>
      <EventsProvider>
        <CategorySelection
          categories={fakeData.categories}
          checkedCategories={fakeData.checkedCategories}
          onCategoryCheck={fakeData.onCategoryCheck}
        />
      </EventsProvider>
    </PopupsContext.Provider>
  );

  const checkboxes = await findAllByTestId('checkbox');

  fireEvent.change(checkboxes[0], { target: { isChecked: true } });

  expect(checkboxes[0].isChecked).toBeTruthy();
});

it('check showAll button', async () => {
  const popupValues = {
    state: {
      displayCategories: true,
      displayAllCategories: false,
    },
  };

  const { getByTestId, findAllByTestId } = render(
    <PopupsContext.Provider value={popupValues}>
      <EventsProvider>
        <CategorySelection
          categories={fakeData.categories}
          checkedCategories={fakeData.checkedCategories}
          onCategoryCheck={fakeData.onCategoryCheck}
        />
      </EventsProvider>
    </PopupsContext.Provider>
  );

  const showAllButton = getByTestId('showAllButton');
  expect(showAllButton.textContent).toBe('Show all');

  fireEvent.change(showAllButton);

  const checkboxes = await findAllByTestId('checkbox');
  expect(checkboxes.length).toBe(5);
});

it('check showLess button', async () => {
  const popupValues = {
    state: {
      displayCategories: true,
      displayAllCategories: true,
    },
  };

  const { getByTestId, findAllByTestId } = render(
    <PopupsContext.Provider value={popupValues}>
      <EventsProvider>
        <CategorySelection
          categories={fakeData.categories}
          checkedCategories={fakeData.checkedCategories}
          onCategoryCheck={fakeData.onCategoryCheck}
        />
      </EventsProvider>
    </PopupsContext.Provider>
  );

  const showLessButton = getByTestId('showLessButton');
  expect(showLessButton.textContent).toBe(' - Show less');

  fireEvent.change(showLessButton);

  const checkboxes = await findAllByTestId('checkbox');
  expect(checkboxes.length).toBe(fakeData.categories.length);
});

it('check not show categories', () => {
  const popupValues = {
    state: {
      displayCategories: false,
    },
  };

  const { getByTestId } = render(
    <PopupsContext.Provider value={popupValues}>
      <EventsProvider>
        <CategorySelection
          categories={fakeData.categories}
          checkedCategories={fakeData.checkedCategories}
          onCategoryCheck={fakeData.onCategoryCheck}
        />
      </EventsProvider>
    </PopupsContext.Provider>
  );

  const checkboxes = getByTestId('categories').children;
  expect(checkboxes.length).toBe(0);
});
