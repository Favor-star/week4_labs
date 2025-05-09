import type { Result } from "..";
import Placeholder from "../assets/img-placeholder.png";
import { useState } from "react";

const MoviesCard = ({ movies }: { movies: Result[] }) => {
  return (
    <div className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5  gap-5 ">
      {movies &&
        movies.map((movie) => <SingleCard movie={movie} key={movie._id} />)}
    </div>
  );
};

export default MoviesCard;

const SingleCard = ({ movie }: { movie: Result }) => {
  const [open, setOpen] = useState(false);
  const {
    primaryImage,
    originalTitleText,
    releaseYear,
    ratingsSummary,
    genres,
  } = movie;
  const imageUrl = primaryImage?.url || Placeholder;
  return (
    <div
      className="w-full max-w-[225px] flex flex-row  border border-gray-500 hover:border-white p-2 rounded-xl relative  overflow-hidden"
      onClick={() => setOpen((prev) => !prev)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="w-full flex flex-col gap-1  font-mono">
        <img
          src={imageUrl}
          alt={""}
          className="aspect-[226/300] object-cover w-full rounded-lg"
          loading="lazy"
        />
        <p className="text-ellipsis text-nowrap w-full text-lg font-bold overflow-hidden ">
          {originalTitleText?.text}
        </p>
        <p className="italic text base text-gray-300">{releaseYear?.year}</p>
      </div>
      <div
        className={
          "transition-all h-full w-full p-3 origin-left absolute left-full top-0 bg-secondary/90 " +
          (open ? " -translate-x-full" : "translate-x-0")
        }
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
            {genres?.genres.map((a) => (
              <span
                className="text-wrap w-full"
                key={a.id}
              >{`${a.text}, `}</span>
            ))}
          </span>
        </p>
      </div>
    </div>
  );
};
