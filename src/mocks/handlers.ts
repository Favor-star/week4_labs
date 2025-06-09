import { http, HttpResponse } from "msw";

export const movieObject = {
  _id: "",
  id: "12",
  primaryImage: {
    id: "",
    width: 0,
    height: 0,
    url: "",
    caption: {
      plainText: "",
      __typename: "",
    },
    __typename: "",
  },
  titleType: {
    text: "",
    id: "",
    isSeries: false,
    isEpisode: false,
    __typename: "",
  },
  titleText: {
    text: "",
    __typename: "",
  },
  originalTitleText: {
    text: "",
    __typename: "",
  },
  releaseYear: {
    year: 0,
    endYear: 0,
    __typename: "",
  },
  releaseDate: "",
  genres: {
    genres: [{ text: "", id: "", __typename: "" }],
  },
  ratingsSummary: {
    aggregateRating: 0,
    voteCount: 0,
    __typename: "",
  },
};
export const handlers = [
  http.get(`${import.meta.env.VITE_API_URL}/titles/12`, () => {
    console.log("Mocked API call for movie with ID 12");
    return HttpResponse.json(movieObject);
  }),
  http.get(`https://moviesdatabase.p.rapidapi.com/titles`, () => {
    console.log("Mocked API call for movies list");
    return HttpResponse.json([movieObject, movieObject]);
  }),
  http.get("https://moviesdatabase.p.rapidapi.com/titles/utils/genres", () => {
    console.log("Mocked API call for genres");
    return HttpResponse.json([null, "genre1", "genre2", "genre3"]);
  }),
];
