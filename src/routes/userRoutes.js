const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/signup", userController.signup);

router.post("*", (req, res) => {
  res.status(200).json({
    status: "success",
  });
});

module.exports = router;
