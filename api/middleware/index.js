function handleError(err, req, res, next) {
    res.status(err.status || 500).json({
        message: err.message,
        prodMessage: 'something went wrong',
        stack: err.stack
    });
}

module.exports = {
    handleError,
}