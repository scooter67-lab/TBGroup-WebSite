export const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (err, req, res, _next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  console.error(err.stack || err.message);
  const isProd = process.env.NODE_ENV === 'production';
  // В проде не раскрываем внутренние детали серверных ошибок (5xx);
  // осмысленные 4xx-сообщения (валидация, 404 и т.п.) показываем как есть.
  const message =
    isProd && statusCode >= 500 ? 'Internal Server Error' : err.message || 'Internal Server Error';
  res.status(statusCode).json({
    message,
    ...(!isProd && { stack: err.stack }),
  });
};
