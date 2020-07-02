import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import '../../../test/matchmedia.mock';

import Confirmation from './index';
import data from './data';

describe('test forth step component', () => {
  const fakeData = {
    paymentStatus: false,
    userInfo: {
      'First name': 'Mai',
      'Last name': 'Ubeid',
      Email: 'example@example.com',
      Phone: '',
    },
    paymentInfo: {
      holderName: '',
      creditNumber: '12345678',
      cvv: '',
      month: '',
      year: '',
    },
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

  it('test render the payment fail', () => {
    act(() => {
      render(
        <Confirmation
          paymentStatus={fakeData.paymentStatus}
          userInfo={fakeData.userInfo}
          paymentInfo={fakeData.paymentInfo}
        />,
        container
      );
    });

    const paymentFailButton = document.querySelector(
      '[data-testid=paymentFailButton]'
    );

    expect(container.textContent).toContain('Payment failed');

    expect(paymentFailButton.textContent).toBe('Return to checkout');

    expect(container.textContent).toContain('To try again');
  });

  it('test render the payment success', () => {
    act(() => {
      render(
        <Confirmation
          paymentStatus
          userInfo={fakeData.userInfo}
          paymentInfo={fakeData.paymentInfo}
        />,
        container
      );
    });

    const paymentFailButton = document.querySelector(
      '[data-testid=paymentFailButton]'
    );

    expect(paymentFailButton).toBe(null);

    expect(container.textContent).toContain('Your tickets are ready');
  });

  it('test render the user details card', () => {
    act(() => {
      render(
        <Confirmation
          paymentStatus
          userInfo={fakeData.userInfo}
          paymentInfo={fakeData.paymentInfo}
        />,
        container
      );
    });

    const paymentSection = document.querySelector('[data-testid=paymentInfo]');

    expect(container.textContent).toContain('Your details');

    expect(paymentSection.children[1].textContent).toContain(
      'VISA Debit ending in 5678'
    );
  });

  it('test tickets data in success payment', () => {
    act(() => {
      render(
        <Confirmation
          paymentStatus
          userInfo={fakeData.userInfo}
          paymentInfo={fakeData.paymentInfo}
        />,
        container
      );
    });

    const ticketsData = document.querySelector('[data-testid=ticketsData]');
    expect(ticketsData.children.length).toBe(3);

    expect(ticketsData.children[0].children.length).toBe(2);
  });

  it('test data in success payment', () => {
    act(() => {
      render(
        <Confirmation
          paymentStatus
          userInfo={fakeData.userInfo}
          paymentInfo={fakeData.paymentInfo}
        />,
        container
      );
    });

    const attractionImage = document.querySelector(
      '[data-testid=attractionImage]'
    );

    expect(attractionImage.getAttribute('src')).toBe(data.imageUrl);
  });
});
