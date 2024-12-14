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
    updateUser: builder.mutation<any, { user: { email: string; password: string; username: string; image: string }; token: string }>({
      query: ({ user, token }) => ({
        url: "/user",
        method: "PUT",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        body: { user },
      }),
    }),
    createArticle: builder.mutation<any, { article: { title: string; description: string; body: string; tagList: string[] }; token: string }>({
      query: ({ article, token }) => ({
        url: "/articles",
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        body: { article: article },
      }),
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useGetAnArticleQuery,
  useRegisterUserMutation,
  useLogInUserMutation,
  useUpdateUserMutation,
  useCreateArticleMutation,
} = articlesApi;
