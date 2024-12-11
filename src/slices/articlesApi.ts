import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type GetArticlesQueryArgs = {
  offset?: number;
};

export const articlesApi = createApi({
  reducerPath: "articles",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://blog-platform.kata.academy/api",
  }),
  endpoints: (builder) => ({
    getArticles: builder.query<{ articles: any[]; articlesCount: number }, GetArticlesQueryArgs>({
      query: ({ offset = 0 }) => `/articles/?offset=${offset}`,
    }),
    getAnArticle: builder.query<any, string>({
      query: (slug) => `/articles/${slug}`,
    }),
    registerUser: builder.mutation<any, { username: string; email: string; password: string }>({
      query: (newUser) => ({
        url: "/users",
        method: "POST",
        body: { user: newUser },
      }),
    }),
    logInUser: builder.mutation<any, { email: string; password: string }>({
      query: (userData) => ({
        url: "/users/login",
        method: "POST",
        body: { user: userData },
      }),
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useGetAnArticleQuery,
  useRegisterUserMutation,
  useLogInUserMutation,
} = articlesApi;
