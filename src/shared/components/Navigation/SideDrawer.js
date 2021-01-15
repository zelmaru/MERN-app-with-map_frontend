import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import CloseIcon from "@material-ui/icons/Close";

import "./SideDrawer.css";
import "../../../index.css";

function SideDrawer(props) {
  const content = (
    <CSSTransition
      in={props.show}
      timeout={500}
      classNames="menu"
      mountOnEnter
      unmountOnExit
    >
      <aside className="side-drawer" onClick={props.onClick}>
        <CloseIcon style={{ fontSize: 30 }} />
        {props.children}
      </aside>
    </CSSTransition>
  );
  return ReactDOM.createPortal(content, document.getElementById("drawer-hook"));
}

export default SideDrawer;
