import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import Pagination from './index';

describe('test Pagination Component', () => {
  let container = null;
  const onPageChange = jest.fn();
  const changePageNumbers = jest.fn();

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('renders Pagination component', () => {
    act(() => {
      render(
        <Pagination
          totalPages={25}
          cardsPerPage={5}
          onPageChange={onPageChange}
          changePageNumbers={changePageNumbers}
          position="top"
        />,
        container
      );
    });

    const pagination = document.querySelector('[data-testid=pagination]');

    expect(pagination.classList.contains('pagination')).toBeTruthy();
  });

  it('renders Pagination options', () => {
    act(() => {
      render(
        <Pagination
          totalPages={25}
          cardsPerPage={5}
          onPageChange={onPageChange}
          changePageNumbers={changePageNumbers}
        />,
        container
      );
    });

    const paginationOptions = document.querySelector(
      '[data-testid=paginationOptions]'
    );

    expect(
      paginationOptions.classList.contains('pagination-options')
    ).toBeTruthy();
  });
  it('renders Pagination options top position', () => {
    act(() => {
      render(
        <Pagination
          totalPages={25}
          cardsPerPage={5}
          onPageChange={onPageChange}
          changePageNumbers={changePageNumbers}
          position="top"
        />,
        container
      );
    });

    const paginationOptions = document.querySelector(
      '[data-testid=paginationOptions]'
    );

    expect(
      paginationOptions.classList.contains('pagination-options--top')
    ).toBeTruthy();
  });

  it('renders Pagination dropdown', () => {
    act(() => {
      render(
        <Pagination
          totalPages={25}
          cardsPerPage={5}
          onPageChange={onPageChange}
          changePageNumbers={changePageNumbers}
        />,
        container
      );
    });
    expect(container.textContent).toContain(5);
  });

  it('renders Pagination text', () => {
    act(() => {
      render(
        <Pagination
          totalPages={25}
          cardsPerPage={5}
          onPageChange={onPageChange}
          changePageNumbers={changePageNumbers}
          position="top"
        />,
        container
      );
    });

    const paginationText = document.querySelectorAll(
      '[data-testid=paginationText]'
    );

    expect(paginationText[0].textContent).toContain('Show');
    expect(paginationText[1].textContent).toContain('results per page');
  });
});
