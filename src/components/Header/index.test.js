import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { AppViewProvider } from '../ContextProviders/AppViewProvider';
import { PopupsContext } from '../ContextProviders/PopupsProvider';
import { EventsContext } from '../ContextProviders/EventsProvider';

import '../../test/matchmedia.mock';

import locationResultsPageImage from '../../assets/images/location-result-page.png';
import Header from './index';

const fakeData = {
  page: 'results',
  type: 'category',
  height: '18rem',
  backgroundImage: locationResultsPageImage,
  mainHeaderTitle: '',
  subHeaderTitle: 'Search results for ‘search term’',
  breadcrumb: true,
  displayCarousel: () => {},
  images: [],
  current: 1,
  screenWidth: 480,
  steps: [
    {
      title: '1. Booking details',
    },
  ],
  percent: 25,
  layer: false,
};

describe('testing header component', () => {
  it('tests if sub header title rendered well', () => {
    const { getByTestId } = render(
      <AppViewProvider>
        <PopupsContext.Provider
          value={{ state: { displayCarousel: false, displayCart: false } }}
        >
          <Header subHeaderTitle={fakeData.subHeaderTitle} popup={false} />
        </PopupsContext.Provider>
      </AppViewProvider>
    );
    const subTitle = getByTestId('subHeaderTitle');
    expect(subTitle.textContent).toContain(fakeData.subHeaderTitle);
  });

  it('tests rendering the overlay', () => {
    const { getByTestId } = render(
      <AppViewProvider>
        <PopupsContext.Provider
          value={{ state: { displayCarousel: false, displayCart: false } }}
        >
          <Header layer popup={false} />
        </PopupsContext.Provider>
      </AppViewProvider>
    );
    const overlay = getByTestId('overlay');
    expect(overlay.classList.contains('header__home-layer')).toBeTruthy();
    expect(overlay.classList.length).toBe(1);
  });

  it('test rendering breadcrumb in results page', () => {
    const { getByTestId } = render(
      <AppViewProvider>
        <PopupsContext.Provider
          value={{ state: { displayCarousel: false, displayCart: false } }}
        >
          <EventsContext.Provider
            value={[
              {
                t1: '2020-06-29',
                t2: '2021-06-29',
              },
            ]}
          >
            <Header page={fakeData.page} popup={false} />
          </EventsContext.Provider>
        </PopupsContext.Provider>
      </AppViewProvider>
    );

    const pageBreadcrumb = getByTestId('pageBreadcrumb');
    expect(pageBreadcrumb.textContent).toBe('Home');
  });

  it('test rendering breadcrumb in category results page', () => {
    const { getByTestId } = render(
      <AppViewProvider>
        <PopupsContext.Provider
          value={{ state: { displayCarousel: false, displayCart: false } }}
        >
          <EventsContext.Provider
            value={[
              {
                t1: '2020-06-29',
                t2: '2021-06-29',
              },
            ]}
          >
            <Header page="results" type="category" popup={false} />
          </EventsContext.Provider>
        </PopupsContext.Provider>
      </AppViewProvider>
    );

    const typeBreadcrumb = getByTestId('typeBreadcrumb');
    expect(typeBreadcrumb.textContent).toBe(fakeData.type);
  });

  it('should render datepicker in results page', () => {
    render(
      <AppViewProvider>
        <PopupsContext.Provider
          value={{ state: { displayCarousel: false, displayCart: false } }}
        >
          <EventsContext.Provider
            value={[
              {
                t1: '2020-06-29',
                t2: '2021-06-29',
              },
            ]}
          >
            <Header page={fakeData.page} popup={false} />
          </EventsContext.Provider>
        </PopupsContext.Provider>
      </AppViewProvider>
    );

    const classes = [].concat(
      ...[...document.querySelectorAll('*')].map(element => [
        ...element.classList,
      ])
    );

    expect(classes).toContain('header__picker');
  });

  it('should not render datepicker in event page', () => {
    render(
      <AppViewProvider>
        <PopupsContext.Provider
          value={{ state: { displayCarousel: false, displayCart: false } }}
        >
          <EventsContext.Provider
            value={[
              {
                t1: '2020-06-29',
                t2: '2021-06-29',
              },
            ]}
          >
            <Header page="event" popup={false} />
          </EventsContext.Provider>
        </PopupsContext.Provider>
      </AppViewProvider>
    );

    const classes = [].concat(
      ...[...document.querySelectorAll('*')].map(element => [
        ...element.classList,
      ])
    );
    expect(classes).not.toContain('header__picker');
  });

  it('should display images and  button', () => {
    render(
      <AppViewProvider>
        <PopupsContext.Provider
          value={{ state: { displayCarousel: false, displayCart: false } }}
        >
          <EventsContext.Provider
            value={[
              {
                t1: '2020-06-29',
                t2: '2021-06-29',
              },
            ]}
          >
            <Header page="event" popup={false} />
          </EventsContext.Provider>
        </PopupsContext.Provider>
      </AppViewProvider>
    );
    const classes = [].concat(
      ...[...document.querySelectorAll('*')].map(element => [
        ...element.classList,
      ])
    );

    expect(classes).toContain('header__images', 'header__event-button');
  });
});
