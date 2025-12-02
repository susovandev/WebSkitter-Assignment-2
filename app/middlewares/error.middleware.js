const config = require('../config/config');
const { StatusCodes } = require('http-status-codes');

const globalErrorHandler = (err, req, res, next) => {
	if (config.NODE_ENV === 'development') {
		console.warn(`Global Error Handler called`, err);
	}

	return res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
		statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
		status: false,
		message: err.message,
		...(config.NODE_ENV === 'development' && { stack: err.stack }),
	});
};

module.exports = globalErrorHandler;
