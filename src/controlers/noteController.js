const Note = require("../models/noteModel");
const catchAsync = require("../utils/catchAsync");

exports.createNote = catchAsync(async (req, res, next) => {
  const createdNote = await Note.create({
    title: req.body.title,
    content: req.body.content,
    user: req.body.user,
  });

  res.status(201).json({
    status: "success",
    ok: true,
    data: {
      createdNote,
    },
  });
});

