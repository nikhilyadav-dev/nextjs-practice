export const metadata = {
  title: {
    default: "Technical Agency",
    template: " %s | Technical Agency ",
  },
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
