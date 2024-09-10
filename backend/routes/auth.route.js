import express from "express";
import {
  logIn,
  logOut,
  signUp,
  refreshToken,
} from "../controllers/auth.controller.js";

const router = express.Router();

// Define the signup route
router.post("/signup", signUp);
router.post("/login", logIn);
router.post("/logout", logOut);
router.post("/refresh-token", refreshToken);

export default router;
