import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ user, redirectPath = '/login', children }: any) => {
  if (!user || Object.keys(user).length === 0) {
    return <Navigate to={redirectPath}></Navigate>;
  }

  return children;
};

export default ProtectedRoute;
