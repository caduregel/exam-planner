import { ReactNode } from 'react';
import { useAuth } from '../components/AuthProvider';
import { Navigate } from 'react-router';

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { session, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  if (!session) return <Navigate to="/login" replace />;


  return <>{children}</>;
}