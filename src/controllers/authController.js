const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const responseHandler = require("../utils/responseHandler");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (res, statusCode, user) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;

  responseHandler(res, statusCode, { token, user });
};

exports.register = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  createSendToken(res, 201, newUser);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new Error(`You are not logged in! Please log in to get access.`)
    );
  }

  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decode.id);
  if (!currentUser) {
    new Error("The user belonging to this token does no longer exist.");
  }

  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});
