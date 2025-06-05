import { SearchIcon } from "lucide-react";
import { useRef, useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import {
  searchMovies,
  setIsSearching,
  setSearchResult,
  setSearchTerm,
} from "../redux/moviesSlice";

import cn from "../utils";
const Search = ({ atWatchlist }: { atWatchlist: boolean }) => {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { searchTerm } = useAppSelector((state) => state.movies);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(0);
  const debouncedHandleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        if (e.target.value === "") {
          dispatch(setIsSearching(false));
          dispatch(setSearchTerm(""));
          dispatch(setSearchResult([]));
          return;
        }
        dispatch(setIsSearching(true));
        dispatch(setSearchTerm(e.target.value));
        dispatch(searchMovies());
      }, 500);
    },
    [dispatch]
  );
  useEffect(() => {
    if (searchTerm !== "") {
      inputRef.current && (inputRef.current.value = searchTerm);
    }
  }, []);

  return (
    <fieldset
      className={cn(
        " hidden  w-full max-w-[300px] border-2 rounded-lg border-white/30  dark:border-primary/30 transition-all focus-within:border-white dark:focus-within:border-primary  sm:flex  items-center justify-between px-1",
        atWatchlist && "invisible"
      )}
    >
      <input
        placeholder="Type to search"
        className="py-2  outline-none border-none bg-none w-full max-w-fit"
        id="search"
        type="text"
        name="searchbar"
        ref={inputRef}
        onInput={debouncedHandleSearch}
      />
      <SearchIcon size={20} strokeWidth={1.5} />
    </fieldset>
  );
};

export default Search;
