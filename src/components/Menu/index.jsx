import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from '../ContextProviders/ThemeProvider';
import { AppViewContext } from '../ContextProviders/AppViewProvider';
import { PopupsContext } from '../ContextProviders/PopupsProvider';
import Icon from '../Icon';
import Cart from '../Cart';
import MobileBottomModal from '../MobileBottomModal';
import * as ROUTES from '../../constants/routes';

import './style.scss';

export default function Menu({ handleButtonClick }) {
  const theme = useContext(ThemeContext);
  const { state, actions } = useContext(PopupsContext);
  const { isMobile } = useContext(AppViewContext);
  return (
    <div className="menu">
      <div
        role="button"
        tabIndex="0"
        aria-pressed="false"
        data-testid="logoItem"
        className="menu__logo"
        onClick={() => handleButtonClick(ROUTES.HOME_PAGE)}
        onKeyPress={() => handleButtonClick(ROUTES.HOME_PAGE)}
      >
        <Icon
          id="logo"
          iconStyle="menu__logo--icon"
          color={theme['primary-color']}
        />
      </div>
      <div className="menu__items">
        <div className="menu__dropdown">
          <div
            role="button"
            tabIndex="0"
            aria-pressed="false"
            className="menu__item"
            onClick={() => actions.togglePopup('displayCart')}
            onKeyPress={() => actions.togglePopup('displayCart')}
          >
            <Icon
              iconStyle="menu__icon menu__cart--icon"
              id="cart"
              color={theme['primary-color']}
            />
            Cart
          </div>
          {isMobile && state.displayCart && (
            <MobileBottomModal
              modalCloseCalled={() => actions.togglePopup('displayCart')}
            >
              {' '}
              <Cart
                handleOnClick={e => {
                  e.stopPropagation();
                  handleButtonClick(ROUTES.EVENT_PAGE);
                }}
                handleCartClick={() =>
                  handleButtonClick(ROUTES.SHOPPING_CART_PAGE)
                }
              />
            </MobileBottomModal>
          )}
          {!isMobile && state.displayCart && (
            <Cart
              handleOnClick={e => {
                e.stopPropagation();
                handleButtonClick(ROUTES.EVENT_PAGE);
              }}
              handleCartClick={() =>
                handleButtonClick(ROUTES.SHOPPING_CART_PAGE)
              }
            />
          )}
        </div>

        <div
          role="button"
          tabIndex="0"
          aria-pressed="false"
          data-testid="helpItem"
          className="menu__item"
          onClick={() => handleButtonClick(ROUTES.FAQ_PAGE)}
          onKeyPress={() => handleButtonClick(ROUTES.FAQ_PAGE)}
        >
          <Icon
            iconStyle="menu__icon menu__help--icon"
            id="help"
            color={theme['primary-color']}
          />
          Help
        </div>

        <div
          role="button"
          tabIndex="0"
          aria-pressed="false"
          data-testid="languageItem"
          className="menu__item menu__last-item"
          onClick={() => actions.togglePopup('displayPopupSettings')}
          onKeyPress={() => actions.togglePopup('displayPopupSettings')}
        >
          Eng / GBP
        </div>
      </div>
    </div>
  );
}

Menu.defaultProps = {
  handleButtonClick: () => {},
};

Menu.propTypes = {
  handleButtonClick: PropTypes.func,
};
