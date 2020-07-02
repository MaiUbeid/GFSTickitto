import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { ResizeSensor } from 'css-element-queries';
import { dispatchPostMessage } from '../../utils';

export const AppViewContext = React.createContext();

export function AppViewProvider({ children }) {
  const breakPoints = {
    MOBILE: 480,
    TABLET: 767,
    // DESKTOP: 991,
  };
  const appContainerRef = useRef();
  const resizeSens = useRef(null);
  const [currView, setView] = useState(null);
  const currHeight = useRef(0);

  useEffect(() => {
    const appRef = appContainerRef.current;
    const updateResize = dimensions => {
      if (dimensions.height !== currHeight.current) {
        dispatchPostMessage('NEW_HEIGHT', { height: dimensions.height });
        currHeight.current = dimensions.height;
      }

      const currWidth = dimensions.width;
      if (currWidth <= breakPoints.MOBILE && currView !== 'mobile') {
        setView('mobile');
      } else if (
        currWidth >= breakPoints.MOBILE &&
        currWidth <= breakPoints.TABLET &&
        currView !== 'tablet'
      ) {
        setView('tablet');
      } else if (currWidth > breakPoints.TABLET && currView !== 'desktop') {
        setView('desktop');
      }
    };
    if (resizeSens.current == null) {
      // eslint-disable-next-line no-new
      resizeSens.current = new ResizeSensor(appRef, updateResize);
    }

    return () => {
      resizeSens.current = null;
      ResizeSensor.detach(appRef, updateResize);
    };
  }, [breakPoints, currView]);

  const viewState = {
    isMobile: currView === 'mobile',
    isTablet: currView === 'tablet' || currView === 'mobile',
    isDesktop: currView === 'desktop',
    currView,
  };

  return (
    <AppViewContext.Provider value={viewState}>
      <div className="dimensions-watcher" ref={appContainerRef}>
        {children}
      </div>
    </AppViewContext.Provider>
  );
}

AppViewProvider.defaultProps = {
  children: <></>,
};

AppViewProvider.propTypes = {
  children: PropTypes.element,
};
