import { ChevronLeft, ChevronRight, FilterIcon } from "lucide-react";
import { useEffect, useState } from "react";
import type { Result } from "../..";
import Skeleton from "./Skeleton";
import MoviesCard from "../MoviesCard";
import { useGetMovies } from "../../hooks/useGetMovies";

const MoviesLayout = () => {
  const [activePage, setActivePage] = useState<number>(1);
  const [isFetching, movies] = useGetMovies({ activePage });

  // const [moviesList, setMoviesList] = useState<Result[] | null>(null);
  const [filter, setFilter] = useState("All");
  // console.log(movies);
  // useEffect(() => {
  //   if (!movies) return;
  //   if (filter === "all") {
  //     console.log(moviesList);
  //     setMoviesList(movies.results);
  //   } else if (filter === "episode") {
  //     setMoviesList([...movies.results.filter((mv) => mv.titleType.isEpisode)]);
  //   } else if (filter === "tvshows") {
  //     setMoviesList([...movies.results.filter((mv) => mv.titleType.isSeries)]);
  //   }
  // }, [filter]);
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
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all" className="text-primary">
                All
              </option>
              <option value="movies" className="text-primary">
                Movies
              </option>
              <option value="tvshows" className="text-primary">
                Tv Series
              </option>
              <option value="episode" className="text-primary">
                Episode
              </option>
            </select>
          </span>
        </div>
        {/* <Skeleton /> */}
        {isFetching ? (
          <Skeleton />
        ) : !movies ? (
          <Skeleton />
        ) : (
          <MoviesCard movies={movies?.results} />
        )}
      </div>
      <div className="w-full flex pt-5 items-center justify-center">
        <Pagination activePage={activePage} setActivePage={setActivePage} />
      </div>
    </div>
  );
};

export default MoviesLayout;

type PaginationProps = {
  activePage: number;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
};

const Pagination = ({ activePage, setActivePage }: PaginationProps) => {
  const handleNext = () => setActivePage((prev) => prev + 1);
  const handlePrev = () => setActivePage((prev) => prev - 1);

  return (
    <div className="flex max-w-fit items-center justify-center gap-1">
      <ChevronLeft
        strokeWidth={2}
        className={
          "p-2 aspect-square w-10 h-10 grid place-content-center  border rounded-lg bg-white/30 hover:bg-white hover:text-primary transition-all " +
          (activePage === 1
            ? "pointer-events-none cursor-not-allowed border-gray-500 text-gray-400"
            : "pointer-events-auto cursor-pointer border-white text-white")
        }
        onClick={handlePrev}
      />
      <div className="flex flex-row gap-1">
        <p className="text-lg p-1 aspect-square w-10  grid place-content-center bg-white/20 rounded-lg ">
          ..
        </p>
        <p className="text-lg p-1 aspect-square w-10  grid place-content-center bg-white/20 border border-white rounded-lg ">
          {activePage}
        </p>
        <p className="text-lg p-1 aspect-square w-10  grid place-content-center bg-white/20 rounded-lg ">
          ..
        </p>
      </div>
      <ChevronRight
        strokeWidth={2}
        className="p-2 aspect-square w-10 h-10 grid place-content-center  border border-white rounded-lg bg-white/30 hover:bg-white hover:text-primary transition-all"
        onClick={handleNext}
      />
    </div>
  );
};
