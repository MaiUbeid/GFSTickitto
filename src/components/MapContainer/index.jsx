import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';

import { AppViewContext } from '../ContextProviders/AppViewProvider';

export default function MapContainer({ latitude, longitude }) {
  const { isTablet } = useContext(AppViewContext);
  const defaultMapOptions = {
    fullscreenControl: false,
    mapTypeControl: false,
    panControl: false,
    streetViewControl: false,
  };

  const MapWithAMarker = withScriptjs(
    withGoogleMap(() => (
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: latitude, lng: longitude }}
        defaultOptions={isTablet && defaultMapOptions}
      >
        <Marker position={{ lat: latitude, lng: longitude }} />
      </GoogleMap>
    ))
  );

  return (
    <MapWithAMarker
      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAP_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `25rem` }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
  );
}

MapContainer.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
};
