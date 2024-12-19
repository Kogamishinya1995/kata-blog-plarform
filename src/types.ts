export interface Author {
  bio: string;
  image: string;
  username: string;
  following: boolean;
}

export interface Article {
  body: string;
  slug: string;
  tagList: string[];
  title: string;
  author: Author;
  createdAt: string;
  favorited: boolean;
  updatedAt: string;
  description: string;
  favoritesCount: number;
}

export interface CreateArticleFormData {
  title: string;
  shortDescription: string;
  text: string;
  test: {
    tags: string | string[];
  }[];
}

export interface UpdateUserForm {
  userName: string;
  email: string;
  password: string;
  avatar: string;
}

export interface SignInFormData {
  email: string;
  password: string;
}

export interface SignUpFormData {
  userName: string;
  email: string;
  password: string;
  repeatPassword: string;
  agreement: boolean;
}

export type GetArticlesQueryArgs = {
  offset?: number;
};

export interface ArticleResponse {
  article: Article;
}
export interface UserResponse {
  user: Author;
}

export interface User {
  token: string;
  username: string;
  email: string;
  image?: string;
}

export interface RegisterUser {
  username: string;
  email: string;
  password: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface RegisterResponse {
  user: User;
}

export interface LoginResponse {
  user: User;
}

export interface UpdateUserResponse {
  user: User;
}
