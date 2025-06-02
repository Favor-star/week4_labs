export interface Result {
  _id: string;
  id: string;
  primaryImage: {
    id: string;
    width: number;
    height: number;
    url: string;
    caption: {
      plainText: string;
      __typename: string;
    };
    __typename: string;
  };
  titleType: {
    text: string;
    id: string;
    isSeries: boolean;
    isEpisode: boolean;
    __typename: string;
  };
  titleText: {
    text: string;
    __typename: string;
  };
  originalTitleText: {
    text: string;
    __typename: string;
  };
  releaseYear: {
    year: number;
    endYear: number | null;
    __typename: string;
  };
  releaseDate: string | null;
  genres: {
    genres: { text: string; id: string; __typename: string }[];
  };
  ratingsSummary: {
    aggregateRating: number;
    voteCount: number;
    __typename: string;
  };
}

export interface Response {
  page: number;
  next: string;
  entries: number;
  results: Result[];
}
export type OptionsType = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  headers: {
    "x-rapidapi-key": string;
    "x-rapidapi-host": string;
    [key: string]: string;
  };
};

export type GetMoviesProps = {
  activePage: number;
  genre?: string;
};
export type GenresResult = {
  results: string[];
};
