import { Col, Form, Input, Row, Typography } from 'antd';
import PropTypes from 'prop-types';
import React, { useContext, useState, useEffect } from 'react';
import Button from '../../Button';
import { ThemeContext } from '../../ContextProviders/ThemeProvider';
import Dropdown from '../../Dropdown';
import Icon from '../../Icon';
import ScrollButton from '../../ScrollButton';
import TicketDetailsCard from '../TicketDetailsCard';
import flagsAndCodes from './flags-emoji.json';
import './style.scss';

const { Title, Text } = Typography;

export default function PersonalInof({
  handleNext,
  startTimer,
  handleUserInfoChange,
}) {
  const theme = useContext(ThemeContext);
  const [countryCode, setCountryCode] = useState('+44');
  const [errorMessage, setErrorMessage] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const options = [];
  flagsAndCodes.map(country =>
    options.push({
      label: `${country.flag} ${country.dial_code}`,
      value: country.dial_code,
    })
  );

  function validatePhoneNumberInput() {
    if (!phoneNumber.length) {
      setErrorMessage('Please enter your phone number!');
    } else if (Number.isNaN(Number(phoneNumber))) {
      setErrorMessage('Please enter a valid phone number!');
    } else {
      setErrorMessage('');
    }
  }

  useEffect(() => {
    if (phoneNumber.length) {
      validatePhoneNumberInput();
    }
  }, [phoneNumber]);

  function getCountryCode(event) {
    setCountryCode(event);
  }

  function getUserInfo(event) {
    if (event.target) {
      if (event.target.name === 'Phone') {
        validatePhoneNumberInput();
        handleUserInfoChange(
          event.target.name,
          `${countryCode} ${event.target.value}`
        );
      } else {
        handleUserInfoChange(event.target.name, event.target.value);
      }
    }
  }

  return (
    <Row className="personal-step">
      <Col xs={24} sm={24} md={24} lg={16}>
        <Row>
          <Col className="personal-step-form__title">
            <Title>Add your details</Title>
          </Col>
        </Row>
        <Form
          data-testid="personalForm"
          onFinish={() => {
            if (!errorMessage) {
              startTimer();
              handleNext();
            }
          }}
          layout="vertical"
          className="personal-step-form"
        >
          <Row className="personal-step-form__name">
            <Col xs={24} lg={12}>
              <Form.Item
                className="personal-step-form__item"
                name="firstname"
                label="First name"
                rules={[
                  { required: true, message: 'Please enter your first name!' },
                ]}
              >
                <Input
                  name="First name"
                  className="personal-step-form__input"
                  onChange={getUserInfo}
                  data-testid="personalInput"
                  prefix={<span />}
                />
              </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
              <Form.Item
                className="personal-step-form__item personal-step-form__item__last-name"
                name="lastname"
                label="Last name"
                rules={[
                  { required: true, message: 'Please enter your last name!' },
                ]}
              >
                <Input
                  name="Last name"
                  className="personal-step-form__input"
                  onChange={getUserInfo}
                  data-testid="personalInput"
                  prefix={<span />}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            className="personal-step-form__item personal-step-form__item__email-address"
            name="email"
            label="Email address"
            rules={[
              { required: true, message: 'Please enter your email!' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input
              name="Email"
              className="personal-step-form__input"
              onChange={getUserInfo}
              data-testid="personalInput"
              prefix={<span />}
            />
          </Form.Item>
          <Form.Item
            className="personal-step-form__item personal-step-form__item__phone-number"
            name="phone"
            label="Phone number"
          >
            <Input.Group>
              <Dropdown
                placeholder="🇬🇧 +44"
                options={options}
                dropdownStyle={
                  errorMessage.length
                    ? 'personal-step-form__dropdown personal-step-form__error-message'
                    : 'personal-step-form__dropdown'
                }
                onSelect={event => getCountryCode(event)}
              />
              <Input
                name="Phone"
                className={
                  errorMessage.length
                    ? 'personal-step-form__input personal-step-form__error-message'
                    : 'personal-step-form__input'
                }
                onChange={event => {
                  getUserInfo(event);
                  setPhoneNumber(event.target.value);
                }}
                value={phoneNumber}
                prefix={<span />}
              />
            </Input.Group>
            {errorMessage && (
              <span className="personal-step-form__error-message__text">
                {errorMessage}
              </span>
            )}
          </Form.Item>
          <Form.Item className="personal-step-form__info">
            <Icon
              id="notification"
              iconStyle="personal-step-form__info__icon"
              color={theme['primary-color']}
            />
            <Text className="personal-step-form__info__text">
              We’ll only use this in case there is a problem with your order
            </Text>
          </Form.Item>

          <Button
            text="Confirm your booking"
            buttonType="primary"
            buttonStyle="personal-step-form__button"
            testid="personalButton"
            htmlType="submit"
            handleOnClick={() => validatePhoneNumberInput()}
          />
          <ScrollButton
            text="Confirm your booking"
            handleOnClick={() => validatePhoneNumberInput()}
          />
        </Form>
      </Col>
      <Col xs={24} sm={24} md={24} lg={8}>
        <TicketDetailsCard step={2} />
      </Col>
    </Row>
  );
}

PersonalInof.propTypes = {
  handleNext: PropTypes.func.isRequired,
  startTimer: PropTypes.func.isRequired,
  handleUserInfoChange: PropTypes.func.isRequired,
};
