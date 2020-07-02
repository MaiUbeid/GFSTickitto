import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import Dropdown from './index';

describe('test Dropdown Component', () => {
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

  it('renders Dropdown component', () => {
    act(() => {
      render(
        <Dropdown
          options={[
            { label: '5', value: '5' },
            { label: '10', value: '10' },
            { label: '16', value: '16' },
            { label: '20', value: '20' },
            { label: '30', value: '30' },
          ]}
          onSelect={() => {}}
          iconColor="#7A49A0"
          placeholder="select options"
        />,
        container
      );
    });
    expect(container.textContent).toContain('select options');
  });
});
