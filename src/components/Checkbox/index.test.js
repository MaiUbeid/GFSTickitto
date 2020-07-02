import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import { EventsProvider } from '../ContextProviders/EventsProvider';

import Checkbox from './index';

describe('test Checkbox Component', () => {
  const fakeData = {
    checkedCategories: [],
    item: 'Category',
  };

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

  it('renders Checkbox component', () => {
    const onCategoryCheck = jest.fn();

    act(() => {
      render(
        <EventsProvider>
          <Checkbox
            checkedCategories={fakeData.checkedCategories}
            item={fakeData.item}
            onChange={onCategoryCheck}
            className="categories__checkbox"
          />
        </EventsProvider>,
        container
      );
    });
    expect(container.textContent).toContain('Category');
  });
});
