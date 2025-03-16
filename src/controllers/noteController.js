const Note = require("../models/noteModel");
const APIFeatures = require("../utils/ApiFeature");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const responseHandler = require("../utils/responseHandler");

//create note and use user-id as refrance to it
exports.createNote = catchAsync(async (req, res, next) => {
  const { user } = req;

  const createdNote = await Note.create({
    title: req.body.title,
    content: req.body.content,
    user: user._id,
  });

  responseHandler(res, 201, createdNote);
});

//Return all notes that belong to user
exports.getAllNotes = catchAsync(async (req, res, next) => {
  const { user } = req;

  const features = new APIFeatures(
    Note.find({
      user: user._id,
    }),
    req.query
  ).paginate();

  const results = await features.execute();

  responseHandler(res, 200, results);
});

exports.getNoteById = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { id } = req.params;
  const note = await Note.findOne({ _id: id, user: user._id });

  if (!note) {
    next(new AppError(`Note not found or unauthorized`, 401));
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
    next(new AppError(`Note not found or unauthorized`, 401));
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
    next(new AppError(`Note not found or unauthorized`, 401));
  }

  responseHandler(res, 204, null);
});

exports.search = catchAsync(async (req, res, next) => {
  const { user } = req;
  const searchTerm = req.query.query;

  if (!searchTerm) {
    next(new AppError(`Query parameter is required`), 400);
  }

  const features = new APIFeatures(Note.find({ user: user._id }), req.query)
    .search()
    .paginate();

  const results = await features.execute();

  responseHandler(res, 200, results);
});
