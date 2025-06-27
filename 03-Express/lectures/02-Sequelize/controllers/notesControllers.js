import Note from '../models/noteModel.js';

const getAllNotes = async (req, res) => {
	try {
		const notes = await Note.findAll();
		if (!notes || notes.length === 0) {
			return res.status(404).json({ message: 'No notes found' });
		}
		return res.status(200).json(notes);
	} catch (error) {
		console.error('Error fetching notes:', error);
		return res.status(500).json({ message: 'Internal server error' });
	}
};
const getNoteById = async (req, res) => {
	try {
		const { id } = req.params;
		const note = await Note.findByPk(parseInt(id, 10));
		if (!note) {
			return res.status(404).json({ message: 'Note not found' });
		}
		return res.status(200).json(note);
	} catch (error) {
		console.error('Error fetching note by ID:', error);
		return res.status(500).json({ message: 'Internal server error' });
	}
};

const createNote = async (req, res) => {
	try {
		const { title, content } = req.body;
		if (!title || !content) {
			return res
				.status(400)
				.json({ message: 'Title and content are required' });
		}
		const newNote = await Note.create({ title, content });
		return res.status(201).json(newNote);
	} catch (error) {
		console.error('Error creating note:', error);
		return res.status(500).json({ message: 'Internal server error' });
	}
};

const updateNote = async (req, res) => {
	try {
		const { id } = req.params;
		const { title, content } = req.body;
		if (!title || !content) {
			return res
				.status(400)
				.json({ message: 'Title and content are required' });
		}
		const note = await Note.findByPk(parseInt(id, 10));
		if (!note) {
			return res.status(404).json({ message: 'Note not found' });
		}
		note.title = title;
		note.content = content;
		await note.save();
		// const updatedNote = await note.update({ title, content });
		return res.status(200).json(note);
	} catch (error) {
		console.error('Error updating note:', error);
		return res.status(500).json({ message: 'Internal server error' });
	}
};
const deleteNote = async (req, res) => {
	try {
		const { id } = req.params;
		const note = await Note.findByPk(parseInt(id, 10));
		if (!note) {
			return res.status(404).json({ message: 'Note not found' });
		}
		await note.destroy();
		return res.status(204).send(); // No content
	} catch (error) {
		console.error('Error deleting note:', error);
		return res.status(500).json({ message: 'Internal server error' });
	}
};

export { getAllNotes, getNoteById, createNote, updateNote, deleteNote };
