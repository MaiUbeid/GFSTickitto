import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { useSpring, animated } from 'react-spring';
import { AppViewContext } from '../ContextProviders/AppViewProvider';

export default function MobileButtonModal({
  children,
  modalCloseCalled,
  popUpStyle,
}) {
  const { isTablet } = useContext(AppViewContext);
  const overlayAnim = useSpring({
    config: { duration: 100 },
    opacity: 1,
    from: { opacity: isTablet ? 0 : 1 },
  });
  const contentAnim = useSpring({
    config: { duration: 250 },
    transform: 'translateY(0%)',
    from: { transform: isTablet ? 'translateY(100%)' : 'translateY(0%)' },
  });

  return (
    <animated.div
      style={overlayAnim}
      className="bottom-modal"
      onClick={e => {
        if (e.target.className === 'bottom-modal') {
          modalCloseCalled();
        }
      }}
      onKeyDown={e => {
        if (e.target.className === 'bottom-modal') {
          modalCloseCalled();
        }
      }}
      role="button"
      tabIndex={-1}
    >
      <animated.div
        style={contentAnim}
        className={`bottom-modal__content ${popUpStyle}`}
      >
        {children}
      </animated.div>
    </animated.div>
  );
}

MobileButtonModal.defaultProps = {
  children: <></>,
  popUpStyle: '',
};

MobileButtonModal.propTypes = {
  children: PropTypes.element, // react element
  modalCloseCalled: PropTypes.func.isRequired, // function called when
  popUpStyle: PropTypes.string,
};
