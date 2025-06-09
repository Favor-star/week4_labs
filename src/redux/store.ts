import { combineReducers, configureStore } from "@reduxjs/toolkit";
import moviesSlice from "./moviesSlice";
import watchlistSlice from "./watchlistSlice";
// import { persistConfig } from "../config";
// import { persistReducer } from "redux-persist";

const rootReducer = combineReducers({
  movies: moviesSlice,
  watchlist: watchlistSlice,
});
// const persistedReducer = persistReducer(persistConfig, rootReducer);

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

const store = setupStore(); // for actual app use

export default store;
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
