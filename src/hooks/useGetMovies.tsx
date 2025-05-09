import { useContext, useEffect, useState } from "react";
import { type Response, type OptionsType, type GetMoviesProps } from "../index";
import { ActiveTab } from "../App";
function useGetMovies({
  activePage,
}: GetMoviesProps): [boolean, Response | null] {
  const [movies, setMovies] = useState<Response | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const genre = useContext(ActiveTab);
  useEffect(() => {
    async function fetchMovies() {
      try {
        setIsFetching(true);
        const url = `${
          import.meta.env.VITE_API_URL
        }/titles?limit=20&startYear=2015&endYear=2025&info=base_info&page=${activePage}${
          !genre
            ? ""
            : genre.activeTab !== "All"
            ? `&genre=${genre.activeTab}`
            : ""
        }`;
        console.log(url);
        const moviesRes = await fetch(url, options);
        const moviesResult: Response = await moviesRes.json();
        setMovies(moviesResult);
        setIsFetching(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchMovies();
  }, [activePage, genre]);
  return [isFetching, movies];
}

export { useGetMovies };

export const options: OptionsType = {
  method: "GET",
  headers: {
    "x-rapidapi-key": import.meta.env.VITE_API_KEY as string,
    "x-rapidapi-host": "moviesdatabase.p.rapidapi.com",
  },
};
