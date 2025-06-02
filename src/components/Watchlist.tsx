
import { useAppSelector } from "../hooks/hooks";
import { SingleCard } from "./MoviesCard";

const Watchlist = () => {
  const { watchlist } = useAppSelector((state) => state.watchlist);
  return (
    <div className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5  gap-5 ">
      {watchlist.map((movie) => (
        <SingleCard movie={movie} id={movie.id} />
      ))}
    </div>
  );
};

export default Watchlist;
