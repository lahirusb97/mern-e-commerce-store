import User from "../models/User.model.js";
import jwt from "jsonwebtoken";
import redist from "../lib/redist.js";
import { response } from "express";
const genarateToken = (useID) => {
  const accessToken = jwt.sign({ useID }, process.env.ACCESS_TOKE, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign({ useID }, process.env.ACCESS_TOKE, {
    expiresIn: "7d",
  });
  return { accessToken, refreshToken };
};

const storeRefreshToken = async (userID, refreshToken) => {
  await redist.set(
    `refreshToken:${userID}`,
    refreshToken,
    "EX",
    7 * 24 * 60 * 60
  );
};

const setCookies = (res, accessToken, refreshToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true, //XSS Attart prevent
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", //CSRF attark prevent
    maxAge: 15 * 60 * 1000,
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};
export const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    const user = await User.create({ name, email, password });
    //authonticate User

    const { accessToken, refreshToken } = genarateToken(user._id);
    storeRefreshToken(user._id, refreshToken);
    setCookies(res, accessToken, refreshToken);
    return res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      message: "User created successfully - " + email,
    });
  } catch (error) {
    console.log("Error in SingUp function:- " + error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const logIn = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      const { accessToken, refreshToken } = genarateToken(user._id);

      await storeRefreshToken(user._id, refreshToken);
      setCookies(res, accessToken, refreshToken);
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.log("Error in Login function:- " + error);

    return res.status(500).json({ message: error.message });
  }
};

export const logOut = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken; // Retrieve the refresh token from cookies

    if (!refreshToken) {
      return res.status(400).json({ message: "No refresh token found" });
    }

    const decoded = jwt.verify(refreshToken, process.env.ACCESS_TOKE); // Verify the refresh token

    // Delete the refresh token from Redis
    await redist.del(`refreshToken:${decoded.useID}`);

    // Clear the access and refresh tokens from cookies
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in Logout function:- " + error);

    return res.status(500).json({ message: error.message });
  }
};
//* refreshing acess token */
export const refreshToken = async (req, res) => {};
