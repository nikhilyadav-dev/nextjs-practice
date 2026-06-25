export const metadata = {
  title: {
    default: "Technical Agency",
    template: " %s | Technical Agency ",
  },
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <header style={{ background: "pink" }}>
          {" "}
          <h1> Header</h1>
        </header>
        {children}
        <footer style={{ background: "pink" }}>
          {" "}
          <h1>Footer</h1>{" "}
        </footer>
      </body>
    </html>
  );
}
