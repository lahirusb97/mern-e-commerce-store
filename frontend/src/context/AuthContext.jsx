import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "../lib/axios";

// Create Auth Context
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Sign-up function
  const signup = async ({ name, email, password, confirmPassword }) => {
    setLoading(true);

    if (password !== confirmPassword) {
      setLoading(false);
      return toast.error("Passwords do not match");
    }

    try {
      const res = await axios.post("/auth/signup", { name, email, password });
      setUser(res.data);
    } catch (error) {
      // toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Login function
  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await axios.post("/auth/login", { email, password });

      setUser(res.data);
    } catch (error) {
      // toast.error(error.response?.data?.message || "An error occurred");
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
      // toast.error(
      //   error.response?.data?.message || "An error occurred during logout"
      // );
    }
  };

  // Refresh Token function

  // Check authentication on page load
  const checkAuth = async () => {
    setCheckingAuth(true);
    try {
      const res = await axios.get("/auth/profile");
      setUser(res.data);
    } catch (error) {
      console.log(error.message);
      setUser(null);
    } finally {
      setCheckingAuth(false);
    }
  };

  useEffect(() => {
    checkAuth(); // Check auth when the component mounts
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signup,
        login,
        logout,
        checkingAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Helper to use auth context
export const useAuth = () => useContext(AuthContext);
