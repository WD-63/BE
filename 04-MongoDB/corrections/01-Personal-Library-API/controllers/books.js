import { isValidObjectId } from "mongoose";
import Book from "../models/Book.js";

const getAllBooks = async (req, res) => {
  const books = await Book.find();

  if (!books.length) {
    return res.status(200).json({ msg: "No books in the DB" });
  }

  res.status(200).json(books);
};

const createBook = async (req, res) => {
  const { isbn } = req.sanitizedBody;

  const found = await Book.findOne({ isbn });

  if (found) throw new Error("Book already exists", { cause: 400 });

  const book = await Book.create(req.sanitizedBody);

  res.status(201).json(book);
};

const getOneBook = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) throw new Error("Invalid id", { cause: 400 });

  const book = await Book.findById(id);

  if (!book) throw new Error("Book not found", { cause: 404 });

  res.status(200).json(book);
};

const updateBook = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) throw new Error("Invalid id", { cause: 400 });

  const book = await Book.findByIdAndUpdate(id, req.sanitizedBody, {
    new: true,
  });

  if (!book) throw new Error("Book not found", { cause: 404 });

  res.status(200).json(book);
};

const deleteOneBook = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) throw new Error("Invalid id", { cause: 400 });

  const book = await Book.findByIdAndDelete(id);

  if (!book) throw new Error("Book not found", { cause: 404 });

  res.status(200).json({
    message: "Book deleted successfully",
  });
};

export { createBook, deleteOneBook, getAllBooks, getOneBook, updateBook };
