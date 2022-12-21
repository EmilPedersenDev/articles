import Article from './views/Article';
import Articles from './views/Articles';
import apiClient from './services/api';
import CreateArticle from './views/CreateArticle';
import Login from './views/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Signup from './views/Signup';
import { Article as ArticleType, Store, User } from './helpers/types';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { createContext } from 'react';
import { showNotification } from '@mantine/notifications';
import { defaultUserModel } from './helpers/defaults';

export const StoreContext = createContext<Store | null>(null);
function App() {
  const [user, setUser] = useState<User>(defaultUserModel);
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const authRoutes = ['/login', '/signup'];

  const fetchUser = async (): Promise<void> => {
    setLoading(true);
    try {
      const { data }: { data: User } = await apiClient.get('/api/v1/users');
      setUser({ ...user, ...data });

      if (authRoutes.includes(location.pathname)) {
        navigate('/');
      } else {
        navigate(location.pathname);
      }
    } catch (error: any) {
      console.error(error);
      showNotification({ message: error?.response?.data?.message || error.message, color: 'red' });
    } finally {
      setLoading(false);
    }
  };

  useEffect((): void => {
    fetchUser();
  }, []);

  return (
    <div className="App">
      {loading ? (
        <div className="loader"></div>
      ) : (
        <StoreContext.Provider value={{ user, setUser, articles, setArticles }}>
          <Routes>
            <Route index path="/" element={<Navigate to="/articles" />} />
            <Route
              path="/articles"
              element={
                <ProtectedRoute user={user}>
                  <Articles />
                </ProtectedRoute>
              }
            />
            <Route
              path="/articles/:id"
              element={
                <ProtectedRoute user={user}>
                  <Article articles={articles} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/articles/create"
              element={
                <ProtectedRoute user={user}>
                  <CreateArticle />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<h1>There's nothing here: 404!</h1>} />
          </Routes>
        </StoreContext.Provider>
      )}
    </div>
  );
}

export default App;
