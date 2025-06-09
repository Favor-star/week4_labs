// import { useEffect, useState } from "react";
// import { options } from "../config";

// type GenresResult = {
//   results: string[];
// };

// const useGetGenres = () => {
//   const [genres, setGenres] = useState<GenresResult | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<Error | null>(null);

//   useEffect(() => {
//     (async function () {
//       try {
//         const response = await fetch(
//           `${import.meta.env.VITE_API_URL}/titles/utils/genres`,
//           options
//         );
//         if (!response.ok) throw new Error("Failed to fetch genres");
//         const result: GenresResult = await response.json();
//         setGenres(result);
//       } catch (err) {
//         setError(err as Error);
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, []);

//   return { genres, loading, error };
// };

// export default useGetGenres;
