import { isValidObjectId } from "mongoose";
import User from "../models/userModel.js";

export const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
};

export const createUser = async (req, res) => {
  const {
    sanitizedBody: { email },
  } = req;
  const found = await User.findOne({ email });
  if (found)
    throw new Error("User with that email already exists", { cause: 400 });
  const user = await User.create(req.sanitizedBody);
  res.status(201).json(user);
};

export const getUserById = async (req, res) => {
  const {
    params: { id },
  } = req;
  if (!isValidObjectId(id)) {
    throw new Error("Invalid id", { cause: 400 });
  }
  const user = await User.findById(id);
  if (!user) throw new Error("User not found", { cause: 404 });
  res.status(200).json(user);
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
  res.status(200).json(user);
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
  res.status(200).json({ message: "User deleted" });
};
