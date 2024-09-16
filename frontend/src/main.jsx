import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme.js";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { AuthProvider } from "./context/authContext";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster position="bottom-center" reverseOrder={false} />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
