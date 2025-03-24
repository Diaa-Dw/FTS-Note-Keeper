const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config(`${__dirname}/../.env`);

const DB = process.env.DB_URL.replace("<db_password>", process.env.DB_PASSWORD);

mongoose
  .connect(DB)
  .then(() => console.log("DB connected successfully!"))
  .catch((err) => console.log(err));

const port = process.env.PORT;

const server = app.listen(port, () => {
  console.log(`app runing on port ${port}`);
});

// Handle unhandled exceptions
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.error(err.name, err.message);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION! 💥 Shutting down...");
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
