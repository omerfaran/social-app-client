import React from "react";
// import { Search } from "semantic-ui-react";
import Search from "./Search";
import classes from "./NavbarLogged.module.css";

const NavbarLogged = () => {
  return (
    <div className={classes.navbarContainer} id="navbarColor">
      <div className={classes.navbar}>
        <Search />
      </div>
    </div>
  );
};

export default NavbarLogged;
