export const defaultArticleModel = {
  id: undefined,
  title: '',
  content: '',
  published: false,
  userId: undefined,
  user: {
    name: '',
  },
};

export const defaultUserModel = {
  id: undefined,
  email: '',
  name: '',
  password: '',
  articles: [],
};
