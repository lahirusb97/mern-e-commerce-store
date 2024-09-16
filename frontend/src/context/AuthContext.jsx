import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";
// Create Auth Context
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Sign-up function
  const signup = async ({ name, email, password, confirmPassword }) => {
    setLoading(true);

    if (password !== confirmPassword) {
      setLoading(false);
    }

    try {
      const res = await axios.post("/auth/signup", { name, email, password });
      setUser(res.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await axios.post("/auth/logout");
      setUser(null);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred during logout"
      );
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signup,
        setLoading,
        setUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Helper to use auth context
export const useAuth = () => useContext(AuthContext);
