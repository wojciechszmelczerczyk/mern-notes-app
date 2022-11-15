import * as pdf from "pdf-lib";
import Note from "../models/Note";
import { writeFile } from "fs/promises";
import mongoose from "mongoose";

const getAllNotes = async (req, res) => {
  let id: string = req.user?.id;

  const notes = await Note.find({ user_id: id });
  res.status(200).json(notes);
};

const getSingleNote = async (req, res) => {
  let userId = req.user?.id;
  const { id } = req.params;

  // check if provide id is correct
  if (!mongoose.isValidObjectId(id))
    return res
      .status(400)
      .json({ fail: true, err: "Provided id has incorrect type" });

  const note = await Note.findOne({ _id: id, user_id: userId });

  // check if note with provided id exist
  if (!note)
    return res.status(400).json({
      fail: true,
      err: "Note with provided id doesn't exist",
    });

  res.status(200).json(note);
};

const createNote = async (req, res) => {
  try {
    let { title, content = "" } = req.body;

    if (!title)
      throw new Error("Note title doesn't provided. Please provide title.");

    let id = req.user?.id;

    if (title.length > 8) {
      throw new Error(
        "Note title is too long. Maximum length is 8 characters."
      );
    } else if (title.length < 4) {
      throw new Error(
        "Note title is too short. Maximum length is 4 characters."
      );
    }

    // create note
    const newNote = await Note.create({ title, content, user_id: id });

    // give response
    res.status(201).json(newNote);
  } catch (err) {
    res.json({ fail: true, err: err.message });
  }
};

const updateNote = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  if (!mongoose.isValidObjectId(id))
    return res
      .status(400)
      .json({ fail: true, err: "Provided id has incorrect type" });

  // add note content
  const noteWithFillContent = await Note.findByIdAndUpdate(
    id,
    { content },
    { new: true }
  );

  if (!noteWithFillContent)
    return res
      .status(400)
      .json({ fail: true, err: "Note with provided id doesn't exist" });

  res.json(noteWithFillContent);
};

const deleteNote = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id))
    return res
      .status(400)
      .json({ fail: true, err: "Provided id has incorrect type" });

  const deletedNote = await Note.findByIdAndDelete(id);

  if (!deletedNote)
    return res
      .status(400)
      .json({ fail: true, err: "Note with provided id doesn't exist" });

  res.status(204).end();
};

const downloadNote = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id))
    return res
      .status(400)
      .json({ fail: true, err: "Provided id has incorrect type" });

  // intercept file format
  const { format } = req.body;

  if (!format)
    return res.status(400).json({
      fail: true,
      err: "No format provided. Provide 'pdf' or 'txt' value. ",
    });

  if (format !== "pdf" && format !== "txt")
    return res.status(400).json({
      fail: true,
      err: "Provided format is incorrect. Provide 'pdf' or 'txt' value.",
    });

  const note = await Note.findById(id);

  if (!note)
    return res
      .status(400)
      .json({ fail: true, err: "Note with provided id doesn't exist" });

  let noteFile;

  if (format === "pdf") {
    noteFile = "note.pdf";

    // Create a new PDFDocument
    const pdfDoc = await pdf.PDFDocument.create();

    // Embed the Times Roman font
    const timesRomanFont = await pdfDoc.embedFont(pdf.StandardFonts.TimesRoman);

    // Add a blank page to the document
    const page = pdfDoc.addPage();

    // Get the height of the page
    const { height, width } = page.getSize();

    // Draw a string of text toward the top of the page
    const fontSize = 30;

    page.drawText(note.title as string, {
      x: width / 2,
      y: height - 4 * fontSize,
      size: fontSize,
      font: timesRomanFont,
      color: pdf.rgb(0, 0, 0),
    });

    page.drawText(note.content as string, {
      x: 50,
      y: height - 8 * fontSize,
      maxWidth: width - 100,
      lineHeight: 50,
      size: fontSize - 10,
      font: timesRomanFont,
      color: pdf.rgb(0, 0, 0),
    });

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save();

    await writeFile("note.pdf", pdfBytes);
  } else if (format === "txt") {
    noteFile = "note.txt";
    // txt file
    await writeFile(noteFile, `${note.title} ${note.content}`);
  }
  res.download(`${process.cwd()}/${noteFile}`, noteFile);
};

export {
  getAllNotes,
  getSingleNote,
  createNote,
  updateNote,
  deleteNote,
  downloadNote,
};
