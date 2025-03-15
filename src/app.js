const express = require("express");
const cookiePareser = require("cookie-parser");

//Routes
const noteRoutes = require("./routes/noteRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(express.json("limit: 10kb"));
app.use(cookiePareser());

app.use("/api/v1/notes", noteRoutes);
app.use("/api/v1/users", userRoutes);

module.exports = app;
