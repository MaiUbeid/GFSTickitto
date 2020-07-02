/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React, { useContext, useState, useEffect } from 'react';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Layout, Typography, Steps } from 'antd';

import * as ROUTES from '../../constants/routes';
import { getURLParameters } from '../../utils/index';

import { ThemeContext } from '../ContextProviders/ThemeProvider';
import { AppViewContext } from '../ContextProviders/AppViewProvider';
import { PopupsContext } from '../ContextProviders/PopupsProvider';
import DatePickers from '../DatePickers';
import Button from '../Button';
import Breadcrumb from '../Breadcrumb';
import Menu from '../Menu';
import Overlay from '../Overlay';
import Settings from '../Settings';
import MobileBottomModal from '../MobileBottomModal';

import './style.scss';

const { Header: AntdHeader } = Layout;
const { Title } = Typography;
const { Step } = Steps;

export default function Header({
  headerStyle,
  layer,
  page, // TODO this prop is not necessary we can read the url and see what the current page is
  type,
  value,
  backgroundImage,
  mainHeaderTitle,
  subHeaderTitle,
  breadcrumb,
  images,
  current,
  steps,
  popup,
  breadCrumbLink,
}) {
  const headerValue = classNames('', type, {
    'header__title-search': type === 'search',
    'header__title-location': type === 'location',
  });

  let headerImageStyle;
  let headerImagesStyle;
  switch (images.length) {
    case 2:
      headerImagesStyle = 'header__images--two';
      headerImageStyle = 'header__image--two';
      break;
    case 1:
      headerImagesStyle = 'header__images--one';
      headerImageStyle = 'header__image--one';
      break;
    default:
      headerImagesStyle = 'header__images';
      headerImageStyle = 'header__image';
  }

  const theme = useContext(ThemeContext);
  const { state, actions } = useContext(PopupsContext);
  const { isMobile } = useContext(AppViewContext);
  const [selectedDates, setSelectedDates] = useState(null);

  const urlParams = getURLParameters();
  const fromDate = moment(urlParams.fromDate);
  const toDate = moment(urlParams.toDate);
  useEffect(() => {
    setSelectedDates({ t1: fromDate, t2: toDate });
  }, []);

  const history = useHistory();

  function handleOnClick(link) {
    history.push(link);
  }

  return (
    <div>
      <Menu handleButtonClick={handleOnClick} />

      {!isMobile && popup && state.displayPopupSettings && (
        <div>
          <Overlay
            displayComponent={() => actions.togglePopup('displayPopupSettings')}
            showComponent={state.displayPopupSettings}
          />
          <Settings popup={popup} />
        </div>
      )}

      {isMobile && popup && state.displayPopupSettings && (
        <MobileBottomModal
          modalCloseCalled={() => actions.togglePopup('displayPopupSettings')}
        >
          <Settings popup={popup} />
        </MobileBottomModal>
      )}
      <AntdHeader
        className={`${headerStyle} header`}
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        {layer && (
          <div
            data-testid="overlay"
            className={
              page === 'results'
                ? 'header__results-layer'
                : 'header__home-layer'
            }
          />
        )}

        {breadcrumb && (
          <Breadcrumb
            handleOnClick={handleOnClick}
            type={type}
            breadCrumbLink={breadCrumbLink}
          />
        )}

        <div
          className={`${
            page === 'home'
              ? 'header__home-box'
              : type === 'search'
              ? 'header__search-box'
              : page === 'results'
              ? 'header__results-box'
              : 'header__others-box'
          } header__title-box`}
        >
          <Title className="header-title">
            <span className="header-title__main">{mainHeaderTitle}</span>
            <span
              data-testid="subHeaderTitle"
              className={
                page === 'home' ? 'header-title__sub' : 'header__title'
              }
            >
              {subHeaderTitle}
              <span className={headerValue}>
                {type === 'search' ? `‘${value}’` : value}
              </span>{' '}
            </span>
          </Title>
        </div>

        {page === 'results' && (
          <DatePickers
            defaultDates={[fromDate, toDate]}
            className={
              type === 'search'
                ? 'header__search__picker secondary__picker'
                : 'header__picker secondary__picker'
            }
            onSelection={dates => {
              if (Array.isArray(dates) && dates.length > 1) {
                setSelectedDates({ t1: dates[0], t2: dates[1] });
                history.replace(
                  `${
                    window.location.pathname
                  }?from_date=${selectedDates.t1.format(
                    'YYYY-MM-DD'
                  )}&to_date=${selectedDates.t2.format('YYYY-MM-DD')}`
                );
              }
            }}
          />
        )}

        {page === 'event' && (
          <div>
            <Overlay
              displayComponent={() => actions.togglePopup('displayCarousel')}
              showComponent={state.displayCarousel}
            />

            <div className={headerImagesStyle}>
              {images.map((item, index) => (
                <img
                  key={index}
                  role="button"
                  tabIndex="0"
                  aria-pressed="false"
                  aria-label="ovelay"
                  className={headerImageStyle}
                  src={item}
                  alt=""
                  onClick={() => actions.togglePopup('displayCarousel')}
                  onKeyPress={() => actions.togglePopup('displayCarousel')}
                />
              ))}
            </div>
            <Button
              text="View more"
              buttonType="primary"
              buttonStyle="header__event-button"
              handleOnClick={() => actions.togglePopup('displayCarousel')}
              isWithArrow
              iconColor={theme['secondary-icon-color']}
              testid="viewMoreButton"
            />
          </div>
        )}

        {page === 'form' && (
          <div className="header__formpage">
            <Button
              text="Event page"
              buttonType="link"
              buttonStyle="header__formpage-breadcrumb"
              handleOnClick={handleOnClick}
              icon="leftAngle"
              iconStyle=""
              iconColor={theme['secondary-text-color']}
            />
            <div>
              <Steps current={current}>
                {steps.map(item => (
                  <Step key={item.title} title={item.title} icon={item.icon} />
                ))}
              </Steps>
            </div>
          </div>
        )}
      </AntdHeader>
    </div>
  );
}

Header.defaultProps = {
  headerStyle: '',
  page: '',
  type: '',
  value: '',
  backgroundImage: '',
  mainHeaderTitle: '',
  subHeaderTitle: '',
  breadcrumb: true,
  images: [],
  current: 1,
  steps: [],
  layer: true,
  breadCrumbLink: '',
};

Header.propTypes = {
  headerStyle: PropTypes.string,
  page: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  backgroundImage: PropTypes.string,
  mainHeaderTitle: PropTypes.string,
  subHeaderTitle: PropTypes.string,
  breadcrumb: PropTypes.bool,
  images: PropTypes.arrayOf(PropTypes.string),
  current: PropTypes.number,
  steps: PropTypes.arrayOf(PropTypes.shape(PropTypes.Item)),
  layer: PropTypes.bool,
  popup: PropTypes.bool.isRequired,
  breadCrumbLink: PropTypes.string,
};
