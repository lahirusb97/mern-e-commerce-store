import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(cookieParser()); // Parses cookies to access req.cookies
app.use(
  cors({
    origin: ["http://localhost:5173"], // Allow multiple origins
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true,
  })
);
// Mount the auth routes under /api/auth
app.use("/api/auth", authRoutes);

// Connect to MongoDB and start the server
app.listen(process.env.PORT || 5000, async () => {
  await connectDB(); // Invoke the connection function
  console.log(`Server started on port ${process.env.PORT || 5000}`);
});
