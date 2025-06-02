import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import Pagination from "../Pagination";
import Hero from "../Hero";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchMovies } from "../../redux/moviesSlice";

const Layout = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { genre, currentPage } = useAppSelector((state) => state.movies);
  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch, genre, currentPage]);

  return (
    <div className="w-full bg-primary flex flex-row items-start justify-center px-4  gap-5 min-h-screen ">
      <div className="w-full max-w-screen-lg flex flex-1 flex-col h-full ">
        {!location.pathname.includes("/movie") && (
          <Hero atWatchlist={location.pathname === "/watchlist"} />
        )}
        <div className="w-full flex-1 text-white py-2 flex flex-col h-full  ">
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
