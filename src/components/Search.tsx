import { SearchIcon } from "lucide-react";

const Search = () => {
  return (
    <div className="w-full mt-5">
      <div className="flex flex-row w-fit border border-white items-center justify-center rounded-xl">
        <SearchIcon strokeWidth={1} className="w-10 h-10 p-2" />
        <input
          type="text"
          name="searchbar"
          id="search"
          className="p-2 outline-none w-full "
          placeholder="search by title"
        />
      </div>
    </div>
  );
};

export default Search;
