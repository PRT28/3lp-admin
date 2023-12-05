import React from "react";
import { useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "600px",
  height: "400px",
};

const DynamicMapEmbed = ({ latitude, longitude }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const [map, setMap] = useState(null);

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds({
      lat: latitude,
      lng: longitude,
    });
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat: latitude, lng: longitude }}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
      
    >
      <Marker position={{ lat: latitude, lng: longitude }} />
    
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
};

export default DynamicMapEmbed;
