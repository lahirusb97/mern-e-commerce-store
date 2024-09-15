import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
export const protectRoute = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      return res.status(400).json({ message: "No refresh token found" });
    }
    try {
      const decode = jwt.verify(accessToken, process.env.ACCESS_TOKE);
      //finding it inside the database
      const user = await User.findById(decode.useID).select("-password");

      if (!user) {
        return res.status(401).json({ message: "user not found" });
      }
      //setting user to next function
      req.user = user;
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "token expired" });
      }
      throw error;
    }
  } catch (error) {
    console.log("Error In Midleware : ", error.message);

    return res.status(401).json({ message: error.message });
  }
};
export const adminRoute = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
