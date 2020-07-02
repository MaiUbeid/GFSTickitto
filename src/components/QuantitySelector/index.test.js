import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import QuantitySelector from './index';

test('check that the default value prop works', async () => {
  const { getByTestId } = render(<QuantitySelector defaultValue={5} />);

  expect(Number(getByTestId('number-input').value)).toBe(5);
});

test('check that handleChange works', async () => {
  let returnedVal = null;

  const { getByTestId } = render(
    <QuantitySelector
      defaultValue={5}
      handleChange={val => {
        returnedVal = val;
      }}
    />
  );

  fireEvent.click(getByTestId('plus-button'));

  expect(Number(getByTestId('number-input').value)).toBe(6);
  expect(returnedVal).toBe(6);
});

test('check that maxValue works', async () => {
  const { getByTestId } = render(
    <QuantitySelector defaultValue={6} maxValue={6} />
  );

  fireEvent.click(getByTestId('plus-button'));
  expect(Number(getByTestId('number-input').value)).toBe(6);
});
