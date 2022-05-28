import React, { useState } from "react";
import {
  Card,
  Icon,
  Image,
  Divider,
  Segment,
  Button,
  Popup,
  Header,
  Modal,
} from "semantic-ui-react";
import PostComments from "./PostComments";
import CommentInputField from "./CommentInputField";
import calculateTime from "../../utils/calculateTime";
import Link from "next/link";
import { deletePost, likePost } from "../../utils/postActions";
import LikesList from "./LikesList";
import ImageModal from "./ImageModal";
import NoImageModal from "./NoImageModal";

// minimize post box
import { FiPlus, FiMinus } from "react-icons/fi";
import classes from "./CreatePost.module.css";

const CardPost = React.forwardRef(
  ({ post, user, setPosts, setShowToastr, toggleMinimize, index }, ref) => {
    const [likes, setLikes] = useState(post.likes);

    const isLiked =
      likes.length > 0 &&
      likes.filter((like) => like.user === user._id).length > 0;

    const [comments, setComments] = useState(post.comments);

    const [error, setError] = useState(null);

    const [showModal, setShowModal] = useState(false);

    const addPropsToModal = () => ({
      post,
      user,
      setLikes,
      likes,
      isLiked,
      comments,
      setComments,
    });

    return (
      <>
        <div className={`${classes.container} containerBox`}>
          {toggleMinimize && (
            <div
              className={classes.minimizeContainer}
              onClick={() => toggleMinimize(post._id, index)}
            >
              {!post.minimize ? (
                <FiMinus className={classes.minimizeIcon} />
              ) : (
                <FiPlus className={classes.minimizeIcon} />
              )}
              {post.minimize && (
                <div className={`${classes.oneLiner} colorP`}>
                  <Link href={`/${post.user.username}`}>
                    <a>{post.user.name}</a>
                  </Link>
                  <p>{calculateTime(post.createdAt)}</p>
                </div>
              )}
            </div>
          )}

          {showModal && (
            <Modal
              open={showModal}
              closeIcon
              closeOnDimmerClick
              onClose={() => setShowModal(false)}
            >
              <Modal.Content>
                {post.picUrl ? (
                  <ImageModal {...addPropsToModal()} />
                ) : (
                  <NoImageModal {...addPropsToModal()} />
                )}
              </Modal.Content>
            </Modal>
          )}

          <div
            className={`${!post.minimize && classes.show} ${classes.minimize}`}
          >
            {/* {!post.minimize && ( */}
            <Segment basic>
              <Card color="teal" fluid>
                {post.picUrl && (
                  <div style={{}}>
                    <img
                      onClick={() => setShowModal(true)}
                      alt="Post Image"
                      src={post.picUrl}
                      style={{
                        cursor: "pointer",
                        maxHeight: "400px",
                        width: "auto",
                      }}
                    />
                    {/* <Image
                      src={post.picUrl}
                      style={{ cursor: "pointer" }}
                      floated="left"
                      wrapped
                      ui={false}
                      alt="PostImage"
                      onClick={() => setShowModal(true)}
                    /> */}
                  </div>
                )}

                <Card.Content>
                  <Image
                    floated="left"
                    src={post.user.profilePicUrl}
                    avatar
                    circular
                  />

                  {(user.role === "root" || post.user._id === user._id) && (
                    <>
                      <Popup
                        on="click"
                        position="top right"
                        trigger={
                          <Image
                            src="/deleteIcon.svg"
                            style={{ cursor: "pointer" }}
                            size="mini"
                            floated="right"
                          />
                        }
                      >
                        <Header as="h4" content="Delete this post?" />
                        {/* <p>This action is irreversible!</p> */}

                        <Button
                          color="red"
                          icon="trash"
                          content="Delete"
                          onClick={() =>
                            deletePost(post._id, setPosts, setShowToastr)
                          }
                        />
                      </Popup>
                    </>
                  )}

                  <Card.Header>
                    <Link href={`/${post.user.username}`}>
                      <a>{post.user.name}</a>
                    </Link>
                  </Card.Header>

                  <Card.Meta style={{ color: "#5D5C5C" }}>
                    {calculateTime(post.createdAt)}
                  </Card.Meta>

                  {post.location && <Card.Meta content={post.location} />}

                  <Card.Description
                    style={{
                      fontSize: "17px",
                      letterSpacing: "0.1px",
                      wordSpacing: "0.35px",
                    }}
                  >
                    {post.text}
                  </Card.Description>
                </Card.Content>

                <Card.Content extra>
                  <Icon
                    name={isLiked ? "heart" : "heart outline"}
                    color="red"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      likePost(
                        post._id,
                        user._id,
                        setLikes,
                        isLiked ? false : true
                      )
                    }
                  />

                  <LikesList
                    postId={post._id}
                    trigger={
                      likes.length > 0 && (
                        <span className="spanLikesList">
                          {`${likes.length} ${
                            likes.length === 1 ? "like" : "likes"
                          }`}
                        </span>
                      )
                    }
                  />

                  <Icon
                    name="comment outline"
                    style={{ marginLeft: "7px" }}
                    color="blue"
                  />

                  {comments.length > 0 &&
                    comments.map(
                      (comment, i) =>
                        i < 3 && (
                          <PostComments
                            key={comment._id}
                            comment={comment}
                            postId={post._id}
                            user={user}
                            setComments={setComments}
                          />
                        )
                    )}

                  {comments.length > 3 && (
                    <Button
                      content="View More"
                      color="teal"
                      basic
                      circular
                      onClick={() => setShowModal(true)}
                    />
                  )}

                  <Divider hidden />

                  <CommentInputField
                    user={user}
                    postId={post._id}
                    setComments={setComments}
                  />
                </Card.Content>
              </Card>
            </Segment>
            {/* )} */}
          </div>
          <Divider hidden />
        </div>
      </>
    );
  }
);

export default CardPost;
