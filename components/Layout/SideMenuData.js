import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const sidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "navText",
  },
  {
    title: "Notifications",
    path: "/Notifications",
    icon: <AiIcons.AiFillHome />,
    cName: "navText",
  },
  {
    title: "Messages",
    path: "/Messages",
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: "navText",
  },
  //   {
  //     title: "Account",
  //     path: `/${username}`,
  //     icon: <AiIcons.AiFillHome />,
  //     cName: "navText",
  //   },
];
