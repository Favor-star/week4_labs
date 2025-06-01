import type { OptionsType } from "..";

export const options: OptionsType = {
  method: "GET",
  headers: {
    "x-rapidapi-key": import.meta.env.VITE_API_KEY as string,
    "x-rapidapi-host": "moviesdatabase.p.rapidapi.com",
  },
};
