// ProtectedRoute.js
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";
import NavBar from "./NavBar";

// Mock function to check if the user is authenticated

const ProtectedRoute = () => {
  const { user, loading, checkingAuth } = useAuth();
  console.log(user);

  if (checkingAuth) {
    return <div>Loading...</div>;
  }
  return user?.role === "admin" ? (
    <div>
      <NavBar />
      <Outlet />
    </div>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
