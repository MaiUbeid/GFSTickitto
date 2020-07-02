import React, { useEffect, useState, useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import classNames from 'classnames';
import IngressoChartMaker from './ingressoChartMaker';
import LadingSpinner from '../../../LoadingSpinner';
import ApiClient from '../../../../utils/apiClient';
import { ErrorReportingContext } from '../../../ContextProviders/ErrorReportingProvider';
import { TicketsContext } from '../../../ContextProviders/TicketsProvider';
import { useGetSessionId } from '../../../../utils/customHooks';

import Button from '../../../Button';

export function makeIdFromSeatBundle(perfID, seatsBundle) {
  return `${perfID}_${seatsBundle.ticket_type_code}_${seatsBundle.price_band_code}`;
}

export default function IngressoSeatsPicker(props) {
  const { handleInitialized, handleError } = props;
  const ticketsState = useContext(TicketsContext);
  const { throwError } = useContext(ErrorReportingContext);
  const [isChartLoaded, setChartLoaded] = useState(false);
  const [ingressoToken, setToken] = useState(null);
  const timeoutRef = useRef(null); // used to keep the variable around between rerenders
  const sessionId = useGetSessionId();

  // eslint-disable-next-line react/destructuring-assignment
  const performanceId = props.eventData.perfID;

  const handleIngressoEvents = message => {
    if (message.origin === 'https://b2b.ingresso.co.uk') {
      const messageData = JSON.parse(message.data);

      switch (messageData.event) {
        case 'NEW_AVAILABILITY_DATA':
          // case 'CHART_INITIALISED':
          clearTimeout(timeoutRef.current);
          handleInitialized(messageData);
          setChartLoaded(true);
          break;
        case 'ADD_SEAT': {
          // add to the state per price band
          messageData.data.basket.seatBundles.forEach(seatsBundle => {
            const seats = seatsBundle.seats.map(seat => seat.seat_id);
            ticketsState.actions.add(
              makeIdFromSeatBundle(performanceId, seatsBundle),
              {
                performance_id: props.eventData.perfID,
                ticket_type_code: seatsBundle.ticket_type_code,
                price_band_code: seatsBundle.price_band_code,
                seats,
              }
            );
          });

          break;
        }
        case 'REMOVE_SEAT': {
          const seatId = messageData.data.seatData.seat_id;
          ticketsState.actions.removeFeatherSeat(seatId, performanceId);
          break;
        }
        case 'ERROR':
          throwError(Error('Feather did not load'), {
            eventData: props.eventData,
            ...messageData,
          });
          handleError(messageData);
          break;
        default:
      }
    }
  };

  useEffect(() => {
    ApiClient.getIngressoToken(data => {
      setToken(data.token);
    });

    // set a timeout to check how long feather takes to load
    timeoutRef.current = setTimeout(() => {
      throwError(
        Error(
          'Feather did not load after 10s, could be that the event did not exist'
        ),
        { eventData: props.eventData }
      );
    }, 10000);

    // add feather event listener
    window.addEventListener('message', handleIngressoEvents, false);

    return () => {
      clearTimeout(timeoutRef.current);
      window.removeEventListener('message', handleIngressoEvents, false); // this is what is done on unmount as cleanup
    };
    // eslint-disable-next-line react/destructuring-assignment
  }, [props.eventData, throwError]);

  const wrapperClass = classNames({
    'ing-seats-wrapper': true,
    'ing-seats-wrapper--loaded': !!(isChartLoaded && ingressoToken != null),
    'ing-seats-wrapper--loading': !!(!isChartLoaded || ingressoToken == null),
  });

  return (
    <div className={wrapperClass}>
      {(!isChartLoaded || ingressoToken == null) && <LadingSpinner key={1} />}
      {ingressoToken && (
        <>
          <IngressoChartMaker {...props} token={ingressoToken} />
          <Button
            isWithArrow
            buttonType="primary"
            text="Add to basket"
            handleOnClick={() => {
              const ids = Object.keys(ticketsState.tickets).map(
                ticketId => ticketsState.tickets[ticketId].performance_id
              );
              const reformattedTickets = Object.keys(ticketsState.tickets).map(
                ticketId => ticketsState.tickets[ticketId]
              );
              ApiClient.addToBasket(
                sessionId,
                ids,
                reformattedTickets
                // res => {
                //   console.log('add basket success', res);
                // },
                // err => {
                //   console.log('add basket error', err);
                // }
              );
            }}
          />
        </>
      )}
    </div>
  );
}

IngressoSeatsPicker.defaultProps = {
  isShowingControls: true,
  seatColors: null,
  handleInitialized: () => {},
  handleError: e => {
    console.warn(e);
  },
};

IngressoSeatsPicker.propTypes = {
  eventData: PropTypes.shape({
    eventID: PropTypes.string.isRequired, // demo event
    perfID: PropTypes.string.isRequired,
  }).isRequired,
  isShowingControls: PropTypes.bool,
  handleError: PropTypes.func,
  handleInitialized: PropTypes.func,
  seatColors: PropTypes.arrayOf(
    (propValue, key, componentName, location, propFullName) => {
      if (propValue.length !== 10) {
        return new Error(
          `Invalid prop \`${propFullName}\` supplied to` +
            ` \`${componentName}\`. Number of colors in the array is not 10.`
        );
      }
      return true;
    }
  ), // array of hex values, they change the seat colors in order by distance from tehe stage
};
