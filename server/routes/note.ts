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

router.route("/note").get(getAllNotes).post(createNote);

router.route("/note/save").post(fillNoteContent);

router.route("/note/:id").get(getSingleNote).delete(deleteNote).put(updateNote);

router.post("/note/:id/file", downloadNote);

export default router;
