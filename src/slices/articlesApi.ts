import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const articlesApi = createApi({
  reducerPath: "articles",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://blog-platform.kata.academy/api/articles",
  }),
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: () => "",
    }),
    getAnArticle: builder.query({
      query: (slug) => `/${slug}`,
    }),
  }),
});

export const { useGetArticlesQuery, useGetAnArticleQuery } = articlesApi;
