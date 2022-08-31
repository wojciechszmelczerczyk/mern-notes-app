import { Router } from "express";

const router = Router();

// controllers
import {
  getAllNotes,
  getSingleNote,
  createNote,
  fillNoteContent,
  updateNote,
  deleteNote,
  downloadNote,
} from "../controllers/noteController";

router.route("/").get(getAllNotes).post(createNote);

router.route("/save").post(fillNoteContent);

router.route("/:id").get(getSingleNote).delete(deleteNote).put(updateNote);

router.post("/:id/file", downloadNote);

export default router;
