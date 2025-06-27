import { client } from '../DB/DBconnection.js';

export const getAllPosts = async (req, res) => {
	try {
		const results = await client.query('SELECT * FROM posts');
		const posts = results.rows;
		if (posts.length === 0) {
			return res.status(404).json({ message: 'No posts found' });
		}
		return res.status(200).json(posts);
	} catch (error) {
		console.error('Error fetching posts:', error);
		return res.status(500).json({ message: 'Internal server error' });
	}
};

export const getPostById = (req, res) => {
	const { id } = req.params;
	const post = posts.find((p) => p.id === parseInt(id));
	if (!post) {
		return res.status(404).json({ message: 'Post not found' });
	}
	res.json(post);
};

export const createPost = async (req, res) => {
	try {
		const { title, author, content } = req.body;
		if (!title || !author || !content) {
			return res
				.status(400)
				.json({ message: 'Title, author and content are required' });
		}
		const results = await client.query(
			'INSERT INTO posts (title, author, content) VALUES ($1, $2, $3) RETURNING *',
			[title, author, content]
		);
		return res.status(201).json(results.rows[0]);
	} catch (error) {
		console.error('Error creating post:', error);
		return res.status(500).json({ message: 'Internal server error' });
	}
};

export const updatePost = (req, res) => {
	const { id } = req.params;
	const { title, content } = req.body;
	const postIndex = posts.findIndex((p) => p.id === parseInt(id));
	if (postIndex === -1) {
		return res.status(404).json({ message: 'Post not found' });
	}
	if (!title || !content) {
		return res.status(400).json({ message: 'Title and content are required' });
	}
	posts[postIndex] = { id: parseInt(id), title, content };
	res.json(posts[postIndex]);
};

export const deletePost = (req, res) => {
	const { id } = req.params;
	const postIndex = posts.findIndex((p) => p.id === parseInt(id));
	if (postIndex === -1) {
		return res.status(404).json({ message: 'Post not found' });
	}
	res.send('Post deleted successfully');
};
