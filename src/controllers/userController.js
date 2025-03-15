const User = require("../models/userModel");

exports.signup = async (req, res, next) => {
  console.log("test");
  try {
    const { username, email, password } = req.body;
    const createdUser = await User.create({
      username,
      email,
      password,
    });

    res.status(200).json({
      status: "success",
      ok: true,
      data: {
        createdUser,
      },
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
