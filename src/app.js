const express = require("express");

//Routers
const userRouter = require("./routes/userRoutes");

const app = express();

app.use(express.json());

app.use("/api/v1/users", userRouter);

app.use("*", (req, res, next) => {
  console.log("🚀 ~ app.use ~ req:", req);
  res.status(404).json({
    status: "failed",
    ok: false,
  });
  next(new Error(`Can't find ${req.originalUrl} on this server`, 404));
});

module.exports = app;
