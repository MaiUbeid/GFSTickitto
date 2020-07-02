import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PrioOptionsPicker from './index';
import { prioOptionsAvailibilityData } from './testData';
import {
  // ApiAvailabilityProvider,
  ApiAvailibilityContext,
} from '../../../ContextProviders/ApiAvailabilityProvider';

// prio ovent with options data
const prioOptionsAvailibilty = prioOptionsAvailibilityData;

test('check that the correct options are returned works', async () => {
  let returnedVal = null;
  const { findAllByTestId } = render(
    <ApiAvailibilityContext.Provider value={prioOptionsAvailibilty}>
      <PrioOptionsPicker
        defaultValue={5}
        handleOptionsSelected={val => {
          returnedVal = val;
        }}
      />
    </ApiAvailibilityContext.Provider>
  );

  const plusButtons = await findAllByTestId('plus-button');

  fireEvent.click(plusButtons[0]);
  fireEvent.click(plusButtons[0]);
  fireEvent.click(plusButtons[1]);

  expect(returnedVal).toStrictEqual({
    product_options: [
      {
        option_id: '448',
        option_values: [
          { value_count: 2, value_id: '448_meat' },
          { value_count: 1, value_id: '448_fish' },
        ],
      },
    ],
  });
});
