import React, { useContext } from 'react';
import Icon from '../Icon';
import './style.scss';
import { ThemeContext } from '../ContextProviders/ThemeProvider';

export default function LadingSpinner() {
  const theme = useContext(ThemeContext);

  return (
    <div className="loading-spinner" data-testid="loading-spinner">
      <div className="loading-spinner__container">
        <Icon id="syncCircle" color={theme['primary-color']} />
      </div>
    </div>
  );
}
