import type { Result } from "..";
import Placeholder from "../assets/img-placeholder.png";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import Skeleton from "./layout/Skeleton";
import {
  ListCheckIcon,
  ListPlusIcon,
  MoveRightIcon,
  XIcon,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import {
  addToWatchlist,
  addwatchlistId,
  removeFromWatchlist,
} from "../redux/watchlistSlice";
import { cn } from "../utils";
import { useEffect, useState } from "react";

const MoviesCard = () => {
  const { movies, isFetchingMovies, isSearching, searchResult, searchTerm } =
    useAppSelector((state) => state.movies);

  if (isFetchingMovies) return <Skeleton />;
  if (isSearching) return <Skeleton />;
  if (searchTerm !== "" && searchResult && searchResult.length === 0)
    return <h1>No result found for {searchTerm}</h1>;
  return (
    <div className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5  gap-5 ">
      {/* {isFetchingMovies && <Skeleton />} */}

      {(!searchResult || searchResult.length === 0) &&
        movies &&
        movies.map((movie) => (
          <SingleCard movie={movie} key={movie._id} id={movie.id} />
        ))}

      {searchResult &&
        searchResult?.length !== 0 &&
        searchResult.map((movie) => (
          <SingleCard movie={movie} key={movie._id} id={movie.id} />
        ))}
    </div>
  );
};

export default MoviesCard;

export const SingleCard = ({ movie, id }: { movie: Result; id: string }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOnWatchlist, setIsOnWatchlist] = useState<boolean>(false);
  const { primaryImage, originalTitleText, releaseYear } = movie;
  const { watchlistIds } = useAppSelector((state) => state.watchlist);
  const imageUrl = primaryImage?.url || Placeholder;
  const handleNavigate = () => {
    navigate(`/movie/${id}`);
  };
  const handleAddToWatchlist = () => {
    if (watchlistIds.includes(id)) return;
    dispatch(addToWatchlist(movie));
    dispatch(addwatchlistId(id));
  };
  const handleRemoveFromWatchlist = () => {
    dispatch(removeFromWatchlist(id));
  };
  useEffect(() => {
    if (location.pathname === "/watchlist") setIsOnWatchlist(true);
  }, [location.pathname]);

  return (
    <div className="w-full max-w-[225px] flex flex-row  border border-gray-500  dark:border-primary/50 dark:hover:bg-secondary/15 transition-all hover:border-white dark:hover:border-primary dark:bg-primary/5 hover:rounded-2xl p-2 rounded-xl relative  overflow-hidden">
      <div className="w-full flex flex-col gap-1  font-mono relative">
        <img
          src={imageUrl}
          alt={primaryImage?.caption?.plainText}
          className="aspect-[226/300] object-cover w-full rounded-lg"
          loading="lazy"
          onClick={handleNavigate}
        />
        <p className="text-ellipsis text-nowrap w-full text-lg font-bold overflow-hidden ">
          {originalTitleText?.text}
        </p>
        <div className="w-full flex flex-row justify-between items-end">
          <p className="italic text base text-gray-300 dark:text-primary">
            {releaseYear?.year}
          </p>
          <div className="flex gap-2 justify-start items-center">
            <div
              className={cn(
                " p-1 rounded-sm border dark:hover:text-white border-white/40 dark:border-primary/40 hover:bg-white/30 dark:hover:bg-secondary/30 hover:border-white dark:hover:border-secondary hover:rounded-full transition-all",
                watchlistIds.includes(id) &&
                  "text-secondary dark:text-white dark:bg-secondary dark:hover:bg-secondary bg-white hover:bg-white"
              )}
              title={
                watchlistIds.includes(id)
                  ? "Added to watchlist"
                  : "Add to watchlist"
              }
              onClick={handleAddToWatchlist}
            >
              {watchlistIds.includes(id) ? (
                <ListCheckIcon size={20} strokeWidth={1.5} />
              ) : (
                <ListPlusIcon size={20} strokeWidth={1.5} />
              )}
            </div>
            <div
              className="  p-1 rounded-sm border dark:hover:text-white border-white/40 dark:border-primary/40 hover:bg-white/30 dark:hover:bg-secondary/30 hover:border-white dark:hover:border-secondary hover:rounded-full transition-all"
              title="View"
              onClick={handleNavigate}
            >
              <MoveRightIcon
                size={20}
                strokeWidth={1.5}
                className="-rotate-45 hover:rotate-0 transition-all"
              />
            </div>
          </div>
        </div>
        {isOnWatchlist && (
          <span
            className="p-2 flex gap-2 rounded-sm hover:rounded-full bg-white/30 hover:bg-white border border-white/90 hover:text-secondary transition-all cursor-pointer"
            onClick={handleRemoveFromWatchlist}
          >
            <XIcon strokeWidth={1.5} />
            Remove
          </span>
        )}
      </div>
      {/* <div
        className={cn(
          "transition-all h-full w-full p-3 origin-left absolute left-full top-0 bg-secondary/90 ",
          open ? " -translate-x-full" : "translate-x-0"
        )}
      >
        <p className="text-xs text-wrap text-white/60">
          Title:{" "}
          <span className="font-bold font-mono text-base mb-2 text-white">
            {" "}
            {originalTitleText?.text}
          </span>
        </p>
        <p className="text-xs text-nowrap text-white/60">
          Imdb rating:{" "}
          <span className="font-bold font-mono text-base text-white">
            {ratingsSummary?.voteCount === 0
              ? 0.0
              : ratingsSummary?.aggregateRating}
          </span>
        </p>
        <p className="text-xs text-nowrap text-white/60">
          Genre:{" "}
          <span className="font-bold font-mono text-base text-white">
            {genres?.genres.map((genre) => (
              <span
                className="text-wrap w-full"
                key={genre.id}
              >{`${genre.text}, `}</span>
            ))}
          </span>
        </p>
      </div> */}
    </div>
  );
};
