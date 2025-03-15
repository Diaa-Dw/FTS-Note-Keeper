const Note = require("../models/noteModel");
const catchAsync = require("../utils/catchAsync");
const responseHandler = require("../utils/responseHandler");

exports.createNote = catchAsync(async (req, res, next) => {
  const createdNote = await Note.create({
    title: req.body.title,
    content: req.body.content,
    user: req.body.user,
  });

  responseHandler(res, 201, createdNote);
});

exports.getAllNotes = catchAsync(async (req, res, next) => {
  console.log(req.user);
  const notes = await Note.find();

  responseHandler(res, 200, notes);
});

exports.getNoteById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const note = await Note.findById(id);

  responseHandler(res, 200, note);
});

exports.updateNoteById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const updatedNote = await Note.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  responseHandler(res, 200, updatedNote);
});

exports.deleteNoteById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  await Note.findByIdAndDelete(id);

  responseHandler(res, 204, null);
});
