import React from "react";
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ShoppingBag, DollarSign, Clock, CheckCircle } from "lucide-react";

// Import your theme
import theme from "../theme";

// Mock data for the revenue chart
const revenueData = [
  { name: "Jan", revenue: 4000 },
  { name: "Feb", revenue: 3000 },
  { name: "Mar", revenue: 5000 },
  { name: "Apr", revenue: 4500 },
  { name: "May", revenue: 6000 },
  { name: "Jun", revenue: 5500 },
];

// Statistic Card component
const StatCard = ({ title, value, icon }) => (
  <Paper
    elevation={3}
    sx={{
      p: 3,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      height: "100%",
    }}
  >
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 60,
        height: 60,
        borderRadius: "50%",
        backgroundColor: "secondary.main",
        mb: 2,
      }}
    >
      {icon}
    </Box>
    <Typography variant="h6" component="h2" gutterBottom>
      {title}
    </Typography>
    <Typography variant="h4" component="p" fontWeight="bold">
      {value}
    </Typography>
  </Paper>
);

export default function Dashboard() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          color="primary.main"
        >
          E-commerce Dashboard
        </Typography>

        {/* Statistics Grid */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Items"
              value="1,234"
              icon={<ShoppingBag size={24} />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Sales"
              value="$45,678"
              icon={<DollarSign size={24} />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Pending Orders"
              value="23"
              icon={<Clock size={24} />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Completed Orders"
              value="789"
              icon={<CheckCircle size={24} />}
            />
          </Grid>
        </Grid>

        {/* Revenue Chart */}
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" component="h2" gutterBottom>
            Revenue Overview
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill={theme.palette.primary.main} />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Container>
    </Box>
  );
}
