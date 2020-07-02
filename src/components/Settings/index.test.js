import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { PopupsProvider } from '../ContextProviders/PopupsProvider';
import '../../test/matchmedia.mock';
import Settings from './index';

describe('testing Settings', () => {
  it('should render popup settings title if popup is true', () => {
    const { getByTestId } = render(
      <PopupsProvider>
        <Settings popup />
      </PopupsProvider>
    );

    expect(getByTestId('settingsTest').textContent).toContain(
      'Update your settings'
    );
  });

  it('should render actions and buttons if popup is true', () => {
    render(
      <PopupsProvider>
        <Settings popup />
      </PopupsProvider>
    );

    const classes = [].concat(
      ...[...document.querySelectorAll('*')].map(element => [
        ...element.classList,
      ])
    );

    expect(classes).toContain('popup-settings__actions');
    expect(classes).toContain('popup-settings__button-cross');
  });

  it('should render settings body', () => {
    render(
      <PopupsProvider>
        <Settings popup />
      </PopupsProvider>
    );

    const classes = [].concat(
      ...[...document.querySelectorAll('*')].map(element => [
        ...element.classList,
      ])
    );

    expect(classes).toContain('popup-settings__body');
  });

  it('should not render popup settings title if popup is false', () => {
    const { getByTestId } = render(
      <PopupsProvider>
        <Settings popup={false} />
      </PopupsProvider>
    );

    expect(getByTestId('settingsTest').textContent).not.toContain(
      'Update your settings'
    );
  });

  it('should not render actions and buttons if popup is false', () => {
    render(
      <PopupsProvider>
        <Settings popup={false} />
      </PopupsProvider>
    );

    const footerSettingsClasses = [].concat(
      ...[...document.querySelectorAll('*')].map(element => [
        ...element.classList,
      ])
    );
    expect(footerSettingsClasses).not.toContain('popup-settings__actions');
    expect(footerSettingsClasses).not.toContain('popup-settings__button-cross');
  });

  it('should render settings body', () => {
    render(
      <PopupsProvider>
        <Settings popup={false} />
      </PopupsProvider>
    );
    const footerSettingsClasses = [].concat(
      ...[...document.querySelectorAll('*')].map(element => [
        ...element.classList,
      ])
    );
    expect(footerSettingsClasses).toContain('popup-settings__body');
  });
});
