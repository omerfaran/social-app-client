import React, { useState, useRef, useContext } from "react";
import {
  Form,
  Button,
  Message,
  Divider,
  Grid,
  GridColumn,
} from "semantic-ui-react";
import ToastSuccess from "../Layout/Toast/Success";
import ImageDropDiv from "../Common/ImageDropDiv";
import CommonInputs from "../Common/CommonInputs";
import uploadPic from "../../utils/uploadPicToCloudinary";
import { profileUpdate } from "../../utils/profileActions";
import SidebarContext from "../Layout/context/sidebar-state";
import classes from "./UpdateProfile.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "../context/user-context";

function UpdateProfile({ Profile, width }) {
  const profileCtx = useContext(UserContext);
  const [profile, setProfile] = useState({
    profilePicUrl: profileCtx.user.profilePicUrl,
    bio: profileCtx.user.bio || "",
    // facebook: (Profile.social && Profile.social.facebook) || "",
    // youtube: (Profile.social && Profile.social.youtube) || "",
    // instagram: (Profile.social && Profile.social.instagram) || "",
    // twitter: (Profile.social && Profile.social.twitter) || "",
  });
  const ctx = useContext(SidebarContext);

  const [errorMsg, setErrorMsg] = useState(null);

  const [loading, setLoading] = useState(false);
  const [showSocialLinks, setShowSocialLinks] = useState(false);

  const [highlighted, setHighlighted] = useState(false);
  const inputRef = useRef();
  const [media, setMedia] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "media") {
      setMedia(files[0]);
      setMediaPreview(URL.createObjectURL(files[0]));
    }
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Grid className={classes.centered}>
        <Form
          error={errorMsg !== null}
          loading={loading}
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);

            let profilePicUrl;

            if (media !== null) {
              profilePicUrl = await uploadPic(media);
              setProfile((prev) => ({ ...prev, profilePicUrl }));
            }

            if (media !== null && !profilePicUrl) {
              setLoading(false);
              return setErrorMsg("Error, try a smaller file");
            }

            await profileUpdate(
              profile,
              setLoading,
              setErrorMsg,
              profileCtx.setUser,
              profilePicUrl
            );
            toast(<ToastSuccess>Profile Updated!</ToastSuccess>);
          }}
        >
          <Message
            onDismiss={() => setErrorMsg(false)}
            error
            content={errorMsg}
            attached
            header="Oops!"
          />
          <div className={classes.row}>
            <div className={classes.container}>
              <div className={classes.title}>
                <h1>Set Your Profile Pic</h1>
              </div>
              <ImageDropDiv
                width={width}
                inputRef={inputRef}
                highlighted={highlighted}
                setHighlighted={setHighlighted}
                handleChange={handleChange}
                mediaPreview={mediaPreview}
                setMediaPreview={setMediaPreview}
                setMedia={setMedia}
                profilePicUrl={profileCtx.user.profilePicUrl}
              />
            </div>
            <div className={`${classes.container} ${classes.bio}`}>
              <div className={classes.title} style={{ marginBottom: "2rem" }}>
                <h1>Write Something About Yourself</h1>
              </div>
              <CommonInputs
                bio={profile.bio}
                handleChange={handleChange}
                showSocialLinks={showSocialLinks}
                setShowSocialLinks={setShowSocialLinks}
              />
            </div>
            <div
              style={{ backgroundColor: "transparent", position: "relative" }}
            >
              {!ctx.sidebarOpen && (
                <img src="/update-profile.png" className={classes.image} />
              )}
            </div>
          </div>
          <Divider hidden />

          <Button
            color="blue"
            icon="pencil alternate"
            disabled={profile.bio === "" || loading}
            content="Submit"
            type="submit"
          />
          <Divider hidden />
        </Form>
      </Grid>

      <ToastContainer
        closeButton={false}
        position="bottom-left"
        hideProgressBar
        autoClose={2500}
      />
    </>
  );
}

export default UpdateProfile;
