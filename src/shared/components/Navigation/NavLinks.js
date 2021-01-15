import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import "./NavLinks.css";

function NavLinks(props) {
  const auth = useContext(AuthContext);
  const logOutHandler = () => {
    auth.logout();
  };
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/users" exact>
          Users
        </NavLink>
      </li>

      <li>
        <NavLink to="/places/new">Add Place</NavLink>
      </li>

      {auth.isLoggedIn && (
        <li>
          <NavLink to={`/${auth.userId}/places`}>My Places</NavLink>
        </li>
      )}

      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">Log In</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/auth" onClick={logOutHandler}>
            Log Out
          </NavLink>
        </li>
      )}
    </ul>
  );
}

export default NavLinks;
