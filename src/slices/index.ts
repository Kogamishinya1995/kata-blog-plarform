import { configureStore } from "@reduxjs/toolkit";
import { articlesApi } from './articlesApi.ts';

const store = configureStore({
  reducer: {
    [articlesApi.reducerPath]: articlesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(articlesApi.middleware),
});

export type AppDispatch = typeof store.dispatch;

export default store;
