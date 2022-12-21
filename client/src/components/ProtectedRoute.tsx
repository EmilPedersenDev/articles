import { FunctionComponent } from 'react';
import { Navigate } from 'react-router-dom';
import { ProtectedRouteProps } from '../helpers/types';

const ProtectedRoute: FunctionComponent<ProtectedRouteProps> = ({ user, redirectPath = '/login', children }) => {
  if (!user || !user.id) {
    return <Navigate to={redirectPath}></Navigate>;
  }

  return children;
};

export default ProtectedRoute;
