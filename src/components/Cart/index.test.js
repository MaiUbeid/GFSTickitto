import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { PopupsProvider } from '../ContextProviders/PopupsProvider';
import Cart from './index';
import data from './data';

it('check that feather is being attached to the dom', () => {
  const { getByTestId } = render(
    <PopupsProvider>
      <Cart handleCartClick={() => {}} handleOnClick={() => {}} />
    </PopupsProvider>
  );
  expect(
    getByTestId('CartComponent').classList.contains('popup-cart--hide')
  ).toBeTruthy();
});

it('testing rendering actions', () => {
  const { getByTestId } = render(
    <PopupsProvider>
      <Cart handleCartClick={() => {}} handleOnClick={() => {}} />
    </PopupsProvider>
  );
  expect(getByTestId('CartComponent').textContent).toContain(
    'Total cart price'
  );
});

it('testing rendering line between each card', () => {
  render(
    <PopupsProvider>
      <Cart handleCartClick={() => {}} handleOnClick={() => {}} />
    </PopupsProvider>
  );
  const cartClasses = [].concat(
    ...[...document.querySelectorAll('*')].map(element => [
      ...element.classList,
    ])
  );
  expect(cartClasses).toContain('popup-cart__ticket-line');
});

it('testing rendering image', () => {
  const { getByTestId } = render(
    <PopupsProvider>
      <Cart handleCartClick={() => {}} handleOnClick={() => {}} />
    </PopupsProvider>
  );
  expect(
    getByTestId('CartComponent')
      .querySelector('img[src="https://i.imgur.com/Th1NCXc.png"]')
      .getAttribute('src')
  ).toBe(data[0].imgUrl);
});

it('testing rendering ticket details in cart', () => {
  const { getByTestId } = render(
    <PopupsProvider>
      <Cart handleCartClick={() => {}} handleOnClick={() => {}} />
    </PopupsProvider>
  );
  expect(getByTestId('CartComponent').textContent).toContain(data[0].name);
  expect(getByTestId('CartComponent').textContent).toContain(data[0].date);
  expect(getByTestId('CartComponent').textContent).toContain(data[0].ticketsNo);
  expect(getByTestId('CartComponent').textContent).toContain(
    data[0].ticketType
  );
  expect(getByTestId('CartComponent').textContent).toContain(
    data[0].ticketPrice
  );
  expect(getByTestId('CartComponent').textContent).toContain('£');
  expect(getByTestId('CartComponent').textContent).toContain('20.00');
});

it('testing rendering buttons with icons', () => {
  render(
    <PopupsProvider>
      <Cart handleCartClick={() => {}} handleOnClick={() => {}} />
    </PopupsProvider>
  );
  const cartClasses = [].concat(
    ...[...document.querySelectorAll('*')].map(element => [
      ...element.classList,
    ])
  );
  expect(cartClasses).toContain('popup-cart__ticket-button');
});
