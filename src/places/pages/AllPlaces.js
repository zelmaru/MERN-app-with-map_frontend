import React, { useState, useEffect } from "react";

import { useHttp } from "../../shared/hooks/http-hook";

import "./AllPlaces.css";

import PlacesListSmall from "../components/PlaceListSmall";
import BigMap from "../../shared/components/UIElements/BigMap";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
const GOOGLE_MAP_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

const loadGoogleMapScript = (callback) => {
  if (
    typeof window.google === "object" &&
    typeof window.google.maps === "object"
  ) {
    callback();
  } else {
    const googleMapScript = document.createElement("script");
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&callback=initMap`;
    window.document.body.appendChild(googleMapScript);
    const polyfillScript = document.createElement("script");
    polyfillScript.src = `https://polyfill.io/v3/polyfill.min.js?features=default"`;
    window.document.body.appendChild(polyfillScript);
    googleMapScript.addEventListener("load", callback);
  }
};

function AllPlaces(props) {
  const { isLoading, error, sendRequest, clearError } = useHttp();
  const [loadedPlaces, setLoadedPlaces] = useState();
  const [loadMap, setLoadMap] = useState(false);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/places"
        );
        setLoadedPlaces(responseData.places);
      } catch (err) {}
    };
    fetchPlaces();
  }, [sendRequest]);

  useEffect(() => {
    loadGoogleMapScript(() => {
      setLoadMap(true);
    });
  }, []);

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <section className="all-places__map">
        {isLoading ||
          (!loadMap && (
            <div className="center">
              <LoadingSpinner />
            </div>
          ))}
        {!isLoading && loadedPlaces && <BigMap items={loadedPlaces} />}
      </section>
      <section className="all-places__place-list">
        {!isLoading && loadedPlaces && <PlacesListSmall items={loadedPlaces} />}
      </section>
    </>
  );
}

export default AllPlaces;
