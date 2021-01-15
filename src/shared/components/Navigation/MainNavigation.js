import React, { useState } from "react";
import { Link } from "react-router-dom";
import NotesIcon from "@material-ui/icons/Notes";

import MyIcon from "../UIElements/Logo.svg";
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElements/Backdrop";
import ShareButtons from "./ShareButtons";
import "./MainNavigation.css";

function MainNavigation(props) {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const openDrawer = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawer = () => {
    setDrawerIsOpen(false);
  };

  const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = 768;

  React.useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, []);

  return (
    <>
      {width < breakpoint && drawerIsOpen && <Backdrop onClick={closeDrawer} />}
      {width < breakpoint && drawerIsOpen && (
        <SideDrawer show={drawerIsOpen} onClick={closeDrawer}>
          <nav className="main-navigation__drawer-nav">
            <NavLinks />
          </nav>
        </SideDrawer>
      )}
      <MainHeader>
        <button className="main-navigation__menu-btn" onClick={openDrawer}>
          <NotesIcon fontSize="large" />
        </button>
        <h2 className="main-navigation__title">
          <Link to="/">
            <span>WalkPrague</span>
            <img src={MyIcon} alt="" />
          </Link>
        </h2>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </>
  );
}

export default MainNavigation;
