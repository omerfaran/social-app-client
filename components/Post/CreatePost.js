import React, { useState, useRef } from "react";
import { Form, Button, Image, Divider, Message, Icon } from "semantic-ui-react";
import uploadPic from "../../utils/uploadPicToCloudinary";
import { submitNewPost } from "../../utils/postActions";

import classes from "./CreatePost.module.css";

function CreatePost({ user, setPosts }) {
  const [newPost, setNewPost] = useState({ text: "", location: "" });
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();

  const [error, setError] = useState(null);
  const [highlighted, setHighlighted] = useState(false);

  const [media, setMedia] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // var binaryData = [];
    // binaryData.push(data);
    // window.URL.createObjectURL(
    //   new Blob(binaryData, { type: "application/zip" })
    // );

    if (name === "media") {
      setMedia(files[0]);
      // var binaryData = [];
      // binaryData.push(files[0]);
      // setMediaPreview(URL.createObjectURL(files[0]));
      setMediaPreview(URL.createObjectURL(files[0]));
    }

    // if (name === "media") {
    //   setMedia(files[0]);
    //   setMediaPreview(URL.createObjectURL(files[0]));
    // }

    setNewPost((prev) => ({ ...prev, [name]: value }));
  };

  const addStyles = () => ({
    textAlign: "center",
    height: "150px",
    width: "150px",
    border: "dotted",
    paddingTop: media === null && "60px",
    cursor: "pointer",
    borderColor: highlighted ? "green" : "black",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let picUrl;

    if (media !== null) {
      picUrl = await uploadPic(media);
      if (!picUrl) {
        setLoading(false);
        return setError("Error Uploading Image");
      }
    }

    await submitNewPost(
      newPost.text,
      newPost.location,
      picUrl,
      setPosts,
      setNewPost,
      setError
    );

    setMedia(null);
    setMediaPreview(null);
    setLoading(false);
    inputRef.current.value = null; // clear inputref of image (relevant if user uploads the same image twice)
  };

  return (
    <>
      <Form error={error !== null} onSubmit={handleSubmit}>
        <Message
          error
          onDismiss={() => setError(null)}
          content={error}
          header="Oops!"
        />

        <Form.Group>
          <div className={classes.createPostElements}>
            <Image src={user.profilePicUrl} circular avatar inline />
            <Form.TextArea
              placeholder="What's on your mind?"
              // style={{ fontWeight: "bold" }}
              name="text"
              value={newPost.text}
              onChange={handleChange}
              rows={4}
              width={14}
            />
          </div>
        </Form.Group>

        <Form.Group>
          {/* <Form.Input
            value={newPost.location}
            name="location"
            onChange={handleChange}
            label="Add Location"
            icon="map marker alternate"
            placeholder="Want to add Location?"
          /> */}

          <input
            ref={inputRef}
            onChange={handleChange}
            name="media"
            style={{ display: "none" }}
            type="file"
            accept="image/*"
          />
        </Form.Group>

        <div
          onClick={() => inputRef.current.click()}
          style={addStyles()}
          onDrag={(e) => {
            e.preventDefault();
            setHighlighted(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setHighlighted(false);
          }}
          onDrop={(e) => {
            e.preventDefault();
            setHighlighted(true);

            const droppedFile = Array.from(e.dataTransfer.files);

            setMedia(droppedFile[0]);
            setMediaPreview(URL.createObjectURL(droppedFile[0]));
          }}
        >
          {media === null ? (
            <Icon name="plus" size="big" />
          ) : (
            <>
              <Image
                style={{ height: "150px", width: "150px" }}
                src={mediaPreview}
                alt="PostImage"
                centered
                size="medium"
              />
            </>
          )}
        </div>
        <Divider hidden />

        <Button
          circular
          disabled={newPost.text === "" || loading}
          content={<strong>Post</strong>}
          style={{ backgroundColor: "#1DA1F2", color: "white" }}
          icon="send"
          loading={loading}
        />
      </Form>
      <Divider />
    </>
  );
}

export default CreatePost;
