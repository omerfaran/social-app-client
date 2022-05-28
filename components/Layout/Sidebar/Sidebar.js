import React from "react";
import Link from "next/link";
import { FaTimes } from "react-icons/fa";
import classes from "Sidebar.module.css";
// import { SidebarContainer, Icon, CloseIcon, SidebarWrapper, SidebarMenu, SidebarLink, SideBtnWrap, SidebarRoute } from './SidebarElements'

const Sidebar = ({ isOpen, toggle }) => {
  return (
    <aside
      className={classes.sidebarContainer}
      style={{ opacity: isOpen ? "100%" : "0", top: isOpen ? "0" : "-100%" }}
      onClick={toggle}
    >
      <div className={classes.Icon}>
        <FaTimes style={{ color: "#fff" }} />
      </div>
      <div style={{ color: "#fff" }}>
        <ul className={classes.sidebarMenu}>
          <Link href="about">
            <a className={classes.sidebarLink}>About</a>
          </Link>
          <Link href="haveri">
            <a className={classes.sidebarLink}>About</a>
          </Link>
        </ul>
        <div className={sideBtnWrap}>
          <Link href="/Signin">
            <a className={classes.asidesidebarRoute}>About</a>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
