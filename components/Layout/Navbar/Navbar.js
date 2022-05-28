import React, { useState } from "react";
// import {Nav, NavMenu, NavLink, NavBtn, NavBtnLink, Bars, Logo} from './Navbar.module.c'
import { useRouter } from "next/router";
import Link from "next/link";

import classes from "./Navbar.module.css";

import { FaBars } from "react-icons/fa";
import { GiBeech } from "react-icons/gi";
import AboutModal from "../../Home/AboutModal";
// import Link from 'next/link'

const Navbar = ({ toggle }) => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <>
      {showModal && (
        <AboutModal modalClose={closeModal} showModal={showModal} />
      )}
      <nav className={classes.nav}>
        <Link href="/">
          <a>
            <GiBeech className={classes.logo} />
          </a>
        </Link>
        <FaBars className={classes.bars} onClick={toggle} />
        {/* <div className={classes.navMenu}>
          <Link href="/about" activeStyle>
            <a className={classes.navLink}>Abouthh</a>
          </Link>
          <Link href="/signup" activeStyle>
            Sign Up
          </Link>
        </div> */}
        <nav className={classes.navBtn}>
          {/* <Link href="/signup"> */}
          <a onClick={openModal} className={classes.navBtnLink}>
            Demo
          </a>
          {/* </Link> */}
        </nav>
      </nav>
    </>
  );
};

export default Navbar;
