import react from "react";
import { useAuth } from "./context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute  ({ children }){
    const { isAuthenticated, loading } = useAuth();
  
    if (loading) {
      return <div>Loading...</div>; // Optional: show spinner
    }
  
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
  
    return children;
  }