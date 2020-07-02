import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import DetailsCard from './index';
import '../../../test/matchmedia.mock';

describe('test ticket details card component', () => {
  const fakeDate = {
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

  it('test render the card', () => {
    act(() => {
      render(
        <DetailsCard
          userInfo={fakeDate.userInfo}
          paymentInfo={fakeDate.paymentInfo}
          step={3}
        />,
        container
      );
    });
    expect(container.textContent).toContain('Your details');
  });

  it('test render the user details', () => {
    act(() => {
      render(
        <DetailsCard
          userInfo={fakeDate.userInfo}
          paymentInfo={fakeDate.paymentInfo}
          step={3}
        />,
        container
      );
    });
    expect(container.textContent).toContain('Mai');
  });

  it('test render the user details', () => {
    act(() => {
      render(
        <DetailsCard
          userInfo={fakeDate.userInfo}
          paymentInfo={fakeDate.paymentInfo}
          step={3}
        />,
        container
      );
    });

    const userSection = document.querySelectorAll('[data-testid=userInfo]');
    expect(userSection.length).toBe(4);
  });

  it('test not render the payment details in step 3', () => {
    act(() => {
      render(
        <DetailsCard
          userInfo={fakeDate.userInfo}
          paymentInfo={fakeDate.paymentInfo}
          step={3}
        />,
        container
      );
    });

    const paymentSection = document.querySelector('[data-testid=paymentInfo]');
    expect(paymentSection).toBe(null);
  });

  it('test render the payment details in step 4', () => {
    act(() => {
      render(
        <DetailsCard
          userInfo={fakeDate.userInfo}
          paymentInfo={fakeDate.paymentInfo}
          step={4}
        />,
        container
      );
    });

    const paymentSection = document.querySelector('[data-testid=paymentInfo]');
    expect(paymentSection.textContent).toContain('Payment details');

    expect(paymentSection.children[1].textContent).toContain(
      'VISA Debit ending in 5678'
    );
  });
});
