/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { getURLParameters } from '../../utils/index';

const initialState = {
  currency: 'GBP',
  locale: 'en',
  theme: 'whiteLabel',
};

export const SettingsContext = React.createContext(initialState);

export function SettingsProvider(props) {
  const urlParameters = getURLParameters();

  // eslint-disable-next-line no-unused-vars
  const [settings, setSettings] = useState({
    // todo add a callback to change the settings
    ...initialState,
    ...urlParameters,
  });

  return (
    <SettingsContext.Provider value={settings}>
      {props.children}
    </SettingsContext.Provider>
  );
}

SettingsProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
