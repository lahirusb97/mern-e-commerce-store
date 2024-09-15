import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#C71585", // Deep Rose
      light: "#E91E63", // Light Rose
      dark: "#A12C58", // Rosewood
    },
    secondary: {
      main: "#FFD700", // Rich Gold
    },
    background: {
      default: "#FAF9F6", // Creamy White
      paper: "#FFFFFF", // White for paper surfaces
    },
    text: {
      primary: "#003366", // Classic Navy Blue
      secondary: "#D8CFC4", // Warm Taupe for secondary text
    },
    action: {
      active: "#C71585", // Deep Rose
      hover: "#E91E63", // Light Rose
    },
  },
  typography: {
    // Add your typography settings here
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#C71585", // Deep Rose
          "&:hover": {
            backgroundColor: "#E91E63", // Light Rose
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#787276", // Rosewood for contrast
            },
            "&:hover fieldset": {
              borderColor: "#C71585", // Deep Rose on hover
            },
            "&.Mui-focused fieldset": {
              borderColor: "#E91E63", // Light Rose when focused
            },
          },
          "& .MuiInputLabel-root": {
            color: "#003366", // Classic Navy Blue
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#E91E63", // Light Rose when focused
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#003366", // Classic Navy Blue
        },
      },
    },
  },
});

export default theme;
