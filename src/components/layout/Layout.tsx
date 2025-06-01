import { type ReactNode } from "react";
import GenresTab from "../GenresTab";
import { Outlet, useSearchParams } from "react-router";
import Pagination from "../Pagination";
import Hero from "../Hero";
import { useAppDispatch } from "../../hooks/hooks";
import { fetchMovies } from "../../redux/moviesSlice";

const Layout = () => {
  const dispatch = useAppDispatch();
  const [searchParam, setSearchParam] = useSearchParams();
  console.log(searchParam.get("genre"));
  dispatch(fetchMovies());

  return (
    <div className="w-full bg-primary flex flex-row items-center justify-center px-4  gap-5 min-h-screen ">
      {/* <GenresTab /> */}
      <div className="w-full max-w-screen-lg flex flex-1 flex-col h-full ">
        <Hero />
        <div className="w-full flex-1 text-white py-2 flex flex-col h-full  ">
          <Outlet />
        </div>
        <div className="w-full flex pt-5 items-center justify-center">
          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default Layout;
