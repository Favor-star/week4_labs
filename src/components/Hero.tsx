import { NavLink } from "react-router";
import Search from "./Search";
import { MenuIcon, } from "lucide-react";
import GenresTab from "./GenresTab";
import cn from "../utils";
const Hero = ({ atWatchlist = false }: { atWatchlist: boolean }) => {
  return (
    <div className="w-full  py flex-row text-white  font-mono relative">
      <header className="w-full   flex justify-between items-center">
        <h1 className="uppercase text-lg ">Favor's Movie App</h1>
        <nav className="sm:flex flex-row gap-3 hidden">
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn("text-white/60", isActive && "underline font-bold text-white")
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/watchlist"
            className={({ isActive }) =>
              cn("text-white/60", isActive && "underline font-bold text-white")
            }
          >
            {" "}
            Watchlist
          </NavLink>
        </nav>
        {<Search atWatchlist={atWatchlist} />}
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
