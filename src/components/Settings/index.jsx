import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';

import { ThemeContext } from '../ContextProviders/ThemeProvider';
import { PopupsContext } from '../ContextProviders/PopupsProvider';
import Icon from '../Icon';
import Button from '../Button';
import Dropdown from '../Dropdown';

import './style.scss';

export default function Settings({ popup }) {
  const theme = useContext(ThemeContext);
  const { state, actions } = useContext(PopupsContext);

  return (
    <Card
      className={
        popup
          ? state.displayPopupSettings
            ? 'popup-settings'
            : 'popup-settings--hide'
          : 'footer-settings'
      }
      title={popup ? 'Update your settings' : null}
      actions={[
        popup && (
          <div className="popup-settings__actions">
            <Button
              text="Cancel"
              buttonType="link"
              buttonStyle="cancel-button"
              testid="cancelButton"
              handleOnClick={() => actions.togglePopup('displayPopupSettings')}
            />
            <Button
              text="Save"
              buttonType="default"
              buttonStyle="save-button"
            />
          </div>
        ),
      ]}
      data-testid="settingsTest"
    >
      {popup && (
        <Button
          buttonStyle="popup-settings__button-cross"
          buttonType="button"
          icon="cross"
          iconColor={theme['primary-color']}
          iconStyle="cross-icon"
          handleOnClick={() => actions.togglePopup('displayPopupSettings')}
          testid="crossButton"
        />
      )}
      <div className="popup-settings__body">
        <hr className="popup-settings__line" />
        <div className="popup-settings__body-item popup-settings__body-language ">
          <Icon
            id="language"
            color={
              popup ? theme['primary-color'] : theme['secondary-icon-color']
            }
            iconStyle="language-icon"
          />
          <span>Language</span>
        </div>
        <Dropdown
          placeholder="English"
          iconColor={
            popup
              ? theme['dropdown-arrow-dark-color']
              : theme['dropdown-arrow-secondary-color']
          }
          options={[
            { label: 'English', value: 'English' },
            { label: 'Arabic', value: 'Arabic' },
            { label: 'French', value: 'French' },
          ]}
        />

        <div className="popup-settings__body-item popup-settings__body-currency">
          <Icon
            id="currency"
            color={
              popup ? theme['primary-color'] : theme['secondary-icon-color']
            }
          />
          <span>Currency</span>
        </div>
        <Dropdown
          placeholder="GBP (£)"
          iconColor={
            popup
              ? theme['dropdown-arrow-dark-color']
              : theme['dropdown-arrow-secondary-color']
          }
          options={[
            { label: 'GBP (£)', value: 'GBP (£)' },
            { label: 'USD ($)', value: 'USD ($)' },
            { label: 'EUR (€)', value: 'EUR (€)' },
          ]}
        />
      </div>
    </Card>
  );
}

Settings.propTypes = {
  popup: PropTypes.bool.isRequired,
};
