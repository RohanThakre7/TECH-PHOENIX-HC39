errorHandler = (err, req, res, next) => {
  const status = err.status || 500;

  const error = err.errors || "internal sever error please wait";

  return res.status(status).json({
    error,
  });
};

module.exports = errorHandler;
