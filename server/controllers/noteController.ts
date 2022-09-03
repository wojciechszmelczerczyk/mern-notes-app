import * as pdf from "pdf-lib";

import Note from "../models/Note";

import { writeFile } from "fs/promises";

const getAllNotes = async (req, res) => {
  let id: string = req.user?.id;

  const notes = await Note.find({ user_id: id });
  res.status(200).json(notes);
};

const getSingleNote = async (req, res) => {
  let userId = req.user?.id;

  const { id } = req.params;
  const note = await Note.findOne({ _id: id, user_id: userId });
  res.status(200).json(note);
};

const createNote = async (req, res) => {
  let { title, content = "" } = req.body;

  let id = req.user?.id;

  // create note
  const newNote = await Note.create({ title, content, user_id: id });

  // give response
  res.status(201).json(newNote);
};

const updateNote = async (req, res) => {
  // update note
  const { content } = req.body;

  const { id } = req.params;

  const updatedNote = await Note.findByIdAndUpdate(id, { content });

  res.status(201).json(updatedNote);
};

const fillNoteContent = async (req, res) => {
  const { content, id } = req.body;

  // add note content
  const noteWithFillContent = await Note.findByIdAndUpdate(id, { content });
  res.json(noteWithFillContent);
};

const deleteNote = async (req, res) => {
  const { id } = req.params;
  await Note.findByIdAndDelete(id);
  res.send("note deleted").status(204);
};

const downloadNote = async (req, res) => {
  const { id } = req.params;
  // intercept file format
  const { format } = req.body;
  const { title, content } = await Note.findById(id);
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

    page.drawText(title as string, {
      x: width / 2,
      y: height - 4 * fontSize,
      size: fontSize,
      font: timesRomanFont,
      color: pdf.rgb(0, 0, 0),
    });

    page.drawText(content as string, {
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
    await writeFile(noteFile, `${title} ${content}`);
  }
  res.download(`${process.cwd()}/${noteFile}`, noteFile);
};

export {
  getAllNotes,
  getSingleNote,
  createNote,
  fillNoteContent,
  updateNote,
  deleteNote,
  downloadNote,
};
