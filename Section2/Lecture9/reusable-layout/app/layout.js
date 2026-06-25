export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <header style={{ background: "pink" }}>Header</header>
        {children}
        <footer style={{ background: "pink" }}>Footer</footer>
      </body>
    </html>
  );
}
