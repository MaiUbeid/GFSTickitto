/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Layout } from 'antd';

import * as ROUTES from '../../constants/routes';

import { AppViewContext } from '../ContextProviders/AppViewProvider';
import { ThemeContext } from '../ContextProviders/ThemeProvider';
import { PopupsContext } from '../ContextProviders/PopupsProvider';

import Icon from '../Icon';
import Settings from '../Settings';
import Button from '../Button';

import { EventsContext } from '../ContextProviders/EventsProvider';

import './style.scss';

const { Footer: AntdFooter } = Layout;

export default function Footer() {
  const theme = useContext(ThemeContext);
  const { isTablet } = useContext(AppViewContext);
  const { state, actions } = useContext(PopupsContext);

  const [isSupportShown, toggleShowSupport] = useState(true);

  const [{ locations, categories }] = useContext(EventsContext);

  const history = useHistory();

  function handleOnClick(link) {
    history.push(link);
  }

  let type;
  const page = window.location.pathname.split('/').pop();
  if (page === 'form-page') {
    type = 'small';
  } else {
    type = 'large';
  }

  return (
    <AntdFooter
      data-testid="footer"
      className={
        type === 'large' ? 'footer footer--large' : 'footer footer--small'
      }
    >
      <div className="footer__section">
        <div className="footer__section-category">
          <Icon
            iconStyle="footer__section-icon"
            id="location"
            color={theme['secondary-icon-color']}
          />
          <span className="footer__section-title">Top locations</span>
        </div>
        <div className="footer__section-options">
          {!isTablet &&
            locations.slice(0, 7).map((location, key) => (
              <span className="footer__section-option" key={`${key}`}>
                {`${location.country}, ${location.city}`}
              </span>
            ))}
          <Button
            testid="seeAllLocations"
            text={!isTablet ? 'See all' : ''}
            buttonType="link"
            buttonStyle="footer__section-button"
            handleOnClick={() => handleOnClick(ROUTES.LOCATIONS_PAGE)}
            isWithArrow
            iconColor={theme['secondary-icon-color']}
          />
        </div>
      </div>
      <div className="footer__section">
        <div className="footer__section-category">
          <Icon
            iconStyle="footer__section-icon"
            id="category"
            color={theme['secondary-icon-color']}
          />
          <span className="footer__section-title">Top categories</span>
        </div>
        <div className="footer__section-options">
          {!isTablet &&
            categories.slice(0, 7).map((category, key) => (
              <span className="footer__section-option" key={`${key}`}>
                {category}
              </span>
            ))}
          <Button
            testid="seeAllCategories"
            text={!isTablet ? 'See all' : ''}
            buttonType="link"
            buttonStyle="footer__section-button"
            handleOnClick={() => handleOnClick(ROUTES.CATEGORIES_PAGE)}
            isWithArrow
            iconColor={theme['secondary-icon-color']}
          />
        </div>
      </div>
      <div
        className={
          type === 'large' ? 'footer__section column' : 'footer--small__section'
        }
      >
        {' '}
        {type === 'large' && (
          <div className="footer__section-category">
            <Icon
              iconStyle="footer__section-icon"
              id="help"
              color={theme['secondary-icon-color']}
            />
            {isTablet ? (
              <span
                role="button"
                tabIndex="0"
                aria-pressed="false"
                className="footer__section-title"
                onClick={() => toggleShowSupport(!isSupportShown)}
                onKeyPress={() => toggleShowSupport(!isSupportShown)}
              >
                Support
              </span>
            ) : (
              <span className="footer__section-title">Support</span>
            )}
          </div>
        )}
        {isSupportShown && (
          <div className="footer__section-options column">
            <span
              data-testid="helpCenter"
              role="button"
              tabIndex="0"
              aria-pressed="false"
              className="footer__section-option"
              onClick={() => handleOnClick(ROUTES.FAQ_PAGE)}
              onKeyPress={() => handleOnClick(ROUTES.FAQ_PAGE)}
            >
              Help centre
            </span>
            <span className="footer__section-option">Terms & Conditions</span>
            <span className="footer__section-option">Privacy policy</span>
            {!isTablet && type !== 'large' && (
              <span className="footer__section-option">© 2019 Tickitto</span>
            )}
          </div>
        )}
        {type !== 'large' && <div className="footer__section-line--small" />}
        {type !== 'large' && (
          <div className="logo-section">
            <span className="logo-section__powered">powered by</span>
            <div className="logo-section__logo">
              <Icon id="logo" color={theme['secondary-icon-color']} />
            </div>
            {isTablet && (
              <span className="logo-section__year">© 2019 Tickitto</span>
            )}
          </div>
        )}
      </div>
      {isTablet ? (
        <div className="footer__section column">
          <div className="footer__section-category">
            <Icon
              iconStyle="footer__section-icon"
              id="settings"
              color={theme['secondary-icon-color']}
            />
            <span
              className="footer__section-title"
              role="button"
              tabIndex="0"
              aria-pressed="false"
              onClick={() => actions.togglePopup('displayPopupSettings')}
              onKeyPress={() => actions.togglePopup('displayPopupSettings')}
            >
              Settings
            </span>
          </div>
        </div>
      ) : (
        <div className="footer__section column">
          <div className="footer__section-category">
            <Icon
              iconStyle="footer__section-icon"
              id="settings"
              color={theme['secondary-icon-color']}
            />
            <span className="footer__section-title">Settings</span>
          </div>
          <div>
            <Settings popup={false} />
          </div>
        </div>
      )}

      <div className="footer__section-line" />
      <div className="footer__section">
        <div className="logo-section">
          <span className="logo-section__powered">powered by</span>
          <div className="logo-section__logo">
            <Icon id="logo" color={theme['secondary-icon-color']} />
          </div>
          {type === 'large' && (
            <span className="logo-section__year">© 2019 Tickitto</span>
          )}
        </div>
      </div>
    </AntdFooter>
  );
}
