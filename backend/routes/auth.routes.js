import express from "express";
import {
  logIn,
  logOut,
  signUp,
  refreshToken,
  getProfile,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// Define the signup route
router.post("/signup", signUp);
router.post("/login", logIn);
router.post("/logout", logOut);
router.post("/refresh-token", refreshToken);
router.get("/profile", protectRoute, getProfile);

export default router;
