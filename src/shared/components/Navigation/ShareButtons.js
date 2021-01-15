import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  VKShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TelegramIcon,
  TwitterIcon,
  VKIcon,
  WhatsappIcon,
} from "react-share";
import ShareIcon from "@material-ui/icons/Share";
import CloseIcon from "@material-ui/icons/Close";

import "./ShareButtons.css";

function ShareButtons(props) {
  const [showBtns, setShowBtns] = useState(false);
  const URL = "http://localhost:3000" + useLocation().pathname;

  const show = () => {
    setShowBtns(true);
  };

  const hide = () => {
    setShowBtns(false);
  };

  return (
    <div
      className={`share-buttons ${
        props.single ? "share-buttons--single" : "share-buttons--shared"
      } `}
    >
      <button
        className={`share-buttons__icon-btn ${
          props.single && "share-buttons__icon-btn--single"
        }`}
        onClick={showBtns ? hide : show}
      >
        {showBtns && (
          <CloseIcon
            className="share-buttons__close"
            style={{ fontSize: 15 }}
          />
        )}
        <ShareIcon className="share-buttons__icon" />
      </button>

      {showBtns && (
        <div
          className={`${
            !props.single && "share-buttons__buttons--shared"
          } share-buttons__buttons`}
        >
          {!props.single && (
            <span className="share-buttons__buttons-span">Share page:</span>
          )}
          <TelegramShareButton url={URL}>
            <TelegramIcon size={36} round />
          </TelegramShareButton>
          <WhatsappShareButton url={URL}>
            <WhatsappIcon size={36} round />
          </WhatsappShareButton>
          <FacebookShareButton url={URL}>
            <FacebookIcon size={36} round />
          </FacebookShareButton>
          <TwitterShareButton url={URL}>
            <TwitterIcon size={36} round />
          </TwitterShareButton>
          <VKShareButton url={URL}>
            <VKIcon size={36} round />
          </VKShareButton>
        </div>
      )}
    </div>
  );
}

export default ShareButtons;
