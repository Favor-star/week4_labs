import { configureStore } from "@reduxjs/toolkit";
import moviesSlice from "./moviesSlice";
import watchlistSlice from "./watchlistSlice";
const store = configureStore({
  reducer: {
    movies: moviesSlice,
    watchlist: watchlistSlice,
  },
});
export default store;
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
