import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import logger from './utils';

const initialState = {
  displayPopupSettings: false,
  displayCart: false,
  displayCarousel: false,
  displayAllDescription: false,
  displayCategories: true,
  displayAllCategories: false,
  displayPriceSortingOptions: true,
  displayDetails: false,
  displayProcessing: false,
};

function reducer(state = initialState, action) {
  const { popupStateName } = action;
  switch (action.type) {
    case 'TOGGLE_POPUP':
      return { ...state, [popupStateName]: !state[popupStateName] };
    default:
      throw new Error('unexpected action');
  }
}

export const PopupsContext = React.createContext(initialState);
export function PopupsProvider({ children }) {
  const [state, dispatch] = useReducer(
    logger(reducer, 'PopupsProvider'),
    initialState
  );

  const actions = React.useMemo(() => {
    return {
      togglePopup: popupStateName =>
        dispatch({ type: 'TOGGLE_POPUP', popupStateName }),
    };
  }, []);

  return (
    <PopupsContext.Provider value={{ state, actions }}>
      {children}
    </PopupsContext.Provider>
  );
}

PopupsProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
