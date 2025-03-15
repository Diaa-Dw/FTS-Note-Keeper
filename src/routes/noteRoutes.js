const express = require("express");

const noteController = require("../controlers/noteController");

const router = express.Router();

router.post("/", noteController.createNote);

router.get("/", noteController.getAllNotes);

router.get("/:id", noteController.getNoteById);

router.patch("/:id", noteController.updateNoteById);

router.delete("/:id", noteController.deleteNoteById);

module.exports = router;
