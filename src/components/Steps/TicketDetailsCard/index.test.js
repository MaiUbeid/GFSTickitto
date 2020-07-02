import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import TicketDetailsCard from './index';
import '../../../test/matchmedia.mock';

describe('test ticket details card component', () => {
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
      render(<TicketDetailsCard step={1} handleNext={() => {}} />, container);
    });
    expect(container.children[0].textContent).toContain('ticket');
  });

  it('test the button in first step', () => {
    act(() => {
      render(<TicketDetailsCard step={1} handleNext={() => {}} />, container);
    });
    const nextStepButton = document.querySelector(
      '[data-testid=nextStepButton]'
    );
    expect(nextStepButton.textContent).toBe('Next Step');
  });

  it('test the button in first step', () => {
    act(() => {
      render(<TicketDetailsCard step={2} handleNext={() => {}} />, container);
    });
    const nextStepButton = document.querySelector(
      '[data-testid=nextStepButton]'
    );
    expect(nextStepButton).toBe(null);
  });

  it('test the button function to handle next', () => {
    const handleNext = jest.fn();

    act(() => {
      render(<TicketDetailsCard step={1} handleNext={handleNext} />, container);
    });

    const nextStepButton = document.querySelector(
      '[data-testid=nextStepButton]'
    );

    expect(handleNext).toHaveBeenCalledTimes(0);
    expect(nextStepButton.textContent).toBe('Next Step');

    act(() => {
      nextStepButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(handleNext).toHaveBeenCalledTimes(1);
  });
});
