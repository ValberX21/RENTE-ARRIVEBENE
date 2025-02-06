const erroHandler = (err,req,res,next) => {
    console.log(err.stack);

    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    res.status(statusCode).json({
        message: err.message || 'Internal server error',
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

module.exports = erroHandler;