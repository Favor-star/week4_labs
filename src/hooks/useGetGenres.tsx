import { useEffect, useState } from "react";
import { options } from "./useGetMovies";
const useGetGenres = () => {
  const [genres, setGenres] = useState<GenresResult | null>(null);
  useEffect(() => {
    (async function () {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/titles/utils/genres`,
          options
        );
        const result: GenresResult = await response.json();
        setGenres(result);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return genres;
};
export default useGetGenres;

type GenresResult = {
  results: string[];
};
