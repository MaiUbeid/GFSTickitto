/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable no-underscore-dangle */
import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import enGB from 'antd/lib/locale-provider/en_GB';
import 'moment/locale/en-gb';
import moment from 'moment';
import { Layout, Row, Col, Typography } from 'antd';

import { getURLParameters, makePriceString } from '../../utils';
import apiClient from '../../utils/apiClient';

import * as ROUTES from '../../constants/routes';

import { ApiAvailabilityProvider } from '../../components/ContextProviders/ApiAvailabilityProvider';
import {
  AppViewProvider,
  AppViewContext,
} from '../../components/ContextProviders/AppViewProvider';
import { ThemeContext } from '../../components/ContextProviders/ThemeProvider';

import { PopupsContext } from '../../components/ContextProviders/PopupsProvider';
import { EventsContext } from '../../components/ContextProviders/EventsProvider';
import TicketPickWidget from '../../components/SeatPickers/Widget';

import {
  Button,
  Header,
  Icon,
  PopupCarousel,
  EventCard,
  MobileBottomModal,
  LoadingSpinner,
  MapContainer,
} from '../../components';

import * as DATA from '../HomePage/data';

import './style.scss';

const { Title, Text } = Typography;

export default function EventPage() {
  const theme = useContext(ThemeContext);
  const { isTablet } = useContext(AppViewContext);
  const { state, actions } = useContext(PopupsContext);

  const [isCalendarShown, toggleShowCalendar] = useState(false);
  const [isScroll, setIsScroll] = useState(false);
  const [{ events }] = useContext(EventsContext);
  const [eventData, setEventData] = useState(null);
  const [sessionId, setSessionId] = useState(null);

  const { eventId } = getURLParameters();
  const history = useHistory();

  // get the event data
  useEffect(() => {
    const event = events.find(item => item._id === eventId);
    if (event != null) {
      events.map(item => {
        if (item._id === eventId) {
          setEventData(item);
        }
      });
    } else {
      apiClient.getEventById(
        eventId,
        res => {
          setEventData(res);
        },
        e => {
          console.error(e);
        }
      );
    }
  }, []);

  // get the session Id
  useEffect(() => {
    apiClient.getBasketId(
      basketData => {
        const basketId = basketData._id;
        apiClient.getAvailability(
          { basketId, eventId },
          availData => {
            setSessionId(availData.session_id);
          },
          e => {
            console.error(e);
          }
        );
      },
      e => {
        console.error(e);
      }
    );
  }, []);

  moment.updateLocale('en-gb', {
    weekdaysMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  });

  function handleScroll() {
    if (window.innerWidth > 500) {
      if (window.scrollY >= 320) setIsScroll(true);
      else setIsScroll(false);
    } else {
      if (window.scrollY < 1300) setIsScroll(true);
      if (window.scrollY >= 1300) setIsScroll(false);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScroll]);

  function handleBookBtnClick() {
    history.push(ROUTES.FORM_PAGE);
  }

  return eventData !== null ? (
    <Layout className="event-page">
      <Header
        isImage={false}
        page="event"
        images={eventData.images}
        headerStyle="event-page__header"
        breadcrumb={false}
        layer={false}
        popup
      />
      <PopupCarousel images={eventData.images} />

      <Row
        className={
          isScroll
            ? 'event-page__booking-header--visible'
            : 'event-page__booking-header'
        }
      >
        <Col
          xs={24}
          md={14}
          lg={18}
          className="event-page__details-header__title event-page__booking-header__title isBrowser"
        >
          <Title>{eventData.title}</Title>
        </Col>
        <Col
          xs={24}
          md={10}
          lg={6}
          className="event-page__booking-header__book"
        >
          <div className="event-page__booking-header__price isBrowser">
            <span className="event-page__time-header__price-span">from </span>
            <Text className="event-page__booking-header__price-value">
              {makePriceString(eventData.from_price, eventData.currency)}
            </Text>
          </div>
          <Button
            text="Book now"
            buttonType="bookNow"
            buttonStyle="event-page__booking-header__button"
            icon="ticket"
            iconColor={theme['secondary-icon-color']}
            handleOnClick={
              !isTablet
                ? () => handleBookBtnClick()
                : () => toggleShowCalendar(true)
            }
          />
        </Col>
      </Row>

      <Row className="event-page__details">
        <Col xs={24} sm={24} md={24} lg={15}>
          <Row className="event-page__details-header">
            <Col span={24} className="event-page__details-header__title">
              <Title>{eventData.title}</Title>
            </Col>
            <Col xs={24} sm={24} md={18} lg={18}>
              <p className="event-page__details-header__location">
                <Icon
                  id="location"
                  iconStyle="event-page__details-header__location-icon"
                  color={theme['primary-color']}
                />{' '}
                {`${eventData.country}, ${eventData.city}, ${eventData.country_code}`}
              </p>
            </Col>
            <Col
              span={18}
              className="event-page__details-header__price isMobile"
            >
              <div>
                <span className="event-page__time-header__price-span">
                  from{' '}
                </span>
                <Text className="event-page__time-header__price">
                  {makePriceString(eventData.from_price, eventData.currency)}
                </Text>
              </div>
            </Col>
            <Col span={6}>
              <ul className="event-page__details-header__social">
                <li className="event-page__details-header__social-item">
                  <Icon
                    id="mail"
                    iconStyle="event-page__details-header__social-icon"
                    color={theme['primary-color']}
                  />
                </li>
                <li className="event-page__details-header__social-item">
                  <Icon
                    id="messenger"
                    iconStyle="event-page__details-header__social-icon"
                    keepOriginal
                  />
                </li>
                <li className="event-page__details-header__social-item">
                  <Icon
                    id="whatsApp"
                    iconStyle="event-page__details-header__social-icon"
                    keepOriginal
                  />
                </li>
              </ul>
            </Col>
          </Row>
          <Row className="event-page__overview">
            <EventCard sectionTitle="Overview">
              <div className="event-page__lists">
                <Col className="event-page__lists-title">
                  <Title>Highlights</Title>
                  {DATA.eventData.overview.highlights.map(item => (
                    <li key={item.id} className="event__lists-item">
                      <span>
                        <Icon
                          id="checkCircle"
                          iconStyle="event__lists-icon"
                          color={theme['primary-color']}
                        />
                      </span>
                      {item.text}
                    </li>
                  ))}
                </Col>
              </div>
              <div className="event-page__overview-description">
                <Col className="event-page__overview-description-title">
                  <Title>Description</Title>
                </Col>
                <p className="event-page__overview-description-data">
                  {!state.displayAllDescription
                    ? eventData.description.slice(0, 400)
                    : eventData.description}
                </p>
              </div>
              <Row className="event-page__overview__actions">
                {state.displayAllDescription ? (
                  <Button
                    text=" - See less"
                    buttonType="link"
                    buttonStyle="event-page__overview-button"
                    handleOnClick={() =>
                      actions.togglePopup('displayAllDescription')
                    }
                  />
                ) : (
                  <Button
                    text="See more"
                    buttonType="link"
                    buttonStyle="event-page__overview-button"
                    handleOnClick={() =>
                      actions.togglePopup('displayAllDescription')
                    }
                    testid="showAllButton"
                    icon="plus"
                    iconStyle="event-page__overview-icon"
                    iconColor={theme['primary-color']}
                  />
                )}
              </Row>
            </EventCard>
          </Row>
          <Row>
            {eventData.entry_notes && (
              <EventCard
                sectionTitle="Entry Notes"
                className="event-page__section"
                containList
                list={[
                  {
                    id: 1,
                    name: 'included',
                    items: eventData.entry_notes,
                  },
                ]}
              />
            )}
          </Row>
          <Row>
            {eventData.venue_location.length !== 0 && (
              <EventCard sectionTitle={eventData.venue_location[0].venue_name}>
                <Row>
                  <Col
                    xs={24}
                    sm={24}
                    md={24}
                    lg={14}
                    className="event-page__venue"
                  >
                    <div className="event-page__map">
                      <MapContainer
                        latitude={parseFloat(
                          eventData.venue_location[0].latitude
                        )}
                        longitude={parseFloat(
                          eventData.venue_location[0].longitude
                        )}
                      />
                    </div>
                  </Col>
                  <Col
                    xs={24}
                    sm={24}
                    md={24}
                    lg={8}
                    className="event-page__venue-address"
                  >
                    <p className="event-page__details-header__location-text">
                      <Icon
                        id="location"
                        iconStyle="event-page__details-header__location-icon"
                        color={theme['primary-color']}
                      />{' '}
                      Address
                    </p>
                    <p className="event-page__details-header__location">
                      {eventData.venue_location[0].venue_address}
                    </p>
                    <Button
                      text="Need directions?"
                      buttonType="link"
                      buttonStyle="event-page__venue-button"
                      isWithArrow
                      iconColor={theme['secondary-color']}
                    />
                  </Col>
                </Row>
              </EventCard>
            )}
          </Row>
          <Row>
            <EventCard sectionTitle="Changes & cancellation">
              <p className="event-page__text">
                {eventData.cancellation_policy}
              </p>
            </EventCard>
          </Row>
          <Row>
            <div className="event-page__booking">
              <Button
                text="Book now"
                buttonType="bookNow"
                buttonStyle="event-page__button"
                icon="ticket"
                iconColor={theme['secondary-icon-color']}
                handleOnClick={() => handleBookBtnClick()}
              />
            </div>
          </Row>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={8}
          className="event-page__date-section"
        >
          {(!isTablet || isCalendarShown) && (
            <MobileBottomModal
              popUpStyle="event-page__popup"
              modalCloseCalled={() => toggleShowCalendar(false)}
            >
              <div className="event-page__time">
                <div className="event-page__time-header">
                  <span className="event-page__time-header__price-span">
                    from{' '}
                  </span>
                  <Text className="event-page__time-header__price">
                    {makePriceString(eventData.from_price, eventData.currency)}
                  </Text>
                </div>
                <div className="event-page__time-calendar">
                  <ApiAvailabilityProvider sessionId={sessionId}>
                    <AppViewProvider>
                      <TicketPickWidget
                        onSelectedDate={date => {
                          history.push(
                            `${
                              ROUTES.EVENT_TICKET_PICK_PAGE
                            }/?session_id=${sessionId}&from_date=${date.format(
                              'YYYY-MM-DD'
                            )}`
                          );
                        }}
                      />
                    </AppViewProvider>
                  </ApiAvailabilityProvider>
                  {/* <ConfigProvider locale={enGB}>
                    <Calendar
                      availableEntries={[
                        {
                          eventDate: new Date(),
                          eventExtraData: { hello: 'a' },
                        },
                        {
                          eventDate: new Date().setDate(
                            new Date().getDate() + 1
                          ),
                          eventExtraData: { hello: 'b' },
                        },
                        {
                          eventDate: new Date().setDate(
                            new Date().getDate() + 2
                          ),
                          eventExtraData: { hello: 'c' },
                        },
                      ]}
                    />
                  </ConfigProvider> */}
                </div>
                <div className="event-page__time-slot">
                  {/* <p className="event-page__time-slot__text">
                    <Icon
                      id="clock"
                      iconStyle="event-page__time-slot__icon"
                      color={theme['primary-color']}
                    />
                    Choose time slot
                  </p> */}
                  {/* <div className="event-page__time-slot__dropdown">
                    <Dropdown
                      options={[
                        { label: 'Options 1', value: 'Options 1' },
                        { label: 'Options 2', value: 'Options 2' },
                      ]}
                      placeholder="Select option"
                    />
                    <Button
                      text="Book now"
                      buttonType="bookNow"
                      buttonStyle="event-page__time-slot__button"
                      icon="ticket"
                      iconColor={theme['secondary-icon-color']}
                      handleOnClick={() => handleBookBtnClick()}
                    />
                  </div> */}
                </div>
              </div>
            </MobileBottomModal>
          )}
        </Col>
      </Row>
    </Layout>
  ) : (
    <div className="event-page__loader">
      <LoadingSpinner />
    </div>
  );
}
