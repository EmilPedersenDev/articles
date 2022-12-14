import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Login from './views/Login';
import Signup from './views/Signup';
import Articles from './views/Articles';
import CreateArticle from './views/CreateArticle';
import ProtectedRoute from './components/ProtectedRoute';
import { useEffect, useState } from 'react';
import apiClient from './services/api';
import { createContext } from 'react';
export const UserContext: any = createContext(null);
function App() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const authRoutes = ['/login', '/signup'];

  const fetchUser = () => {
    setLoading(true);
    apiClient
      .get('/api/v1/users')
      .then((result) => {
        setUser({ ...user, ...result.data.data.user });

        if (authRoutes.includes(location.pathname)) {
          navigate('/');
        } else {
          navigate(location.pathname);
        }
      })
      .catch((err) => {
        console.error(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <div className="App">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <UserContext.Provider value={{ user, setUser }}>
          <Routes>
            <Route
              index
              path="/"
              element={
                <ProtectedRoute user={user} loading={loading}>
                  <Articles />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/create-article"
              element={
                <ProtectedRoute user={user} loading={loading}>
                  <CreateArticle />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<h1>There's nothing here: 404!</h1>} />
          </Routes>
        </UserContext.Provider>
      )}
    </div>
  );
}

export default App;
