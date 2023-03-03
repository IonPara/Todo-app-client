import React from "react";
import { NavLink } from "react-router-dom";

// This is the header component
const Header = ({ loggedIn, name }) => {
  return (
    <div className="header-container flex-container">
      {/* Here I used ternary to display the welcome when the user has logged in*/}
      <h3>{loggedIn ? "Welcome " + name : "To Do"}</h3>
      <nav className="nav">
        <ul className="nav-list">
          {/* Here I used ternary to display the link when the user is logOut*/}
          <NavLink className="nav-element" to={"/"}>
            {loggedIn ? "" : "Login"}
          </NavLink>
          {/* Here I used ternary to display the link when the user is logOut*/}
          {!loggedIn ? (
            <NavLink className="nav-element" to={!loggedIn ? "/signUp" : "/"}>
              SignUp
            </NavLink>
          ) : (
            ""
          )}
          {/* Here I used ternary to display the link when the user is loggedIn*/}
          {loggedIn ? (
            <NavLink
              onClick={() => window.reload(false)}
              className="nav-element"
              to={"/"}
            >
              LogOut
            </NavLink>
          ) : (
            ""
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
