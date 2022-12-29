import { Article, User } from './types';

export const defaultArticleModel: Article = {
  id: undefined,
  title: '',
  content: '',
  published: false,
  userId: undefined,
  user: {
    name: '',
  },
};

export const defaultUserModel: User = {
  id: undefined,
  email: '',
  name: '',
  password: '',
  articles: [],
};
