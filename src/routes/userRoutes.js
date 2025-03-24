const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.post("/forgotPassword", authController.forgotPassword);

//user must be login to access this endpoints
router.use(authController.protect);

router.patch("/updatePassword", authController.updatePassword);
module.exports = router;
