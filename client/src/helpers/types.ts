import { ReactElement } from 'react';

export type ArticleId = number | undefined;
export type SetUser = (user: User) => void;
export type SetArticles = (articles: Article[]) => void;
export type ArticleIdParams = {
  id: string;
};

export interface Article {
  id: ArticleId;
  title: string;
  content: string;
  published: boolean;
  userId: number | undefined;
  user: ArticleUserName;
}

export interface ArticleUserName {
  name: string;
}

export interface ArticlesStoreContext {
  articles?: Article[];
  setArticles?: SetArticles | null;
}

export interface User {
  id: number | undefined;
  email: string;
  name: string;
  password?: string;
  articles?: Article[];
}

export interface Store {
  user: User;
  setUser: SetUser;
  articles: Article[];
  setArticles: SetArticles;
}

export interface UserStoreContext {
  user: User;
  setUser: SetUser;
}

// Component prop types
export interface ArticleProps {
  articles: Article[];
}

export interface ProtectedRouteProps {
  user: User;
  redirectPath?: string;
  children: ReactElement<any, any> | null;
}
