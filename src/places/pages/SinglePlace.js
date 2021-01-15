import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import { useHttp } from "../../shared/hooks/http-hook";

import "./SinglePlace.css";

import PlaceItem from "../components/PlaceItem";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

function SinglePlace(props) {
  const { isLoading, error, sendRequest, clearError } = useHttp();
  const [loadedPlace, setLoadedPlace] = useState();

  const history = useHistory();

  const placeId = useParams().placeId;

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/place/${placeId}`
        );
        setLoadedPlace(responseData.place);
      } catch (err) {}
    };
    fetchPlace();
  }, [sendRequest, placeId]);

  const placeDeletedHandler = () => {
    history.push("/");
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}

      {!isLoading && loadedPlace && (
        <div className="single-place center">
          <PlaceItem
            key={loadedPlace.id}
            id={loadedPlace.id}
            image={loadedPlace.image}
            title={loadedPlace.title}
            description={loadedPlace.description}
            address={loadedPlace.address}
            creatorId={loadedPlace.creator}
            coordinates={loadedPlace.coordinates}
            onDelete={placeDeletedHandler}
            viewAuthor
            creator={loadedPlace.creator}
          />
        </div>
      )}
    </>
  );
}

export default SinglePlace;
