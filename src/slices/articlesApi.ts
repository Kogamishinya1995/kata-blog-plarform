import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  GetArticlesQueryArgs,
  Article,
  ArticleResponse,
  RegisterResponse,
  LoginResponse,
  UpdateUserResponse,
} from "../types";

import { RootState } from ".";

export const articlesApi = createApi({
  reducerPath: "articles",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://blog-platform.kata.academy/api",
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth.token;

      if (token) {
        headers.set("Authorization", `Token ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Article", "Articles"],
  endpoints: (builder) => ({
    getArticles: builder.query<
      { articles: Article[]; articlesCount: number },
      GetArticlesQueryArgs
    >({
      query: ({ offset = 0 }) => `/articles/?offset=${offset}`,
      providesTags: ["Articles"],
    }),
    getAnArticle: builder.query<ArticleResponse, string>({
      query: (slug) => `/articles/${slug}`,
      providesTags: (_, __, slug) => [{ type: "Article", id: slug }],
      keepUnusedDataFor: 0,
    }),
    registerUser: builder.mutation<
      RegisterResponse,
      { username: string; email: string; password: string }
    >({
      query: (newUser) => ({
        url: "/users",
        method: "POST",
        body: { user: newUser },
      }),
    }),
    logInUser: builder.mutation<
      LoginResponse,
      { email: string; password: string }
    >({
      query: (userData) => ({
        url: "/users/login",
        method: "POST",
        body: { user: userData },
        invalidatesTags: ["Articles"],
      }),
    }),
    updateUser: builder.mutation<
      UpdateUserResponse,
      {
        user: {
          email: string;
          password: string;
          username: string;
          image: string;
        };
        token: string | null;
      }
    >({
      query: ({ user }) => ({
        url: "/user",
        method: "PUT",
        body: { user },
      }),
    }),
    createArticle: builder.mutation<
      ArticleResponse,
      {
        article: {
          title: string;
          description: string;
          body: string;
          tagList: string[];
        };
        token: string | null;
      }
    >({
      query: ({ article }) => ({
        url: "/articles",
        method: "POST",
        body: { article: article },
        invalidatesTags: ["Articles"],
      }),
    }),
    updateArticle: builder.mutation<
      ArticleResponse,
      {
        article: {
          title: string;
          description: string;
          body: string;
          tagList: string[];
        };
        token: string | null;
        slug: string;
      }
    >({
      query: ({ article, slug }) => ({
        url: `/articles/${slug}`,
        method: "PUT",
        body: { article: article },
      }),
    }),
    deleteArticle: builder.mutation({
      query: ({ slug }) => ({
        url: `/articles/${slug}`,
        method: "DELETE",
      }),
    }),
    favoriteArticle: builder.mutation({
      query: ({ slug }) => ({
        url: `/articles/${slug}/favorite`,
        method: "POST",
      }),
    }),
    unfavoriteArticle: builder.mutation({
      query: ({ slug }) => ({
        url: `/articles/${slug}/favorite`,
        method: "DELETE",
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
  useUpdateArticleMutation,
  useDeleteArticleMutation,
  useFavoriteArticleMutation,
  useUnfavoriteArticleMutation,
} = articlesApi;
