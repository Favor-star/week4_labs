import { useParams } from "react-router";
import { useAppDispatch } from "../../hooks/hooks";
import { getMovieById } from "../../redux/moviesSlice";

const SingleMovie = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  if (!id) return <h1>No such movies that could be found</h1>;
  dispatch(getMovieById(id));
  return (
    <div>
      SingleMovie {"=>"} {id}
    </div>
  );
};

export default SingleMovie;
