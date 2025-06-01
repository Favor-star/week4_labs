import { useContext } from "react";
import useGetGenres from "../hooks/useGetGenres";
import { ActiveTab } from "../contexts/GrobalContexts";
import cn from "../utils";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { setGenre } from "../redux/moviesSlice";
import { useSearchParams } from "react-router";

const GenresTab = () => {
  const { genres, loading, error } = useGetGenres();

  if (loading) return <p className="text-white">Loading genres...</p>;
  if (error) return <p className="text-red-400">Error loading genres</p>;

  return (
    <div className="w-full flex flex-col pt-1 text-white sticky top-0 left-0 border-t-2 border-white my-6">
      <p className="font-extralight italic text-base">Genres</p>
      <div className="flex flex-row gap-2 flex-nowrap w-full overflow-x-scroll scrollbar_sidebar">
        {genres &&
          ["All", ...genres.results.slice(1)].map((genre) => (
            <GenresTabItem genre={genre} key={genre} />
          ))}
      </div>
    </div>
  );
};

export default GenresTab;

const GenresTabItem = ({ genre }: { genre: string }) => {
  const result = useContext(ActiveTab);
  const dispatch = useAppDispatch();
  const [searchParam, setSearchParam] = useSearchParams();
  const { genre: newGenre } = useAppSelector((state) => state.movies);

  function handleClick() {
    result?.setActiveTab(genre);
    dispatch(setGenre(genre));
    setSearchParam({ genre });
  }

  return (
    <p
      onClick={handleClick}
      className={cn(
        "w-fit h-fit text-nowrap py-1 px-3 rounded-full border border-white/40 hover:border-white bg-white/20 transition-all cursor-pointer",
        newGenre === genre && "bg-white text-secondary"
      )}
    >
      {genre}
    </p>
  );
};
