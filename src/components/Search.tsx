import { SearchIcon } from "lucide-react";
import { useRef, useCallback } from "react";
import { useAppDispatch } from "../hooks/hooks";
import {
  searchMovies,
  setIsSearching,
  setSearchTerm,
} from "../redux/moviesSlice";
const Search = () => {
  const dispatch = useAppDispatch();
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(0);
  const debouncedHandleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        if (e.target.value === "") {
          dispatch(setIsSearching(false));
          dispatch(setSearchTerm(""));
          return;
        }
        dispatch(setIsSearching(true));
        dispatch(setSearchTerm(e.target.value));
        dispatch(searchMovies());
      }, 500);
    },
    [dispatch]
  );

  return (
    <fieldset className=" hidden  w-full max-w-[300px] border-2 rounded-lg border-white/30 transition-all focus-within:border-white  sm:flex  items-center justify-between px-1">
      <input
        placeholder="Type to search"
        className="py-2  outline-none border-none bg-none w-full max-w-fit"
        id="search"
        type="text"
        name="searchbar"
        onInput={debouncedHandleSearch}
      />
      <SearchIcon size={20} strokeWidth={1.5} />
    </fieldset>
  );
};

export default Search;
