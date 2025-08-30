// Import necessary dependencies from React and react-router-dom
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

// Define the props interface for the ProtectedRoute component
interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * ProtectedRoute component that handles authentication-based routing
 * @param {ProtectedRouteProps} props - Component props containing children elements
 * @returns {React.ReactElement} Protected route component
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Get authentication status from UserContext
  const { isAuthenticated } = useUser();
  
  // Redirect to login page if user is not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // Render children components if user is authenticated
  return <>{children}</>;
};

export default ProtectedRoute;