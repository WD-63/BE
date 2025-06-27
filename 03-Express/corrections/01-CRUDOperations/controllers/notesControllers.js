const getAllNotes = (req, res) => {
    res.status(200).json({ message: "Get all notes" });
}

const getNoteById = (req, res) => {
    const noteId = req.params.id;
    res.status(200).json({ message: `Get note with ID: ${noteId}` });
}

const createNote = (req, res) => {
    const newNote = req.body;
    res.status(201).json({ message: "Note created", note: newNote });
}

const updateNote = (req, res) => {
    const noteId = req.params.id;
    const updatedNote = req.body;
    res.status(200).json({ message: `Note with ID: ${noteId} updated`, note: updatedNote });
}

const deleteNote = (req, res) => {
    const noteId = req.params.id;
    res.status(200).json({ message: `Note with ID: ${noteId} deleted` });
}

export { getAllNotes, getNoteById, createNote, updateNote, deleteNote };