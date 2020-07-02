/* eslint-disable no-console */
import { useCallback } from 'react';

const Logger = (reducer, stateName = '') => {
  const reducerWithLogger = useCallback(
    (state, action) => {
      const next = reducer(state, action);
      if (process.env.NODE_ENV === 'development') {
        // used only in development
        console.group(`${stateName} - ${action.type}`);
        console.log(
          '%cPrevious State:',
          'color: #9E9E9E; font-weight: 700;',
          JSON.parse(JSON.stringify(state))
        );
        console.log(
          '%cAction:',
          'color: #00A7F7; font-weight: 700;',
          JSON.parse(JSON.stringify(action))
        );
        console.log(
          '%cNext State:',
          'color: #47B04B; font-weight: 700;',
          JSON.parse(JSON.stringify(next))
        );
        console.groupEnd();
      }

      return next;
    },
    [reducer, stateName]
  );

  return reducerWithLogger;
};

export default Logger;
