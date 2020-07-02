import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { AppViewProvider } from '../ContextProviders/AppViewProvider';
import { EventsProvider } from '../ContextProviders/EventsProvider';

import '../../test/matchmedia.mock';
import Footer from './index';

describe('testing footer component', () => {
  describe('testing large footer', () => {
    it('should render the large footer', () => {
      const { getByTestId } = render(
        <AppViewProvider>
          <EventsProvider>
            <Footer type="large" />
          </EventsProvider>
        </AppViewProvider>
      );
      const footer = getByTestId('footer');
      expect(footer.classList.contains('footer--large')).toBeTruthy();
      expect(footer.classList.contains('footer--small')).toBeFalsy();
    });

    it('shlould render footer sections names', () => {
      const { getByTestId } = render(
        <AppViewProvider>
          <EventsProvider>
            <Footer type="large" />
          </EventsProvider>
        </AppViewProvider>
      );
      expect(getByTestId('footer').textContent).toContain('Top locations');
      expect(getByTestId('footer').textContent).toContain('Top categories');
      expect(getByTestId('footer').textContent).toContain('Support');
      expect(getByTestId('footer').textContent).toContain('Settings');
      expect(getByTestId('footer').textContent).toContain('powered by');
    });

    it('should have five sections', () => {
      render(
        <AppViewProvider>
          <EventsProvider>
            <Footer type="large" />
          </EventsProvider>
        </AppViewProvider>
      );
      const largeFooterSections = document.getElementsByClassName(
        'footer__section'
      );
      expect(largeFooterSections.length).toBe(5);
    });

    it('should have two buttons', () => {
      render(
        <AppViewProvider>
          <EventsProvider>
            <Footer type="large" />
          </EventsProvider>
        </AppViewProvider>
      );
      const largeFooterButtons = document.getElementsByClassName(
        'footer__section-button'
      );
      expect(largeFooterButtons.length).toBe(2);
    });
  });

  describe('testing small footer', () => {
    it('should render the small footer', () => {
      const { getByTestId } = render(
        <AppViewProvider>
          <EventsProvider>
            <Footer type="small" />
          </EventsProvider>
        </AppViewProvider>
      );

      const footer = getByTestId('footer');
      expect(footer.classList.contains('footer--small')).toBeTruthy();
      expect(footer.classList.contains('footer--large')).toBeFalsy();
    });

    it('should render small footer secions names', () => {
      const { getByTestId } = render(
        <AppViewProvider>
          <EventsProvider>
            <Footer type="small" />
          </EventsProvider>
        </AppViewProvider>
      );

      expect(getByTestId('footer').textContent).toContain('Help centre');
      expect(getByTestId('footer').textContent).toContain('Terms & Conditions');
      expect(getByTestId('footer').textContent).toContain('Privacy policy');
      expect(getByTestId('footer').textContent).toContain('© 2019 Tickitto');
      expect(getByTestId('footer').textContent).toContain('powered by');
    });
  });
});
