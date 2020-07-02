import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import { AppViewProvider } from '../../ContextProviders/AppViewProvider';
import { PopupsContext } from '../../ContextProviders/PopupsProvider';

import Payment from './index';
import '../../../test/matchmedia.mock';

describe('test third step component', () => {
  const fakeData = {
    minutes: 10,
    seconds: 59,
    userInfo: {},
    paymentInfo: {},
    paymentStatusReady: false,
    handlePaymentInfoChange: () => {},
    handleProcessing: () => {},
    startProcessing: () => {},
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

  it('test render the third step', () => {
    act(() => {
      render(
        <AppViewProvider>
          <PopupsContext.Provider
            value={{ state: { displayProcessing: false } }}
          >
            <Payment
              handleProcessing={fakeData.handleProcessing}
              minutes={fakeData.minutes}
              seconds={fakeData.seconds}
              userInfo={fakeData.userInfo}
              paymentInfo={fakeData.paymentInfo}
              paymentStatusReady={fakeData.paymentStatusReady}
              handlePaymentInfoChange={fakeData.handlePaymentInfoChange}
              startProcessing={fakeData.startProcessing}
            />
          </PopupsContext.Provider>
        </AppViewProvider>,
        container
      );
    });
    expect(container.textContent).toContain('Payment');
  });

  it('test render the ticket card', () => {
    act(() => {
      render(
        <AppViewProvider>
          <PopupsContext.Provider
            value={{ state: { displayProcessing: false } }}
          >
            <Payment
              handleProcessing={fakeData.handleProcessing}
              minutes={fakeData.minutes}
              seconds={fakeData.seconds}
              userInfo={fakeData.userInfo}
              paymentInfo={fakeData.paymentInfo}
              paymentStatusReady={fakeData.paymentStatusReady}
              handlePaymentInfoChange={fakeData.handlePaymentInfoChange}
              startProcessing={fakeData.startProcessing}
            />
          </PopupsContext.Provider>
        </AppViewProvider>,
        container
      );
    });
    expect(container.textContent).toContain('Your ticket');
  });

  it('test render the user details card', () => {
    act(() => {
      render(
        <AppViewProvider>
          <PopupsContext.Provider
            value={{ state: { displayProcessing: false } }}
          >
            <Payment
              handleProcessing={fakeData.handleProcessing}
              minutes={fakeData.minutes}
              seconds={fakeData.seconds}
              userInfo={fakeData.userInfo}
              paymentInfo={fakeData.paymentInfo}
              paymentStatusReady={fakeData.paymentStatusReady}
              handlePaymentInfoChange={fakeData.handlePaymentInfoChange}
              startProcessing={fakeData.startProcessing}
            />
          </PopupsContext.Provider>
        </AppViewProvider>,
        container
      );
    });
    expect(container.textContent).toContain('Your details');
  });
  it('test render the timer text', () => {
    act(() => {
      render(
        <AppViewProvider>
          <PopupsContext.Provider
            value={{ state: { displayProcessing: false } }}
          >
            <Payment
              handleProcessing={fakeData.handleProcessing}
              minutes={fakeData.minutes}
              seconds={fakeData.seconds}
              userInfo={fakeData.userInfo}
              paymentInfo={fakeData.paymentInfo}
              paymentStatusReady={fakeData.paymentStatusReady}
              handlePaymentInfoChange={fakeData.handlePaymentInfoChange}
              startProcessing={fakeData.startProcessing}
            />
          </PopupsContext.Provider>
        </AppViewProvider>,
        container
      );
    });
    expect(container.textContent).toContain(
      'Time left to complete your payment:'
    );
  });

  it('test render the payment card', () => {
    act(() => {
      render(
        <AppViewProvider>
          <PopupsContext.Provider
            value={{ state: { displayProcessing: false } }}
          >
            <Payment
              handleProcessing={fakeData.handleProcessing}
              minutes={fakeData.minutes}
              seconds={fakeData.seconds}
              userInfo={fakeData.userInfo}
              paymentInfo={fakeData.paymentInfo}
              paymentStatusReady={fakeData.paymentStatusReady}
              handlePaymentInfoChange={fakeData.handlePaymentInfoChange}
              startProcessing={fakeData.startProcessing}
            />
          </PopupsContext.Provider>
        </AppViewProvider>,
        container
      );
    });
    expect(container.textContent).toContain('How would you like to pay?');
  });

  it('test render the payment Buttons', () => {
    act(() => {
      render(
        <AppViewProvider>
          <PopupsContext.Provider
            value={{ state: { displayProcessing: false } }}
          >
            <Payment
              handleProcessing={fakeData.handleProcessing}
              minutes={fakeData.minutes}
              seconds={fakeData.seconds}
              userInfo={fakeData.userInfo}
              paymentInfo={fakeData.paymentInfo}
              paymentStatusReady={fakeData.paymentStatusReady}
              handlePaymentInfoChange={fakeData.handlePaymentInfoChange}
              startProcessing={fakeData.startProcessing}
            />
          </PopupsContext.Provider>
        </AppViewProvider>,
        container
      );
    });

    const paymentButtons = document.querySelectorAll(
      '[data-testid=paymentButton]'
    );

    expect(paymentButtons.length).toBe(4);
  });

  it('test not render the payment form', () => {
    act(() => {
      render(
        <AppViewProvider>
          <PopupsContext.Provider
            value={{ state: { displayProcessing: true } }}
          >
            <Payment
              handleProcessing={fakeData.handleProcessing}
              minutes={fakeData.minutes}
              seconds={fakeData.seconds}
              userInfo={fakeData.userInfo}
              paymentInfo={fakeData.paymentInfo}
              paymentStatusReady={fakeData.paymentStatusReady}
              handlePaymentInfoChange={fakeData.handlePaymentInfoChange}
              startProcessing={fakeData.startProcessing}
            />
          </PopupsContext.Provider>
        </AppViewProvider>,
        container
      );
    });

    const paymentForm = document.querySelector('[data-testid=paymentForm]');

    expect(paymentForm).toBe(null);
  });

  it('test render the payment form', () => {
    act(() => {
      render(
        <AppViewProvider>
          <PopupsContext.Provider
            value={{
              state: { displayProcessing: false, displayDetails: true },
            }}
          >
            <Payment
              handleProcessing={fakeData.handleProcessing}
              minutes={fakeData.minutes}
              seconds={fakeData.seconds}
              userInfo={fakeData.userInfo}
              paymentInfo={fakeData.paymentInfo}
              paymentStatusReady={fakeData.paymentStatusReady}
              handlePaymentInfoChange={fakeData.handlePaymentInfoChange}
              startProcessing={fakeData.startProcessing}
            />
          </PopupsContext.Provider>
        </AppViewProvider>,
        container
      );
    });

    const paymentForm = document.querySelector('[data-testid=paymentForm]');

    expect(paymentForm.textContent).toContain('Card holders');
  });

  it('test render the payment form inputs', () => {
    act(() => {
      render(
        <AppViewProvider>
          <PopupsContext.Provider
            value={{
              state: { displayProcessing: false, displayDetails: true },
            }}
          >
            <Payment
              handleProcessing={fakeData.handleProcessing}
              minutes={fakeData.minutes}
              seconds={fakeData.seconds}
              userInfo={fakeData.userInfo}
              paymentInfo={fakeData.paymentInfo}
              paymentStatusReady={fakeData.paymentStatusReady}
              handlePaymentInfoChange={fakeData.handlePaymentInfoChange}
              startProcessing={fakeData.startProcessing}
            />
          </PopupsContext.Provider>
        </AppViewProvider>,
        container
      );
    });

    const paymentFormItems = document.querySelectorAll(
      '[data-testid=paymentFormItem]'
    );

    expect(paymentFormItems.length).toBe(5);
  });

  it('test not render the processing step', () => {
    act(() => {
      render(
        <AppViewProvider>
          <PopupsContext.Provider
            value={{ state: { displayProcessing: false } }}
          >
            <Payment
              handleProcessing={fakeData.handleProcessing}
              minutes={fakeData.minutes}
              seconds={fakeData.seconds}
              userInfo={fakeData.userInfo}
              paymentInfo={fakeData.paymentInfo}
              paymentStatusReady={fakeData.paymentStatusReady}
              handlePaymentInfoChange={fakeData.handlePaymentInfoChange}
              startProcessing={fakeData.startProcessing}
            />
          </PopupsContext.Provider>
        </AppViewProvider>,
        container
      );
    });

    const processingCard = document.querySelector(
      '[data-testid=processingCard]'
    );

    expect(processingCard).toBe(null);
  });

  it('test render the processing step', () => {
    act(() => {
      render(
        <AppViewProvider>
          <PopupsContext.Provider
            value={{ state: { displayProcessing: true } }}
          >
            <Payment
              handleProcessing={fakeData.handleProcessing}
              minutes={fakeData.minutes}
              seconds={fakeData.seconds}
              userInfo={fakeData.userInfo}
              paymentInfo={fakeData.paymentInfo}
              paymentStatusReady={fakeData.paymentStatusReady}
              handlePaymentInfoChange={fakeData.handlePaymentInfoChange}
              startProcessing={fakeData.startProcessing}
            />
          </PopupsContext.Provider>
        </AppViewProvider>,
        container
      );
    });

    const processingCard = document.querySelector(
      '[data-testid=processingCard]'
    );
    expect(processingCard).not.toBe(null);
    expect(processingCard.textContent).toContain('Processing transaction');
  });
});
