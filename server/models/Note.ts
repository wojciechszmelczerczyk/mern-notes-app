import { Schema, model } from "mongoose";

interface INote {
  user_id: String;
  status: String;
  title: String;
  content: String;
}

enum Status {
  "DRAFT",
  "VISIBLE",
  "DELETED",
}

const noteSchema = new Schema<INote>(
  {
    user_id: {
      type: String,
    },
    status: {
      type: String,
      enum: Status,
    },
    title: {
      type: String,
      required: [true, "Please provide the note title"],
      lowercase: true,
      minlength: [4, "Title is too short. Minimum length is 4 characters"],
      maxlength: [8, "Title is too long. Maximum length is 8 characters"],
    },
    content: {
      type: String,
      lowercase: true,
    },
  },
  { timestamps: true }
);

const Note = model<INote>("note", noteSchema);

export default Note;
