/* eslint-disable class-methods-use-this */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import * as Sentry from '@sentry/browser';

export const ErrorReportingContext = React.createContext(null);

// class based since there is no way to do componentDidCatch in functional comps
export class ErrorReportingProvider extends React.Component {
  constructor(props) {
    super(props);

    this.throwError = this.throwError.bind(this);
  }

  componentDidCatch(error, errorInfo) {
    this.throwError(error, errorInfo);
  }

  throwError(error, extraData) {
    console.error('Error Caught!', error, extraData);
    Sentry.withScope(scope => {
      scope.setExtras(extraData);
      Sentry.captureException(error);
    });
  }

  render() {
    const initialContext = {
      throwError: this.throwError,
    };
    // when there's not an error, render children untouched
    return (
      <ErrorReportingContext.Provider value={initialContext}>
        {this.props.children}
      </ErrorReportingContext.Provider>
    );
  }
}

ErrorReportingProvider.defaultProps = {};

ErrorReportingProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
