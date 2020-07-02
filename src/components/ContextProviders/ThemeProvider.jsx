/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import * as themes from '../../styles/themes/index';
import { getURLParameters } from '../../utils/index';

export const ThemeContext = React.createContext({});

export function ThemeProvider(props) {
  const currentTheme = getURLParameters().theme || 'whiteLabel';
  themes.applyTheme(themes[currentTheme]);

  return (
    <ThemeContext.Provider value={themes[currentTheme]}>
      {props.children}
    </ThemeContext.Provider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
