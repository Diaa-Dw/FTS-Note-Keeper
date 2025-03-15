const express = require("express");

//Routes
const noteRoutes = require("./routes/noteRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(express.json("limit: 10kb"));

app.use("/api/v1/notes", noteRoutes);
app.use("/api/v1/users", userRoutes);

module.exports = app;
