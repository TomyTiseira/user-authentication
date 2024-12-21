export const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    error: {
      name: err.name || 'Error',
      message: err.message || 'Ocurrió un error inesperado'
    }
  });
};
