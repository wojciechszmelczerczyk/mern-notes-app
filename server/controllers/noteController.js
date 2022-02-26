const Note = require("../models/Note.js");

const getAllNotes = async (req, res) => {
  const notes = await Note.find({});
  res.json(notes);
};

const getSingleNote = async (req, res) => {
  const { id } = req.params;
  const note = await Note.findOne({ id });
  res.json(note);
};

const createNote = (req, res) => {
  let { title } = req.body;

  // create note
  Note.create({ title });

  // give response
  res.send("note added to database");
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
