const express = require("express");
const cookiePareser = require("cookie-parser");

//Routes
const noteRoutes = require("./routes/noteRoutes");
const userRoutes = require("./routes/userRoutes");
const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/appError");

const app = express();

app.use(express.json("limit: 10kb"));
app.use(cookiePareser());

app.use("/api/v1/notes", noteRoutes);
app.use("/api/v1/users", userRoutes);

//For handling unimplement routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
