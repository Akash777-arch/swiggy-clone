/**
 * Global error handling middleware for Express.
 * Must be registered LAST, after all routes.
 */
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || err.status || 500;
  const message =
    process.env.NODE_ENV === "production" && statusCode === 500
      ? "Internal Server Error"
      : err.message || "Something went wrong";

  // Log in dev, suppress in prod (use a logger in real app)
  if (process.env.NODE_ENV !== "production") {
    console.error(`[ERROR] ${req.method} ${req.path} →`, err);
  }

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message,
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
};

/**
 * 404 handler — register just before errorHandler.
 */
export const notFound = (req, res, next) => {
  const err = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
  err.statusCode = 404;
  next(err);
};

export default errorHandler;