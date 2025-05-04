import { ReactNode } from 'react';
import { Navigate } from 'react-router';
import { useAuth } from './providers/AuthProvider';

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { session, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  if (!session) return <Navigate to="/login" replace />;


  return <>{children}</>;
}