import React from "react";
import PlaceItemSmall from "./PlaceItemSmall";

import "./PlaceListSmall.css";

function PlaceListSmall(props) {
  return (
    <ul className="place-list-small">
      {props.items.reverse().map((place) => (
        <PlaceItemSmall
          key={place.id}
          id={place.id}
          image={place.image}
          title={place.title}
          description={place.description}
          address={place.address}
          creatorId={place.creator}
          coordinates={place.coordinates}
        />
      ))}
    </ul>
  );
}

export default PlaceListSmall;
