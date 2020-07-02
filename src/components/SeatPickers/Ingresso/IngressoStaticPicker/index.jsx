import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import className from 'classnames';
import QuantitySelectRow from '../../../QuantitySelectRow';
import ApiClient from '../../../../utils/apiClient';
import { ApiAvailibilityContext } from '../../../ContextProviders/ApiAvailabilityProvider';
import LoadingSpinner from '../../../LoadingSpinner';
import { makePriceString } from '../../../../utils/index';
import {
  useCurrencyMultiplier,
  useGetSessionId,
} from '../../../../utils/customHooks';
import { SettingsContext } from '../../../ContextProviders/SettingsProvider';
import { AppViewContext } from '../../../ContextProviders/AppViewProvider';
import Button from '../../../Button';
import RadioOrDropdownOptions from '../../Common/RadioOrDropdownOptions';

function getIngressoMaxSeats(ingPerfAvailibility) {
  if (ingPerfAvailibility == null) return null;

  const priceBandSeatsAvailable = [];
  ingPerfAvailibility.availability.ticket_type.forEach(ticket => {
    ticket.price_band.forEach(priceBand => {
      priceBandSeatsAvailable.push(priceBand.number_available);
    });
  });

  return Math.max(...priceBandSeatsAvailable);
}

export default function IngressoStaticPicker({ perfId }) {
  const { currency: currencyWanted } = useContext(SettingsContext); // TODO needs to be updated to use the currency multiplier
  const { seatplan_source: seatingImgUrl } = useContext(ApiAvailibilityContext);
  const [ticketsQuantity, setTicketQuantity] = useState(0);
  const [selectedPoolType, setPoolType] = useState(0);
  const [ingPerfAvailibility, setIngPerfAvailibility] = useState(null);
  const [isSeatingImgLoaded, setSeatingImgLoaded] = useState(!null);
  const sessionId = useGetSessionId();
  const { isTablet } = useContext(AppViewContext);

  useEffect(() => {
    ApiClient.getIngressoPerformanceAvailability(perfId, data => {
      setIngPerfAvailibility(data);
    });
  }, [perfId]);

  let currencyFrom = 'GBP';
  if (
    ingPerfAvailibility != null &&
    ingPerfAvailibility.currency_code != null
  ) {
    currencyFrom = ingPerfAvailibility.currency_code.toUpperCase();
  }

  const currencyMultiplier = useCurrencyMultiplier(
    currencyFrom,
    currencyWanted
  );

  if (
    ingPerfAvailibility != null &&
    ingPerfAvailibility.availability.ticket_type.length === 0
  ) {
    return <div>No availability found for this event {perfId}</div>;
  }

  const maxSeatsInPriceBands = getIngressoMaxSeats(ingPerfAvailibility);
  const reformattedPoolTypeOptions = [];
  if (ingPerfAvailibility !== null) {
    ingPerfAvailibility.availability.ticket_type.forEach(ticket => {
      const ticketDesc = ticket.ticket_type_desc;
      ticket.price_band.forEach(priceBand => {
        const ticketCode = ticket.ticket_type_code;
        const priceBandCode = priceBand.price_band_code;
        const priceString = `(${makePriceString(
          priceBand.sale_combined * currencyMultiplier,
          currencyWanted
        )})`;

        reformattedPoolTypeOptions.push({
          data: {
            ticketCode,
            priceBandCode,
          },
          displayName: `${ticketDesc} ${priceBand.price_band_code}`,
          extraDisplayName: priceString,
        });
      });
    });
  }

  if (
    ingPerfAvailibility == null ||
    !isSeatingImgLoaded ||
    currencyMultiplier == null
  ) {
    return <LoadingSpinner />;
  }

  const mainClass = className({
    'ingresso-static-picker': true,
    'ingresso-static-picker--isTablet': isTablet,
  });

  return (
    <div className={mainClass}>
      {seatingImgUrl && (
        <img
          className="ingresso-static-picker__seating-image"
          onLoad={() => {
            setSeatingImgLoaded(true);
          }}
          alt="seating plan"
          src={seatingImgUrl}
        />
      )}
      <div className="ingresso-static-picker__panel">
        <div className="ingresso-static-picker__panel__tickets">
          <QuantitySelectRow
            handleChange={quantity => {
              setTicketQuantity(quantity);
            }}
            mainText="Select the number of tickets"
            maxValue={maxSeatsInPriceBands}
          />
          <RadioOrDropdownOptions
            title="Select your seating area"
            isDisabled={ticketsQuantity === 0}
            options={reformattedPoolTypeOptions}
            handleSelection={value => setPoolType(value)}
          />
        </div>

        <Button
          isDisabled={!selectedPoolType}
          buttonType="primary"
          text="Add to Basket"
          handleOnClick={() => {
            const ticketData = {
              performance_id: perfId,
              ticket_type_code: selectedPoolType.ticketCode, // ticketCode,
              price_band_code: selectedPoolType.priceBandCode,
              number_of_seats: ticketsQuantity,
            };

            ApiClient.addToBasket(
              sessionId,
              perfId,
              ticketData
              // data => {
              //   console.log('add basket success', data);
              // },
              // err => {
              //   console.log('add basket error', err);
              // }
            );
          }}
        />
      </div>
    </div>
  );
}

IngressoStaticPicker.defaultProps = {};

IngressoStaticPicker.propTypes = {
  perfId: PropTypes.string.isRequired,
};
