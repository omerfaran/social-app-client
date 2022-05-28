import Head from "next/head";
import App from "next/app";
import { useRouter } from "next/router";
import axios from "axios";
import { parseCookies, destroyCookie } from "nookies";
import baseUrl from "../utils/baseUrl";
import { redirectUser } from "../utils/authUser";
import Layout from "../components/Layout/Layout";
import "semantic-ui-css/semantic.min.css";
// import HeadTags from "../components/Layout/HeadTags";
import SidebarContext from "../components/Layout/context/sidebar-state";
import UserContext from "../components/context/user-context";

import "../public/styles.css";
import "../public/listMessages.css";
import { Component, useState, useContext, useEffect } from "react";

function MyApp({ Component, appContext }) {
  const [sidebar, setsidebar] = useState(false);
  const [user, setUser] = useState({});
  const [aboutModal, setAboutModal] = useState(false);
  const [width, setWidth] = useState(null);
  const ctx = useContext(UserContext);
  const togglesidebar = () => {
    setsidebar(!sidebar);
  };
  // const updateUser = (updatedUser) => {
  //   setUser(updatedUser);
  // };
  useEffect(() => {
    const props = { ...appContext.pageProps };
    if (props.profile) {
      const profilePicUrl = props.profile.user.profilePicUrl;
      const bio = props.profile.bio;
      setUser({ profilePicUrl, bio });
    }
  }, [appContext]);
  useEffect(() => {
    setWidth(window.innerWidth);
    // alert(window.innerWidth, "haveri");
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, []);

  return (
    <>
      <UserContext.Provider
        value={{ user, setUser, aboutModal, setAboutModal }}
      >
        <SidebarContext.Provider
          value={{ sidebarOpen: sidebar, togglesidebar }}
        >
          <Layout width={width} {...appContext} {...appContext.pageProps}>
            <Component
              width={width}
              {...appContext}
              {...appContext.pageProps}
            />
          </Layout>
        </SidebarContext.Provider>
      </UserContext.Provider>
    </>
  );
}

MyApp.getInitialProps = async (context) => {
  const appContext = await App.getInitialProps(context);
  const ctx = context.ctx;
  const { token } = parseCookies(ctx);
  const protectedRoutes =
    ctx.pathname === "/" ||
    ctx.pathname === "/[username]" ||
    ctx.pathname === "/notifications" ||
    ctx.pathname === "/post/[postId]" ||
    ctx.pathname === "/messages" ||
    ctx.pathname === "/search";
  if (!token) {
    protectedRoutes && redirectUser(ctx, "/login");
  }
  //
  else {
    try {
      const getFollowingData =
        ctx.pathname === "/notifications" || ctx.pathname === "/[username]";
      const res = await axios.get(`${baseUrl}/api/auth`, {
        headers: { Authorization: token, getFollowingData },
        params: { getFollowingData },
      });
      const { user, userFollowStats } = res.data;
      if (user) !protectedRoutes && redirectUser(ctx, "/");
      // HAVERI BRING BACK
      appContext.user = user;
      appContext.userFollowStats = userFollowStats;
    } catch (error) {
      destroyCookie(ctx, "token");
      redirectUser(ctx, "/login");
    }
  }
  return { appContext };
};

export default MyApp;

// class MyApp extends App {
//   static async getInitialProps({ Component, router, ctx }) {
//     let pageProps = {};
//     const isAuthenticated = await (process.browser
//       ? Auth0Client.clientAuth()
//       : Auth0Client.serverAuth(ctx.req));

//     console.log("isAuthenticated: ", isAuthenticated);

//     if (Component.getInitialProps) pageProps = await App.getInitialProps(ctx);

//     const auth = { isAuthenticated };
//     return { pageProps, auth };
//   }

//   render() {
//     const { Component } = this.props;
//     return <Component auth={this.props.auth} />;
//   }
// }
