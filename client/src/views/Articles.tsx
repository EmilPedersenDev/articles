import '../assets/styles/articles.scss';
import apiClient from '../services/api';
import { Article } from '../helpers/types';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../App';
import { showNotification } from '@mantine/notifications';
import { FunctionComponent, useContext, useEffect } from 'react';
import { Button } from '@mantine/core';

const Articles: FunctionComponent = () => {
  const { articles, setArticles }: any = useContext(StoreContext);
  const navigate = useNavigate();

  const getAllArticles = async (): Promise<void> => {
    try {
      const { data }: { data: Article[] } = await apiClient.get('/api/v1/articles');
      setArticles([...data]);
    } catch (error: any) {
      console.error(error);
      showNotification({ message: error?.response?.data?.message || error, color: 'red' });
    }
  };

  useEffect((): void => {
    getAllArticles();
  }, []);

  const goToCreateArticle = (): void => {
    navigate('/articles/create');
  };

  return (
    <section id="articles" className="container">
      <ul className="articles__list">
        {articles.map((article: Article, i: number) => (
          <li className="articles__list-item" key={i}>
            {article.id ? (
              <Link to={`/articles/${article.id.toString()}`} className="article">
                {article.title}
              </Link>
            ) : (
              <Link to={`/`} className="article">
                {article.title}
              </Link>
            )}
          </li>
        ))}
      </ul>
      <div className="create-article-link">
        <Button mt="lg" onClick={goToCreateArticle}>
          Create your own article
        </Button>
      </div>
    </section>
  );
};

export default Articles;
