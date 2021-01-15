import React from "react";
import { Link } from "react-router-dom";

import Avatar from "../../shared/components/UIElements/Avatar";
import Card from "../../shared/components/UIElements/Card";
import "./UserItem.css";
import Button from "../../shared/components/FormElements/Button";

function UserItem(props) {
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <div className="user-item__image">
          <Avatar
            image={`${process.env.REACT_APP_ASSET_URL}/${props.image}`}
            alt={props.username}
          />
        </div>
        <div className="user-item__info">
          <div>
            <h3>{props.username}</h3>
            <span>
              {props.placeCount} {props.placeCount === 1 ? "Place" : "Places"}
            </span>
          </div>

          <Link to={`/${props.id}/places`}>
            <Button marginLeftAuto>View places</Button>
          </Link>
        </div>
      </Card>
    </li>
  );
}

export default UserItem;
