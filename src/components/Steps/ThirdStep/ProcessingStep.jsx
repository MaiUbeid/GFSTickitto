import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'antd';

import { AppViewContext } from '../../ContextProviders/AppViewProvider';
import LoadingSpinner from '../../LoadingSpinner';

import './style.scss';

const { Title } = Typography;

export default function ProcessingStep({
  paymentStatusReady,
  startProcessing,
}) {
  const { isTablet } = useContext(AppViewContext);

  return (
    <div
      className="processing-card"
      data-testid="processingCard"
      onChange={startProcessing()}
    >
      {!isTablet && !paymentStatusReady && (
        <div className="processing-card__content">
          <LoadingSpinner className="processing-card__icon" />
          <Title level={2} className="processing-card__title">
            Processing transaction
          </Title>
        </div>
      )}

      {isTablet && !paymentStatusReady && (
        <div className="processing-card__content">
          <Title level={4} className="processing-card__title">
            Apple / GPay / PayPal Auth Screens
          </Title>
        </div>
      )}
    </div>
  );
}

ProcessingStep.propTypes = {
  paymentStatusReady: PropTypes.bool.isRequired,
  startProcessing: PropTypes.func.isRequired,
};
