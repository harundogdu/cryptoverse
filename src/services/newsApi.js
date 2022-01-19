import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const cryptoNewsHeaders = {
  "x-bingapis-sdk": process.env.REACT_APP_NEWS_API_SDK,
  "x-rapidapi-host": process.env.REACT_APP_NEWS_API_HOST,
  "x-rapidapi-key": process.env.REACT_APP_NEWS_API_KEY,
};

const createRequest = (url) => ({ url, headers: cryptoNewsHeaders });

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_NEWS_API_URL }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory , count  }) =>
        createRequest(
          `/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`
        ),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = newsApi;
