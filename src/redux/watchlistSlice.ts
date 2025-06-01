import { createSlice } from "@reduxjs/toolkit";
import type { Result } from "..";
import type { PayloadAction } from "@reduxjs/toolkit";
interface initialStateProps {
  watchlist: Result[];
}
const initialState: initialStateProps = {
  watchlist: [],
};
const watchListSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    setMovie: (state, action: PayloadAction<Result>) => {
      state.watchlist.push(action.payload);
    },
    removeMovie: (state, action: PayloadAction<string>) => {
      state.watchlist = state.watchlist.filter(
        (movie) => movie.id !== action.payload
      );
    },
  },
});

export const { setMovie, removeMovie } = watchListSlice.actions;
export default watchListSlice.reducer;
