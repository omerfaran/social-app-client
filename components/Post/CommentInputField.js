import React, { useState } from "react";
import { Form } from "semantic-ui-react";
import { postComment } from "../../utils/postActions";
import classes from "./CommonInputField.module.css";

function CommentInputField({ postId, user, setComments }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <Form
      className={classes.formBoxWidth}
      // style={{ width: "180px", marginRight: "12px" }}
      reply
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        await postComment(postId, user, text, setComments, setText);

        setLoading(false);
      }}
    >
      <Form.Input
        className={classes.formInput}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add Comment"
        action={{
          color: "blue",
          icon: "edit",
          loading: loading,
          disabled: text === "" || loading,
        }}
      />
    </Form>
  );
}

export default CommentInputField;
