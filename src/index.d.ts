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
  titletype: {
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
}

export interface Response {
  page: number;
  next: string;
  entries: number;
  results: Result[];
}
