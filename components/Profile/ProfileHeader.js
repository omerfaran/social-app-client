import React, { useState } from "react";
import {
  Segment,
  Image,
  Grid,
  Divider,
  Header,
  Button,
  List,
} from "semantic-ui-react";
import { followUser, unfollowUser } from "../../utils/profileActions";
import classes from "./ProfileHeader.module.css";

function ProfileHeader({
  profile,
  ownAccount,
  loggedUserFollowStats,
  setUserFollowStats,
}) {
  const [loading, setLoading] = useState(false);

  const isFollowing =
    loggedUserFollowStats.following.length > 0 &&
    loggedUserFollowStats.following.filter(
      (following) => following.user === profile._id
    ).length > 0;

  return (
    <>
      <div className={classes.container}>
        {/* <Segment> */}

        <Grid stackable>
          <Grid.Column width={10}>
            <Grid.Row>
              <Header
                as="h2"
                content={profile.fullName}
                style={{ marginBottom: "5px" }}
              />
            </Grid.Row>

            <Grid.Row stretched style={{ marginTop: "1rem" }}>
              {profile.bio}
              <Divider hidden />
            </Grid.Row>

            {/* <Grid.Row>
              {profile.social ? (
                <List>
                  <List.Item>
                    <List.Icon name="mail" />
                    <List.Content content={profile.user.email} />
                  </List.Item>

                  {profile.social.facebook && (
                    <List.Item>
                      <List.Icon name="facebook" color="blue" />
                      <List.Content
                        style={{ color: "blue" }}
                        content={profile.social.facebook}
                      />
                    </List.Item>
                  )}

                  {profile.social.instagram && (
                    <List.Item>
                      <List.Icon name="instagram" color="red" />
                      <List.Content
                        style={{ color: "blue" }}
                        content={profile.social.instagram}
                      />
                    </List.Item>
                  )}

                  {profile.social.youtube && (
                    <List.Item>
                      <List.Icon name="youtube" color="red" />
                      <List.Content
                        style={{ color: "blue" }}
                        content={profile.social.youtube}
                      />
                    </List.Item>
                  )}

                  {profile.social.twitter && (
                    <List.Item>
                      <List.Icon name="twitter" color="blue" />
                      <List.Content
                        style={{ color: "blue" }}
                        content={profile.social.twitter}
                      />
                    </List.Item>
                  )}
                </List>
              ) : (
                // <>No Social Media Links </>
                <> </>
              )}
            </Grid.Row> */}
          </Grid.Column>

          <Grid.Column width={6} stretched style={{ textAlign: "center" }}>
            <Grid.Row>
              <Image
                size="large"
                avatar
                src={profile.profilePicUrl}
                style={{ maxHeight: "200px", maxWidth: "200px" }}
              />
            </Grid.Row>
            <br />

            {!ownAccount && (
              <Button
                compact
                loading={loading}
                disabled={loading}
                content={isFollowing ? "Following" : "Follow"}
                icon={isFollowing ? "check circle" : "add user"}
                color={isFollowing ? "instagram" : "twitter"}
                onClick={async () => {
                  setLoading(true);
                  isFollowing
                    ? await unfollowUser(profile._id, setUserFollowStats)
                    : await followUser(profile._id, setUserFollowStats);
                  setLoading(false);
                }}
              />
            )}
          </Grid.Column>
        </Grid>

        {/* </Segment> */}
      </div>
    </>
  );
}

export default ProfileHeader;
