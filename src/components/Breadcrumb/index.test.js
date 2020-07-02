import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import Breadcrumb from './index';

describe('test Breadcrumb Component', () => {
  const handleOnClick = jest.fn();
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

  it('renders Breadcrumb component', () => {
    act(() => {
      render(
        <Breadcrumb handleOnClick={handleOnClick} type="search" />,
        container
      );
    });

    const breadcrumb = document.querySelector('[data-testid=breadcrumb]');
    expect(breadcrumb.classList).toContain('breadcrumb');
  });

  it('check Home item', () => {
    act(() => {
      render(
        <Breadcrumb handleOnClick={handleOnClick} type="search" />,
        container
      );
    });

    const pageBreadcrumb = document.querySelector(
      '[data-testid=pageBreadcrumb]'
    );

    expect(pageBreadcrumb.textContent).toBe('Home');
  });

  it('check current search item', () => {
    act(() => {
      render(
        <Breadcrumb handleOnClick={handleOnClick} type="search" />,
        container
      );
    });

    const typeBreadcrumb = document.querySelector(
      '[data-testid=typeBreadcrumb]'
    );

    expect(typeBreadcrumb.textContent).toBe('search');
  });

  it('check current location item', () => {
    act(() => {
      render(
        <Breadcrumb handleOnClick={handleOnClick} type="locations" />,
        container
      );
    });

    const typeBreadcrumb = document.querySelector(
      '[data-testid=typeBreadcrumb]'
    );

    expect(typeBreadcrumb.textContent).toBe('All locations');
  });

  it('check current categories item', () => {
    act(() => {
      render(
        <Breadcrumb handleOnClick={handleOnClick} type="categories" />,
        container
      );
    });

    const typeBreadcrumb = document.querySelector(
      '[data-testid=typeBreadcrumb]'
    );

    expect(typeBreadcrumb.textContent).toBe('All categories');
  });

  it('check FAQs page breadcrumb', () => {
    act(() => {
      render(
        <Breadcrumb handleOnClick={handleOnClick} type="FAQs" />,
        container
      );
    });

    const typeBreadcrumb = document.querySelector(
      '[data-testid=typeBreadcrumb]'
    );

    expect(typeBreadcrumb.textContent).toBe('FAQs');
  });

  it('check handleOnClick function', () => {
    act(() => {
      render(
        <Breadcrumb handleOnClick={handleOnClick} type="FAQs" />,
        container
      );
    });

    const pageBreadcrumb = document.querySelector(
      '[data-testid=pageBreadcrumb]'
    );

    act(() => {
      pageBreadcrumb.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(handleOnClick).toBeCalledTimes(1);
  });
});
