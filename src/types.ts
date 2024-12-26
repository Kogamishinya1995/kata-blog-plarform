import { FieldError } from "react-hook-form";

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

export interface MyTextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  title: string;
  error?: FieldError;
}

export interface ArticleFormProps {
  isEditMode: boolean;
  articleData?: {
    title: string;
    description: string;
    text: string;
    tags: string[];
    slug?: string;
  };
}

export interface ModalComponentProps {
  error?: string | null;
}

export interface MySubmitInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  isValid: boolean;
  isLoading?: boolean;
}

export interface Props {
  children: React.ReactNode;
}

export interface MyInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'color'> {
  title: string;
  error?: FieldError | undefined;
  serverError?: string | undefined;
  size?: 'small' | 'medium';
  color?: 'error' | 'primary' | 'secondary' | 'info' | 'success' | 'warning';
}

export interface ErrorWithMessage {
  message: string;
}
