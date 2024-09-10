import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(cookieParser()); // Parses cookies, so you can access req.cookies

// Mount the auth routes under /api/auth
app.use("/api/auth", authRoutes);

// Connect to MongoDB and start the server
app.listen(process.env.PORT || 5000, async () => {
  await connectDB(); // Invoke the connection function
  console.log(`Server started on port ${process.env.PORT || 5000}`);
});
