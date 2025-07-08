import User from "../models/userModel.js";
import { isValidObjectId } from "mongoose";
import * as bcyrpt from "bcrypt";

export const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

export const createUser = async (req, res) => {
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
  res.json(user);
};

export const getUserById = async (req, res) => {
  const {
    params: { id },
  } = req;
  if (!isValidObjectId(id)) {
    throw new Error("Invalid id", { cause: 400 });
  }
  const user = await User.findById(id).select("+password");
  if (!user) throw new Error("User not found", { cause: 404 });
  res.json(user);
};

export const updateUser = async (req, res) => {
  const {
    sanitizedBody,
    params: { id },
  } = req;
  if (!isValidObjectId(id)) {
    throw new Error("Invalid id", { cause: 400 });
  }
  const user = await User.findByIdAndUpdate(id, sanitizedBody, { new: true });
  if (!user) throw new Error("User not found", { cause: 404 });
  res.json(user);
};

export const deleteUser = async (req, res) => {
  const {
    params: { id },
  } = req;
  if (!isValidObjectId(id)) {
    throw new Error("Invalid id", { cause: 400 });
  }
  const user = await User.findByIdAndDelete(id);
  if (!user) throw new Error("User not found", { cause: 404 });
  res.json({ message: "User deleted" });
};
