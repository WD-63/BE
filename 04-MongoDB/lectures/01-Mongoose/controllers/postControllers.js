import { isValidObjectId } from "mongoose";
import Post from "../models/postModel.js";

export const getAllPosts = async (req, res) => {
  const posts = await Post.find().populate("user", "firstName lastName");
  if (!posts) {
    throw new Error("No Posts found", { cause: 404 });
  }
  return res.status(200).json(posts);
};

export const getPostById = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    throw new Error("Invalid id", { cause: 400 });
  }
  const post = await Post.findById(id).populate("user", "firstName lastName");
  if (!post) {
    throw new Error("Post not found", { cause: 404 });
  }
  return res.status(200).json(post);
};

export const createPost = async (req, res) => {
  const { title, content, user } = req.sanitizedBody;
  const newPost = await Post.create({ title, content, user });
  return res.status(201).json(newPost);
};

export const updatePost = async (req, res) => {
  const {
    sanitizedBody,
    params: { id },
  } = req;
  if (!isValidObjectId(id)) {
    throw new Error("Invalid id", { cause: 400 });
  }
  const post = await Post.findByIdAndUpdate(id, sanitizedBody, { new: true });
  if (!post) {
    throw new Error("Post not found", { cause: 404 });
  }
  return res.status(200).json(post);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    throw new Error("Invalid id", { cause: 400 });
  }
  const post = await Post.findByIdAndDelete(id);
  if (!post) {
    throw new Error("Post not found", { cause: 404 });
  }
  return res.status(200).json({ message: "Post deleted" });
};
