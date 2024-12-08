import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type GetArticlesQueryArgs = {
  offset?: number;
};

export const articlesApi = createApi({
  reducerPath: "articles",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://blog-platform.kata.academy/api/articles",
  }),
  endpoints: (builder) => ({
    getArticles: builder.query<any, GetArticlesQueryArgs>({
      query: ({ offset = 0 }) => `?offset=${offset}`,
    }),
    getAnArticle: builder.query({
      query: (slug) => `/${slug}`,
    }),
  }),
});

export const { useGetArticlesQuery, useGetAnArticleQuery } = articlesApi;
