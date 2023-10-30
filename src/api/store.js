import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import customerReducer from "./slice/customerSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    customer: customerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
