/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

// this context is simply a utility to communicate with the widget deep in the component tree. Its a way to get event out of it or pass it some state it should use
export const TicketCommsControllerContext = React.createContext(null);

export function TicketCommsControllerProvider({
  children,
  selectedDate,
  onSelectedDate,
}) {
  return (
    <TicketCommsControllerContext.Provider
      value={{
        selectedDate,
        onSelectedDate,
      }}
    >
      {children}
    </TicketCommsControllerContext.Provider>
  );
}
TicketCommsControllerProvider.defaultProps = {
  selectedDate: null,
  onSelectedDate: () => { },
};

TicketCommsControllerProvider.propTypes = {
  children: PropTypes.element.isRequired,
  selectedDate: PropTypes.object, // should be a moment object for a certain date
  onSelectedDate: PropTypes.func,
};
