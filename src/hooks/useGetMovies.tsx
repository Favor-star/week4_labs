// import { useContext, useEffect, useState } from "react";
// import { type Response, type OptionsType, type GetMoviesProps } from "../index";
// import { options } from "../config";
// import { ActiveTab } from "../contexts/GrobalContexts";
// function useGetMovies({
//   activePage,
// }: GetMoviesProps): [boolean, Response | null] {
//   const [movies, setMovies] = useState<Response | null>(null);
//   const [isFetching, setIsFetching] = useState<boolean>(true);
//   const genre = useContext(ActiveTab);
//   useEffect(() => {
//     async function fetchMovies() {
//       try {
//         setIsFetching(true);
//         const url = `${
//           import.meta.env.VITE_API_URL
//         }/titles?limit=20&startYear=2015&endYear=2025&info=base_info&page=${activePage}${
//           !genre
//             ? ""
//             : genre.activeTab !== "All"
//             ? `&genre=${genre.activeTab}`
//             : ""
//         }`;
//         const moviesRes = await fetch(url, options);
//         const moviesResult: Response = await moviesRes.json();
//         setMovies(moviesResult);
//         setIsFetching(false);
//       } catch (error) {
//         console.log(error);
//         setIsFetching(false);
//       }
//     }
//     fetchMovies();
//   }, [activePage, genre]);
//   return [isFetching, movies];
// }

// export { useGetMovies };

