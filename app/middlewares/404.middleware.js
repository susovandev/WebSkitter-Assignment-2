const { StatusCodes } = require('http-status-codes');
const ApiError = require('../utils/apiError.utils');

const routeNotFoundHandler = (req, res, next) => {
	next(new ApiError(StatusCodes.NOT_FOUND, `Route ${req.originalUrl} not found on this server`));
};

module.exports = routeNotFoundHandler;
