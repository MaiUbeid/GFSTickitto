/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import { PopupsContext } from '../ContextProviders/PopupsProvider';
import Button from '../Button';
import './style.scss';

export default function PopupCarousel({ images }) {
  const [currentImage, setCurrentImage] = useState(0);

  const { state } = useContext(PopupsContext);
  const imagesLength = images.length;

  function showCurrentImage(imageIndex) {
    setCurrentImage(imageIndex);
  }

  function prevImage() {
    let imageIndex = currentImage;
    if (imageIndex < 1) {
      imageIndex = imagesLength - 1;
    } else {
      imageIndex--;
    }
    setCurrentImage(imageIndex);
  }

  function nextImage() {
    let imageIndex = currentImage;
    if (imageIndex === imagesLength - 1) {
      imageIndex = 0;
    } else {
      imageIndex++;
    }
    setCurrentImage(imageIndex);
  }

  let popupCarouselThumbnailsStyle;
  switch (images.length) {
    case 2:
      popupCarouselThumbnailsStyle = 'popup-carousel__thumbnails--two';
      break;
    case 1:
      popupCarouselThumbnailsStyle = 'popup-carousel__thumbnails--one';
      break;
    default:
      popupCarouselThumbnailsStyle = 'popup-carousel__thumbnails';
  }

  return (
    <div
      className={
        state.displayCarousel ? 'popup-carousel' : 'popup-carousel--hide'
      }
    >
      <div className="popup-carousel__body">
        <img
          currentimage={currentImage}
          data-testid="largeImage"
          className="popup-carousel__img"
          src={images[currentImage]}
          alt=""
        />
      </div>

      <div className="popup-carousel__arrows">
        <Button
          testid="previousImageButton"
          buttonType="link"
          buttonStyle="prev-arrow"
          handleOnClick={() => prevImage()}
          icon="leftAngle"
        />
        <Button
          testid="nextImageButton"
          buttonType="link"
          buttonStyle="next-arrow"
          handleOnClick={() => nextImage()}
          icon="rightAngle"
        />
      </div>
      <div
        data-testid="thumbnails"
        className={`${popupCarouselThumbnailsStyle} popup-carousel__thumbnails`}
      >
        {images.map((item, index) => (
          <img
            data-testid="showCurrentImage"
            role="button"
            tabIndex="0"
            aria-pressed="false"
            aria-label="image"
            src={item}
            alt=""
            key={item}
            onClick={() => showCurrentImage(index)}
            onKeyPress={() => showCurrentImage(index)}
          />
        ))}
      </div>
    </div>
  );
}

PopupCarousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};
