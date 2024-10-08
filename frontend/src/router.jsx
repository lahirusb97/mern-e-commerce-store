import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";

import Dashboard from "./pages/Dashboard";

import SingUp from "./pages/SingUp";
import ProtectedRoute from "./components/ProtectedRoute";
import DefaultLayout from "./components/DefaultLayout";
import NavBar from "./components/NavBar";

// Layout for admin routes

// Create router with routes
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <NavBar />
        <Home />
      </div>
    ),
    index: true,
  },

  {
    path: "/login",
    element: (
      <div>
        <Login />
      </div>
    ),
  },
  {
    path: "/signup",
    element: (
      <div>
        <SingUp />
      </div>
    ),
  },

  {
    path: "/admin",
    element: <ProtectedRoute />, // Wrap with ProtectedRoute for authentication check
    children: [
      {
        path: "/admin",
        element: <Dashboard />,
      },
      {
        path: "create",
        element: <>create</>,
      },
    ],
  },
  {
    path: "*",
    element: <p>404 Error - Nothing here...</p>,
  },
]);

export default router;
