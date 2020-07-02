import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Layout, Card, Typography, Row, Col, Input } from 'antd';

import * as ROUTES from '../../constants/routes';
import * as DATA from '../HomePage/data';

import { ThemeContext } from '../../components/ContextProviders/ThemeProvider';
import { Header, Button, Icon, ScrollButton } from '../../components';
import './style.scss';

const { Title } = Typography;
const { Meta } = Card;

export default function ShoppingCart() {
  const history = useHistory();
  const theme = useContext(ThemeContext);
  const [promoCodeStatus, setPromoCodeStatus] = useState();

  function checkPromoCodeStatus(value) {
    if (value === '1') {
      setPromoCodeStatus(false);
    } else if (!value.replace(/\s/g, '').length) {
      setPromoCodeStatus(null);
    } else {
      setPromoCodeStatus(true);
    }
  }

  function handleOnClick(link) {
    history.push(link);
  }

  return (
    <Layout>
      <Header
        subHeaderTitle="Cart"
        type="Cart"
        headerStyle="shopping-cart__header"
        layer={false}
        popup
        breadCrumbLink={ROUTES.HOME_PAGE}
      />

      <Row className="shopping-cart__body">
        <Col xs={24} sm={24} md={24} lg={16}>
          <Row>
            <div className="shopping-cart__title">
              <Title>My Cart</Title>
            </div>
          </Row>

          <Row>
            <Card
              bordered={false}
              className="shopping-cart__tickets"
              actions={[
                <div className="shopping-cart__ticket__total-price">
                  <span className="shopping-cart__ticket__total-price__text">
                    Sub-total
                  </span>
                  <span className="shopping-cart__ticket__total-price__price">
                    £600
                  </span>
                </div>,
              ]}
            >
              {DATA.shoppingCart.map(item => (
                <div className="shopping-cart__ticket" key={item.id}>
                  <Meta
                    avatar={
                      <img
                        className="shopping-cart__ticket__image"
                        src={item.imgUrl}
                        alt=""
                      />
                    }
                    description={
                      <div className="shopping-cart__ticket__details">
                        <div className="shopping-cart__ticket__details__header">
                          <div className="shopping-cart__ticket__details__header__main">
                            <Title className="shopping-cart__ticket__details__header__name">
                              {item.name}
                            </Title>
                            <div className="shopping-cart__ticket__details__header__icons">
                              <Button
                                handleOnClick={() => {
                                  handleOnClick(ROUTES.EVENT_PAGE);
                                }}
                                icon="pencil"
                                iconColor={theme['primary-color']}
                                buttonType="link"
                                buttonStyle="shopping-cart__ticket__details__header__icons__button--edit"
                              />
                              <Button
                                icon="bin"
                                iconColor={theme['primary-color']}
                                iconHoverColor={theme['error-messages']}
                                buttonType="primary"
                                buttonStyle="shopping-cart__ticket__details__header__icons__button--delete"
                              />
                            </div>
                          </div>
                          <span className="shopping-cart__ticket__details__header__price">
                            {item.totalPrice}
                          </span>
                        </div>
                        <div className="shopping-cart__ticket__details__info">
                          <div className="shopping-cart__ticket__details__info__box">
                            <Icon
                              id="location"
                              color={theme['primary-color']}
                              iconStyle="shopping-cart__ticket__details__info__icon--location"
                            />
                            <span className="shopping-cart__ticket__details__info__text">
                              {item.location}
                            </span>
                          </div>
                          <div className="shopping-cart__ticket__details__info__box">
                            <Icon
                              id="calendar"
                              color={theme['primary-color']}
                              iconStyle="shopping-cart__ticket__details__info__icon--date"
                            />
                            <span className="shopping-cart__ticket__details__info__text">
                              {item.date}
                            </span>
                          </div>
                          <div className="shopping-cart__ticket__details__info__box">
                            <Icon
                              id="seat"
                              color={theme['primary-color']}
                              iconStyle="shopping-cart__ticket__details__info__icon--seat"
                            />
                            <span className="shopping-cart__ticket__details__info__text">
                              {item.seat}
                            </span>
                          </div>
                        </div>
                        <div className="shopping-cart__ticket__details__tickets">
                          <div className="shopping-cart__ticket__details__tickets__type">
                            <span className="shopping-cart__ticket__details__tickets__type__text">
                              {item.tickets.adult.name} x{' '}
                              {item.tickets.adult.number}
                            </span>
                            <span className="shopping-cart__ticket__details__tickets__type__price">
                              {item.tickets.adult.currency}
                              {item.tickets.adult.total(
                                item.tickets.adult.price,
                                item.tickets.adult.number
                              )}
                            </span>
                          </div>
                          <div className="shopping-cart__ticket__details__tickets__type">
                            <span className="shopping-cart__ticket__details__tickets__type__text">
                              {item.tickets.reduced.name} x{' '}
                              {item.tickets.reduced.number}
                            </span>
                            <span className="shopping-cart__ticket__details__tickets__type__price">
                              {item.tickets.reduced.currency}
                              {item.tickets.reduced.total(
                                item.tickets.reduced.price,
                                item.tickets.reduced.number
                              )}
                            </span>
                          </div>
                          <div className="shopping-cart__ticket__details__tickets__type">
                            <span className="shopping-cart__ticket__details__tickets__type__text">
                              {item.tickets.child.name} x{' '}
                              {item.tickets.child.number}
                            </span>
                            <span className="shopping-cart__ticket__details__tickets__type__price">
                              {item.tickets.child.currency}
                              {item.tickets.child.total(
                                item.tickets.child.price,
                                item.tickets.child.number
                              )}
                            </span>
                          </div>
                        </div>
                        <div className="shopping-cart__ticket__details__total-price">
                          <span className="shopping-cart__ticket__details__total-price__text">
                            Price
                          </span>
                          <span className="shopping-cart__ticket__details__total-price__price">
                            {item.totalPrice}
                          </span>
                        </div>
                      </div>
                    }
                  />
                </div>
              ))}
            </Card>
          </Row>
        </Col>

        <Col xs={24} sm={24} md={24} lg={8}>
          <Row>
            <Card
              bordered={false}
              className="shopping-cart__overview"
              title={<Title>Cart overview</Title>}
              actions={[
                <div className="shopping-cart__overview__total-price">
                  <span className="shopping-cart__overview__total-price__text">
                    Total cart price
                  </span>
                  <span className="shopping-cart__overview__total-price__price">
                    £612
                  </span>
                </div>,
              ]}
            >
              <hr className="shopping-cart__overview__line " />
              <div>
                <div className="shopping-cart__overview__details">
                  <span className="shopping-cart__overview__details__text">
                    Product total
                  </span>
                  <span className="shopping-cart__overview__details__price">
                    {' '}
                    £600
                  </span>
                </div>
                <div className="shopping-cart__overview__details">
                  <span className="shopping-cart__overview__details__text">
                    Booking fee
                  </span>
                  <span className="shopping-cart__overview__details__price">
                    {' '}
                    £12
                  </span>
                </div>
                <div className="shopping-cart__overview__details">
                  <span className="shopping-cart__overview__details__text">
                    Discount applied
                  </span>
                  <span className="shopping-cart__overview__details__price">
                    {' '}
                    £0
                  </span>
                </div>
              </div>
              <hr className="shopping-cart__overview__line shopping-cart__overview__line__second" />
              <div>
                <span className="shopping-cart__overview__details__text">
                  Got a promo code?
                </span>
                <Input.Group className="shopping-cart__overview__promo-code">
                  <Input
                    className="shopping-cart__overview__input"
                    placeholder="Enter promotion code…"
                    suffix={
                      promoCodeStatus && (
                        <Icon
                          id="promoCode"
                          iconStyle="shopping-cart__overview__input__icon"
                          color="#008000"
                        />
                      )
                    }
                    onChange={e => checkPromoCodeStatus(e.target.value)}
                    prefix={<span />}
                  />
                  <Button
                    text="Apply"
                    buttonType="primary"
                    buttonStyle="shopping-cart__overview__button"
                  />
                </Input.Group>
                {promoCodeStatus === false && (
                  <p className="shopping-cart__overview__promo-code--incorrect">
                    Invalid code, check it please!
                  </p>
                )}
              </div>
            </Card>
          </Row>
          <Row>
            <Button
              text="Buy now"
              buttonType="primary"
              handleOnClick={() => handleOnClick(ROUTES.FORM_PAGE)}
              buttonStyle="shopping-cart__button"
              isWithArrow
              iconColor={theme['secondary-text-color']}
            />
            <ScrollButton
              text="Buy now"
              isWithArrow
              handleOnClick={() => handleOnClick(ROUTES.FORM_PAGE)}
            />
          </Row>
        </Col>
      </Row>
    </Layout>
  );
}
