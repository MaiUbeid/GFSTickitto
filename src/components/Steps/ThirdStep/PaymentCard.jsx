import React, { useContext } from 'react';

import { PopupsContext } from '../../ContextProviders/PopupsProvider';
import Button from '../../Button';

import './style.scss';

export default function PaymentCard() {
  const { actions } = useContext(PopupsContext);
  return (
    <div className="card-type">
      <h2 className="card-type__title">How would you like to pay?</h2>
      <ul className="card-type__buttons-list">
        <li>
          <Button
            text="Debit / credit card"
            buttonType="default"
            buttonStyle="card-type__button"
            icon="card"
            iconStyle="card-type__ticket"
            iconColor="#7a49a0"
            testid="paymentButton"
            handleOnClick={() => actions.togglePopup('displayDetails')}
          />
        </li>
        <li>
          <Button
            text="Buy with"
            buttonType="payment"
            buttonStyle="card-type__apple-button"
            icon="apple"
            iconStyle="card-type__apple-icon"
            iconColor="#FFFFFF"
            testid="paymentButton"
          />
        </li>
        <li>
          <Button
            text="Buy with"
            buttonType="payment"
            buttonStyle="card-type__google-button"
            icon="google"
            iconStyle="card-type__google-icon"
            iconKeepOriginal
            testid="paymentButton"
          />
        </li>
        <li>
          <Button
            text="Buy now with"
            buttonType="payment"
            buttonStyle="card-type__paypal-button"
            icon="paypal"
            iconStyle="card-type__paypal-icon"
            iconKeepOriginal
            testid="paymentButton"
          />
        </li>
      </ul>
    </div>
  );
}
