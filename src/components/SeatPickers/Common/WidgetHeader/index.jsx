import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import Icon from '../../../Icon';
import { ThemeContext } from '../../../ContextProviders/ThemeProvider';

export default function WidgetHeader({ onGoBack = () => {} }) {
  const theme = useContext(ThemeContext);
  return (
    <div className="widget-header">
      <div
        className="widget-header__back"
        label="back-buton"
        role="button"
        tabIndex="-1"
        onClick={onGoBack}
        onKeyDown={onGoBack}
      >
        <Icon id="backArrow" color={theme['primary-color']} />
      </div>

      <h1>Book your tickets</h1>
    </div>
  );
}

WidgetHeader.propTypes = {
  onGoBack: PropTypes.func.isRequired,
};
