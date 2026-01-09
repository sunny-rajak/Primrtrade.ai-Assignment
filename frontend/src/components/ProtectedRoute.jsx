import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  // 1. If auth is still loading (checking localStorage), show nothing or a spinner
  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  // 2. If loading is done and no user is found, Redirect to Login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 3. If user exists, render the Dashboard (children)
  return children;
};

export default ProtectedRoute;
