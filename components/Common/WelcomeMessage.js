import { Icon, Message, Grid, Divider } from "semantic-ui-react";
import { useRouter } from "next/router";
import Link from "next/link";

export const HeaderMessage = () => {
  const router = useRouter();
  const signupRoute = router.pathname === "/signup";

  return (
    // <Message
    //   color="teal"
    //   attached
    //   header={signupRoute ? "Get Started" : "Welcome Back"}
    //   icon={signupRoute ? "settings" : "privacy"}
    //   content={signupRoute ? "Create New Account" : "Login with Email and Password"}
    // />
    <>
      <Divider hidden />
      <h1 className="headerMiddle">
        {signupRoute ? "Sign Up!" : "Welcome Back!"}
      </h1>
      <Divider hidden />
    </>
  );
};

export const FooterMessage = () => {
  const router = useRouter();
  const signupRoute = router.pathname === "/signup";

  return (
    <>
      <Divider hidden />
      {signupRoute ? (
        <>
          <Grid>
            <Grid.Column style={{ textAlign: "center" }} attached="bottom">
              {/* <Icon name="help" /> */}
              Existing User? <Link href="/login">Login Here Instead</Link>
            </Grid.Column>
          </Grid>
          <Divider hidden />
        </>
      ) : (
        <>
          <Message style={{ textAlign: "center" }} attached="bottom" info>
            <Icon name="lock" />
            <Link href="/reset">Forgot Password?</Link>
          </Message>

          <Grid>
            <Grid.Column style={{ textAlign: "center" }} attached="bottom">
              {/* <Icon name="help" /> */}
              New User? <Link href="/signup">Signup Here</Link> Instead{" "}
            </Grid.Column>
          </Grid>
          <Divider hidden />
        </>
      )}
    </>
  );
};
