import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import '../../test/matchmedia.mock';
import CommonCard from './index';

const cardFakeData = {
  id: '1',
  src: 'https://armacad.info/images/2018/06/14/51c49ba2678fe42b.jpg',
  title: 'Jerusalem',
  icon: 'go',
  location: 'Palestine',
  description: 'The capital of Palestine',
  currency: 'GBP',
  price: 18,
  handleCardClick() {},
};

describe('testing common card', () => {
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

  it('should render icons correctly', () => {
    render(
      <CommonCard
        id="1"
        icon="rightAngle"
        title=""
        src=""
        handleCardClick={() => {}}
      />,
      container
    );

    const classes = [].concat(
      ...[...document.querySelectorAll('*')].map(element => [
        ...element.classList,
      ])
    );

    expect(classes).toContain('category-card');
    expect(classes).not.toContain('location-card');
  });

  it('should render icons correctly', () => {
    render(
      <CommonCard
        id="1"
        icon="location"
        title=""
        src=""
        handleCardClick={() => {}}
      />,
      container
    );

    const classes = [].concat(
      ...[...document.querySelectorAll('*')].map(element => [
        ...element.classList,
      ])
    );

    expect(classes).toContain('location-card');
  });

  it('should render icons correctly', () => {
    render(
      <CommonCard
        id="1"
        icon="priceTag"
        title=""
        src=""
        currency={cardFakeData.currency}
        price={cardFakeData.price}
        handleCardClick={() => {}}
      />,
      container
    );

    const classes = [].concat(
      ...[...document.querySelectorAll('*')].map(element => [
        ...element.classList,
      ])
    );

    expect(classes).toContain('common-large-card', 'large-card__tag');
  });

  it('should function be clicked', () => {
    const onClick = jest.fn();

    act(() => {
      render(
        <CommonCard
          id="1"
          icon="priceTag"
          title=""
          src=""
          currency={cardFakeData.currency}
          price={cardFakeData.price}
          handleCardClick={() => onClick()}
        />,
        container
      );
    });

    const card = document.querySelector('[data-testid=card]');

    act(() => {
      card.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should have "Gaza City" as a title', () => {
    render(
      <CommonCard
        id={cardFakeData.id}
        title="Gaza City"
        src={cardFakeData.src}
        alt={cardFakeData.title}
        icon={cardFakeData.icon}
        location={cardFakeData.location}
        description={cardFakeData.description}
        currency={cardFakeData.currency}
        price={cardFakeData.price}
        handleCardClick={cardFakeData.handleCardClick}
      />,
      container
    );

    expect(container.textContent).toContain('Gaza City');
  });

  it('should render an image', () => {
    render(
      <CommonCard
        id={cardFakeData.id}
        src={cardFakeData.src}
        title={cardFakeData.title}
        alt={cardFakeData.title}
        icon={cardFakeData.icon}
        location={cardFakeData.location}
        description={cardFakeData.description}
        currency={cardFakeData.currency}
        price={cardFakeData.price}
        handleCardClick={cardFakeData.handleCardClick}
      />,
      container
    );

    expect(
      container
        .querySelector(
          'img[src="https://armacad.info/images/2018/06/14/51c49ba2678fe42b.jpg"]'
        )
        .getAttribute('src')
    ).toBe(cardFakeData.src);
  });

  it('should render a button', () => {
    render(
      <CommonCard
        id={cardFakeData.id}
        src={cardFakeData.src}
        title={cardFakeData.title}
        alt={cardFakeData.title}
        icon={cardFakeData.icon}
        location={cardFakeData.location}
        description={cardFakeData.description}
        currency={cardFakeData.currency}
        price={cardFakeData.price}
        handleCardClick={cardFakeData.handleCardClick}
      />,
      container
    );

    expect(container.textContent).toContain('Book now');
  });

  it('should render price and currency correctly', () => {
    render(
      <CommonCard
        id={cardFakeData.id}
        src={cardFakeData.src}
        title={cardFakeData.title}
        alt={cardFakeData.title}
        icon={cardFakeData.icon}
        location={cardFakeData.location}
        description={cardFakeData.description}
        currency="GBP"
        price={100}
        handleCardClick={cardFakeData.handleCardClick}
      />,
      container
    );

    expect(container.textContent).toContain('£100.00');
  });

  it('should render a title, description and location', () => {
    render(
      <CommonCard
        id={cardFakeData.id}
        src={cardFakeData.src}
        title="El-Moez Street"
        alt={cardFakeData.title}
        icon={cardFakeData.icon}
        location="Old Cairo, Egypt"
        description="One of Cairo's most remarkable historic places, giving you a glimpse of old Cairo. Walking along El-Moez Street, you will be fascinated by the historic atmosphere of the old cafés, souvenir shops, and food and sweets sold from kiosks and carts. You will also find Islamic art carved into the historic mosques and houses."
        currency={cardFakeData.currency}
        price={cardFakeData.price}
        handleCardClick={cardFakeData.handleCardClick}
      />,
      container
    );
    const desc =
      "El-Moez StreetOld Cairo, EgyptOne of Cairo's most remarkable historic places, giving you a glimpse of old Cairo. Walking along El-Moez Street, you will be fascinated by the historic atmosphere of the old cafés, souvenir shops, and food and sweets sold from kiosks and carts. You will also find Islamic art carved into the historicfrom";

    expect(container.textContent).toContain(desc);
    expect(container.textContent).toContain('Old Cairo, Egypt');
    expect(container.textContent).toContain('El-Moez Street');
  });

  it('should render a tag for best seller tickets', () => {
    render(
      <CommonCard
        id="1"
        src=""
        title=""
        currency="GBP"
        price={1}
        handleCardClick={() => {}}
      />,
      container
    );

    expect(container.textContent).toContain('Bestseller');
  });
});
