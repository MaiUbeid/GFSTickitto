import React, { useContext } from 'react';
import './style.scss';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import RadioOrDropDownOptions from '../../Common/RadioOrDropdownOptions';
import { ApiAvailibilityContext } from '../../../ContextProviders/ApiAvailabilityProvider';

export default function PrioPickupPicker({ onSelection = () => {} }) {
  const sessionAvailbility = useContext(ApiAvailibilityContext);

  const pickupLocations = sessionAvailbility.event_definition.product_locations.filter(
    location => location.location_pickup_point
  );

  const pickupOptions = pickupLocations.map(location => {
    const locationId = location.location_id;
    const pickupLocationDetails = get(
      sessionAvailbility,
      'event_definition.product_pickup_point_details',
      []
    ).find(pickupDetail => pickupDetail.pickup_point_id === locationId);

    return {
      displayName: `${location.location_name} - ${pickupLocationDetails.pickup_point_name}`,
      extraDisplayName: `(${pickupLocationDetails.pickup_point_time})`,
      data: locationId,
    };
  });

  return (
    <div className="prio-pickup-picker">
      <h2>Select Your Pickup location:</h2>
      <RadioOrDropDownOptions
        options={pickupOptions}
        handleSelection={selectedData => {
          onSelection(selectedData);
        }}
      />
    </div>
  );
}

PrioPickupPicker.propTypes = {
  onSelection: PropTypes.func.isRequired,
};
