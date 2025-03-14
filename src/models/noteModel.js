const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "You must include note title"],
  },
  content: {
    type: String,
    required: [true, "Please provide note content"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

noteSchema.index({ user: 1 });

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
