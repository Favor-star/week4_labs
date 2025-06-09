import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";



const ThemeContext = createContext<{
  theme: "light" | "dark";
  toggleTheme: () => void;
}>({
  theme: "light",
  toggleTheme: () => {},
});
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const getSystemTheme = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  const [theme, setTheme] = useState(
    () =>
      (localStorage.getItem("theme") as "light" | "dark") || getSystemTheme()
  );

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handlChange = () => {
      const stored = localStorage.getItem("theme");
      if (!stored) setTheme(getSystemTheme());
    };
    media.addEventListener("change", handlChange);
    return () => media.removeEventListener("change", handlChange);
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    console.log(newTheme);
    setTheme(newTheme);
  }, [theme]);
  
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
export const useTheme = () => useContext(ThemeContext);
