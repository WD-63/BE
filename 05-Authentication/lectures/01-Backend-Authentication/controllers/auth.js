import User from "../models/userModel.js";
import { isValidObjectId } from "mongoose";
import * as bcyrpt from "bcrypt";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;
const tokenOptions = { expiresIn: "6d" };
const isProduction = process.env.NODE_ENV === "production";
const cookieOptions = {
  httpOnly: true,
  sameSite: isProduction ? "None" : "Lax",
  secure: isProduction,
};

export const signup = async (req, res) => {
  const {
    sanitizedBody: { email, password },
  } = req;

  const found = await User.findOne({ email });

  if (found)
    throw new Error("User with that email already exists", { cause: 400 });

  const hashedPassword = await bcyrpt.hash(password, 10);

  const user = await User.create({
    ...req.sanitizedBody,
    password: hashedPassword,
  });

  const payload = { userId: user._id };

  const token = jwt.sign(payload, secret, tokenOptions);

  res.cookie("token", token, cookieOptions);

  res.status(201).json({ success: "Welcome" });
};

export const signin = async (req, res) => {
  const {
    sanitizedBody: { email, password },
  } = req;

  const user = await User.findOne({ email }).select("+password");

  if (!user)
    throw new Error("User with that email does not exist", { cause: 404 });

  const passwordMatch = await bcyrpt.compare(password, user.password);

  if (!passwordMatch) throw new Error("Invalid credentials", { cause: 401 });

  const payload = { userId: user._id };

  const token = jwt.sign(payload, secret, tokenOptions);

  res.cookie("token", token, cookieOptions);

  res.status(200).json({ success: "Welcome back!" });
};

export const me = async (req, res) => {
  const { userId } = req;

  if (!isValidObjectId(userId)) {
    throw new Error("Invalid id", { cause: 400 });
  }

  const user = await User.findById(userId);

  if (!user) throw new Error("User not found", { cause: 404 });

  res.status(200).json(user);
};
