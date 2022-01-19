import { configureStore } from "@reduxjs/toolkit";
import { cryptoApi } from "services/cryptoApi";
import { newsApi } from "services/newsApi";
export default configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cryptoApi.middleware, newsApi.middleware),
});
