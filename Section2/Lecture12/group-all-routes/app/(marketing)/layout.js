export default function ApplicationLayout({ children }) {
  return (
    <section>
      <header style={{ background: "navy" }}>
        {" "}
        <h1> Header</h1>
      </header>
      {children}

      <footer style={{ background: "navy" }}>
        {" "}
        <h1>Footer</h1>{" "}
      </footer>
    </section>
  );
}
