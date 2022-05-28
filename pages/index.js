import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Scroll from "react-scroll";
import io from "socket.io-client";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import CreatePost from "../components/Post/CreatePost";
import CardPost from "../components/Post/CardPost";
import { Container, Segment } from "semantic-ui-react";
import { parseCookies } from "nookies";
import { NoPosts } from "../components/Layout/NoData";
import { PostDeleteToastr } from "../components/Layout/Toastr";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  PlaceHolderPosts,
  EndMessage,
} from "../components/Layout/PlaceHolderGroup";
import cookie from "js-cookie";
import getUserInfo from "../utils/getUserInfo";
import MessageNotificationModal from "../components/Home/MessageNotificationModal";
import newMsgSound from "../utils/newMsgSound";
import ToastSuccess from "../components/Layout/Toast/Success";

import classes from "../components/Post/CreatePost.module.css";
import { logoutUser } from "../utils/authUser";

function Index({ user, postsData, errorLoading }) {
  const [posts, setPosts] = useState(postsData || []);
  const [showToastr, setShowToastr] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [pageNumber, setPageNumber] = useState(2);

  const socket = useRef();
  const postsRef = useRef();
  const Element = Scroll.Element;
  const scroller = Scroll.scroller;

  const [newMessageReceived, setNewMessageReceived] = useState(null);
  const [newMessageModal, showNewMessageModal] = useState(false);

  useEffect(() => {
    // This line is for not needing to scroll through for removing the loader, if there are not posts
    if (postsData && postsData.length === 0) setHasMore(false);

    if (!socket.current) {
      socket.current = io(baseUrl);
    }

    if (socket.current) {
      socket.current.emit("join", { userId: user._id });

      socket.current.on("newMsgReceived", async ({ newMsg }) => {
        const { name, profilePicUrl } = await getUserInfo(newMsg.sender);

        if (user.newMessagePopup) {
          setNewMessageReceived({
            ...newMsg,
            senderName: name,
            senderProfilePic: profilePicUrl,
          });
          showNewMessageModal(true);
        }
        newMsgSound(name);
      });
    }

    document.title = `Welcome, ${user.name.split(" ")[0]}`;
  }, []);

  // attach 'minimize' property to each post
  useEffect(() => {
    if (posts && posts.length > 0) {
      for (const post of posts) {
        if (post.minimize === undefined) {
          post.minimize = false;
        }
      }
    }
  }, [posts]);

  useEffect(() => {
    showToastr &&
      setTimeout(() => {
        setShowToastr(false);
      }, 3000);
  }, [showToastr]);

  const toggleMinimize = (postId, index) => {
    const udpatedPosts = [...posts];
    const foundIndex = udpatedPosts.findIndex((post) => post._id === postId);
    udpatedPosts[foundIndex].minimize = !udpatedPosts[foundIndex].minimize;
    setPosts(udpatedPosts);

    // scroll into view
    // const a = document.getElementsByClassName("haveri");
    // window.HTMLElement.prototype.scrollIntoView = function () {};
    // a[index].scrollIntoView({ behavior: "smooth" });
    // scroller.scrollTo(index.toString());
    // a[index].style.backgroundColor = "red";
    scroller.scrollTo(index.toString(), {
      duration: 1200,
      delay: 100,
      smooth: true,
      offset: -100, // Scrolls to element + 50 pixels down the page
    });
  };

  const toastSuccess = () => {
    toast(<ToastSuccess>Post Deleted!</ToastSuccess>);
  };

  const fetchDataOnScroll = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/posts`, {
        headers: { Authorization: cookie.get("token") },
        params: { pageNumber },
      });

      if (res.data.length === 0) setHasMore(false);

      setPosts((prev) => [...prev, ...res.data]);
      setPageNumber((prev) => prev + 1);
    } catch (error) {
      alert("Error fetching Posts");
    }
  };

  // show nothing if no posts found
  // if (posts.length === 0 || errorLoading) return <NoPosts />;

  return (
    <>
      {newMessageModal && newMessageReceived !== null && (
        <MessageNotificationModal
          socket={socket}
          showNewMessageModal={showNewMessageModal}
          newMessageModal={newMessageModal}
          newMessageReceived={newMessageReceived}
          user={user}
        />
      )}

      {/* <Segment> */}
      <div className="containerBox">
        <CreatePost user={user} setPosts={setPosts} />
      </div>

      <Container>
        <InfiniteScroll
          hasMore={hasMore}
          next={fetchDataOnScroll}
          loader={<PlaceHolderPosts />}
          // endMessage={<EndMessage />}
          endMessage={null}
          dataLength={posts.length}
        >
          {posts.map((post, index) => (
            <Element key={post._id} name={index.toString()}>
              <div className="haveri" style={{ marginBottom: "1rem" }}>
                <CardPost
                  ref={postsRef}
                  toggleMinimize={(postId, index) =>
                    toggleMinimize(postId, index)
                  }
                  index={index}
                  post={post}
                  user={user}
                  setPosts={setPosts}
                  setShowToastr={toastSuccess}
                />
              </div>
            </Element>
          ))}
        </InfiniteScroll>
      </Container>
      {/* <Element name="haverTov">
        <div style={{ backgroundColor: "red", height: "300px" }}></div>
      </Element> */}

      {/* </Segment> */}
      <ToastContainer
        closeButton={false}
        position="bottom-left"
        hideProgressBar
        autoClose={2500}
      />
    </>
  );
}

Index.getInitialProps = async (ctx) => {
  try {
    // if (!ctx.user) {
    //   return {};
    // }
    const { token } = parseCookies(ctx);
    const res = await axios.get(`${baseUrl}/api/posts`, {
      headers: { Authorization: token },
      params: { pageNumber: 1 },
    });
    return { postsData: res.data };
  } catch (error) {
    return { errorLoading: true };
  }
};

export default Index;
