/* eslint-disable react/destructuring-assignment */
import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import logger from './utils';

export const TicketsContext = createContext({});
export const TicketsDispatchContext = createContext({});
/*
  How we store ticket data, per ticket we hold two separate pieces of data, the data we use to diplay the name location ect,
  the second is the data in the format that the backend requires, and we do not do anything with this.
  so for example a ticket will be something like:

  tickets: {
    [ID]: {
      provider: 'ingresso' || 'prio
      display: [
        {
          name: String,
          quantity: String,
          location?: String, 
          price: {
            value: Number,
            currency: String
          }
        }
      ],
      apiData: [
        compiledApiObject
      ]
    }
  }
*/

const initialState = {
  tickets: {},
};

function reducer(state, action) {
  const { id } = action;
  switch (action.type) {
    case 'add': {
      const newState = {
        tickets: {
          ...state.tickets,
          [id]: action.ticket,
        },
      };
      // remove it from the entries when the quantity is 0
      if (
        action.ticket.number_of_seats === 0 ||
        (action.ticket.seats && action.ticket.seats.length === 0)
      ) {
        delete newState.tickets[id];
      }
      return newState;
    }

    case 'remove': {
      const newState = state;
      if (action.extraData != null && newState.tickets[id] != null) {
        newState.tickets[id].seats = newState.tickets[id].seats.filter(
          // filter the seats array, so we remove the seat ids we want to remove
          seat => seat !== action.extraData.seatId
        );
        // if the seats array is empty get rid of the entire ticket entry
        if (newState.tickets[id].seats.length === 0) {
          delete newState.tickets[id];
        }
      } else {
        delete newState.tickets[id];
      }
      return newState;
    }
    case 'remove_feather_seat': {
      // TODO remove this when we have our own feather implementation
      const newState = state;
      const { seatId, perfID } = action;
      // get data object of our seat
      let seatTicketId = null;
      Object.keys(newState.tickets).forEach(ticketKey => {
        if (
          ticketKey.includes(perfID) &&
          newState.tickets[ticketKey].seats != null
        ) {
          if (newState.tickets[ticketKey].seats.includes(seatId)) {
            seatTicketId = ticketKey;
          }
        }
      });

      if (seatTicketId != null) {
        // then proceeds with the same flow as in a normal remove
        newState.tickets[seatTicketId].seats = newState.tickets[
          seatTicketId
        ].seats.filter(
          // filter the seats array, so we remove the seat ids we want to remove
          seat => seat !== seatId
        );
        // if the seats array is empty get rid of the entire ticket entry
        if (newState.tickets[seatTicketId].seats.length === 0) {
          delete newState.tickets[seatTicketId];
        }
      }

      return newState;
    }
    default:
      throw new Error('unhandled action was thrown in ticketContext reducer');
  }
}

export function TicketsProvider(props) {
  const [state, dispatch] = useReducer(
    logger(reducer, 'TicketsProvider'),
    initialState
  );
  const actions = React.useMemo(() => {
    return {
      add: (id, ticket) => dispatch({ type: 'add', id, ticket }),
      remove: (id, extraData) => dispatch({ type: 'remove', id, extraData }),
      removeFeatherSeat: (seatId, perfID) =>
        dispatch({ type: 'remove_feather_seat', seatId, perfID }),
    };
  }, []);

  return (
    <TicketsContext.Provider value={{ ...state, actions }}>
      <TicketsDispatchContext.Provider value={actions}>
        {props.children}
      </TicketsDispatchContext.Provider>
    </TicketsContext.Provider>
  );
}

TicketsProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
