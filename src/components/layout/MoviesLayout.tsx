// import { ChevronLeft, ChevronRight, XIcon } from "lucide-react";

// import Skeleton from "./Skeleton";
// import MoviesCard from "../MoviesCard";
// import useSearchMovies from "../../hooks/useSearchMovies";
// import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
// import { setCurrentPage, setSearchTerm } from "../../redux/moviesSlice";
// import { Outlet } from "react-router";
// import { Children } from "react";

// const MoviesLayout = ({ children }: { children: React.ReactNode }) => {
//   const { movies, isFetchingMovies, searchTerm } = useAppSelector(
//     (state) => state.movies
//   );
//   const dispatch = useAppDispatch();
//   const shouldSearch = searchTerm?.trim() !== "";
//   const searchResults = useSearchMovies(shouldSearch ? searchTerm ?? "" : "");
//   const handleCloseSearch = () => {
//     shouldSearch === false;
//     dispatch(setSearchTerm(""));
//   };

//   return (
//     <div className="w-full text-white py-2 flex flex-col ">
//       <div className="flex-1 w-full ">
//         <div className="w-full flex flex-row justify-between items-center mb-2">
//           <p className="text-xl font-bold pb-3">
//             {shouldSearch && searchResults.searchResult?.results.length !== 0
//               ? `Search results for "${searchTerm}"`
//               : "Trending Movies"}
//           </p>
//           {shouldSearch && (
//             <div
//               className="flex flex-row gap-2 p-2 rounded-lg border border-white"
//               onClick={handleCloseSearch}
//             >
//               <XIcon />
//               <p className="">Close Search</p>
//             </div>
//           )}
//         </div>

//         {/* {shouldSearch ? (
//           searchResults.isSearching ? (
//             <Skeleton />
//           ) : searchResults.searchResult?.results.length === 0 ? (
//             <p>No results found</p>
//           ) : (
//             <MoviesCard movies={searchResults.searchResult?.results ?? []} />
//           )
//         ) : isFetchingMovies || !movies ? (
//           <Skeleton />
//         ) : (
//           <MoviesCard movies={movies} />
//         )} */}
//         {children}
//       </div>

//       <div className="w-full flex pt-5 items-center justify-center">
//         <Pagination />
//       </div>
//     </div>
//   );
// };

// export default MoviesLayout;
