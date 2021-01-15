import React from "react";
import "./ContentString.css";

function ContentString(props) {
  return (
    <div className="content-string__info-container">
      <div className="content-string__info-wrapper">
        <h3 className="content-string__info-first-heading">
          {/* Cannot use Link: "Error: Invariant failed: You should not use <Link> outside a <Router></Router>" */}
          <a href={`/places/place/${props.id}`}>{props.title}</a>
        </h3>
        <div className="content-string__info-body-content">
          <p>{props.coords}</p>
          <a
            className="content-string__info-link"
            href={`/places/place/${props.id}`}
          >
            Read more ...
          </a>
        </div>
      </div>
      <a href={`/places/place/${props.id}`}>
        <img
          className="content-string__info-image"
          src={`${process.env.REACT_APP_ASSET_URL}/${props.image}`}
          alt={props.title}
        ></img>
      </a>
      <div className="content-string__info-close-bg"></div>
    </div>
  );
}

export default ContentString;
