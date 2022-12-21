import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ user, redirectPath = '/login', children }: any) => {
  if (!user || !user.id) {
    return <Navigate to={redirectPath}></Navigate>;
  }

  return children;
};

export default ProtectedRoute;
