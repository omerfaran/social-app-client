import React, { useState } from "react";
import {
  Form,
  Modal,
  Segment,
  List,
  TransitionablePortal,
} from "semantic-ui-react";
import Link from "next/link";
import calculateTime from "../../utils/calculateTime";

function MessageNotificationModal({
  socket,
  showNewMessageModal,
  newMessageModal,
  newMessageReceived,
  user,
}) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const onModalClose = () => showNewMessageModal(false);

  const formSubmit = (e) => {
    e.preventDefault();

    if (socket.current) {
      socket.current.emit("sendMsgFromNotification", {
        userId: user._id,
        msgSendToUserId: newMessageReceived.sender,
        msg: text,
      });

      socket.current.on("msgSentFromNotification", () => {
        showNewMessageModal(false);
      });
    }
  };

  return (
    <>
      <TransitionablePortal
        open={newMessageModal}
        transition={{ animation: "scale", duration: 300 }}
      >
        <Modal
          size="small"
          open={true}
          onClose={onModalClose}
          closeIcon
          closeOnDimmerClick
        >
          <Modal.Header
            content={
              <span>{`New Message from ${newMessageReceived.senderName}`}</span>
            }
          />

          <Modal.Content>
            <div className="bubbleWrapper">
              <img
                style={{ position: "absolute", right: 0, top: 0 }}
                className="inlineIcon"
                src={newMessageReceived.senderProfilePic}
              />
              <div className="inlineContainer"></div>

              <div className="otherBubble other">{newMessageReceived.msg}</div>

              <span className="other">
                {calculateTime(newMessageReceived.date)}
              </span>
            </div>

            <div style={{ position: "sticky", bottom: "0px" }}>
              <Segment secondary color="teal" attached="bottom">
                <Form reply onSubmit={formSubmit}>
                  <Form.Input
                    size="large"
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

            <div style={{ marginTop: "5px" }}>
              <Link href={`/messages?message=${newMessageReceived.sender}`}>
                <a>View All Messages</a>
              </Link>

              <br />

              {/* <Instructions username={user.username} /> */}
            </div>
          </Modal.Content>
        </Modal>
      </TransitionablePortal>
    </>
  );
}

const Instructions = ({ username }) => (
  <List>
    {/* <List.Item>
      <Icon name="hand point right" />
      <List.Content>
        You can disable it by going to
        <Link href={`/${username}`}>
          <a> Account </a>
        </Link>
        Page and clicking on Settings Tab.
      </List.Content>
    </List.Item>

    <List.Item>
      <Icon name="hand point right" />
      Inside the menu,there is an setting named: Show New Message Popup?
    </List.Item>

    <List.Item>
      <Icon name="hand point right" />
      Just toggle the setting to disable/enable the Message Popup to appear.
    </List.Item> */}
  </List>
);

export default MessageNotificationModal;
