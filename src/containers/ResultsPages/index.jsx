/* eslint-disable no-underscore-dangle */
import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Layout, Row, Col } from 'antd';

import MobileBottomModal from '../../components/MobileBottomModal';
import { getURLParameters } from '../../utils';
import { AppViewContext } from '../../components/ContextProviders/AppViewProvider';
import { ThemeContext } from '../../components/ContextProviders/ThemeProvider';
import { EventsContext } from '../../components/ContextProviders/EventsProvider';
import * as ROUTES from '../../constants/routes';

import * as DATA from '../HomePage/data';

import locationResultsPageImage from '../../assets/images/location-result-page.png';
import categoryResultsPageImage from '../../assets/images/category-result-page.png';

import {
  Header,
  CommonCard,
  CategorySelection,
  PriceSorting,
  Pagination,
  Button,
} from '../../components';

import './style.scss';

export default function ResultsPage({ type }) {
  const history = useHistory();
  const urlParams = getURLParameters();

  const theme = useContext(ThemeContext);
  const { isTablet } = useContext(AppViewContext);
  const [{ events, categories }, setParameters] = useContext(EventsContext);

  const [isFiltersShown, toggleShowFilters] = useState(false);
  const [results, setResults] = useState(DATA[type]);
  const [checkedCategories, setCheckedCategories] = useState(
    urlParams.category && urlParams.category.split(',')
  );
  const [value, onSortingChange] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(16);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;

  useEffect(() => {
    setParameters({
      t1: urlParams.fromDate,
      t2: urlParams.toDate,
      eventId: urlParams.eventId,
      categories: urlParams.category && urlParams.category.split(','),
      city: urlParams.city && [urlParams.city],
      country: urlParams.country && [urlParams.country],
      country_code: urlParams.country_code && [urlParams.country_code],
    });
  }, []);

  function handleOnClick(link) {
    history.push(link);
  }

  function onCategoryCheck(isChecked, item) {
    if (isChecked && checkedCategories && !checkedCategories.includes(item)) {
      history.replace(
        `${window.location.pathname}?from_date=${urlParams.fromDate}&to_date=${
          urlParams.toDate
        }&city=${urlParams.city}&country=${urlParams.country}&country_code=${
          urlParams.country_code
        }&category=${[...checkedCategories, item].join(',')}`
      );
      setCheckedCategories([...checkedCategories, item]);
    }

    if (!isChecked && checkedCategories) {
      const newCategories = checkedCategories.filter(elem => elem !== item);

      setCheckedCategories(newCategories);

      history.replace(
        `${window.location.pathname}?from_date=${urlParams.fromDate}&to_date=${
          urlParams.toDate
        }&city=${urlParams.city}&country=${urlParams.country}&country_code=${
          urlParams.country_code
        }&category=${newCategories.join(',')}`
      );
    }
  }

  function clearFilter() {
    onSortingChange(1);
    setCheckedCategories([]);
    checkedCategories.forEach(item => {
      onCategoryCheck(false, item);
    });
  }

  function sortTickets() {
    const sortedTickets = results.sort((a, b) => {
      if (value === 1) {
        return a.price - b.price;
      }
      return b.price - a.price;
    });
    setResults(sortedTickets);
  }

  let resultValue = '';
  switch (type) {
    case 'search':
      resultValue = 'search term';
      break;
    case 'location':
      resultValue = 'London';
      break;
    case 'category':
      resultValue = 'Category title';
      break;
    default:
      resultValue = '';
  }

  return (
    <Layout className="result-page">
      <Header
        layer={type !== 'search'}
        page="results"
        headerStyle="result-page__header"
        type={type}
        value={resultValue}
        breadcrumb={type !== 'search'}
        backgroundImage={
          type === 'location'
            ? locationResultsPageImage
            : type === 'category'
            ? categoryResultsPageImage
            : 'none'
        }
        subHeaderTitle={
          type === 'search'
            ? 'Search results for '
            : type === 'location'
            ? 'Attractions in '
            : ''
        }
        popup
        breadCrumbLink={ROUTES.HOME_PAGE}
      />
      <Row className="result-page__content">
        <div className="result-page__filter isMobile">
          <Button
            text="Filter"
            buttonType="primary"
            buttonStyle="result-page__filter-button"
            handleOnClick={() => toggleShowFilters(true)}
          />
        </div>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={7}
          xl={7}
          xxl={7}
          className="result-page__categories"
        >
          {(!isTablet || isFiltersShown) && (
            <MobileBottomModal
              modalCloseCalled={() => toggleShowFilters(false)}
            >
              <>
                <CategorySelection
                  categories={categories}
                  checkedCategories={checkedCategories}
                  onCategoryCheck={onCategoryCheck}
                  location={{
                    city: [urlParams.city],
                    country: [urlParams.country],
                    country_code: [urlParams.country_code],
                  }}
                />
                <hr className="result-page__separated-line" />
                <PriceSorting
                  value={value}
                  onSortingChange={onSortingChange}
                  sortTickets={sortTickets}
                />
                <div className="result-page__filter-options">
                  <Button
                    text="Clear filter"
                    buttonType="link"
                    buttonStyle="result-page__filter-clear"
                    icon="cross"
                    iconStyle="result-page__filter-clear__icon"
                    iconColor={theme['cross-icon-color']}
                    handleOnClick={() => {
                      clearFilter();
                      toggleShowFilters(false);
                    }}
                  />
                  <Button
                    text="Apply filter"
                    buttonType="primary"
                    buttonStyle="result-page__filter-options__button"
                    isWithArrow
                    handleOnClick={() => {
                      toggleShowFilters(false);
                    }}
                  />
                </div>
              </>
            </MobileBottomModal>
          )}
        </Col>
        <Col xs={24} sm={24} md={24} lg={16} xl={16} xxl={16}>
          <div className="result-page__cards">
            {events &&
              events.slice(indexOfFirstCard, indexOfLastCard).map(item => (
                <Row key={item._id} className="result-page__cards__card">
                  <Col xs={24}>
                    <CommonCard
                      id={item._id}
                      src={item.images[0]}
                      title={item.title}
                      description={item.description}
                      location={`${item.country}, ${item.city}, ${item.country_code}`}
                      currency={item.currency}
                      price={item.from_price}
                      handleCardClick={() =>
                        handleOnClick(
                          `${ROUTES.EVENT_PAGE}/?event_id=${item._id}`
                        )
                      }
                      handleButtonClick={e => {
                        e.stopPropagation();
                        handleOnClick(
                          `${ROUTES.EVENT_PAGE}/?event_id=${item._id}`
                        );
                      }}
                    />
                  </Col>
                </Row>
              ))}
          </div>
        </Col>
        <Row className="result-page__pagination">
          <Pagination
            totalPages={events ? events.length : 0}
            onPageChange={setCurrentPage}
            cardsPerPage={cardsPerPage}
            changePageNumbers={setCardsPerPage}
            position="top"
          />
        </Row>
      </Row>
    </Layout>
  );
}

ResultsPage.propTypes = {
  type: PropTypes.string.isRequired,
};
