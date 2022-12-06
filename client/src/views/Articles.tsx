import { useEffect, useState } from 'react';
import apiClient from '../services/api';
import { useNavigate } from 'react-router-dom';

interface Article {
  title: string;
  content: string;
}
const Articles = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  useEffect(() => {
    apiClient
      .get('/api/v1/users')
      .then((result) => {
        setArticles([...articles, result.data.articles]);
      })
      .catch((err) => {
        navigate(`/login`);
      });
  }, []);
  return <div>Articles</div>;
};

export default Articles;
