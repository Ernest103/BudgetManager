function errorHandler(err, _req, res, _next) {
  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    message: err.message || 'Internal server error',
  });
}

module.exports = errorHandler;
