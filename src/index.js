import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/browser';

import 'url-search-params-polyfill'; // url search params polyfill
import App from './app';

Sentry.init({
  dsn:
    process.env.NODE_ENV !== 'development'
      ? process.env.REACT_APP_SENTRY_DSN
      : '',
  environment: process.env.NODE_ENV,
});

ReactDOM.render(<App />, document.getElementById('root'));
