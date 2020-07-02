import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { AppViewProvider } from '../ContextProviders/AppViewProvider';
import { EventsContext } from '../ContextProviders/EventsProvider';

import '../../test/matchmedia.mock';
import DatePickers from './index';

const eventParameters = {
  t1: '2020-06-29',
  t2: '2021-06-29',
};

describe('test DatePickers component', () => {
  it('renders DatePickers component', () => {
    const { getByTestId } = render(
      <AppViewProvider>
        <EventsContext.Provider value={[eventParameters]}>
          <DatePickers className="default__picker" onSelection={() => {}} />
        </EventsContext.Provider>
      </AppViewProvider>
    );

    expect(
      getByTestId('datePickerTest').classList.contains('default__picker')
    ).toBeTruthy();
  });

  it('check input placeholders', () => {
    render(
      <AppViewProvider>
        <EventsContext.Provider value={[eventParameters]}>
          <DatePickers className="default__picker" onSelection={() => {}} />
        </EventsContext.Provider>
      </AppViewProvider>
    );

    const inputs = document.getElementsByTagName('input');

    expect(inputs[0].placeholder).toBe('From');
    expect(inputs[1].placeholder).toBe('Until');
  });
});
