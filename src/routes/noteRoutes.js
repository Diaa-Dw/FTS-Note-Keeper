const express = require("express");

const noteController = require("../controlers/noteController");

const router = express.Router();

router.post("/notes", noteController.createNote);

module.exports = router;
