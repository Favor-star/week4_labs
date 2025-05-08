import { ChevronLeft, ChevronRight, FilterIcon } from "lucide-react";
import Skeleton from "./Skeleton";

const MoviesLayout = () => {
  return (
    <div className="w-full text-white py-2 flex flex-col ">
      <div className="flex-1 w-full ">
        <div className="w-full flex flex-row justify-between items-center mb-2">
          <p className="text-xl font-bold">Trending Movies</p>
          <span className="w-fit max-w-96 flex rounded-lg border border-white p-2">
            <FilterIcon className=" w-10" strokeWidth={1} />
            Filter by:
            <select
              name="filter"
              id="filterOptions"
              className="bg-white/10 p-1 pe-2 outline-none rounded-sm"
            >
              <option value="movies" className="text-primary">
                Movies
              </option>
              <option value="tvshows" className="text-primary">
                Tv Shows
              </option>
              <option value="episode" className="text-primary">
                Episode
              </option>
            </select>
          </span>
        </div>
        <Skeleton />
      </div>
      <div className="w-full flex pt-5 items-center justify-center">
        <Pagination />
      </div>
    </div>
  );
};

export default MoviesLayout;

const Pagination = () => {
  return (
    <div className="flex max-w-fit items-center justify-center gap-1">
      <ChevronLeft
        strokeWidth={2}
        className="p-2 aspect-square w-10 h-10 grid place-content-center  border border-white rounded-lg bg-white/30 hover:bg-white hover:text-primary transition-all"
      />
      <div className="flex flex-row gap-1">
        {numbers.map((n) => (
          <p className="text-lg p-1 aspect-square w-10  grid place-content-center border border-white rounded-lg ">
            {n}
          </p>
        ))}
        <p className="text-lg p-1 aspect-square w-10  grid place-content-center border border-white rounded-lg ">
          ..
        </p>
        <p className="text-lg p-1 aspect-square w-10  grid place-content-center border border-white rounded-lg ">
          10
        </p>
      </div>
      <ChevronRight
        strokeWidth={2}
        className="p-2 aspect-square w-10 h-10 grid place-content-center  border border-white rounded-lg bg-white/30 hover:bg-white hover:text-primary transition-all"
      />
    </div>
  );
};
const numbers = [1, 2, 3, 4];
