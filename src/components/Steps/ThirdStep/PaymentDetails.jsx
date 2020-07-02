import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Row, Col } from 'antd';

import { ThemeContext } from '../../ContextProviders/ThemeProvider';
import { PopupsContext } from '../../ContextProviders/PopupsProvider';
import Button from '../../Button';
import Icon from '../../Icon';

import './style.scss';

export default function PaymentDetails({ handlePaymentInfoChange }) {
  const theme = useContext(ThemeContext);
  const { actions } = useContext(PopupsContext);
  return (
    <div className="credit-card">
      <div className="credit-card__header">
        <h2 className="credit-card__title">Debit / credit card</h2>
        <Button
          text="Payment options"
          buttonType="link"
          buttonStyle="credit-card__span"
          handleOnClick={() => actions.toggleDetails('displayDetails')}
          icon="leftAngle"
          iconColor={theme['btn-link-color']}
          iconStyle="credit-card__back"
        />
      </div>
      <Form
        onFinish={() => actions.togglePopup('displayProcessing')}
        layout="vertical"
        className="credit-card__form"
        data-testid="paymentForm"
      >
        <Form.Item
          label="Card holders name"
          name="holder Name"
          className="credit-card__form-item"
          data-testid="paymentFormItem"
          rules={[
            { required: true, message: 'Please enter the card holder name!' },
          ]}
        >
          <Input
            className="credit-card__input"
            name="holderName"
            onChange={handlePaymentInfoChange}
            autoComplete="off"
            prefix={<span />}
          />
        </Form.Item>

        <Form.Item
          label="Credit / Debit Card Number"
          name="credit Number"
          className="credit-card__form-item"
          data-testid="paymentFormItem"
          rules={[
            { required: true, message: 'Please enter your credit number!' },
          ]}
        >
          <Input
            name="creditNumber"
            suffix={<Icon id="visa" color={theme['primary-color']} />}
            className="credit-card__input"
            onChange={handlePaymentInfoChange}
            autoComplete="off"
            prefix={<span />}
          />
        </Form.Item>

        <Form.Item className="credit-card__form-group">
          <Row className="credit-card__date">
            <Col xs={14} lg={11}>
              <Form.Item
                label="Expiry date MM/YY"
                name="expire Date"
                className="credit-card__expire-date"
                data-testid="paymentFormItem"
              >
                <Input.Group
                  name="expireDate"
                  className="credit-card__input-group"
                >
                  <Input
                    name="month"
                    placeholder="MM"
                    className="credit-card__input"
                    onChange={handlePaymentInfoChange}
                    autoComplete="off"
                    prefix={<span />}
                  />
                  <Input
                    name="year"
                    placeholder="YY"
                    className="credit-card__input"
                    onChange={handlePaymentInfoChange}
                    autoComplete="off"
                    prefix={<span />}
                  />
                </Input.Group>
              </Form.Item>
            </Col>
            <Col xs={10} lg={13}>
              <Form.Item
                label="CVV"
                name="Cvv"
                className="credit-card__cvv"
                data-testid="paymentFormItem"
                rules={[{ required: true, message: 'Please enter CVV!' }]}
              >
                <Input
                  className="credit-card__input-cvv"
                  name="cvv"
                  onChange={handlePaymentInfoChange}
                  autoComplete="off"
                  prefix={<span />}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item className="next">
          <Button
            text="Pay £20.00 now"
            buttonType="primary"
            buttonStyle="credit-card__button"
            testid="paymentFormItem"
            htmlType="submit"
          />
        </Form.Item>
      </Form>
    </div>
  );
}

PaymentDetails.propTypes = {
  handlePaymentInfoChange: PropTypes.func.isRequired,
};
