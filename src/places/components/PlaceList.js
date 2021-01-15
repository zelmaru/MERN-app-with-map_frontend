import React, { useContext } from "react";
import { useParams } from "react-router-dom";

import { AuthContext } from "../../shared/context/auth-context";

import "./PlaceList.css";

import Card from "../../shared/components/UIElements/Card";
import PlaceItem from "./PlaceItem";
import Button from "../../shared/components/FormElements/Button";

function PlaceList(props) {
  const userId = useParams().userId;
  const auth = useContext(AuthContext);
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>
            {auth.userId === userId ? "You do" : "This user does"} not have any
            places yet.
          </h2>
          <Button to="/places/new">
            {auth.userId === userId ? "Share a place" : "Add your own place"}
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-list">
      {props.items.reverse().map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.image}
          title={place.title}
          description={place.description}
          address={place.address}
          creatorId={place.creator}
          coordinates={place.coordinates}
          onDelete={props.onDelete}
        />
      ))}
    </ul>
  );
}

export default PlaceList;
