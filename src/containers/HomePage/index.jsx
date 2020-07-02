/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Layout, Row, Col, Typography } from 'antd';
import moment from 'moment';

import { ThemeContext } from '../../components/ContextProviders/ThemeProvider';
import homePageImage from '../../assets/images/home-page.png';

import * as ROUTES from '../../constants/routes';
import { EventsContext } from '../../components/ContextProviders/EventsProvider';

import * as DATA from './data';

import { Button, Header, SearchBar, CommonCard } from '../../components';

import './style.scss';

const { Text } = Typography;

export default function HomePage() {
  const [popularThings] = useState(DATA.popularThings);
  const theme = useContext(ThemeContext);
  const history = useHistory();

  const [{ locations, categories }] = useContext(EventsContext);

  function handleOnClick(link) {
    history.push(link);
  }

  return (
    <Layout className="home-page">
      <Header
        isImage
        backgroundImage={homePageImage}
        page="home"
        breadcrumb={false}
        layer
        mainHeaderTitle="Find your next adventure"
        headerStyle="home-page__header"
        subHeaderTitle="Get instant access to incredible experiences"
        handleButtonClick={handleOnClick}
        handleOnClick={handleOnClick}
        popup
      />
      <Row className="home-page__search-bar">
        <SearchBar handleButtonClick={handleOnClick} />
      </Row>

      <div className="home-page__cards">
        <div className="home-page__cards-section">
          <Row className="home-page__titles">
            <Col className="home-page__cards-main" xs={24} md={19} lg={20}>
              <Text className="home-page__cards-title">
                Popular destinations
              </Text>
            </Col>
            <Col className="home-page__cards-link" xs={24} md={5} lg={4}>
              <Button
                text="See all destinations"
                buttonType="link"
                buttonStyle="home-page__cards-button"
                handleOnClick={() => handleOnClick(ROUTES.LOCATIONS_PAGE)}
                isWithArrow
                iconColor={theme['secondary-color']}
              />
            </Col>
          </Row>
          <Row>
            {locations.slice(0, 4).map((item, key) => (
              <Col
                className="home-page__card"
                key={key}
                xs={24}
                sm={24}
                md={12}
                lg={6}
                xl={6}
                xxl={6}
              >
                <CommonCard
                  id={`${key}`}
                  icon="location"
                  src="https://imgur.com/7Q6hMgV.png"
                  title={`${item.country}, ${item.city}, ${item.country_code}`}
                  handleCardClick={() => {
                    const fromDate = moment(new Date()).format('YYYY-MM-DD');
                    const toDate = moment(new Date())
                      .add(11, 'months')
                      .format('YYYY-MM-DD');
                    handleOnClick(
                      `${
                        ROUTES.LOCATION_RESULTS
                      }?from_date=${fromDate}&to_date=${toDate}&country=${
                        item.country
                      }&city=${item.city}&country_code=${
                        item.country_code
                      }&category=${categories && categories}`
                    );
                  }}
                />
              </Col>
            ))}
          </Row>
        </div>
        <div className="home-page__cards-section">
          <Row className="home-page__titles">
            <Col className="home-page__cards-main" span={24}>
              <Text className="home-page__cards-title">
                Most popular things to do
              </Text>
            </Col>
          </Row>
          <Row>
            {popularThings.slice(0, 6).map((item, key) => (
              <Col
                className="home-page__card"
                key={`${key}`}
                xs={24}
                sm={24}
                md={12}
                lg={8}
                xl={8}
                xxl={8}
              >
                <CommonCard
                  id={item._id}
                  src={item.imageUrl}
                  title={item.title}
                  description={item.description}
                  location={item.location}
                  currency={item.currency}
                  price={item.price}
                  handleCardClick={() =>
                    handleOnClick(`${ROUTES.EVENT_PAGE}/?event_id=${item._id}`)
                  }
                  handleButtonClick={e => {
                    e.stopPropagation();
                    handleOnClick(`${ROUTES.EVENT_PAGE}/?event_id=${item._id}`);
                  }}
                />
              </Col>
            ))}
          </Row>
        </div>
        <div className="home-page__cards-section">
          <Row className="home-page__titles">
            <Col className="home-page__cards-main" xs={24} md={19} lg={20}>
              <Text className="home-page__cards-title">Categories</Text>
            </Col>
            <Col className="home-page__cards-link" xs={24} md={5} lg={4}>
              <Button
                text="See all categories"
                buttonType="link"
                buttonStyle="home-page__cards-button"
                handleOnClick={() => handleOnClick(ROUTES.CATEGORIES_PAGE)}
                isWithArrow
                iconColor={theme['secondary-color']}
              />
            </Col>
          </Row>
          <Row>
            {categories.slice(0, 4).map((item, key) => (
              <Col
                className="home-page__card"
                key={key}
                xs={24}
                sm={24}
                md={12}
                lg={6}
                xl={6}
                xxl={6}
              >
                <CommonCard
                  id={`${key}`}
                  icon="rightAngle"
                  src="https://imgur.com/iYhO4dL.png"
                  title={item}
                  handleCardClick={() => {
                    const fromDate = moment(new Date()).format('YYYY-MM-DD');
                    const toDate = moment(new Date())
                      .add(11, 'months')
                      .format('YYYY-MM-DD');
                    handleOnClick(
                      `${ROUTES.CATEGORY_RESULTS}?from_date=${fromDate}&to_date=${toDate}&category=${item}`
                    );
                  }}
                />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </Layout>
  );
}
