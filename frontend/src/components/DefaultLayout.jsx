import axiosInstance from "../lib/axios";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import { Box } from "@mui/material";
import { PowerOff } from "lucide-react";

export default function DefaultLayout() {
  // const { user, token, setUser, setToken } = useStateContext();
  const token = true;
  if (!token) {
    return <Navigate to="/login" />;
  }

  // const onLogout = (ev) => {
  //     ev.preventDefault();
  //     axiosClient.get("/logout").then(() => {
  //         setUser(null);
  //         setToken(null);
  //     });
  // };

  // useEffect(() => {
  //     axiosClient.get("/user").then(({ data }) => {
  //         setUser(data);
  //     });
  // }, []);

  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}
