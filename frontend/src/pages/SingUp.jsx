import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  TextField,
  Typography,
  ThemeProvider,
} from "@mui/material";
import { Eye, EyeOff } from "lucide-react";
import theme from "../theme";

export default function SingUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.default",
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
                Create an Account
              </Typography>
              <Typography variant="body1" sx={{ color: "text.primary" }}>
                Sign up to start shopping with us
              </Typography>
            </Box>
            <form>
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                margin="normal"
                required
                autoComplete="name"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "primary.main",
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "primary.main",
                  },
                }}
              />
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                margin="normal"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "primary.main",
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "primary.main",
                  },
                }}
              />
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                margin="normal"
                required
                autoComplete="new-password"
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
                      >
                        {showPassword ? <EyeOff /> : <Eye />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "primary.main",
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "primary.main",
                  },
                }}
              />
              <TextField
                fullWidth
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                variant="outlined"
                margin="normal"
                required
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle confirm password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? <EyeOff /> : <Eye />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "primary.main",
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "primary.main",
                  },
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    sx={{
                      color: "primary.main",
                      "&.Mui-checked": { color: "primary.main" },
                    }}
                  />
                }
                label={
                  <Typography sx={{ color: "text.primary" }}>
                    I agree to the{" "}
                    <Link
                      href="#"
                      variant="body2"
                      sx={{
                        color: "primary.main",
                        "&:hover": { color: "primary.light" },
                      }}
                    >
                      Terms and Conditions
                    </Link>
                  </Typography>
                }
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={!termsAccepted}
                sx={{ mt: 2, mb: 2 }}
              >
                Sign Up
              </Button>
            </form>
            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Or continue with
              </Typography>
            </Divider>

            <Box sx={{ mt: 3, textAlign: "center" }}>
              <Typography variant="body2" sx={{ color: "text.primary" }}>
                Already have an account?{" "}
                <Link
                  href="#"
                  variant="body2"
                  sx={{
                    color: "primary.main",
                    "&:hover": { color: "primary.light" },
                  }}
                >
                  Sign In
                </Link>
              </Typography>
            </Box>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
