import { createSlice } from "@reduxjs/toolkit";
import type { Result } from "..";
import type { PayloadAction } from "@reduxjs/toolkit";
interface initialStateProps {
  watchlist: Result[];
  watchlistIds: string[];
}
const initialState: initialStateProps = {
  watchlist: [],
  watchlistIds: [],
};
const watchListSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    addToWatchlist: (state, action: PayloadAction<Result>) => {
      state.watchlist.push(action.payload);
    },
    removeFromWatchlist: (state, action: PayloadAction<string>) => {
      state.watchlist = state.watchlist.filter(
        (movie) => movie.id !== action.payload
      );
      state.watchlistIds = state.watchlistIds.filter(
        (id) => id !== action.payload
      );
    },
    addwatchlistId: (state, action: PayloadAction<string>) => {
      state.watchlistIds.push(action.payload);
    },
  },
});

export const { addToWatchlist, removeFromWatchlist, addwatchlistId } =
  watchListSlice.actions;
export default watchListSlice.reducer;
