import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Layout } from 'antd';

import * as ROUTES from '../../constants/routes';
import { ThemeContext } from '../../components/ContextProviders/ThemeProvider';
import './style.scss';

import {
  Header,
  Icon,
  FirstStep,
  SecondStep,
  ThirdStep,
  ForthStep,
} from '../../components';

export default function FormPage() {
  const theme = useContext(ThemeContext);
  const history = useHistory();
  const [userInfo, setUserInfo] = useState({
    'First name': '',
    'Last name': '',
    Email: '',
    Phone: '',
  });
  const [paymentInfo, setPaymentInfo] = useState({
    holderName: '',
    creditNumber: '',
    cvv: '',
    month: '',
    year: '',
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [paymentStatus, setPaymentSatus] = useState(false);
  const [paymentStatusReady, setPaymentSatusReady] = useState(false);
  const [seconds, setSeconds] = useState(59);
  const [minutes, setMinutes] = useState(10);

  function handleOnClick(link) {
    history.push(link);
  }

  function handleUserInfoChange(name, value) {
    setUserInfo({ ...userInfo, [name]: value });
  }

  function handlePaymentInfoChange(event) {
    if (event && event.target) {
      const { name, value } = event.target;
      setPaymentInfo({ ...paymentInfo, [name]: value });
    }
  }

  function handleNext() {
    setCurrentStep(currentStep + 1);
  }

  function handlePayment() {
    setPaymentSatus(true);
    handleNext();
  }

  function startProcessing() {
    setTimeout(() => {
      setPaymentSatusReady(true);
    }, 1000);
    if (paymentStatusReady) handlePayment();
  }

  function startTimer() {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (seconds === 0) {
        if (minutes === 0) {
          setCurrentStep(1);
          clearInterval(interval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
  }

  const steps = [
    {
      title: '1. Booking details',
      icon: <Icon id="calendar" color={theme['primary-color']} />,
      content: <FirstStep handleNext={handleNext} currentStep={currentStep} />,
    },
    {
      title: '2. Personal details',
      icon:
        currentStep >= 1 ? (
          <Icon id="user" color={theme['primary-color']} />
        ) : (
          <Icon id="whiteUser" color={theme['secondary-icon-color']} />
        ),
      content: (
        <SecondStep
          handleNext={handleNext}
          startTimer={startTimer}
          currentStep={currentStep}
          handleUserInfoChange={handleUserInfoChange}
        />
      ),
    },
    {
      title: '3. Payment',
      icon:
        currentStep >= 2 ? (
          <Icon id="wallet" color={theme['primary-color']} />
        ) : (
          <Icon id="whiteWallet" color={theme['secondary-icon-color']} />
        ),
      content: (
        <ThirdStep
          handleNext={handleNext}
          minutes={minutes}
          seconds={seconds}
          startTimer={startTimer}
          currentStep={currentStep}
          userInfo={userInfo}
          paymentInfo={paymentInfo}
          paymentStatusReady={paymentStatusReady}
          handlePaymentInfoChange={handlePaymentInfoChange}
          startProcessing={startProcessing}
        />
      ),
    },
    {
      title: '4. Confirmation',
      icon:
        currentStep >= 3 ? (
          <Icon id="check" color={theme['primary-color']} />
        ) : (
          <Icon id="whiteCheck" color={theme['secondary-icon-color']} />
        ),
      content: (
        <ForthStep
          paymentStatus={paymentStatus}
          userInfo={userInfo}
          paymentInfo={paymentInfo}
        />
      ),
    },
  ];

  return (
    <Layout className="form-page">
      <Header
        page="form"
        breadcrumb={false}
        steps={steps}
        headerStyle="form-page__header"
        currentStep={currentStep}
        layer={false}
        handleOnClick={handleOnClick}
        handleButtonClick={handleOnClick}
        popup
        breadCrumbLink={ROUTES.EVENT_PAGE}
      />

      <div>{steps[currentStep].content}</div>
    </Layout>
  );
}
