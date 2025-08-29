const notFound = (req, res, next) => {

    const error = new Error(`Not found - ${req.originalUrl}`);

    error.statusCode = 404;

    next(error);

};

const errorHandling = (err, req, res, next) => {

    if (res.headersSent) {

        return next(err);

    }

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({

        message: err.message,

        stack: process.env.NODE_ENV === "production" ? null : err.stack,

    });

};

module.exports = { notFound, errorHandling }; 