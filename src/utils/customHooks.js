/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
import { useState, useContext } from 'react';
import { Convert } from 'easy-currencies';
import { ApiAvailibilityContext } from '../components/ContextProviders/ApiAvailabilityProvider';

export function useCurrencyMultiplier(convertFrom, convertTo = 'GBP') {
  const [currencyMultiplier, setCurencyMultiplier] = useState(null);

  if (
    currencyMultiplier === null &&
    convertFrom !== null &&
    convertTo !== null
  ) {
    Convert(1)
      .from(convertFrom)
      .to(convertTo)
      .then(multiplier => {
        setCurencyMultiplier(multiplier);
      });
  }

  return currencyMultiplier;
}

export function useGetSessionId() {
  const sessionData = useContext(ApiAvailibilityContext);

  if (sessionData == null) {
    return null;
  }
  return sessionData._id;
}
