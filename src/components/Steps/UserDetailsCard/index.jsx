import React from 'react';
import PropTypes from 'prop-types';
import { Card, Row, Col, Typography } from 'antd';

import Icon from '../../Icon';

import './style.scss';

const { Text } = Typography;

export default function DetailsCard({ step, userInfo, paymentInfo }) {
  return (
    <Card className="details-card" title="Your details">
      {Object.keys(userInfo).map(key => {
        return (
          <Row className="details-card__row" key={key} data-testid="userInfo">
            <Col span={12}>
              <Text className="details-card__key">{key}</Text>
            </Col>
            <Col span={12}>
              <Text className="details-card__value">{userInfo[key]}</Text>
            </Col>
          </Row>
        );
      })}
      {step === 4 && paymentInfo.creditNumber && (
        <div data-testid="paymentInfo">
          <h2 className="details-card__title">Payment details</h2>
          <Row className="details-card__row visa__details">
            <Col xs={12} lg={18}>
              <Text className="details-card__key">
                {' '}
                <Icon
                  id="card"
                  iconStyle="details-card__icon"
                  color="#7a49a0"
                />{' '}
                VISA Debit ending in{' '}
              </Text>
            </Col>
            <Col xs={12} lg={6}>
              <Text className="details-card__value">
                {paymentInfo.creditNumber.slice(
                  paymentInfo.creditNumber.length - 4
                )}
              </Text>
            </Col>
          </Row>
        </div>
      )}
    </Card>
  );
}

DetailsCard.propTypes = {
  step: PropTypes.number.isRequired,
  userInfo: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  paymentInfo: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
};
