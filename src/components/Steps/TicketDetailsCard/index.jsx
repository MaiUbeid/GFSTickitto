import React from 'react';
import PropTypes from 'prop-types';
import { Card, Row, Col } from 'antd';

import Icon from '../../Icon';
import Button from '../../Button';
import ScrollButton from '../../ScrollButton';

import data from './data';

import './style.scss';

const { Meta } = Card;

export default function TicketDetailsCard({ step, handleNext }) {
  return (
    <div>
      <Card title="Your tickets" className="ticket-card" bordered={false}>
        <hr className="ticket-card__line" />
        <div className="ticket-card__attraction">
          <Meta
            className="ticket-card__meta-attraction"
            title={data.attractionName}
            description={
              <div>
                <div className="ticket-card__meta-attraction--flex">
                  <p className="ticket-card__meta-attraction__box">
                    <Icon
                      id="location"
                      iconStyle="ticket-card__location-icon"
                      color="#7A49A0"
                    />{' '}
                    {data.location}
                  </p>

                  <p className="ticket-card__meta-attraction__box">
                    <Icon
                      id="calendar"
                      iconStyle="ticket-card__icon"
                      color="#7A49A0"
                    />{' '}
                    {data.date}
                  </p>
                </div>

                <p
                  className={
                    ('ticket-card__seat', 'ticket-card__meta-attraction__box')
                  }
                >
                  <Icon
                    id="seat"
                    iconStyle="ticket-card__seat-icon"
                    color="#7A49A0"
                  />{' '}
                  {data.seat}
                </p>
              </div>
            }
          />
          <hr className="ticket-card__line" />
          <Meta
            className="ticket-card__meta-booking"
            description={
              <div>
                <Row gutter={8}>
                  <Col span={20} className="ticket-card__sub-title">
                    Booking fee
                  </Col>
                  <Col span={4} className="ticket-card__number">
                    {data.bookingFee}
                  </Col>
                </Row>
                <Row gutter={8}>
                  <Col span={20} className="ticket-card__sub-title">
                    Ticket price
                  </Col>
                  <Col span={4} className="ticket-card__number">
                    {data.ticketPrice}
                  </Col>
                </Row>
              </div>
            }
          />
          <div
            className={
              step === 1
                ? 'ticket-card__first-step__actions ticket-card__actions'
                : 'ticket-card__actions'
            }
          >
            <Row>
              <Col className="ticket-card__price-desc">Total price</Col>
              <Col className="ticket-card__price-value">{data.totalPrice}</Col>
            </Row>
            <Row>
              {step === 1 ? (
                <Button
                  text="Next Step"
                  buttonType="primary"
                  buttonStyle="ticket-card__button"
                  htmlType="submit"
                  handleOnClick={handleNext}
                  isWithArrow
                  iconColor="#FFFFFF"
                  testid="nextStepButton"
                />
              ) : null}
              {step === 1 && (
                <ScrollButton
                  text="Next Step"
                  handleOnClick={handleNext}
                  isWithArrow
                />
              )}
            </Row>
          </div>
        </div>
      </Card>
    </div>
  );
}

TicketDetailsCard.defaultProps = {
  handleNext: () => {},
};

TicketDetailsCard.propTypes = {
  step: PropTypes.number.isRequired,
  handleNext: PropTypes.func,
};
