import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb as BreadcrumbAntd } from 'antd';

import { ThemeContext } from '../ContextProviders/ThemeProvider';
import Icon from '../Icon';

import './style.scss';

export default function Breadcrumb({ handleOnClick, breadCrumbLink, type }) {
  const theme = useContext(ThemeContext);
  return (
    <BreadcrumbAntd
      className="breadcrumb"
      separator={
        <Icon
          id="rightAngleWhite"
          iconStyle="breadcrumb__separator-icon"
          color={theme['secondary-icon-color']}
        />
      }
      data-testid="breadcrumb"
    >
      <BreadcrumbAntd.Item onClick={() => handleOnClick(breadCrumbLink)}>
        <Icon
          iconStyle="breadcrumb__home-icon"
          id="home"
          color={theme['secondary-icon-color']}
        />
        <span data-testid="pageBreadcrumb">Home</span>
      </BreadcrumbAntd.Item>

      <BreadcrumbAntd.Item
        data-testid="typeBreadcrumb"
        className="breadcrumb-current"
      >
        {type === 'locations' || type === 'categories' ? `All ${type}` : type}
      </BreadcrumbAntd.Item>
    </BreadcrumbAntd>
  );
}

Breadcrumb.defaultProps = {
  breadCrumbLink: '',
};

Breadcrumb.propTypes = {
  type: PropTypes.string.isRequired,
  handleOnClick: PropTypes.func.isRequired,
  breadCrumbLink: PropTypes.string,
};
