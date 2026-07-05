import styles from "./home.module.css";

const Home = () => {
  if (Math.random() > 0.5) {
    throw new Error("Greater than 0.5 home");
  }

  return (
    <>
      <div>
        <h1 className={styles.title}>Home Page</h1>
        <p>Welcome to our website!</p>
      </div>
    </>
  );
};

export default Home;
