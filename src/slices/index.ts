import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { articlesApi } from "./articlesApi";
import authReducer from "./authSlice";

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "username", "email", "image"],
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    [articlesApi.reducerPath]: articlesApi.reducer,
    auth: persistedAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(articlesApi.middleware),
});

export const persistor = persistStore(store);
export default store;
