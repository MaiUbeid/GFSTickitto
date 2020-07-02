import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button as AntdButton } from 'antd';

import Icon from '../Icon';

import './style.scss';

export default function Button({
  text,
  buttonType,
  isWithArrow,
  icon,
  iconStyle,
  arrowStyle,
  iconColor,
  iconHoverColor,
  handleOnClick,
  buttonStyle,
  testid,
  htmlType,
  iconKeepOriginal,
  background,
  isDisabled,
}) {
  const [isHovering, setHover] = useState(false);

  const btnClass = classNames('button', buttonType, {
    'button-primary': buttonType === 'primary',
    'button-default': buttonType === 'default',
    'button-link': buttonType === 'link',
    'button-payment': buttonType === 'payment',
    'button-book': buttonType === 'bookNow',
    'button--isDisabled': isDisabled,
    'button--isHovering': isHovering,
  });
  const btnTransparent = classNames('', background, {
    'button-transparent': background === 'transparent',
  });

  const currIconColor =
    isHovering && iconHoverColor != null ? iconHoverColor : iconColor;

  return (
    <AntdButton
      onMouseEnter={() => {
        if (iconHoverColor != null) {
          setHover(true);
        }
      }}
      onMouseLeave={() => {
        if (iconHoverColor != null) {
          setHover(false);
        }
      }}
      onClick={e => {
        if (!isDisabled) {
          handleOnClick(e);
        }
      }}
      className={
        background !== 'transparent'
          ? `${buttonStyle} ${btnClass}`
          : `${buttonStyle} ${btnClass} ${btnTransparent}`
      }
      data-testid={testid}
      type={buttonType}
      htmlType={htmlType}
    >
      {buttonType !== 'payment' && icon && (
        <Icon
          id={icon}
          iconStyle={buttonType === 'bookNow' ? 'button-book__icon' : iconStyle}
          color={currIconColor}
        />
      )}
      {text}
      {buttonType === 'payment' && icon && (
        <Icon
          id={icon}
          iconStyle={iconStyle}
          color={currIconColor}
          keepOriginal={iconKeepOriginal}
        />
      )}
      {isWithArrow && (
        <Icon
          id="rightAngleWhite"
          iconStyle={arrowStyle}
          color={currIconColor}
        />
      )}
    </AntdButton>
  );
}

Button.defaultProps = {
  text: '',
  isWithArrow: false,
  icon: null,
  iconStyle: 'button__icon',
  iconColor: '#FFFFFF',
  iconHoverColor: null,
  handleOnClick: () => {},
  buttonStyle: 'button',
  testid: '',
  htmlType: null,
  iconKeepOriginal: false,
  arrowStyle: 'button__icon-arrow ',
  background: '',
  isDisabled: false,
};

Button.propTypes = {
  text: PropTypes.string,
  buttonType: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
  isWithArrow: PropTypes.bool,
  icon: PropTypes.string,
  iconStyle: PropTypes.string,
  iconColor: PropTypes.string,
  iconHoverColor: PropTypes.string,
  handleOnClick: PropTypes.func,
  buttonStyle: PropTypes.string,
  testid: PropTypes.string,
  htmlType: PropTypes.string,
  iconKeepOriginal: PropTypes.bool,
  arrowStyle: PropTypes.string,
  background: PropTypes.string,
};
