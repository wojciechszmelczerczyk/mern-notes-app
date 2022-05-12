const Note = require("../models/Note.js");
const extractIdFromToken = require("../token/extractId.js");

const getAllNotes = async (req, res) => {
  // extract jwt id
  // use this id in query to find data correlated with user

  let jwt = req.headers.cookie.slice(4);
  const { id } = extractIdFromToken(jwt);

  const notes = await Note.find({ user_uuid: id });
  res.json(notes);
};

const getSingleNote = async (req, res) => {
  const { id } = req.params;
  const note = await Note.findOne({ id });
  res.json(note);
};

const createNote = async (req, res) => {
  let { title } = req.body;

  let jwt = req.headers.cookie.slice(4);
  const { id } = extractIdFromToken(jwt);

  // create note
  const newNote = await Note.create({ title, user_uuid: id });

  // give response
  res.send({ added_note: newNote });
};

const updateNote = async (req, res) => {
  // update note
  const { title } = req.body;
  const { id } = req.params;

  const updatedNote = await Note.findOneAndUpdate({ id }, { title });

  res.send(updatedNote);
};

const deleteNote = async (req, res) => {
  const { id } = req.params;
  const deletedNote = await Note.findOneAndDelete({ id });
  res.json(deletedNote);
};

module.exports = {
  getAllNotes,
  getSingleNote,
  createNote,
  updateNote,
  deleteNote,
};
