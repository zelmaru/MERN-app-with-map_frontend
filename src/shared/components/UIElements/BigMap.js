import React, { useRef, useEffect } from "react";
import ReactDOMServer from "react-dom/server";

import "./BigMap.css";
import myIcon from "../UIElements/Logo.svg";
import ContentString from "./ContentString";

function BigMap(props) {
  const places = props.items;
  let infowindow;
  const mapRef = useRef();
  useEffect(() => {
    const map = new window.google.maps.Map(
      mapRef.current,
      {
        center: { lat: 50.079618, lng: 14.429994 },
        zoom: 12,
      },
      []
    );

    places.map((place) => {
      // render component as string
      const contentString = ReactDOMServer.renderToString(
        <ContentString
          title={place.title}
          id={place.id}
          coords={place.coordinates.lat + ", " + place.coordinates.lng}
          image={place.image}
        />
      );

      const marker = new window.google.maps.Marker({
        position: place.coordinates,
        map: map,
        icon: myIcon,
        // label: place.title,
      });

      marker.addListener("click", () => {
        infowindow && infowindow.close();
        infowindow = new window.google.maps.InfoWindow({
          content: contentString,
        });
        infowindow.open(map, marker);
      });
    });
  });

  return (
    <>
      <div
        className="big-map"
        ref={mapRef}
        style={{
          width: "calc(90vw - 2rem)",
          minHeight: "70vh",
          margin: "auto",
        }}
      />
    </>
  );
}

export default BigMap;
