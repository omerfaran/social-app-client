import React, { useState } from "react";
import { Comment, Icon, Image } from "semantic-ui-react";
import calculateTime from "../../utils/calculateTime";
import { deleteComment } from "../../utils/postActions";

function PostComments({ comment, user, setComments, postId }) {
  const [disabled, setDisabled] = useState(false);

  return (
    <>
      <Comment.Group>
        <Comment>
          {/* <Comment.Avatar src={comment.user.profilePicUrl} /> */}
          <Image
            floated="left"
            src={comment.user.profilePicUrl}
            avatar
            circular
            style={{ width: "30px", height: "30px", borderRadius: "50%" }}
          />
          <Comment.Content>
            <Comment.Author
              style={{ color: "#605F5F" }}
              as="a"
              href={`/${comment.user.username}`}
            >
              {comment.user.name}
            </Comment.Author>
            <Comment.Metadata>
              <p className="colorP">{calculateTime(comment.date)}</p>
            </Comment.Metadata>
            <Comment.Action>
              {(user.role === "root" || comment.user._id === user._id) && (
                <Icon
                  style={{ paddingLeft: "1rem" }}
                  disabled={disabled}
                  color="red"
                  name="trash"
                  onClick={async () => {
                    setDisabled(true);
                    await deleteComment(postId, comment._id, setComments);
                    setDisabled(false);
                  }}
                />
              )}
            </Comment.Action>

            <Comment.Text>{comment.text}</Comment.Text>

            {/* <Comment.Actions></Comment.Actions> */}
          </Comment.Content>
        </Comment>
      </Comment.Group>
    </>
  );
}

export default PostComments;
