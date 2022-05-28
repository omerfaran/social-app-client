import React, { useState, useContext, useEffect } from "react";
import { List, Icon } from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { logoutUser } from "../../utils/authUser";
import { sidebarData } from "./SideMenuData";

import { FaBars } from "react-icons/fa";
import { GiBeech } from "react-icons/gi";
import * as AiIcons from "react-icons/ai";
import { MdAccountBox } from "react-icons/md";

import SidebarContext from "../Layout/context/sidebar-state";

import classes from "./SideMenu.module.css";

function SideMenu({
  user: { unreadNotification, email, unreadMessage, username },
  closeMenu,
}) {
  useEffect(() => {
    setsidebar(ctx.sidebarOpen);
  }, []);
  const router = useRouter();
  const [sidebar, setsidebar] = useState(false);

  const ctx = useContext(SidebarContext);
  const showsidebar = () => {
    setsidebar(!ctx.sidebarOpen);
    ctx.togglesidebar();
    closeMenu();
  };

  const isActive = (route) => router.pathname === route;

  return (
    <>
      <div className={classes.navbar} id="navbarColor">
        <a className={classes.refToggleBar}>
          <FaBars className={classes.menuBars} onClick={showsidebar} />
        </a>
      </div>
      <nav
        className={`${classes.navMenu} ${sidebar && classes.active}`}
        id="navbarColor"
      >
        <ul className={classes.navMenuItems}>
          <li className={classes.navbarToggle} id="navbarColor">
            <a className={classes.refToggleBar}>
              <AiIcons.AiOutlineClose
                className={classes.menuBars}
                onClick={showsidebar}
              />
            </a>
          </li>
          <li className={classes.navText}>
            <Link href={`/`}>
              <a className={classes.span}>
                <MdAccountBox />
                &nbsp;&nbsp; Home
              </a>
            </Link>
          </li>
          <li className={classes.navText}>
            <Link href={`/notifications`}>
              <a className={classes.span}>
                <MdAccountBox />
                &nbsp;&nbsp; Notifications
              </a>
            </Link>
          </li>
          <li className={classes.navText}>
            <Link href={`/messages`}>
              <a className={classes.span}>
                <MdAccountBox />
                &nbsp;&nbsp; Messages
              </a>
            </Link>
          </li>
          {/* {sidebarData.map((item, i) => {
            return (
              <li key={i} className={classes[item.cName]}>
                <Link href={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })} */}
          {/* Account + Logout */}
          <li className={classes.navText}>
            <Link className={classes.haveri} href={`/${username}`}>
              <a className={classes.span}>
                <MdAccountBox />
                &nbsp;&nbsp; Account
              </a>
            </Link>
          </li>
          <li className={classes.navText}>
            <div
              className={classes.logout}
              onClick={() => logoutUser(email, router)}
            >
              <a className={classes.span}>
                <MdAccountBox />
                &nbsp;&nbsp; Logout
              </a>
            </div>
          </li>
          {/* <List.Item onClick={() => logoutUser(email, router)}>
            <Icon name="log out" size="large" />
            <List.Content>
              <List.Header content="Logout" />
            </List.Content>
          </List.Item> */}
        </ul>
      </nav>
    </>
  );
}

export default SideMenu;

// return (
//   <>
//     <List
//       style={{ paddingTop: "1rem" }}
//       size="big"
//       verticalAlign="middle"
//       selection
//     >
//       <Link href="/">
//         <List.Item active={isActive("/")}>
//           <Icon
//             name="home"
//             size="large"
//             {...(isActive("/") && { color: "teal" })}
//           />
//           <List.Content>
//             <List.Header content="Home" />
//           </List.Content>
//         </List.Item>
//       </Link>
//       <br />

//       <Link href="/messages">
//         <List.Item active={isActive("/messages")}>
//           <Icon
//             name={unreadMessage ? "hand point right" : "mail outline"}
//             size="large"
//             {...((isActive("/messages") && { color: "teal" }) ||
//               (unreadMessage && { color: "orange" }))}
//           />
//           <List.Content>
//             <List.Header content="Messages" />
//           </List.Content>
//         </List.Item>
//       </Link>
//       <br />

//       <Link href="/notifications">
//         <List.Item active={isActive("/notifications")}>
//           <Icon
//             name={unreadNotification ? "hand point right" : "bell outline"}
//             size="large"
//             {...((isActive("/notifications") && { color: "teal" }) ||
//               (unreadNotification && { color: "orange" }))}
//           />
//           <List.Content>
//             <List.Header content="Notifications" />
//           </List.Content>
//         </List.Item>
//       </Link>
//       <br />

//       <Link href={`/${username}`}>
//         <List.Item active={router.query.username === username}>
//           <Icon
//             name="user"
//             size="large"
//             {...(router.query.username === username && { color: "teal" })}
//           />
//           <List.Content>
//             <List.Header content="Account" />
//           </List.Content>
//         </List.Item>
//       </Link>
//       <br />

//       <List.Item onClick={() => logoutUser(email)}>
//         <Icon name="log out" size="large" />
//         <List.Content>
//           <List.Header content="Logout" />
//         </List.Content>
//       </List.Item>
//     </List>
//   </>
