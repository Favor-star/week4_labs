import { useLocation, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getMovieById } from "../../redux/moviesSlice";
import { Link } from "react-router";
import { Loader2, MoveLeft } from "lucide-react";
import { useEffect, useState } from "react";
import Placeholder from "../../assets/img-placeholder.png";
const SingleMovie = () => {
  const location = useLocation();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  if (!id) return <h1>No such movies that could be found</h1>;
  useEffect(() => {
    dispatch(getMovieById(id));
  }, [dispatch, location.pathname]);
  const { singleMovie } = useAppSelector((state) => state.movies);
  const [imageUrl, setimageUrl] = useState<{ url: string; caption: string }>({
    url: Placeholder,
    caption: "Placeholder image",
  });
  useEffect(() => {
    if (!singleMovie?.primaryImage) {
      setimageUrl((prev) => ({
        ...prev,
        url: Placeholder,
        caption: Placeholder,
      }));
    } else {
      setimageUrl((prev) => ({
        ...prev,
        url: singleMovie?.primaryImage.url ?? Placeholder,
        caption: singleMovie?.primaryImage.caption.plainText ?? Placeholder,
      }));
    }
  }, [singleMovie]);
  if (!singleMovie)
    return (
      <div className="w-full py-5 flex items-center justify-center ">
        <Loader2 size={50} strokeWidth={1.6} className="animate-spin" />
      </div>
    );
  return (
    <div>
      <header className="w-full flex justify-between">
        <h1 className="uppercase">Favor's movie App</h1>
        <Link
          to="/"
          className="flex items-center justify-center w-fit gap-2 p-2 rounded-lg border border-white/30 dark:border-primary/30 hover:border-white dark:hover:border-secondary bg-white/30 dark:bg-secondary/30"
        >
          <MoveLeft size={20} strokeWidth={1.5} />
          <span>Go back</span>
        </Link>
      </header>
      <div className="flex w-full border-b-2 border-white dark:border-primary  p-3">
        <p className="font-bold text-3xl capitalize mt-16">
          {singleMovie?.titleText.text}
        </p>
      </div>
      <div className="flex w-full gap-5 p-3 rounded-2xl ">
        <img
          src={imageUrl.url}
          alt={imageUrl.caption}
          className="aspect-[226/300] max-w-[226px] object-cover w-full rounded-lg"
        />
        <div className="flex flex-col gap-2 w-full">
          {singleMovie?.genres && (
            <p className="">
              <span>Genre: </span>
              <span>
                {singleMovie?.genres.genres.map((el, index) => (
                  <span key={el.id}>{(index !== 0 ? ", " : "") + el.text}</span>
                ))}
              </span>
            </p>
          )}
          <p className="">
            <span>Release year: </span>
            <span>{singleMovie?.releaseYear.year} </span>
          </p>
          <p className="">
            <span>Series: </span>
            <span> {singleMovie?.titleType.isSeries ? " Yes" : "No"}</span>
          </p>
          <p className="">
            <span> Episodes: </span>
            <span>{singleMovie?.titleType.isEpisode ? "Yes" : "No"} </span>
          </p>
        </div>
      </div>
      <div className="w-full flex justify-center items-center">
        <Link
          to="/"
          className="flex items-center justify-center w-fit gap-2 p-2 rounded-lg border border-white/30 dark:border-secondary/30 hover:border-white dark:hover:border-secondary bg-white/30 dark:bg-secondary/30 "
        >
          <MoveLeft size={20} strokeWidth={1.5} />
          <span className="">Go back</span>
        </Link>
      </div>
    </div>
  );
};

export default SingleMovie;
