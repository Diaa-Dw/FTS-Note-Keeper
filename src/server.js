const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config("../.env");

const DB = process.env.DB_URL.replace("<db_password>", process.env.DB_PASSWORD);
console.log(DB);
mongoose
  .connect(DB)
  .then(() => console.log("DB connected successfully!"))
  .catch((err) => console.log(err));

const port = process.env.PORT;

const server = app.listen(port, () => {
  console.log(`app runing on port ${port}`);
});
