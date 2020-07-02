import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import { AppViewProvider } from '../ContextProviders/AppViewProvider';
import { PopupsContext } from '../ContextProviders/PopupsProvider';

import PopupCarousel from './index';

describe('test Popup Carousel component', () => {
  const carouselFakeData = {
    currentImage: 0,
    images: [
      'https://i.imgur.com/GI0cTJa.png',
      'https://i.imgur.com/FZLvco7.png',
      'https://i.imgur.com/nhDrrAQ.png',
    ],
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

  it('prev arrow button', () => {
    act(() => {
      render(
        <AppViewProvider>
          <PopupsContext.Provider value={{ state: { displayCarousel: true } }}>
            <PopupCarousel images={carouselFakeData.images} />
          </PopupsContext.Provider>
        </AppViewProvider>,
        container
      );
    });

    const button = document.querySelector('[data-testid=previousImageButton]');

    expect(button.classList).toContain('prev-arrow');
  });

  it('next arrow button', () => {
    act(() => {
      render(
        <AppViewProvider>
          <PopupsContext.Provider value={{ state: { displayCarousel: true } }}>
            <PopupCarousel images={carouselFakeData.images} />
          </PopupsContext.Provider>
        </AppViewProvider>,
        container
      );
    });

    const button = document.querySelector('[data-testid=nextImageButton]');

    expect(button.classList).toContain('next-arrow');
  });

  it('thumbnail image function', () => {
    act(() => {
      render(
        <AppViewProvider>
          <PopupsContext.Provider value={{ state: { displayCarousel: true } }}>
            <PopupCarousel images={carouselFakeData.images} />
          </PopupsContext.Provider>
        </AppViewProvider>,
        container
      );
    });

    const button = document.querySelector('[data-testid=showCurrentImage]');

    expect(button.getAttribute('src')).toBe('https://i.imgur.com/GI0cTJa.png');
  });

  it('should display the current image correctly', () => {
    render(
      <AppViewProvider>
        <PopupsContext.Provider value={{ state: { displayCarousel: true } }}>
          <PopupCarousel images={carouselFakeData.images} />
        </PopupsContext.Provider>
      </AppViewProvider>,
      container
    );

    const largeImage = document.querySelector('[data-testid=largeImage]');

    expect(largeImage.getAttribute('src')).toBe(
      'https://i.imgur.com/GI0cTJa.png'
    );
  });

  it('should display all event images as thumbnails', () => {
    render(
      <AppViewProvider>
        <PopupsContext.Provider value={{ state: { displayCarousel: true } }}>
          <PopupCarousel images={carouselFakeData.images} />
        </PopupsContext.Provider>
      </AppViewProvider>,
      container
    );

    const thumbnails = document.querySelector('[data-testid="thumbnails"]');

    expect(thumbnails.children.length).toBe(carouselFakeData.images.length);
  });
});
