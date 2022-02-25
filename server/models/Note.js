const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const { Schema } = mongoose;

const noteSchema = new Schema({
  note_id: {
    type: Number,
  },
  status: {
    type: String,
    enum: ["draft", "visible", "deleted"],
  },
  title: {
    type: String,
    required: [true, "Please provide the note title"],
    unique: true,
    lowercase: true,
  },
  content: {
    type: String,
    lowercase: true,
  },
  created_at: {
    type: Date,
  },
  updated_at: {
    type: Date,
  },
});

noteSchema.plugin(AutoIncrement, { inc_field: "id" });

const Note = mongoose.model("note", noteSchema);

module.exports = Note;
