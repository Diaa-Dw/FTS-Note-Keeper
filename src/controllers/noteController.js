const Note = require("../models/noteModel");
const catchAsync = require("../utils/catchAsync");
const responseHandler = require("../utils/responseHandler");

exports.createNote = catchAsync(async (req, res, next) => {
  const { user } = req;

  const createdNote = await Note.create({
    title: req.body.title,
    content: req.body.content,
    user: user._id,
  });

  responseHandler(res, 201, createdNote);
});

exports.getAllNotes = catchAsync(async (req, res, next) => {
  const { user } = req;

  const notes = await Note.find({
    user: user._id,
  });

  responseHandler(res, 200, notes);
});

exports.getNoteById = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { id } = req.params;
  const note = await Note.findOne({ _id: id, user: user._id });

  if (!note) {
    next(new Error(`Note not found or unauthorized`));
  }

  responseHandler(res, 200, note);
});

exports.updateNoteById = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { id } = req.params;

  const updatedNote = await Note.findOneAndUpdate(
    {
      _id: id,
      user: user._id,
    },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedNote) {
    next(new Error(`Note not found or unauthorized`));
  }
  responseHandler(res, 200, updatedNote);
});

exports.deleteNoteById = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { id } = req.params;

  const deletedNote = await Note.findOneAndDelete({
    _id: id,
    user: user._id,
  });

  if (!deletedNote) {
    next(new Error(`Note not found or unauthorized`));
  }

  responseHandler(res, 204, null);
});
