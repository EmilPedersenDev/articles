import '../assets/styles/article.scss';
import apiClient from '../services/api';
import BackButton from '../components/BackButton';
import { Article as ArticleType, ArticleIdParams, ArticleProps } from '../helpers/types';
import { defaultArticleModel } from '../helpers/defaults';
import { showNotification } from '@mantine/notifications';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Article = ({ articles }: ArticleProps) => {
  const { id } = useParams<ArticleIdParams>();
  const [article, setArticle] = useState<ArticleType>(defaultArticleModel);

  const getArticleFromApi = async (): Promise<void> => {
    try {
      const { data }: { data: ArticleType } = await apiClient.get(`/api/v1/articles/${id}`);
      const articleResponse: ArticleType = Object.assign({}, data);
      setArticle(articleResponse);
    } catch (error: any) {
      console.error(error);
      showNotification({ message: error?.response?.data?.message || error, color: 'red' });
    }
  };

  const findArticle = (id: any): void => {
    const selectedArticle: ArticleType | undefined = articles.find((article) => article.id === parseInt(id));
    setArticle(Object.assign({}, selectedArticle));
  };

  useEffect((): void => {
    if (!id) return;
    if (!articles || Object.keys(articles).length === 0) {
      getArticleFromApi();
    } else {
      findArticle(id);
    }
  }, []);

  return (
    <section id="article">
      <BackButton />
      <h1>{article.title} </h1>
      <p> {article.content} </p>
      <p className="article__author">Author: {article.user.name} </p>
    </section>
  );
};

export default Article;
