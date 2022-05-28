import React, { useState, useEffect, useReducer, useContext } from "react";
import {
  Form,
  Button,
  Message,
  Segment,
  Divider,
  Grid,
} from "semantic-ui-react";
import { loginUser } from "../utils/authUser";
import {
  HeaderMessage,
  FooterMessage,
} from "../components/Common/WelcomeMessage";
import cookie from "js-cookie";
import AboutModal from "../components/Home/AboutModal";
import UserContext from "../components/context/user-context";

const reducer = (state, action) => {
  let valid = false;

  if (action.type === "TIMEOUT") {
    if (state.modalNotShown) valid = true;
    return { ...state, timeout: true, showModal: valid };
  }
  if (action.type === "MODAL_SHOWN") {
    if (state.timeout) valid = true;
    return { ...state, modalNotShown: true, showModal: valid };
  }
  if (action.type === "CLOSE_MODAL") {
    return { modalNotShown: false, showModal: false, timeout: true };
  }
};

function Login() {
  const profileCtx = useContext(UserContext);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [aboutModalReducer, dispatch] = useReducer(reducer, {
    modalNotShown: true,
    timeout: false,
    showModal: false,
  });

  const { email, password } = user;
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  // const [aboutModalShown, setAboutModalShown] = useState(false);
  // const [timeoutAboutModal, setTimeoutAboutModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (!profileCtx.aboutModal) {
      setTimeout(() => {
        profileCtx.setAboutModal(true);
        dispatch({ type: "TIMEOUT" });
      }, 2000);
    }
  }, []);

  useEffect(() => {
    const isUser = Object.values({ email, password }).every((item) =>
      Boolean(item)
    );
    isUser ? setSubmitDisabled(false) : setSubmitDisabled(true);
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await loginUser(user, setErrorMsg, setFormLoading);
  };

  const modalClose = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  useEffect(() => {
    document.title = "Welcome Back";
    const userEmail = cookie.get("userEmail");
    if (userEmail) setUser((prev) => ({ ...prev, email: userEmail })); // automatically fill out the email in the input if it's set in cookie
  }, []);

  return (
    <>
      {aboutModalReducer.showModal && (
        <AboutModal
          modalClose={modalClose}
          showModal={aboutModalReducer.showModal}
        />
      )}
      <HeaderMessage />
      <Form
        loading={formLoading}
        error={errorMsg !== null}
        onSubmit={handleSubmit}
      >
        <Message
          error
          header="Oops!"
          content={errorMsg}
          onDismiss={() => setErrorMsg(null)}
        />

        <Segment>
          <Form.Input
            style={{ fontSize: "1.2rem" }}
            required
            // label="Email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={handleChange}
            fluid
            icon="envelope"
            iconPosition="left"
            type="email"
          />

          <Form.Input
            style={{ fontSize: "1.2rem" }}
            // label="Password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange}
            fluid
            icon={{
              name: "eye",
              circular: true,
              link: true,
              onClick: () => setShowPassword(!showPassword),
            }}
            iconPosition="left"
            type={showPassword ? "text" : "password"}
            required
          />

          {/* <Divider hidden /> */}
          <Grid>
            <Grid.Column textAlign="center">
              <Button
                style={{ padding: "1rem 3rem" }}
                icon="signup"
                content="Login"
                type="submit"
                color="orange"
                disabled={submitDisabled}
              />
            </Grid.Column>
          </Grid>
        </Segment>
      </Form>

      <FooterMessage />
    </>
  );
}

export default Login;
