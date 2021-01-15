import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import CloseIcon from "@material-ui/icons/Close";

import "./Modal.css";
import Backdrop from "./Backdrop";

function ModalOverlay(props) {
  const content = (
    <div className={`modal ${props.className}`} style={props.style}>
      <header className={`modal__header ${props.headerClass}`}>
        <CloseIcon onClick={props.onCancel} />
        <h2>{props.header}</h2>
      </header>

      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
        }
      >
        <div className={`modal__content ${props.contentClass}`}>
          {props.children}
        </div>
        <footer className={`modal__footer ${props.footerClass}`}>
          {props.footer}
        </footer>
      </form>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
}

function Modal(props) {
  return (
    <>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
        {/* // forward the props from Modal to ModalOverlay */}
        <ModalOverlay {...props} />
      </CSSTransition>
    </>
  );
}

export default Modal;
