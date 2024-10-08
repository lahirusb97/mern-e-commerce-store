import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  TextField,
  Typography,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { Eye, EyeOff } from "lucide";
import theme from "../theme";
import axiosInstance from "../lib/axios";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("@gma1sia4l.com");
  const [password, setPassword] = useState("admin9");
  const { user, setUser, setLoading, loading } = useAuth();
  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = async (event) => {
    event.preventDefault();
  };
  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post("/auth/login", { email, password });
      setUser(res.data);

      if (res.data) {
        navigate("/"); // redirect after setting user

        if (res.data.role === "admin") {
          navigate("/admin"); // additional redirect
        }
      }
      toast.success(res.data?.name || "Login Success");
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        backgroundImage: "url(/bg.jpg)",
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={6} sx={{ p: 4, borderRadius: 2 }}>
          <Box sx={{ mb: 3, textAlign: "center" }}>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{ color: "primary.secondary", fontWeight: "bold" }}
            >
              Welcome Back
            </Typography>
            <Typography variant="body1" sx={{ color: "text.primary" }}>
              Sign in to your account
            </Typography>
          </Box>
          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              required
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              margin="normal"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    ></IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                my: 2,
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{
                      color: "primary.main",
                      "&.Mui-checked": { color: "primary.main" },
                    }}
                  />
                }
                label={
                  <Typography sx={{ color: "text.primary" }}>
                    Remember me
                  </Typography>
                }
              />
              <Link
                href="#"
                variant="body2"
                sx={{
                  color: "primary.main",
                  "&:hover": { color: "primary.light" },
                }}
              >
                Forgot password?
              </Link>
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
              disabled={loading}
            >
              {loading ? "Loading..." : "Sign In"}
            </Button>
          </form>
          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Or continue with
            </Typography>
          </Divider>

          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography variant="body2" sx={{ color: "text.primary" }}>
              Dont have an account?{" "}
              <Link
                href="#"
                variant="body2"
                sx={{
                  color: "primary.main",
                  "&:hover": { color: "primary.light" },
                }}
                onClick={() => navigate("/signup")}
              >
                Sign up
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
