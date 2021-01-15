import React, { useRef, useEffect } from "react";

import "./Map.css";
import myIcon from "../UIElements/Logo.svg";

function Map(props) {
  const mapRef = useRef();

  const { center, zoom } = props;

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: center,
      zoom: 15,
    });

    new window.google.maps.Marker({ position: center, map: map, icon: myIcon });
  }, [center, zoom]);

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
    ></div>
  );
}

export default Map;
