import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import './styles.scss';
import { ApiAvailibilityContext } from '../../../ContextProviders/ApiAvailabilityProvider';
import QuantitySelectorRow from '../../../QuantitySelectRow';
import { useCurrencyMultiplier } from '../../../../utils/customHooks';
import { SettingsContext } from '../../../ContextProviders/SettingsProvider';
import { makePriceString } from '../../../../utils/index';

/* 

  State example
  {
    option_id: {
      [value_id]: value_count
    }
  }

  What we need :
  "product_options": [
    {
      "option_id": "1118",
      "option_values": [
        {
          "value_id": "4921",
          "value_count": 2
        }
      ]
    }
  ],
  */
export function reformatOptionsForPrio(stateOptions) {
  // TODO add tests
  const productOptions = Object.keys(stateOptions).map(optionBlockKey => {
    const selectedOptions = Object.keys(stateOptions[optionBlockKey]).map(
      valueKey => {
        return {
          value_id: valueKey,
          value_count: stateOptions[optionBlockKey][valueKey],
        };
      }
    );

    return {
      option_id: optionBlockKey,
      option_values: selectedOptions,
    };
  });

  return {
    product_options: productOptions,
  };
}

export default function PrioOptionsPicker({
  numberOfOptionsToSelect = 0,
  handleOptionsSelected = () => {},
}) {
  const sessionAvailbility = useContext(ApiAvailibilityContext);
  const currency = get(sessionAvailbility, 'currency', 'GBP');
  const { currency: currencyWanted } = useContext(SettingsContext);
  const currencyMultiplier = useCurrencyMultiplier(currency, currencyWanted);

  const [optionsPicked, setOptionsPicked] = useState({});

  useEffect(() => {
    const reformattedOptionsForApi = reformatOptionsForPrio(optionsPicked);
    handleOptionsSelected(reformattedOptionsForApi);
  }, [optionsPicked, numberOfOptionsToSelect]);

  // get all of the types of mandatory options
  const allMandatoryOptions = get(
    sessionAvailbility,
    'event_definition.product_options',
    []
  ).filter(optionsObj => optionsObj.option_mandatory);

  const renderOptionBlocks = [];

  allMandatoryOptions.forEach(optionBlock => {
    const renderOptions = optionBlock.option_values.map(optionValues => {
      const price = Number(optionValues.value_price);
      return (
        <QuantitySelectorRow
          key={optionValues.value_id}
          mainText={optionValues.value_name}
          subText={makePriceString(price * currencyMultiplier, currencyWanted)}
          handleChange={newQuantity => {
            setOptionsPicked({
              ...optionsPicked,
              [optionBlock.option_id]: {
                ...optionsPicked[optionBlock.option_id],
                [optionValues.value_id]: newQuantity,
              },
            });
          }}
        />
      );
    });

    renderOptionBlocks.push(
      <div className="options-picker__holder" key={optionBlock.option_id}>
        <h2>Select your {optionBlock.option_name} options</h2>
        {renderOptions}
      </div>
    );
  });

  return <div className="options-picker"> {renderOptionBlocks}</div>;
}

PrioOptionsPicker.propTypes = {
  numberOfOptionsToSelect: PropTypes.number.isRequired,
  handleOptionsSelected: PropTypes.func.isRequired,
};
