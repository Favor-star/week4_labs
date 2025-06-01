import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Result, Response } from "..";
import type { RootState } from "./store";
import { options } from "../config";
type moviesInitialStateProps = {
  movies: Result[];
  filterKey: string;
  searchTerm: string;
  currentPage: number;
  genre: string;
  allGenres: string[];
  isFetchingMovies: boolean;
  isSearching: boolean;
  searchResult: null | Result[];
  singleMovie: null | Result;
  isFetchingError: boolean;
  areGenresFetched: boolean;
};

const initialState: moviesInitialStateProps = {
  movies: [],
  filterKey: "",
  searchTerm: "",
  searchResult: null,
  singleMovie: null,
  currentPage: 1,
  genre: "All",
  allGenres: [],
  isFetchingMovies: false,
  isSearching: false,
  isFetchingError: false,
  areGenresFetched: false,
};

const fetchMovies = createAsyncThunk<Result[], void, { state: RootState }>(
  "movies/fetchMovies",
  async (_, { getState }) => {
    const state = getState();
    const genre = state.movies.genre;
    const activePage = state.movies.currentPage;
    const url = `${
      import.meta.env.VITE_API_URL
    }/titles?limit=20&startYear=2015&endYear=2025&info=base_info&page=${activePage}${
      !genre ? "" : genre !== "All" ? `&genre=${genre}` : ""
    }`;

    const moviesRes = await fetch(url, options);
    const moviesResult: Response = await moviesRes.json();
    const { results } = moviesResult;
    return results;
  }
);
const searchMovies = createAsyncThunk<Result[], void, { state: RootState }>(
  "movies/searchMovies",
  async (_, { getState }) => {
    const state = getState();
    const { searchTerm } = state.movies;
    console.log(searchTerm);
    const url = `${
      import.meta.env.VITE_API_URL
    }/titles/search/title/${searchTerm}?exact=false&info=base_info&limit=20`;

    try {
      const response = await fetch(url, options);
      const result: Response = await response.json();
      const { results } = result;
      return results;
    } catch (error) {
      throw error;
    }
  }
);
const getMovieById = createAsyncThunk<
  Result,
  string | undefined,
  { state: RootState }
>("movies/getMoviesById", async (id, { getState }) => {
  const url = `${import.meta.env.VITE_API_URL}/titles/${id}`;
  try {
    const state = getState();
    const { movies } = state.movies;
    const matchingMovie = movies.find((movie) => movie.id === id);
    if (matchingMovie) return matchingMovie;
    const response = await fetch(url, options);
    const result = await response.json();
    return result.results as Result;
  } catch (error) {
    throw error;
  }
});

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies: (state, action: PayloadAction<Result[]>) => {
      state.movies = action.payload;
    },
    setFilter: (state, action: PayloadAction<string>) => {
      state.filterKey = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setGenre: (state, action: PayloadAction<string>) => {
      state.genre = action.payload;
    },
    setIsFetchingMovies: (state, action: PayloadAction<boolean>) => {
      state.isFetchingMovies = action.payload;
    },
    setIsSearching: (state, action: PayloadAction<boolean>) => {
      state.isSearching = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchMovies.fulfilled,
        (state, action: PayloadAction<Result[]>) => {
          state.movies = action.payload;
          state.isFetchingMovies = false;
          state.isFetchingError = false;
        }
      )
      .addCase(fetchMovies.pending, (state) => {
        state.isFetchingMovies = true;
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.isFetchingMovies = false;
        state.isFetchingError = true;
      })
      .addCase(
        searchMovies.fulfilled,
        (state, action: PayloadAction<Result[]>) => {
          state.isSearching = false;
          state.searchResult = action.payload;
        }
      )
      .addCase(searchMovies.pending, (state) => {
        state.isSearching = true;
      })
      .addCase(searchMovies.rejected, (state) => {
        state.isFetchingError = true;
        state.searchResult = null;
      })
      .addCase(
        getMovieById.fulfilled,
        (state, action: PayloadAction<Result>) => {
          state.singleMovie = action.payload;
          state.isFetchingMovies = false;
          state.isFetchingError = false;
        }
      )
      .addCase(getMovieById.rejected, (state) => {
        state.isFetchingError = true;
        state.isFetchingMovies = false;
        state.singleMovie = null;
      })
      .addCase(getMovieById.pending, (state) => {
        state.isFetchingMovies = true;
        state.isFetchingError = false;
        state.singleMovie = null;
      });
  },
});

export const {
  setMovies,
  setFilter,
  setCurrentPage,
  setSearchTerm,
  setGenre,
  setIsSearching,
  setIsFetchingMovies,
} = moviesSlice.actions;

export default moviesSlice.reducer;
export { fetchMovies, searchMovies, getMovieById };
