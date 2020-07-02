import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Row, Col } from 'antd';

import TicketDetailsCard from '../TicketDetailsCard';

import './style.scss';

const { Title } = Typography;

export default function FirstStep({ handleNext }) {
  return (
    <Row className="ticket-step">
      <Col xs={24} sm={24} md={24} lg={15}>
        <Row>
          <Col className="ticket-step__ticket-details-title">
            <Title>Choose your tickets</Title>
          </Col>
        </Row>
      </Col>
      <Col xs={24} sm={24} md={24} lg={8}>
        <TicketDetailsCard step={1} handleNext={handleNext} />
      </Col>
    </Row>
  );
}

FirstStep.propTypes = {
  handleNext: PropTypes.func.isRequired,
};
