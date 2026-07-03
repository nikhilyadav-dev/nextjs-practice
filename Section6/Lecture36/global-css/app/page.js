export const dynamic = "force-dynamic";

const Home = () => {
  if (Math.random() > 0.5) {
    throw new Error("Greater than 0.5 home");
  }

  return (
    <>
      <div>
        <h1>Home Page</h1>
        <p>Welcome to our website!</p>
      </div>
    </>
  );
};

export default Home;
