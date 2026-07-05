import Header from "@/components/Header";
import "./globals.css";
import ThemeProvider from "@/context/ThemeContext";

export const dynamic = "force-dynamic";

export default function RootLayout({ children }) {
  if (Math.random() > 0.5) {
    throw new Error("Greater than 0.5 layout");
  }

  return (
    <html lang="en" className="dark">
      <body>
        <ThemeProvider>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
