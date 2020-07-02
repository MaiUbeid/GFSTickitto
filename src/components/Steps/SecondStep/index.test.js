import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import SecondStep from './index';
import '../../../test/matchmedia.mock';

describe('test second step component', () => {
  const fakeData = {
    handleNext: () => {},
    startTimer: () => {},
    current: 2,
    userInfo: {},
    handleUserInfoChange: () => {},
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

  it('test render the second step', () => {
    act(() => {
      render(
        <SecondStep
          handleNext={fakeData.handleNext}
          startTimer={fakeData.startTimer}
          current={fakeData.current}
          userInfo={fakeData.userInfo}
          handleUserInfoChange={fakeData.handleUserInfoChange}
        />,
        container
      );
    });
    expect(container.textContent).toContain('Add your details');
  });

  it('test render the inputs in form', () => {
    act(() => {
      render(
        <SecondStep
          handleNext={fakeData.handleNext}
          startTimer={fakeData.startTimer}
          current={fakeData.current}
          userInfo={fakeData.userInfo}
          handleUserInfoChange={fakeData.handleUserInfoChange}
        />,
        container
      );
    });

    const personalInpus = document.querySelectorAll(
      '[data-testid=personalInput]'
    );

    expect(personalInpus.length).toBe(3);
  });

  it('test render the button in form', () => {
    act(() => {
      render(
        <SecondStep
          handleNext={fakeData.handleNext}
          startTimer={fakeData.startTimer}
          current={fakeData.current}
          userInfo={fakeData.userInfo}
          handleUserInfoChange={fakeData.handleUserInfoChange}
        />,
        container
      );
    });

    const personalButton = document.querySelector(
      '[data-testid=personalButton]'
    );

    expect(personalButton.textContent).toBe('Confirm your booking');
  });

  it('test existance of info under the phone input', () => {
    act(() => {
      render(
        <SecondStep
          handleNext={fakeData.handleNext}
          startTimer={fakeData.startTimer}
          current={fakeData.current}
          userInfo={fakeData.userInfo}
          handleUserInfoChange={fakeData.handleUserInfoChange}
        />,
        container
      );
      expect(container.textContent).toContain(
        'We’ll only use this in case there is a problem with your order'
      );
    });
  });
  it('test existance of ticket details', () => {
    act(() => {
      render(
        <SecondStep
          handleNext={fakeData.handleNext}
          startTimer={fakeData.startTimer}
          current={fakeData.current}
          userInfo={fakeData.userInfo}
          handleUserInfoChange={fakeData.handleUserInfoChange}
        />,
        container
      );
      expect(container.textContent).toContain('Total price');
    });
  });
});
