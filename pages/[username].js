import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import { parseCookies } from "nookies";
import { Grid } from "semantic-ui-react";
import { NoProfile } from "../components/Layout/NoData";
import CardPost from "../components/Post/CardPost";
import cookie from "js-cookie";
import { PlaceHolderPosts } from "../components/Layout/PlaceHolderGroup";
import ProfileMenuTabs from "../components/Profile/ProfileMenuTabs";
import ProfileHeader from "../components/Profile/ProfileHeader";
import Followers from "../components/Profile/Followers";
import Following from "../components/Profile/Following";
import UpdateProfile from "../components/Profile/UpdateProfile";
import Settings from "../components/Profile/Settings";
import { PostDeleteToastr } from "../components/Layout/Toastr";
import { redirectUser } from "../utils/authUser";

import UserContext from "../components/context/user-context";

function ProfilePage({
  width,
  errorLoading,
  profile,
  followersLength,
  followingLength,
  user,
  userFollowStats,
}) {
  const router = useRouter();
  const profileCtx = useContext(UserContext);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showToastr, setShowToastr] = useState(false);

  const [activeItem, setActiveItem] = useState("profile");
  const handleItemClick = (clickedTab) => setActiveItem(clickedTab);

  const [loggedUserFollowStats, setUserFollowStats] = useState(userFollowStats);

  const ownAccount = profile.user._id === user._id;

  if (errorLoading) return <NoProfile />;

  useEffect(() => {
    if (router.query && router.query.editProfile) {
      setActiveItem("updateProfile");
    }
    const getPosts = async () => {
      setLoading(true);

      try {
        const { username } = router.query;
        const res = await axios.get(
          `${baseUrl}/api/profile/posts/${username}`,
          {
            headers: { Authorization: cookie.get("token") },
          }
        );

        setPosts(res.data);
      } catch (error) {
        alert("Error Loading Posts");
      }

      setLoading(false);
    };
    getPosts();
  }, [router.query.username]);

  useEffect(() => {
    showToastr && setTimeout(() => setShowToastr(false), 4000);
  }, [showToastr]);

  return (
    <>
      {showToastr && <PostDeleteToastr />}

      <Grid stackable>
        <Grid.Row>
          <Grid.Column>
            <ProfileMenuTabs
              width={width}
              activeItem={activeItem}
              handleItemClick={handleItemClick}
              followersLength={followersLength}
              followingLength={followingLength}
              ownAccount={ownAccount}
              loggedUserFollowStats={loggedUserFollowStats}
            />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
            {activeItem === "profile" && (
              <>
                <ProfileHeader
                  profile={{
                    profilePicUrl: profileCtx.user.profilePicUrl,
                    fullName: profile.user.name,
                    bio: profileCtx.user.bio,
                    _id: profile.user._id,
                  }}
                  ownAccount={ownAccount}
                  loggedUserFollowStats={loggedUserFollowStats}
                  setUserFollowStats={setUserFollowStats}
                />

                {loading ? (
                  <PlaceHolderPosts />
                ) : posts.length > 0 ? (
                  posts.map((post) => (
                    <CardPost
                      key={post._id}
                      post={post}
                      user={user}
                      setPosts={setPosts}
                      setShowToastr={setShowToastr}
                    />
                  ))
                ) : (
                  <></>
                  // <NoProfilePosts />
                )}
              </>
            )}

            {activeItem === "followers" && (
              <Followers
                user={user}
                loggedUserFollowStats={loggedUserFollowStats}
                setUserFollowStats={setUserFollowStats}
                profileUserId={profile.user._id}
              />
            )}

            {activeItem === "following" && (
              <Following
                user={user}
                loggedUserFollowStats={loggedUserFollowStats}
                setUserFollowStats={setUserFollowStats}
                profileUserId={profile.user._id}
              />
            )}

            {activeItem === "updateProfile" && (
              <UpdateProfile width={width} Profile={profile} />
            )}

            {activeItem === "settings" && (
              <Settings newMessagePopup={user.newMessagePopup} />
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
}

ProfilePage.getInitialProps = async (ctx) => {
  try {
    const { username } = ctx.query;
    const { token } = parseCookies(ctx);

    const res = await axios.get(`${baseUrl}/api/profile/${username}`, {
      headers: { Authorization: token },
    });

    const { profile, followersLength, followingLength } = res.data;
    return { profile, followersLength, followingLength };
  } catch (error) {
    // Coudn't fetch user in browser query, so let's redirect to home page
    redirectUser(ctx, "/");
    // return { errorLoading: true };
  }
};

export default ProfilePage;
