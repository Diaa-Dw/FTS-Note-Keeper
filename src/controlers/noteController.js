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
  const notes = await Note.find();

  responseHandler(res, 200, notes);
});
