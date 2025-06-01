import type { Result } from "..";
import Placeholder from "../assets/img-placeholder.png";
import { useState } from "react";
import {  useAppSelector } from "../hooks/hooks";
import Skeleton from "./layout/Skeleton";
import { ListPlusIcon, MoveRightIcon } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router";

const MoviesCard = () => {
  const { movies, isFetchingMovies } = useAppSelector((state) => state.movies);
  if (isFetchingMovies) return <Skeleton />;
  return (
    <div className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5  gap-5 ">
      {/* {isFetchingMovies && <Skeleton />} */}
      {movies &&
        movies.map((movie) => (
          <SingleCard movie={movie} key={movie._id} id={movie.id} />
        ))}
    </div>
  );
};

export default MoviesCard;

const SingleCard = ({ movie, id }: { movie: Result; id: string }) => {
  const [open, setOpen] = useState(false);
  const { primaryImage, originalTitleText, releaseYear } = movie;
  const imageUrl = primaryImage?.url || Placeholder;
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/movie/${id}`);
  };
  return (
    <div
      className="w-full max-w-[225px] flex flex-row  border border-gray-500 hover:border-white hover:rounded-2xl p-2 rounded-xl relative  overflow-hidden"
      onClick={handleNavigate}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="w-full flex flex-col gap-1  font-mono ">
        <img
          src={imageUrl}
          alt={primaryImage?.caption?.plainText}
          className="aspect-[226/300] object-cover w-full rounded-lg"
          loading="lazy"
        />
        <p className="text-ellipsis text-nowrap w-full text-lg font-bold overflow-hidden ">
          {originalTitleText?.text}
        </p>
        <div className="w-full flex flex-row justify-between items-end">
          <p className="italic text base text-gray-300">{releaseYear?.year}</p>
          <div className="flex gap-2 justify-start items-center">
            <div
              className=" p-1 rounded-sm border border-white/40 hover:bg-white/30 hover:border-white hover:rounded-full transition-all"
              title="Add to watchlist"
            >
              <ListPlusIcon size={20} strokeWidth={1.5} />
            </div>
            <div
              className=" p-1 rounded-sm border border-white/40 hover:bg-white/30 hover:border-white hover:rounded-full transition-all "
              title="Add to watchlist"
            >
              <MoveRightIcon
                size={20}
                strokeWidth={1.5}
                className="-rotate-45 hover:rotate-0 transition-all"
              />
            </div>
          </div>
        </div>
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
