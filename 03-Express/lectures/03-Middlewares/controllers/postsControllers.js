import Post from "../models/postModel.js";

export const getAllPosts = async (req, res) => {
  const posts = await Post.findAll();
  if (!posts || posts.length === 0) {
    throw new Error("No Posts found", { cause: 404 });
  }
  return res.status(200).json(posts);
};

export const getPostById = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findByPk(parseInt(id, 10));
  if (!post) {
    throw new Error("Post not found", { cause: 404 });
  }
  return res.status(200).json(post);
};

export const createPost = async (req, res) => {
  const { title, content, author } = req.validatedBody;
  if (!title || !author || !content) {
    throw new Error("Title and content are required", { cause: 400 });
  }
  const newPost = await Post.create({ title, content, author });
  return res.status(201).json(newPost);
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content, author } = req.validatedBody;
  if (!title || !author || !content) {
    throw new Error("Title and content are required", { cause: 400 });
  }
  const post = await Post.findByPk(parseInt(id, 10));

  if (!post) {
    throw new Error("Post not found", { cause: 404 });
  }
  post.title = title;
  post.content = content;
  await post.save();
  return res.status(200).json(post);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findByPk(parseInt(id, 10));
  if (!post) {
    throw new Error("Post not found", { cause: 404 });
  }
  await post.destroy();
  return res.status(204).send(); // No content
};
