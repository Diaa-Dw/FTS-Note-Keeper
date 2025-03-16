const express = require("express");

const noteController = require("../controllers/noteController");
const authController = require("../controllers/authController");

const router = express.Router();
//prtoect note routes just authrized user can access their notes
router.use(authController.protect);
//create new note
router.post("/", noteController.createNote);
//get all notes
router.get("/", noteController.getAllNotes);
//search for a term in title and content of notes
router.get("/search", noteController.search);
//get specific note by id
router.get("/:id", noteController.getNoteById);
//update partial note
router.patch("/:id", noteController.updateNoteById);
//delte note
router.delete("/:id", noteController.deleteNoteById);

module.exports = router;
