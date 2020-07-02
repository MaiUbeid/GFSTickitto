/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ApiClient from '../../utils/apiClient';
import { getURLParameters } from '../../utils/index';

export const ApiAvailibilityContext = React.createContext(null);

export function ApiAvailabilityProvider(props) {
  const [sessionAvailbility, setSessionAvailability] = useState(null);
  useEffect(() => {
    if (props.sessionId != null) {
      ApiClient.getSessionAvailability(
        props.sessionId,
        res => {
          setSessionAvailability(res);
        },
        e => {
          console.error(e);
        }
      );
    }
  }, [props.sessionId]);

  return (
    <ApiAvailibilityContext.Provider value={sessionAvailbility}>
      {props.children}
    </ApiAvailibilityContext.Provider>
  );
}

ApiAvailabilityProvider.defaultProps = {
  sessionId: getURLParameters().session,
};

ApiAvailabilityProvider.propTypes = {
  children: PropTypes.element.isRequired,
  sessionId: PropTypes.string,
};
