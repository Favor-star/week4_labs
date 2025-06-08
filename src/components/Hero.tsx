import { NavLink } from "react-router";
import Search from "./Search";
import { useEffect } from "react";
import { MenuIcon, MoonIcon, SunIcon } from "lucide-react";
import GenresTab from "./GenresTab";
import { cn } from "../utils";
import { useTheme } from "../contexts/GrobalContexts";
const Hero = ({ atWatchlist = false }: { atWatchlist: boolean }) => {
  const { theme, toggleTheme } = useTheme();
  useEffect(() => {
    console.log(theme);
  }, [theme]);
  function handleToggleTheme() {
    toggleTheme();
  }
  return (
    <div className="w-full  py flex-row text-white dark:text-primary font-mono relative mt-4">
      <header className="w-full   flex justify-between items-center">
        <h1 className="uppercase text-lg ">Favor's Movie App</h1>
        <nav className="sm:flex flex-row gap-3 hidden">
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn(
                "text-white/60 dark:text-primary/60",
                isActive && "underline font-bold text-white dark:text-primary"
              )
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/watchlist"
            className={({ isActive }) =>
              cn(
                "text-white/60 dark:text-primary/60",
                isActive && "underline font-bold text-white dark:text-primary"
              )
            }
          >
            {" "}
            Watchlist
          </NavLink>
        </nav>
        <div className="flex gap-2 items-center justify-center">
          {<Search atWatchlist={atWatchlist} />}
          <span
            className={cn(
              "p-1 flex items-center justify-center   aspect-square cursor-pointer rounded-sm transition-all",
              theme !== "dark"
                ? " text-white  hover:bg-white/30"
                : "text-secondary hover:bg-secondary/30"
            )}
            onClick={handleToggleTheme}
          >
            {theme === "dark" ? (
              <MoonIcon size={24} className="text-inherit" />
            ) : (
              <SunIcon size={24} className="text-inherit" />
            )}
          </span>
        </div>
        <div className="block sm:hidden">
          <MenuIcon />
        </div>
      </header>
      <div className="w-full flex flex-col justify-between mt-16 text-center  ">
        <p className="font-bold text-3xl">
          {atWatchlist
            ? " Your preivously liked movies"
            : "Discover amazing movies"}
        </p>
        <p className="text-base w-full ">
          {atWatchlist
            ? " All of your movies that are on the watchlist will appear here"
            : "Welcome to the number one site of instant trending movies"}
        </p>
      </div>
      {!atWatchlist && <GenresTab />}
    </div>
  );
};

export default Hero;
