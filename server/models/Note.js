const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const { Schema } = mongoose;

const status = {
  draft: "DRAFT",
  visible: "VISIBLE",
  deleted: "DELETED",
};

const noteSchema = new Schema(
  {
    note_id: {
      type: Number,
    },
    user_uuid: {
      type: String,
    },
    status: {
      type: String,
      enum: Object.freeze(status),
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
  },
  { timestamps: true }
);

noteSchema.plugin(AutoIncrement, { inc_field: "id" });

const Note = mongoose.model("note", noteSchema);

module.exports = Note;
