// ThemeContext.js
import React, { createContext, useState, useContext, useCallback, useEffect } from "react";
import { apiUpdateThemePreference } from "../services/api/authApi";

type ThemeName =
  | "sunrise"
  | "ocean"
  | "sage"
  | "slate"
  | "sand"
  | "sunrise-dark"
  | "ocean-dark"
  | "sage-dark"
  | "slate-dark"
  | "sand-dark";

interface ThemeContextValue {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  themes: ThemeName[];
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "sunrise",
  setTheme: () => {},
  themes: [
    "sunrise",
    "ocean",
    "sage",
    "slate",
    "sand",
    "sunrise-dark",
    "ocean-dark",
    "sage-dark",
    "slate-dark",
    "sand-dark",
  ],
  toggleTheme: () => {},
});

const THEME_CLASS_PREFIX = "theme-";
const THEMES: ThemeName[] = [
  "sunrise",
  "ocean",
  "sage",
  "slate",
  "sand",
  "sunrise-dark",
  "ocean-dark",
  "sage-dark",
  "slate-dark",
  "sand-dark",
];
const DARK_THEMES: ThemeName[] = [
  "sunrise-dark",
  "ocean-dark",
  "sage-dark",
  "slate-dark",
  "sand-dark",
];

const getInitialTheme = (): ThemeName => {
  const userRaw = localStorage.getItem("user");
  if (userRaw) {
    try {
      const user = JSON.parse(userRaw);
      const userTheme = user?.themePreference as ThemeName | undefined;
      if (userTheme && THEMES.includes(userTheme)) {
        return userTheme;
      }
    } catch (error) {
      console.error("Failed to parse user theme preference:", error);
    }
  }

  return "sunrise";
};

const persistTheme = (theme: ThemeName) => {
  const userRaw = localStorage.getItem("user");
  if (!userRaw) return;
  try {
    const user = JSON.parse(userRaw);
    const nextUser = { ...user, themePreference: theme };
    localStorage.setItem("user", JSON.stringify(nextUser));
    window.dispatchEvent(new CustomEvent("user:updated"));
  } catch (error) {
    console.error("Failed to persist user theme preference:", error);
  }
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    THEMES.forEach((name) => root.classList.remove(`${THEME_CLASS_PREFIX}${name}`));
    root.classList.add(`${THEME_CLASS_PREFIX}${theme}`);
    if (DARK_THEMES.includes(theme)) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    persistTheme(theme);
    if (localStorage.getItem("token")) {
      apiUpdateThemePreference(theme).catch((error) => {
        console.error("Failed to sync theme preference:", error);
      });
    }
  }, [theme]);

  useEffect(() => {
    const handleUserUpdate = () => {
      const userRaw = localStorage.getItem("user");
      if (!userRaw) return;
      try {
        const user = JSON.parse(userRaw);
        const userTheme = user?.themePreference as ThemeName | undefined;
        if (userTheme && THEMES.includes(userTheme)) {
          setThemeState(userTheme);
        }
      } catch (error) {
        console.error("Failed to sync theme with user:", error);
      }
    };

    window.addEventListener("user:updated", handleUserUpdate);
    return () => {
      window.removeEventListener("user:updated", handleUserUpdate);
    };
  }, []);

  const setTheme = useCallback((nextTheme: ThemeName) => {
    setThemeState(nextTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === "sunrise" ? "sunrise-dark" : "sunrise"));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: THEMES, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
