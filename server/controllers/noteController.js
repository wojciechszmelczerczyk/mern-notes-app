const Note = require("../models/Note.js");
const extractIdFromToken = require("../token/extractId.js");

const getAllNotes = async (req, res) => {
  let jwt = req.headers.cookie.slice(4, 148);
  const { id } = extractIdFromToken(jwt);

  const notes = await Note.find({ user_id: id });
  res.status(200).json(notes);
};

const getSingleNote = async (req, res) => {
  let jwt = req.headers.cookie.slice(4, 148);
  let payload = extractIdFromToken(jwt);

  const { id } = req.params;
  const note = await Note.findOne({ _id: id, user_id: payload.id });
  res.status(200).json(note);
};

const createNote = async (req, res) => {
  let { title, content = "" } = req.body;

  let jwt = req.headers.cookie.slice(4);
  const { id } = extractIdFromToken(jwt);

  // create note
  const newNote = await Note.create({ title, content, user_id: id });

  // give response
  res.status(201).json(newNote);
};

const updateNote = async (req, res) => {
  // update note
  const { title } = req.body;
  const { id } = req.params;

  const updatedNote = await Note.findOneAndUpdate({ id }, { title });

  res.status(201).json(updatedNote);
};

const fillNoteContent = async (req, res) => {
  const { content, id } = req.body;

  // add note content
  await Note.findByIdAndUpdate(id, { content });
};

const deleteNote = async (req, res) => {
  const { id } = req.params;
  const deletedNote = await Note.findOneAndDelete({ id });
  res.status(200).json(deletedNote);
};

module.exports = {
  getAllNotes,
  getSingleNote,
  createNote,
  fillNoteContent,
  updateNote,
  deleteNote,
};
