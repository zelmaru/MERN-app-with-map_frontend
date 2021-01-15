import React from "react";
import { Link } from "react-router-dom";

import "./PlaceItemSmall.css";
import "./PlaceItem.css";

import Card from "../../shared/components/UIElements/Card";
import VisibilityIcon from "@material-ui/icons/Visibility";

function PlaceItemSmall(props) {
  return (
    <li className="place-item-small">
      <Link to={`/places/place/${props.id}`}>
        <Card unpadded style={{ cursor: "pointer" }}>
          <div className="place-item-small__image">
            <img
              src={`${process.env.REACT_APP_ASSET_URL}/${props.image}`}
              alt={props.title}
            />
          </div>
          <div className="place-item-small__info">
            <h4>{props.title}</h4>
            <p>{props.description}</p>
          </div>
          <VisibilityIcon className="place-item-small__icon" />
        </Card>
      </Link>
    </li>
  );
}

export default PlaceItemSmall;
