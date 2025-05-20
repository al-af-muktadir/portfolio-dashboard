import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./apis/baseApi/BaseApi";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(baseApi.middleware),
});
