import React, { createRef, useState, useEffect } from "react";
import Navbar from "./Navbar/Navbar";
import HeadTags from "./HeadTags";
import classes from "./Layout.module.css";

import {
  Container,
  Visibility,
  Grid,
  Sticky,
  Ref,
  Divider,
  Segment,
} from "semantic-ui-react";
import nprogress from "nprogress";
import Router, { useRouter } from "next/router";
import SideMenu from "./SideMenu";
import Search from "./Search";
import NavbarLogged from "./NavbarLogged";

function Layout({ children, user, width }) {
  const contextRef = createRef();
  const router = useRouter();

  const messagesRoute = router.pathname === "/messages";

  Router.onRouteChangeStart = () => nprogress.start();
  Router.onRouteChangeComplete = () => nprogress.done();
  Router.onRouteChangeError = () => nprogress.done();

  const [marginLeft, setMarginLeft] = useState(false);

  // always have the width of the window set

  const opensidebar = () => {
    setMarginLeft(!marginLeft);
  };

  let adaptLayoutToBar = classes.activeWide;
  let overlay = false;
  if (width <= 1500) {
    adaptLayoutToBar = null;
    overlay = true;
  }

  return (
    <>
      <HeadTags />
      {user ? (
        <div
          style={{
            marginLeft: "1rem",
            marginRight: "1rem",
          }}
        >
          <Ref innerRef={contextRef}>
            <Grid style={{ marginTop: 0 }}>
              {/* {!messagesRoute ? ( */}
              <>
                <NavbarLogged />
                {/* {children} */}
                <div style={{ marginTop: "80px" }}>
                  <Grid.Column floated="left" width={1}>
                    <Sticky context={contextRef}>
                      <SideMenu user={user} closeMenu={opensidebar} />
                    </Sticky>
                  </Grid.Column>
                  <div
                    style={{ padding: "1rem" }}
                    className={marginLeft ? adaptLayoutToBar : undefined}
                  >
                    <Grid.Column width={10}>
                      <Visibility context={contextRef}>
                        <div
                          className={
                            overlay && marginLeft ? classes.overlay : undefined
                          }
                        />

                        {children}
                      </Visibility>

                      {/* <Visibility context={contextRef}></Visibility> */}
                    </Grid.Column>
                  </div>
                </div>
              </>
              {/* ) : (
                <>
                  <Grid.Column floated="left" width={1} />
                  <Grid.Column width={15}>{children}</Grid.Column>
                </> */}
              {/* )} */}
            </Grid>
          </Ref>
        </div>
      ) : (
        <>
          <Navbar />
          <Container text style={{ paddingTop: "1rem" }}>
            {/* This way we can pass the width state to all children whoever they be */}
            {/* {React.cloneElement(children, { width: "j" })} */}
            {children}
          </Container>
        </>
      )}
    </>
  );
}

export default Layout;
