import React from 'react';
import { Navigate } from 'react-router-dom';

// We change JSX.Element to React.ReactNode
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // Check if the userName exists in localStorage
  const isAuthenticated = localStorage.getItem('userName');

  if (!isAuthenticated) {
    // If not authenticated, redirect to login page
    return <Navigate to="/signin" replace />;
  }

  // If authenticated, render the child component
  // We wrap in a fragment <> </> to ensure TypeScript is happy with the return type
  return <>{children}</>;
};

export default ProtectedRoute;