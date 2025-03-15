module.exports = (res, statusCode, data) => {
  res.status(statusCode).json({
    status: "success",
    ok: true,
    data,
  });
};
