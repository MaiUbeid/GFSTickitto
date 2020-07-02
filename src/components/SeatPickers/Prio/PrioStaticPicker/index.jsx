/* eslint-disable no-underscore-dangle */
import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import './style.scss';
import classNames from 'classnames';
import QuantitySelectRow from '../../../QuantitySelectRow';
import { makePriceString } from '../../../../utils/index';
import {
  useCurrencyMultiplier,
  useGetSessionId,
} from '../../../../utils/customHooks';
import { SettingsContext } from '../../../ContextProviders/SettingsProvider';
import { ApiAvailibilityContext } from '../../../ContextProviders/ApiAvailabilityProvider';
import { ThemeContext } from '../../../ContextProviders/ThemeProvider';
import { AppViewContext } from '../../../ContextProviders/AppViewProvider';
import PrioOptionsPicker from '../PrioOptionsPicker';
import PropPickupPicker from '../PrioPickupPicker';
import ErrorOverlay from '../../../ErrorOverlay';
import Icon from '../../../Icon';
import Button from '../../../Button';
import ApiClient from '../../../../utils/apiClient';
import { buildSelectionsObjectForAPI } from '../PrioPickerFlow/utils';

export default function PrioStaticPicker({
  ticketsAvailableNum,
  concessionTypes = [],
  perfId,
}) {
  const { isTablet } = useContext(AppViewContext);
  const sessionAvailbility = useContext(ApiAvailibilityContext);
  const sessionId = useGetSessionId();
  const theme = useContext(ThemeContext);
  const { currency } = sessionAvailbility;
  const { currency: currencyWanted } = useContext(SettingsContext);
  const [selectedTickets, setSelectedTickets] = useState({});
  const [selectedOptions, setSelectedOptions] = useState(null);
  const [selectedPickupPoint, setSelectedPickup] = useState(null);
  const currencyMultiplier = useCurrencyMultiplier(currency, currencyWanted);
  const [errorData, setError] = useState(null);
  const stepsConst = {
    TICKETS_PICK: 'TICKETS_PICK',
    OPTIONS_PICK: 'OPTIONS_PICK',
    PICKUP_PICK: 'PICKUP_PICK',
  };
  const [currStep, setCurrStep] = useState(stepsConst.TICKETS_PICK); // used only on mobile when there need to be multiple steps

  const totSelectedTickets = Object.keys(selectedTickets).reduce(
    (accumulator, concessionId) => accumulator + selectedTickets[concessionId],
    0
  );

  // check if the selected options in each options block are the same number as the tot selected tickets
  const productOptions = get(selectedOptions, 'product_options', []);
  let isOptionsEqualTotTickets = false;
  if (Array.isArray(productOptions) && productOptions.length > 0) {
    isOptionsEqualTotTickets = productOptions.every(optionBlock => {
      const quantity = optionBlock.option_values.reduce(
        (acc, optionVal) => optionVal.value_count + acc,
        0
      );
      return quantity === totSelectedTickets;
    });
  }

  // check if it has mandatory options to pick
  const hasMandatoryOptions = get(
    sessionAvailbility,
    'event_definition.product_options',
    []
  ).some(optionsObj => optionsObj.option_mandatory);

  const hasMandatoryPickupPoint =
    sessionAvailbility.event_definition.product_pickup_point === 'MANDATORY';

  // sort the concessions by price
  const sortedConcessionTypes = concessionTypes.sort((concA, concB) => {
    return Number(concB.price) - Number(concA.price);
  });

  const renderTickets = sortedConcessionTypes.map(concession => {
    const priceString = makePriceString(
      concession.price * currencyMultiplier,
      currencyWanted
    );
    const maxTickets =
      ticketsAvailableNum != null
        ? ticketsAvailableNum -
          totSelectedTickets +
          (selectedTickets[concession.id] || 0)
        : null;
    return (
      <QuantitySelectRow
        key={concession.id}
        mainText={concession.name}
        subText={priceString}
        handleChange={newVal => {
          if (newVal === 0) {
            const cleanedTickets = selectedTickets;
            delete cleanedTickets[concession.id];
            setSelectedTickets(cleanedTickets);
          } else {
            setSelectedTickets({ ...selectedTickets, [concession.id]: newVal });
          }
        }}
        maxValue={maxTickets}
      />
    );
  });

  if (errorData != null) {
    return (
      <ErrorOverlay
        content={
          <div className="full-page-err">
            <Icon id="ticket" color={theme['primary-color']} />
            <h1>Something went wrong</h1>
            <span>This event is not currently available</span>
          </div>
        }
      />
    );
  }

  // creates a history of all the steps we are going to have to go through
  const stepsNecessary = (() => {
    const arr = [stepsConst.TICKETS_PICK];
    if (hasMandatoryOptions) {
      arr.push(stepsConst.OPTIONS_PICK);
    }
    if (hasMandatoryPickupPoint) {
      arr.push(stepsConst.PICKUP_PICK);
    }
    return arr;
  })();
  // flag to know if the current step is the last one
  const isFinalStep = currStep === stepsNecessary[stepsNecessary.length - 1];

  const goToNextStep = () => {
    const currStepIndex = stepsNecessary.indexOf(currStep);
    // this is just for validation, it should never be used
    if (currStepIndex === stepsNecessary.length - 1) {
      setCurrStep(currStep);
    } else {
      setCurrStep(stepsNecessary[currStepIndex + 1]);
    }
  };

  const renderWhatToPick = (() => {
    // console.log('isTablet', isTablet);
    if (!isTablet) {
      return (
        <div className="prio-static-picker__selections-panel">
          <div className="ticket-options-list">{renderTickets}</div>
          {hasMandatoryOptions && (
            <PrioOptionsPicker
              numberOfOptionsToSelect={totSelectedTickets}
              handleOptionsSelected={selectedOpts => {
                setSelectedOptions(selectedOpts);
              }}
            />
          )}
          {hasMandatoryPickupPoint && (
            <PropPickupPicker
              onSelection={selectedPickup => {
                setSelectedPickup(selectedPickup);
              }}
            />
          )}
        </div>
      );
    }
    if (isTablet && currStep === stepsConst.TICKETS_PICK) {
      return (
        <>
          <div className="prio-static-picker__selections-panel">
            <div className="ticket-options-list">{renderTickets}</div>
          </div>
          {!isFinalStep && (
            <Button
              key={totSelectedTickets}
              isDisabled={totSelectedTickets === 0}
              isWithArrow
              buttonType="primary"
              text="Next Step"
              handleOnClick={goToNextStep}
            />
          )}
        </>
      );
    }
    if (isTablet && currStep === stepsConst.OPTIONS_PICK) {
      return (
        <>
          <div className="prio-static-picker__selections-panel">
            <PrioOptionsPicker
              numberOfOptionsToSelect={totSelectedTickets}
              handleOptionsSelected={selectedOpts => {
                setSelectedOptions(selectedOpts);
              }}
            />
          </div>
          {!isFinalStep && (
            <Button
              isDisabled={!hasMandatoryOptions}
              isWithArrow
              buttonType="primary"
              text="Next Step"
              handleOnClick={goToNextStep}
            />
          )}
        </>
      );
    }
    if (isTablet && currStep === stepsConst.PICKUP_PICK) {
      return (
        <div className="prio-static-picker__selections-panel">
          <PropPickupPicker
            onSelection={selectedPickup => {
              setSelectedPickup(selectedPickup);
            }}
          />
        </div>
      );
    }
    return null;
  })();

  const mainClass = classNames({
    'prio-static-picker': true,
    'prio-static-picker--isTablet': isTablet,
  });

  return (
    <div className={mainClass}>
      {renderWhatToPick}

      {/* show the final button */}
      {((isTablet && isFinalStep) || !isTablet) && (
        <Button
          isDisabled={hasMandatoryOptions && !isOptionsEqualTotTickets}
          isWithArrow
          buttonType="primary"
          text="Add to Basket"
          handleOnClick={() => {
            const reformattedSelectedTickets = Object.keys(selectedTickets).map(
              ticketKey => {
                return {
                  product_type_id: ticketKey,
                  product_type_count: selectedTickets[ticketKey],
                };
              }
            );

            const builtObject = buildSelectionsObjectForAPI(
              sessionAvailbility,
              perfId,
              reformattedSelectedTickets,
              selectedOptions,
              selectedPickupPoint
            );
            // ticketsState.actions.add(builtObject);
            ApiClient.addToBasket(
              sessionId,
              builtObject.product_availability_id,
              builtObject,
              () => {},
              err => {
                const parsedErr = JSON.parse(
                  err
                    .replace(/'/g, '"')
                    .replace(/False/g, 'false')
                    .replace(/True/g, 'true')
                );
                console.error(parsedErr);
                if (parsedErr.error === 'INVALID_THIRDPARTY_RESERVATION') {
                  setError('INVALID_THIRDPARTY_RESERVATION');
                }

                // console.log('err adding to basket', JSON.parse(err));
              }
            );
          }}
        />
      )}
    </div>
  );
}

PrioStaticPicker.defaultProps = {
  ticketsAvailableNum: null,
};

PrioStaticPicker.propTypes = {
  perfId: PropTypes.string.isRequired,
  ticketsAvailableNum: PropTypes.number,
  concessionTypes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};
