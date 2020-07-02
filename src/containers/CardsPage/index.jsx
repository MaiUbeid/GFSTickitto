/* eslint-disable react/no-array-index-key */
import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Layout, Col, Row } from 'antd';
import moment from 'moment';

import { EventsContext } from '../../components/ContextProviders/EventsProvider';

import * as ROUTES from '../../constants/routes';
import { CommonCard, Header, Pagination } from '../../components';

import './style.scss';

export default function CardsPage({ type }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(16);

  const [{ locations, categories }] = useContext(EventsContext);

  const history = useHistory();
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;

  function handleOnClick(link) {
    history.push(link);
  }

  return (
    <Layout className="cards-page">
      <Header
        breadcrumb
        subHeaderTitle={type}
        headerStyle="cards-page__header"
        type={type}
        headerTitleBoxStyle="cards-page__header-box"
        layer={false}
        popup
        breadCrumbLink={ROUTES.HOME_PAGE}
      />

      <div className="cards-page__cards">
        {type === 'locations' ? (
          <Row className="cards-page__cards-row">
            {locations
              .slice(indexOfFirstCard, indexOfLastCard)
              .map((item, key) => (
                <Col
                  className="cards-page__card"
                  key={key}
                  xs={24}
                  sm={24}
                  md={12}
                  lg={6}
                  xl={6}
                  xxl={6}
                >
                  <CommonCard
                    icon="location"
                    src="https://imgur.com/7Q6hMgV.png" // locations static image
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
        ) : (
          <Row className="cards-page__cards-row">
            {categories
              .slice(indexOfFirstCard, indexOfLastCard)
              .map((item, key) => (
                <Col
                  className="cards-page__card"
                  key={key}
                  xs={24}
                  sm={24}
                  md={12}
                  lg={6}
                  xl={6}
                  xxl={6}
                >
                  <CommonCard
                    icon="rightAngle"
                    src="https://imgur.com/iYhO4dL.png" // categories static image
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
        )}
        <Row className="cards-page__pagination">
          <Pagination
            totalPages={
              type === 'locations' ? locations.length : categories.length
            }
            onPageChange={setCurrentPage}
            cardsPerPage={cardsPerPage}
            changePageNumbers={setCardsPerPage}
          />
        </Row>
      </div>
    </Layout>
  );
}

CardsPage.propTypes = {
  type: PropTypes.string.isRequired,
};
