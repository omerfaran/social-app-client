import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import classes from "../styles/signup.module.css";
import {
  Form,
  Button,
  Message,
  Segment,
  Divider,
  Grid,
} from "semantic-ui-react";
// import CommonInputs from "../components/Common/CommonInputs";
import ImageDropDiv from "../components/Common/ImageDropDiv";
import {
  HeaderMessage,
  FooterMessage,
} from "../components/Common/WelcomeMessage";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import { registerUser } from "../utils/authUser";
import uploadPic from "../utils/uploadPicToCloudinary";
const regexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
let cancel;

function Signup() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
    facebook: "",
    youtube: "",
    twitter: "",
    instagram: "",
  });

  const { name, email, password, bio } = user;
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "media") {
      setMedia(files[0]);
      setMediaPreview(URL.createObjectURL(files[0]));
    }

    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const [showSocialLinks, setShowSocialLinks] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const [username, setUsername] = useState("");
  const [usernameLoading, setUsernameLoading] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(false);

  const [media, setMedia] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [highlighted, setHighlighted] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    const isUser = Object.values({ name, email, password }).every((item) =>
      Boolean(item)
    );
    isUser ? setSubmitDisabled(false) : setSubmitDisabled(true);
  }, [user]);

  const checkUsername = async () => {
    setUsernameLoading(true);
    try {
      cancel && cancel();

      const CancelToken = axios.CancelToken;

      const res = await axios.get(`${baseUrl}/api/signup/${username}`);

      if (errorMsg !== null) setErrorMsg(null);

      if (res.data === "Available") {
        setUsernameAvailable(true);
        setUser((prev) => ({ ...prev, username }));
      }
    } catch (error) {
      setErrorMsg("Username Not Available");
      setUsernameAvailable(false);
    }
    setUsernameLoading(false);
  };

  useEffect(() => {
    username === "" ? setUsernameAvailable(false) : checkUsername();
  }, [username]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    let profilePicUrl;
    if (media !== null) {
      profilePicUrl = await uploadPic(media);
    }

    if (media !== null && !profilePicUrl) {
      setFormLoading(false);
      return setErrorMsg("Error Uploading Image");
    }
    user.bio = ""; // initially bio will be empty
    await registerUser(
      user,
      profilePicUrl,
      setErrorMsg,
      setFormLoading,
      router
    );
  };
  useEffect(() => {}, []);
  return (
    <div>
      <HeaderMessage />
      <div className={classes.wrapperDivFlex} style={{}}>
        <div className={classes.videoContainer}>
          <video
            className={classes.videoBox}
            loop
            muted
            autoPlay
            src="/movie.mp4"
            type="video/mp4"
          />
        </div>
        <Form
          style={{ minWidth: "30vw" }}
          loading={formLoading}
          error={errorMsg !== null}
          onSubmit={handleSubmit}
          className={classes.formContainer}
        >
          <Message
            error
            header="Oops!"
            content={errorMsg}
            onDismiss={() => setErrorMsg(null)}
          />

          <Segment className={classes.segmentContainer}>
            {/* <ImageDropDiv
            mediaPreview={mediaPreview}
            setMediaPreview={setMediaPreview}
            setMedia={setMedia}
            inputRef={inputRef}
            highlighted={highlighted}
            setHighlighted={setHighlighted}
            handleChange={handleChange}
          /> */}
            <Form.Input
              required
              // label="Name"
              style={{ fontSize: "1.2rem" }}
              placeholder="Name"
              name="name"
              value={name}
              onChange={handleChange}
              fluid
              icon="user"
              iconPosition="left"
            />

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
              placeholder="New Password"
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

            <Form.Input
              style={{ fontSize: "1.2rem" }}
              loading={usernameLoading}
              error={!usernameAvailable}
              required
              // label="Username"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (regexUserName.test(e.target.value)) {
                  setUsernameAvailable(true);
                } else {
                  setUsernameAvailable(false);
                }
              }}
              fluid
              icon={usernameAvailable ? "check" : "close"}
              iconPosition="left"
            />

            {/* <CommonInputs
            user={user}
            showSocialLinks={showSocialLinks}
            setShowSocialLinks={setShowSocialLinks}
            handleChange={handleChange}
          /> */}

            {/* <Divider hidden /> */}
            <Grid>
              <Grid.Column textAlign="center">
                <Button
                  style={{ padding: "1rem 3rem" }}
                  icon="signup"
                  content="Signup"
                  type="submit"
                  color="green"
                  disabled={submitDisabled || !usernameAvailable}
                />
              </Grid.Column>
            </Grid>
          </Segment>
          <FooterMessage />
        </Form>
      </div>
    </div>
  );
}

export default Signup;
