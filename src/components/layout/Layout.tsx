import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import Pagination from "../Pagination";
import Hero from "../Hero";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchGenres, fetchMovies } from "../../redux/moviesSlice";
// import useDarkMode from "../../hooks/useDarkMode";

const Layout = () => {
  const location = useLocation();
  // const { isLightMode } = useDarkMode();
  // console.log(isLightMode)
  const dispatch = useAppDispatch();
  const { genre, currentPage } = useAppSelector((state) => state.movies);
  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch, genre, currentPage]);
  useEffect(() => {
    console.log("Changes");
    dispatch(fetchGenres());
  }, []);
  return (
    <div className="w-full bg-primary dark:bg-white text-white dark:text-primary flex flex-row items-start justify-center px-4  gap-5 min-h-screen ">
      <div className="w-full max-w-screen-lg flex flex-1 flex-col h-full ">
        {!location.pathname.includes("/movie") && (
          <Hero atWatchlist={location.pathname === "/watchlist"} />
        )}
        <div className="w-full flex-1 tezt-inherit py-2 flex flex-col h-full  ">
          <Outlet />
        </div>
        {location.pathname === "/" && (
          <div className="w-full flex pt-5 items-center justify-center">
            <Pagination />
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;
