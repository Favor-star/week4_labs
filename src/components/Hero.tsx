import { Link } from "react-router";
import Search from "./Search";
import { MenuIcon, Sidebar } from "lucide-react";
import GenresTab from "./GenresTab";
const Hero = () => {
  return (
    <div className="w-full  py flex-row text-white  font-mono relative">
      <header className="w-full   flex justify-between items-center">
        <h1 className="uppercase text-lg ">Favor's Movie App</h1>
        <nav className="sm:flex flex-row gap-3 hidden">
          <Link to="/">Home</Link>
          <Link to="/watchlist"> Watchlist</Link>
        </nav>
        <Search />
        <div className="block sm:hidden">
          <MenuIcon />
        </div>
      </header>
      <div className="w-full flex flex-col justify-between mt-16 text-center  ">
        <p className="font-bold text-3xl">Discover amazing movies</p>
        <p className="text-base w-full ">
          Welcome to the number one site of instant trending movies
        </p>
      </div>
      <GenresTab />
    </div>
  );
};

export default Hero;
