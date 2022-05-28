function Page({ user }) {
  return <div></div>;
}

Page.getInitialProps = async (ctx) => {
  const res = await fetch("https://api.github.com/repos/vercel/next.js");
  const json = await res.json();
  return { stars: "500" };
};

export default Page;
