import { isValidObjectId } from "mongoose";
import User from "../models/User.js";

const getAllUsers = async (req, res) => {
  const users = await User.find().populate("readingList.bookRefId");

  res.status(200).json(users);
};

const createUser = async (req, res) => {
  const { email } = req.sanitizedBody;

  const found = await User.findOne({ email });

  if (found) throw new Error("Email already exists", { cause: 400 });

  const user = await User.create(req.sanitizedBody);

  res.status(201).json(user);
};

const getOneUser = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) throw new Error("Invalid id", { cause: 400 });
  const user = await User.findById(id).populate("readingList.bookRefId");

  if (!user) throw new Error("User not found", { cause: 404 });

  res.status(200).json(user);
};

const updateUser = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) throw new Error("Invalid id", { cause: 400 });

  const user = await User.findByIdAndUpdate(id, req.sanitizedBody, {
    new: true,
  });

  if (!user) throw new Error("User not found", { cause: 404 });

  res.status(200).json(user);
};

const deleteOneUser = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) throw new Error("Invalid id", { cause: 400 });
  const user = await User.findByIdAndDelete(id);

  if (!user) throw new Error("User not found", { cause: 404 });

  res.status(200).json({ message: "User deleted" });
};

const addBookToList = async (req, res) => {
  const { id } = req.params;
  const { bookRefId } = req.sanitizedBody;

  if (!isValidObjectId(id) || !isValidObjectId(bookRefId))
    throw new Error("Invalid id", { cause: 400 });
  const user = await User.findById(id);

  if (!user) throw new Error("User not found", { cause: 404 });

  user.readingList.push(req.sanitizedBody);
  await user.save();

  res.status(200).json(user);
};

const updateBookInList = async (req, res) => {
  const { id, bookId } = req.params;
  const { status } = req.sanitizedBody;
  console.log(req.sanitizedBody);

  if (!isValidObjectId(id) || !isValidObjectId(bookId))
    throw new Error("Invalid id", { cause: 400 });

  const user = await User.findById(id);

  if (!user) throw new Error("User not found", { cause: 404 });

  const book = user.readingList.id(bookId);

  if (!book) throw new Error("Book not found", { cause: 404 });

  book.status = status;
  await user.save();

  res.status(200).json(user);
};

const removeBookFromList = async (req, res) => {
  const { id, bookId } = req.params;

  if (!isValidObjectId(id) || !isValidObjectId(bookId))
    throw new Error("Invalid id", { cause: 400 });

  const user = await User.findById(id);

  if (!user) throw new Error("User not found", { cause: 404 });

  const book = user.readingList.id(bookId);

  if (!book) throw new Error("Book not found", { cause: 404 });

  book.deleteOne();
  await user.save();

  res.status(200).json(user);
};

export {
  addBookToList,
  createUser,
  deleteOneUser,
  getAllUsers,
  getOneUser,
  removeBookFromList,
  updateBookInList,
  updateUser,
};
