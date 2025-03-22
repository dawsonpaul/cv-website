"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import SecretCodeEntry from "./SecretCodeEntry";

// Define the shape of our context
interface AuthContextType {
  isAuthenticated: boolean;
  authenticate: () => void;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  authenticate: () => {},
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if the user is already authenticated on mount
  useEffect(() => {
    const checkAuth = () => {
      const authenticated = localStorage.getItem("isAuthenticated") === "true";
      setIsAuthenticated(authenticated);
      setIsLoading(false);
    };

    // Add a small delay to allow for the page to load and show the animation
    const timer = setTimeout(checkAuth, 500);
    return () => clearTimeout(timer);
  }, []);

  const authenticate = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background-dark">
        <div className="w-16 h-16 border-4 border-primary-light border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, authenticate }}>
      {!isAuthenticated ? (
        <SecretCodeEntry onCodeVerified={authenticate} />
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
