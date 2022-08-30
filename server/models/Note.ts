import { Schema, model } from "mongoose";

const status = {
  draft: "DRAFT",
  visible: "VISIBLE",
  deleted: "DELETED",
};

const noteSchema = new Schema(
  {
    user_id: {
      type: String,
    },
    status: {
      type: String,
      enum: Object.freeze(status),
    },
    title: {
      type: String,
      required: [true, "Please provide the note title"],
      lowercase: true,
    },
    content: {
      type: String,
      lowercase: true,
    },
  },
  { timestamps: true }
);

const Note = model("note", noteSchema);

export default Note;
