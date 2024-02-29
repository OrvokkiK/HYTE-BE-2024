//error-handler.mjs
// 404

const notFoundHandler = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    ErrorEvent.status = 404;
    next(error);
};

const errorHandler = (err, req, res, next) => {
    res.status(err.status || 500); // default is 500 if err.status is not defined
    res.json({
      error: {
        message: err.message,
        status: err.status || 500,
        errors: err.errors || ''
      }
    });
  };


export {notFoundHandler, errorHandler}
