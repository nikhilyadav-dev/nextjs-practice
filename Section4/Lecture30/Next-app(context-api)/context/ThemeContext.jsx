"use client";
import { useEffect } from "react";
import { useState } from "react";
import { createContext, useContext } from "react";

export const ThemeContext = createContext();

export function useContextFunction() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }) {
  function toggleTheme() {
    setIsDark((prev) => !prev);
  }
  const [isDark, setIsDark] = useState(
    localStorage.getItem("isDark") === "true",
  );
  console.log("Refreshed", localStorage.getItem("isDark") === "true");
  console.log("value of is dark", isDark);
  useEffect(() => {
    localStorage.setItem("isDark", isDark);
    if (isDark) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, [isDark]);
  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
