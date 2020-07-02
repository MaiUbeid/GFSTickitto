import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Card, Typography } from 'antd';

import { makePriceString } from '../../utils/index';

import { ThemeContext } from '../ContextProviders/ThemeProvider';
import { PopupsContext } from '../ContextProviders/PopupsProvider';

import data from './data';
import Icon from '../Icon';
import Button from '../Button';

import './style.scss';

const { Meta } = Card;
const { Title } = Typography;

export default function Cart({ handleOnClick, handleCartClick }) {
  const theme = useContext(ThemeContext);
  const { state, actions } = useContext(PopupsContext);

  return (
    <>
      <div
        role="button"
        tabIndex="0"
        aria-label="div"
        className="popup-close"
        onClick={() => actions.togglePopup('displayCart')}
        onKeyPress={() => actions.togglePopup('displayCart')}
      />
      <Card
        data-testid="CartComponent"
        bordered={false}
        title={<Title className="popup-cart__title">My cart</Title>}
        className={state.displayCart ? 'popup-cart' : 'popup-cart--hide'}
        onClick={() => handleCartClick()}
        actions={[
          <div className="total-price">
            <span className="total-price__text">Total cart price</span>
            <span className="total-price__price">£80</span>
          </div>,
        ]}
      >
        <Button
          buttonStyle="popup-cart__crossbtn"
          buttonType="button"
          icon="cross"
          iconColor={theme['primary-color']}
          iconStyle="cross-icon"
          handleOnClick={e => {
            e.stopPropagation();
            actions.togglePopup('displayCart');
          }}
          testid="crossButton"
          iconHoverColor="#916aad"
        />
        {data.map(item => (
          <div key={item.id}>
            <hr className="popup-cart__ticket-line" />
            <Meta
              avatar={
                <img
                  className="popup-cart__ticket-img"
                  src={item.imgUrl}
                  alt=""
                />
              }
              description={
                <div className="popup-cart__ticket">
                  <div className="popup-cart__ticket-header">
                    <Title className="popup-cart__ticket-name">
                      {item.name}
                    </Title>
                    <div className="popup-cart__ticket-icons">
                      <Button
                        testid="editButton"
                        handleOnClick={handleOnClick}
                        buttonStyle="popup-cart__ticket-button"
                        icon="pencil"
                        iconColor={theme['primary-color']}
                        buttonType="link"
                      />

                      <Button
                        buttonStyle="popup-cart__ticket-button"
                        icon="bin"
                        iconColor={theme['primary-color']}
                        iconHoverColor={theme['error-messages']}
                        buttonType="primary"
                      />
                    </div>
                  </div>
                  <div className="popup-cart__ticket-date">
                    <Icon
                      id="calendar"
                      color={theme['primary-color']}
                      iconStyle="popup-cart__ticket-icon"
                    />
                    <span>{item.date}</span>
                  </div>
                  <div className="popup-cart__ticket-details">
                    <span>{item.ticketsNo} × </span>
                    <span>{item.ticketType} </span>
                    <span>
                      {makePriceString(item.ticketPrice, item.currency)}
                    </span>
                    <span className="popup-cart__ticket-total">
                      Total {makePriceString(item.ticketPrice, item.currency)}
                    </span>
                  </div>
                </div>
              }
            />
          </div>
        ))}
      </Card>
    </>
  );
}

Cart.propTypes = {
  handleOnClick: PropTypes.func.isRequired,
  handleCartClick: PropTypes.func.isRequired,
};
