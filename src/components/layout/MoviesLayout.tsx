import { ChevronLeft, ChevronRight, XIcon } from "lucide-react";
import { useState, useContext } from "react";

import Skeleton from "./Skeleton";
import MoviesCard from "../MoviesCard";
import { useGetMovies } from "../../hooks/useGetMovies";
import { SearchContext } from "../../contexts/GrobalContexts";
import useSearchMovies from "../../hooks/useSearchMovies";

const MoviesLayout = () => {
  const [activePage, setActivePage] = useState<number>(1);

  const { searchTerm, setSearchTerm } = useContext(SearchContext) || {};
  const shouldSearch = searchTerm?.trim() !== "";
  const [isFetching, movies] = useGetMovies({ activePage });
  const searchResults = useSearchMovies(shouldSearch ? searchTerm ?? "" : "");
  const handleCloseSearch = () => {
    shouldSearch === false;
    setSearchTerm && setSearchTerm("");
  };
  return (
    <div className="w-full text-white py-2 flex flex-col ">
      <div className="flex-1 w-full ">
        <div className="w-full flex flex-row justify-between items-center mb-2">
          <p className="text-xl font-bold pb-3">
            {shouldSearch && searchResults.searchResult?.results.length !== 0
              ? `Search results for "${searchTerm}"`
              : "Trending Movies"}
          </p>
          {shouldSearch && (
            <div
              className="flex flex-row gap-2 p-2 rounded-lg border border-white"
              onClick={handleCloseSearch}
            >
              <XIcon />
              <p className="">Close Search</p>
            </div>
          )}
        </div>

        {shouldSearch ? (
          searchResults.isSearching ? (
            <Skeleton />
          ) : searchResults.searchResult?.results.length === 0 ? (
            <p>No results found</p>
          ) : (
            <MoviesCard movies={searchResults.searchResult?.results ?? []} />
          )
        ) : isFetching || !movies ? (
          <Skeleton />
        ) : (
          <MoviesCard movies={movies.results} />
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
