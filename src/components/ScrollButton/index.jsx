import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';
import './style.scss';
/*
  This button is used to show a overlayed button from the bottom of the screen, teh overlay is shown only on mobile and after a certain amount of scrolling
*/
export default function ScrollButton({ text, isWithArrow, handleOnClick }) {
  const [isScroll, setIsScroll] = useState(0);

  function whenScroll() {
    setIsScroll(window.scrollY);
  }
  useEffect(() => {
    window.addEventListener('scroll', whenScroll);
    return () => window.removeEventListener('scroll', whenScroll);
  }, [isScroll]);

  const scroll = (() => {
    return isScroll >= 1;
  })();

  return scroll ? (
    <div className="scroll-button__wrapper">
      <Button
        text={text}
        buttonType="primary"
        buttonStyle="scroll-button"
        htmlType="submit"
        isWithArrow={isWithArrow}
        handleOnClick={handleOnClick}
      />
    </div>
  ) : (
    <span />
  );
}

ScrollButton.defaultProps = {
  isWithArrow: false,
  handleOnClick: () => {},
};

ScrollButton.propTypes = {
  isWithArrow: PropTypes.bool,
  text: PropTypes.string.isRequired,
  handleOnClick: PropTypes.func,
};
