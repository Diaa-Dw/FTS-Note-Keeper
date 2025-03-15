const express = require("express");

const noteRoutes = require("./routes/noteRoutes");

const app = express();

app.use(express.json("limit: 10kb"));

app.use("/api/v1", noteRoutes);

module.exports = app;
