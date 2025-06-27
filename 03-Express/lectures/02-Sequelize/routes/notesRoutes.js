import { Router } from "express";
import { getAllNotes, createNote, getNoteById, updateNote, deleteNote } from "../controllers/notesControllers.js";

const notesRouter = Router();

notesRouter.route("/").get(getAllNotes).post(createNote);
notesRouter
  .route("/:id")
  .get(getNoteById)
  .put(updateNote)
  .delete(deleteNote);

  export default notesRouter;