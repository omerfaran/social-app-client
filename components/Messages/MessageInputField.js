import React, { useState } from "react";
import { Form, Segment } from "semantic-ui-react";
import classes from "./MessageInputField.module.css";

function MessageInputField({ sendMsg, width }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div
      className={classes.messageBox}
      style={{ position: "sticky", bottom: "0" }}
    >
      <Segment secondary attached="bottom">
        <Form
          reply
          onSubmit={(e) => {
            e.preventDefault();
            sendMsg(text);
            setText("");
          }}
        >
          <Form.Input
            size={width > 390 ? "large" : "small"}
            placeholder="Send New Message"
            value={text}
            onChange={(e) => setText(e.target.value)}
            action={{
              color: "blue",
              icon: "telegram plane",
              disabled: text === "",
              loading: loading,
            }}
          />
        </Form>
      </Segment>
    </div>
  );
}

export default MessageInputField;
