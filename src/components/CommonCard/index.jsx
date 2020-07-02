import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'antd';

import { makePriceString } from '../../utils/index';
import { ThemeContext } from '../ContextProviders/ThemeProvider';
import Icon from '../Icon';
import Button from '../Button';

import './style.scss';

function TitleName({ title, icon }) {
  const theme = useContext(ThemeContext);
  return (
    <div className="common-card__content__text">
      {icon && (
        <Icon
          id={icon}
          iconStyle="common-card__content__text__icon"
          color={theme['primary-color']}
        />
      )}
      <span>{title}</span>
    </div>
  );
}

TitleName.defaultProps = {
  icon: null,
};

TitleName.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
};

const { Text } = Typography;
export default function CommonCard({
  id,
  icon,
  src,
  title,
  location,
  currency,
  price,
  description,
  handleCardClick,
  handleButtonClick,
}) {
  const theme = useContext(ThemeContext);
  let cardClass = '';
  switch (icon) {
    case 'rightAngle':
      cardClass = 'category-card';
      break;
    case 'location':
      cardClass = 'location-card';
      break;
    default:
      cardClass = 'common-large-card';
  }

  if (location) {
    cardClass = 'result-card';
  }

  return (
    <div
      className={`common-card  ${cardClass} `}
      data-testid="card"
      role="button"
      tabIndex="0"
      aria-label="clicked card"
      onKeyPress={handleCardClick}
      onClick={handleCardClick}
      id={id}
    >
      <div className="common-card__image">
        {cardClass === 'common-large-card' && (
          <div className="common-card__image__banner">
            <Icon id="priceTag" color={theme['secondary-icon-color']} />
            <Text className="common-card__image__banner--text">Bestseller</Text>
          </div>
        )}
        <img src={src} alt={title} />
      </div>
      <div className="common-card__content">
        {cardClass === 'result-card' || cardClass === 'common-large-card' ? (
          <>
            <TitleName title={title} />
            {cardClass === 'result-card' && location && (
              <div className="common-card__content__location">
                <Text>
                  <Icon
                    id="location"
                    iconStyle="common-card__content__location__icon"
                    color={theme['primary-color']}
                  />
                  <span>{location}</span>
                </Text>
              </div>
            )}
            <div className="common-card__content__description">
              <p>{description.slice(0, 300)}</p>
            </div>
            <div className="card-actions">
              <div className="card-actions__text">
                <span className="card-actions__text__price-prefix">from </span>
                <Text className="card-actions__text__price">
                  {makePriceString(price, currency)}
                </Text>
              </div>
              <div className="card-actions__button">
                <Button
                  text="Book now"
                  buttonType="bookNow"
                  background="transparent"
                  buttonStyle="common-card__button"
                  icon="ticket"
                  iconColor={theme['primary-color']}
                  testid="card"
                  handleOnClick={handleButtonClick}
                />
              </div>
            </div>
          </>
        ) : (
          <TitleName title={title} icon={icon} />
        )}
      </div>
    </div>
  );
}

CommonCard.defaultProps = {
  id: '',
  icon: '',
  description: '',
  src: '',
  currency: 'GBP',
  location: null,
  price: null,
  handleButtonClick: () => {},
};

CommonCard.propTypes = {
  id: PropTypes.string,
  icon: PropTypes.string,
  src: PropTypes.string,
  title: PropTypes.string.isRequired,
  location: PropTypes.string,
  description: PropTypes.string,
  currency: PropTypes.string,
  price: PropTypes.number,
  handleCardClick: PropTypes.func.isRequired,
  handleButtonClick: PropTypes.func,
};
