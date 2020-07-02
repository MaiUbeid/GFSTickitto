import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Typography, Row, Col } from 'antd';

import { PopupsContext } from '../../ContextProviders/PopupsProvider';
import Icon from '../../Icon';
import PaymentCard from './PaymentCard';
import PaymentDetails from './PaymentDetails';
import TicketDetailsCard from '../TicketDetailsCard';
import UserDetailsCard from '../UserDetailsCard';
import ProcessingStep from './ProcessingStep';

import './style.scss';

const { Title } = Typography;

export default function Payment({
  startProcessing,
  minutes,
  seconds,
  userInfo,
  paymentInfo,
  paymentStatusReady,
  handlePaymentInfoChange,
}) {
  const { state } = useContext(PopupsContext);
  return !state.displayProcessing ? (
    <Row className="payment__step">
      <Col xs={24} sm={24} md={24} lg={15}>
        <Row>
          <Col className="payment-card__title">
            <Title>Payment</Title>
          </Col>
        </Row>
        <div className="payment-card">
          <p className="payment-card__description">
            We have secured your tickets. To receive your tickets please
            complete your payment as soon as possible via one of our secure
            payment methods.
          </p>
          <div className="payment-card__timer-description">
            <div className="payment-card__timer-description--flex">
              <Icon
                id="clock"
                iconStyle="payment-card__timer-icon"
                color="#7a49a0"
              />
              <span>Time left to complete your payment:</span>
            </div>
            <span className="payment-card__timer">
              {minutes < 10 ? `0${minutes}` : minutes}min{' '}
              {seconds < 10 ? `0${seconds}` : seconds} seconds
            </span>
          </div>
          {!state.displayDetails && <PaymentCard />}
          {state.displayDetails && (
            <PaymentDetails handlePaymentInfoChange={handlePaymentInfoChange} />
          )}
        </div>
      </Col>
      <Col xs={24} sm={24} md={24} lg={8}>
        <div className="payment-card__common-cards">
          <Col xs={24} md={24}>
            <TicketDetailsCard step={3} />
          </Col>
          <Col xs={24} md={24}>
            <UserDetailsCard
              userInfo={userInfo}
              paymentInfo={paymentInfo}
              step={3}
            />
          </Col>
        </div>
      </Col>
    </Row>
  ) : (
    <div>
      <ProcessingStep
        paymentStatusReady={paymentStatusReady}
        startProcessing={startProcessing}
      />
    </div>
  );
}

Payment.propTypes = {
  startProcessing: PropTypes.func.isRequired,
  minutes: PropTypes.number.isRequired,
  seconds: PropTypes.number.isRequired,
  paymentStatusReady: PropTypes.bool.isRequired,
  userInfo: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  paymentInfo: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  handlePaymentInfoChange: PropTypes.func.isRequired,
};
