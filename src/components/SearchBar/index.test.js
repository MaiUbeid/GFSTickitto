import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import { AppViewProvider } from '../ContextProviders/AppViewProvider';
import { EventsContext } from '../ContextProviders/EventsProvider';

import '../../test/matchmedia.mock';
import SearchBar from './index';

describe('test SearchBar component', () => {
  let container = null;

  const handleButtonClick = jest.fn();

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('test render SearchBar', () => {
    act(() => {
      render(
        <AppViewProvider>
          <EventsContext.Provider
            value={[
              {
                t1: '2020-06-29',
                t2: '2021-06-29',
              },
            ]}
          >
            <SearchBar handleButtonClick={handleButtonClick} />
          </EventsContext.Provider>
        </AppViewProvider>,
        container
      );
    });

    expect(container.children[0].children[0].classList[0]).toBe('search-bar');
  });

  it('test render Search input', () => {
    act(() => {
      render(
        <AppViewProvider>
          <EventsContext.Provider
            value={[
              {
                t1: '2020-06-29',
                t2: '2021-06-29',
              },
            ]}
          >
            <SearchBar handleButtonClick={handleButtonClick} />
          </EventsContext.Provider>
        </AppViewProvider>,
        container
      );
    });

    expect(
      document.querySelector('[data-testid=searchInput]').placeholder
    ).toBe('Search destination, event name or category');
  });

  it('test render Search date picker', () => {
    act(() => {
      render(
        <AppViewProvider>
          <EventsContext.Provider
            value={[
              {
                t1: '2020-06-29',
                t2: '2021-06-29',
              },
            ]}
          >
            <SearchBar handleButtonClick={handleButtonClick} />
          </EventsContext.Provider>
        </AppViewProvider>,
        container
      );
    });

    const datePicker = document.querySelector('[data-testid=datePickerTest]');

    expect(datePicker.classList.contains('default__picker')).toBeTruthy();
  });

  it('test render Search date button', () => {
    act(() => {
      render(
        <AppViewProvider>
          <EventsContext.Provider
            value={[
              {
                t1: '2020-06-29',
                t2: '2021-06-29',
              },
            ]}
          >
            <SearchBar handleButtonClick={handleButtonClick} />
          </EventsContext.Provider>
        </AppViewProvider>,
        container
      );
    });

    const button = document.querySelector('[data-testid=searchButton]');

    expect(button.children[0].textContent).toBe('Go');
  });
});
