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