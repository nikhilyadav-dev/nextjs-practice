export default function ApplicationLayout({ children }) {
  return (
    <section>
      <header style={{ background: "pink" }}>
        {" "}
        <h1> Header</h1>
      </header>
      {children}

      <footer style={{ background: "pink" }}>
        {" "}
        <h1>Footer</h1>{" "}
      </footer>
    </section>
  );
}
