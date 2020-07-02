import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Row, Col } from 'antd';

import Icon from '../../Icon';
import Button from '../../Button';

import UserDetailsCard from '../UserDetailsCard';

import data from './data';

import './style.scss';

const { Title, Text } = Typography;

export default function Confirmation({ paymentStatus, userInfo, paymentInfo }) {
  return (
    <Row className="confirmation-step">
      <Col xs={24} sm={24} md={24} lg={15}>
        <Row>
          <Col className="confirmation-step__title">
            {!paymentStatus && <Title>Payment failed</Title>}
            {paymentStatus && <Title>Your tickets are ready</Title>}
          </Col>
        </Row>
        {paymentStatus && (
          <div className="confirmation-step__success-card">
            <Row className="confirmation-step__reference">
              <p>Order reference: #{data.reference}</p>
            </Row>
            <Row className="confirmation-step__content">
              <Col xs={24} lg={7} className="confirmation-step__image">
                <img
                  src={data.imageUrl}
                  alt={data.attractionName}
                  data-testid="attractionImage"
                />
              </Col>
              <Col xs={24} lg={17} className="confirmation-step__description">
                <Row className="confirmation-step__attraction-details">
                  <Col xs={24} lg={12}>
                    <div>
                      <h2 className="confirmation-step__sub-title">
                        {data.attractionName}
                      </h2>
                      <ul className="confirmation-step__list">
                        <li>
                          <p className="confirmation-step__list-item">
                            <Icon
                              id="location"
                              iconStyle="ticket__location-icon"
                              color="#7a49a0"
                            />
                            {data.location}
                          </p>
                        </li>
                        <li>
                          <p className="confirmation-step__list-item">
                            <Icon
                              id="calendar"
                              iconStyle="ticket__icon"
                              color="#7a49a0"
                            />{' '}
                            {data.date}
                          </p>
                        </li>
                        <li>
                          <p className="confirmation-step__list-item">
                            <Icon
                              id="seat"
                              iconStyle="ticket__seat-icon"
                              color="#7a49a0"
                            />{' '}
                            {data.seat}
                          </p>
                        </li>
                      </ul>
                    </div>
                  </Col>
                  <Col xs={24} lg={12} className="ticket__download">
                    <Button
                      text="Download tickets"
                      buttonType="default"
                      buttonStyle="ticket__download-button"
                      icon="ticket"
                      iconStyle="ticket__download-icon"
                      iconColor="#7a49a0"
                    />
                  </Col>
                </Row>
                <div
                  className="confirmation-step__tickets"
                  data-testid="ticketsData"
                >
                  {data.ticket.map(item => (
                    <Row
                      className="confirmation-step__tickets__data"
                      key={item.id}
                    >
                      <Col span={20}>
                        <Text className="confirmation-step__tickets__text">
                          {item.name} x {item.numberOftickets}
                        </Text>
                      </Col>
                      <Col span={4}>
                        <Text className="confirmation-step__tickets__value">
                          {item.currency}
                          {item.price * item.numberOftickets}
                        </Text>
                      </Col>
                    </Row>
                  ))}
                </div>
                <Row className="confirmation-step__tickets-total">
                  <Col span={20}>
                    <Text className="confirmation-step__tickets-total__text">
                      Total
                    </Text>
                  </Col>
                  <Col span={4}>
                    <Text className="confirmation-step__tickets-total__value">
                      £20
                    </Text>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        )}
      </Col>
      {paymentStatus && (
        <Col xs={24} sm={24} md={24} lg={8}>
          <UserDetailsCard
            userInfo={userInfo}
            paymentInfo={paymentInfo}
            step={4}
          />
        </Col>
      )}
      <Col xs={24} sm={24} md={24} lg={19}>
        {!paymentStatus && (
          <div className="confirmation-step__fail-card">
            <p className="confirmation-step__fail-text">
              Your card has not been charged. To try again, please click below.
            </p>
            <Button
              text="Return to checkout"
              buttonType="primary"
              buttonStyle="confirmation-step__fail-button"
              handleOnClick={() => {}}
              testid="paymentFailButton"
            />
          </div>
        )}
      </Col>
    </Row>
  );
}

Confirmation.propTypes = {
  paymentStatus: PropTypes.bool.isRequired,
  userInfo: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  paymentInfo: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
};
