import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import { AppViewProvider } from '../ContextProviders/AppViewProvider';
import { PopupsContext } from '../ContextProviders/PopupsProvider';

import '../../test/matchmedia.mock';
import Menu from './index';

describe('testing menu component', () => {
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

  it('should render manu item names', () => {
    render(
      <AppViewProvider>
        <PopupsContext.Provider value={{ state: { displayCart: false } }}>
          <Menu />
        </PopupsContext.Provider>
      </AppViewProvider>,
      container
    );
    expect(container.textContent).toContain('Cart');
    expect(container.textContent).toContain('Help');
    expect(container.textContent).toContain('Eng / GBP');
  });

  it('should render three menu items', () => {
    render(
      <AppViewProvider>
        <PopupsContext.Provider value={{ state: { displayCart: false } }}>
          <Menu />
        </PopupsContext.Provider>
      </AppViewProvider>,
      container
    );
    const classes = container.getElementsByClassName('menu__item');
    expect(classes.length).toBe(3);
  });

  it('should render a menu logo', () => {
    render(
      <AppViewProvider>
        <PopupsContext.Provider value={{ state: { displayCart: false } }}>
          <Menu />
        </PopupsContext.Provider>
      </AppViewProvider>,
      container
    );
    const classes = container.getElementsByClassName('menu__logo');
    expect(classes.length).toBe(1);
  });

  it('testing navigating to home page function', () => {
    const onClick = jest.fn();
    act(() => {
      render(
        <AppViewProvider>
          <PopupsContext.Provider
            value={{
              state: { displayCart: false, displayPopupSettings: true },
            }}
          >
            <Menu handleButtonClick={() => onClick()} />
          </PopupsContext.Provider>
        </AppViewProvider>,
        container
      );
    });
    const logoItem = container.querySelector('[data-testid="logoItem"]');
    act(() => {
      logoItem.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
