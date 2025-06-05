
import cn from "../utils";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { setGenre } from "../redux/moviesSlice";
import { useSearchParams } from "react-router";

const GenresTab = () => {
  const { allGenres, areGenresFetching, isFetchingGenreError } = useAppSelector(
    (state) => state.movies
  );
  if (areGenresFetching)
    return <p className="text-white dark:text-primary">Loading genres...</p>;
  if (isFetchingGenreError)
    return <p className="text-red-400">Error loading genres</p>;

  return (
    <div className="w-full flex flex-col pt-1 text-white dark:text-primary sticky top-0 left-0 border-t-2 border-white dark:border-primary my-6">
      <p className="font-extralight italic text-base">Genres</p>
      <div className="flex flex-row gap-2 flex-nowrap w-full overflow-x-scroll scrollbar_sidebar">
        {allGenres &&
          ["All", ...allGenres.results.slice(1)].map((genre) => (
            <GenresTabItem genre={genre} key={genre} />
          ))}
      </div>
    </div>
  );
};

export default GenresTab;

const GenresTabItem = ({ genre }: { genre: string }) => {
  // const result = useContext(ActiveTab);
  const dispatch = useAppDispatch();
  const [searchParam, setSearchParam] = useSearchParams();
  const { genre: newGenre } = useAppSelector((state) => state.movies);
  function handleClick() {
    dispatch(setGenre(genre));
    setSearchParam({ genre });
    searchParam;
  }

  return (
    <p
      onClick={handleClick}
      className={cn(
        "w-fit h-fit text-nowrap py-1 px-3 rounded-full border border-white/40 dark:border-primary/40 hover:border-white dark:hover:border-primary bg-white/20 dark:bg-primary/10 transition-all cursor-pointer",
        newGenre === genre &&
          "bg-white dark:bg-secondary text-secondary dark:text-white"
      )}
    >
      {genre}
    </p>
  );
};
