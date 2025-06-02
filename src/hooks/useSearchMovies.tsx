import { useEffect, useState } from "react";
import { options } from "../config";
import type { Response } from "..";

function useSearchMovies(searchTerm: string) {
  const [isSearching, setIsSearching] = useState<boolean>(true);
  const [searchResult, setSearchResult] = useState<Response | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    (async function () {
      if (searchTerm === "") {
        setIsSearching(false);
        return;
      }
      const url = `${
        import.meta.env.VITE_API_URL
      }/titles/search/title/${searchTerm}?exact=false&info=base_info&limit=20`;
      try {
        const response = await fetch(url, options);
        const result: Response = await response.json();
        setSearchResult(result);
        setIsSearching(false);
        console.log(result);
      } catch (error) {
        setIsSearching(false);
        setError((error as Error).message);
      }
    })();
  }, [searchTerm]);
  return { isSearching, searchResult, error };
}

export default useSearchMovies;
