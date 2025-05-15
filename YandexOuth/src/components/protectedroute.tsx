import { Navigate, Outlet } from 'react-router-dom';

import { useAuthStore } from '../store/authstore';

interface ProtectedRouteProps {
  requiredPermission?: string;
}

export const ProtectedRoute = ({ requiredPermission }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, hasPermission } = useAuthStore();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};
