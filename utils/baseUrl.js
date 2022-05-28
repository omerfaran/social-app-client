const baseUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000"
    : "https://omer-social-network-server.herokuapp.com/";

export default baseUrl;
