import React, { useEffect, useContext, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { ApiAvailibilityContext } from '../../ContextProviders/ApiAvailabilityProvider';
import './style.scss';
import LoadingSpinner from '../../LoadingSpinner';
import { supplierNames } from '../../../constants/apiConfig';
import IngressoPickerFlow from '../Ingresso/IngressoPickerFlow';
import { compareDateWithCurrentUTC, getURLParameters } from '../../../utils';
import PrioPickerFlow from '../Prio/PrioPickerFlow';
import ErrorOverlay from '../../ErrorOverlay';
import Icon from '../../Icon';
import { ThemeContext } from '../../ContextProviders/ThemeProvider';
import { TicketCommsControllerProvider } from '../../ContextProviders/TicketCommsController';

export default function TicketPickWidget(props) {
  const theme = useContext(ThemeContext);
  const sessionAvailbility = useContext(ApiAvailibilityContext);
  const [isSessionExpired, setSessionExpiration] = useState(
    sessionAvailbility
      ? compareDateWithCurrentUTC(sessionAvailbility.ttl) < 0
      : false
  );
  const intervalRef = useRef();

  // TODO (repopulation)
  // const ticketActions = useContext(TicketsDispatchContext);
  // this task is not syncronous in regads to the ui, since by the time a user selects an event in the calendar this query will be done
  // useMemo(() => {
  //   if (sessionAvailbility !== null) {
  //     ApiClient.getBasketContents(
  //       data => {
  //         // console.log('basketContents', data);
  //         // console.log(ticketActions);
  //         data.items.forEach(selection => {
  //           const perfId = selection.booking_options.performance_id;
  //           const ticketCode = selection.booking_options.ticket_type_code;
  //           const priceBandCode = selection.booking_options.price_band_code;

  //           ticketActions.add(
  //             `${perfId}_${ticketCode}_${priceBandCode}`,
  //             selection.booking_options
  //           );
  //         });
  //       }
  //       // err => { }
  //     );
  //   }
  // }, [sessionAvailbility]);

  function sessionExpirationCheck(ttl) {
    // TODO add a post message saying the session has expired so the parent page can reload the iframe
    if (
      compareDateWithCurrentUTC(ttl) < 0
      // process.env.NODE_ENV !== 'development'
    ) {
      console.warn(
        'TTL is too old session has expired',
        compareDateWithCurrentUTC(ttl)
      );
      setSessionExpiration(true);
      return true;
    }

    return false;
  }

  const stringifiedSession = JSON.stringify(sessionAvailbility);

  // setup an interval to check for session expiration
  useEffect(() => {
    if (sessionAvailbility && sessionAvailbility.ttl) {
      clearInterval(intervalRef.current);
      const isExpired = sessionExpirationCheck(sessionAvailbility.ttl); // do an inital check on load so we don't even start the interval

      if (!isExpired) {
        intervalRef.current = setInterval(() => {
          if (sessionExpirationCheck(sessionAvailbility.ttl)) {
            clearInterval(intervalRef.current);
          }
        }, 2000);
      }
    }

    return () => {
      clearInterval(intervalRef.current);
    };
    // check if the session is still valid
  }, [sessionAvailbility, stringifiedSession]);

  let content = <LoadingSpinner />;

  if (sessionAvailbility !== null) {
    if (sessionAvailbility.supplier_name === supplierNames.PRIO) {
      content = <PrioPickerFlow />;
    }
    if (sessionAvailbility.supplier_name === supplierNames.INGRESSO) {
      content = <IngressoPickerFlow />;
    }
  }

  if (isSessionExpired && getURLParameters().checkTTL !== 'false') {
    return (
      <ErrorOverlay
        content={
          <div className="session-expired">
            <Icon id="notification" color={theme['primary-color']} />
            <h1>Your session has expired</h1>
            <span>Please refresh and try again</span>
          </div>
        }
      />
    );
  }

  return (
    <TicketCommsControllerProvider {...props}>
      <div className="seats-picker-page">{content}</div>
    </TicketCommsControllerProvider>
  );
}

TicketCommsControllerProvider.defaultProps = {
  selectedDate: null,
  onSelectedDate: () => { },
};

TicketCommsControllerProvider.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  selectedDate: PropTypes.object, //moment object
  children: PropTypes.element.isRequired,
  onSelectedDate: PropTypes.func,
};
