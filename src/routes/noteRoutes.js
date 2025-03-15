const express = require("express");

const noteController = require("../controllers/noteController");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.protect);

router.post("/", noteController.createNote);

router.get("/", noteController.getAllNotes);

router.get("/:id", noteController.getNoteById);

router.patch("/:id", noteController.updateNoteById);

router.delete("/:id", noteController.deleteNoteById);

module.exports = router;
