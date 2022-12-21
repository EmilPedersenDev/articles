import '../assets/styles/articles.scss';
import apiClient from '../services/api';
import { Article } from '../helpers/types';
import { Link } from 'react-router-dom';
import { StoreContext } from '../App';
import { showNotification } from '@mantine/notifications';
import { useContext, useEffect } from 'react';

const Articles = () => {
  const { articles, setArticles }: any = useContext(StoreContext);

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

  return (
    <section id="articles">
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
      <Link to={'/articles/create'}>Create your own article here</Link>
    </section>
  );
};

export default Articles;
