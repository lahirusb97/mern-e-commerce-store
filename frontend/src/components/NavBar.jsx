import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

const NavBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Navigation links
  const navItems = [
    { label: "Home", path: "/" },
    { label: "Login", path: "/login" },
    { label: "Sign Up", path: "/signup" },
    { label: "Dashboard", path: "/admin" },
  ];
  const filteredNavItems = navItems.filter(
    (item) => !(user && (item.path === "/login" || item.path === "/signup"))
  );
  const drawer = (
    <List>
      {filteredNavItems.map((item, index) => (
        <ListItem
          button
          component={Link}
          to={item.path}
          key={index}
          onClick={handleDrawerToggle}
        >
          <ListItemText primary={item.label} />
        </ListItem>
      ))}
    </List>
  );
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "white", boxShadow: "none" }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Menu Icon for mobile */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: "none" } }}
          >
            <Menu />
          </IconButton>

          {/* Centered Links */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "flex" },
              justifyContent: "center",
            }}
          >
            {filteredNavItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                style={{
                  margin: "0 15px",
                  textDecoration: "none",
                  color: "black",
                  fontSize: "16px",
                }}
              >
                {item.label}
              </Link>
            ))}
            {user && (
              <Link
                onClick={() => {
                  logout();
                }}
              >
                LogOut
              </Link>
            )}
          </Box>

          {/* Empty space on the right to push the links to the center */}
          <Box sx={{ display: { xs: "none", sm: "block" }, width: "48px" }} />
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default NavBar;
