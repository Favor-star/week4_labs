import { SearchIcon } from "lucide-react";
import { useContext, useRef, type BaseSyntheticEvent } from "react";
import { SearchContext } from "../contexts/GrobalContexts";

const Search = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const context = useContext(SearchContext);

  const handleSearchSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    if (inputRef.current?.value) {
      context?.setSearchTerm(inputRef.current.value);
    }
  };
  return (
    <div className="w-full mt-5">
      <form
        className="flex flex-row w-fit border border-white items-center justify-center rounded-xl"
        onSubmit={handleSearchSubmit}
      >
        <SearchIcon strokeWidth={1} className="w-10 h-10 p-2" />
        <input
          type="text"
          name="searchbar"
          id="search"
          className="p-2 outline-none w-full "
          placeholder="search by title"
          ref={inputRef}
        />
      </form>
    </div>
  );
};

export default Search;
