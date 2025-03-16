const express = require("express");
const cookiePareser = require("cookie-parser");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");

//Routes
const noteRoutes = require("./routes/noteRoutes");
const userRoutes = require("./routes/userRoutes");
const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/appError");

const app = express();

app.use(express.json("limit: 10kb"));
app.use(cookiePareser());
//set secuirty HTTP headers
app.use(helmet());
//limit request from same api
const limiter = rateLimit({
  max: 100,
  windowMS: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);
//Data sanitizaion against NOSQL query injection
app.use(mongoSanitize());

//Data sanitization aganist XSS
app.use(xss());

app.use("/api/v1/notes", noteRoutes);
app.use("/api/v1/users", userRoutes);

//For handling unimplement routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
