/* eslint-disable camelcase */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ApiClient from '../../utils/apiClient';
import logger from './utils';

export const EventsContext = React.createContext({});

const initialState = {
  events: [],
  locations: [],
  categories: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_EVENTS':
      return { ...state, events: action.payload };
    case 'ADD_LOCATIONS':
      return { ...state, locations: action.payload };
    case 'ADD_CATEGORIES':
      return { ...state, categories: action.payload };
    default:
      throw new Error('unexpected action');
  }
}

export function EventsProvider(props) {
  const [eventData, dispatch] = useReducer(
    logger(reducer, 'EventsProvider'),
    initialState
  );
  const [searchParams, setSearchParameters] = useState({
    t1: moment(new Date()).format('YYYY-MM-DD'),
    t2: moment(new Date())
      .add(11, 'months')
      .format('YYYY-MM-DD'),
  });

  useEffect(() => {
    ApiClient.searchForEvents(
      searchParams,
      res => {
        dispatch({ type: 'ADD_EVENTS', payload: res });
      },
      e => {
        console.error(e);
      }
    );
  }, [searchParams]);

  useEffect(() => {
    ApiClient.searchForEvents(
      {
        t1: moment(new Date()).format('YYYY-MM-DD'),
        t2: moment(new Date())
          .add(11, 'months')
          .format('YYYY-MM-DD'),
      },
      res => {
        let categories = [];
        res.forEach(event => {
          categories = categories.concat(event.categories);
        });
        const dedupedCategories = [...new Set(categories)];

        dispatch({ type: 'ADD_CATEGORIES', payload: dedupedCategories });

        const locations = res.map(event => {
          const { city, country, country_code } = event;
          return {
            city,
            country,
            country_code,
          };
        });

        const stringObjects = locations.map(elem => JSON.stringify(elem));
        const dedupedLocations = [...new Set(stringObjects)].map(elem =>
          JSON.parse(elem)
        );
        dispatch({ type: 'ADD_LOCATIONS', payload: dedupedLocations });
      },
      e => {
        console.error(e);
      }
    );
  }, []);

  return (
    <EventsContext.Provider value={[eventData, setSearchParameters]}>
      {props.children}
    </EventsContext.Provider>
  );
}

EventsProvider.defaultProps = {
  children: null,
};

EventsProvider.propTypes = {
  children: PropTypes.element,
};
