// App.js
import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import DefaultLayout from "./components/DefaultLayout";
import Home from "./pages/Home";
import GuestLayout from "./components/GuestLayout";
import Login from "./pages/Login";
import SingUp from "./pages/SingUp";
import Dashboard from "./pages/Dashboard";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <SingUp />,
        },
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/admin",
          element: <Dashboard />,
          children: [
            {
              path: "/dashboard",
              element: <Dashboard />,
            },
          ],
        },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
