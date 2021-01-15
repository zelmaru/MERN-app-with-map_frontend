import React from "react";

import "./Card.css";

const Card = (props) => {
  return (
    <div
      className={`card ${props.className} ${
        props.unpadded && "card--unpadded"
      }`}
      style={props.style}
    >
      {props.children}
    </div>
  );
};

export default Card;
