const Note = require("../models/Note.js");
const extractIdFromToken = require("../token/extractId.js");
const { dbConnection, closeDbConnection } = require("../db/connection");

const getAllNotes = async (req, res) => {
  // extract jwt id
  // use this id in query to find data correlated with user

  await dbConnection();

  let jwt = req.headers.cookie.slice(4);
  const payload = extractIdFromToken(jwt);

  const notes = await Note.find({ user_uuid: payload.id });
  res.json(notes);

  await closeDbConnection();
};

const getSingleNote = async (req, res) => {
  await dbConnection();

  const { id } = req.params;
  const note = await Note.findOne({ id });
  res.json(note);

  await closeDbConnection();
};

const createNote = async (req, res) => {
  await dbConnection();

  let { title, user_uuid } = req.body;

  let jwt = req.headers.cookie.slice(4);
  const payload = extractIdFromToken(jwt);

  // create note
  Note.create({ title, user_uuid: payload.id });

  // give response
  res.send("note added to database");

  await closeDbConnection();
};

const updateNote = async (req, res) => {
  await dbConnection();

  // update note
  const { title } = req.body;
  const { id } = req.params;

  const updatedNote = await Note.findOneAndUpdate({ id }, { title });

  res.send(updatedNote);

  await closeDbConnection();
};

const deleteNote = async (req, res) => {
  await dbConnection();

  const { id } = req.params;
  const deletedNote = await Note.findOneAndDelete({ id });
  res.json(deletedNote);

  await closeDbConnection();
};

module.exports = {
  getAllNotes,
  getSingleNote,
  createNote,
  updateNote,
  deleteNote,
};
