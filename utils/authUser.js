import axios from "axios";
import baseUrl from "./baseUrl";
import catchErrors from "./catchErrors";

import cookie from "js-cookie";

export const registerUser = async (
  user,
  profilePicUrl,
  setError,
  setLoading,
  router
) => {
  try {
    const res = await axios.post(`${baseUrl}/api/signup`, {
      user,
      profilePicUrl,
    });

    // setToken(res.data);
    cookie.set("token", res.data);
    // router.push("/" + user.username + "?editProfile=true");
    router.push("/");
  } catch (error) {
    const errorMsg = catchErrors(error);
    setError(errorMsg);
  }
  setLoading(false);
};

export const loginUser = async (user, setError, setLoading) => {
  setLoading(true);
  try {
    const res = await axios.post(`${baseUrl}/api/auth`, { user });

    setToken(res.data);
  } catch (error) {
    const errorMsg = catchErrors(error);
    setError(errorMsg);
  }
  setLoading(false);
};

export const redirectUser = (ctx, location) => {
  if (ctx.req) {
    ctx.res.writeHead(302, { Location: location });
    ctx.res.end();
  } else {
    window.location.href = location;
  }
};

const setToken = (token) => {
  cookie.set("token", token);
  window.location.href = "/";
};

export const logoutUser = (email, router) => {
  if (email) {
    cookie.set("userEmail", email);
  }
  cookie.remove("token");
  router.push("/login");
  // window.location.href = "/login";
};
