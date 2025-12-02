const express = require('express');
const constants = require('./constants');
const { StatusCodes } = require('http-status-codes');

const app = express();

// Body parser middleware
app.use(express.json({ limit: constants.BODY_LIMIT }));
app.use(express.urlencoded({ extended: true, limit: constants.BODY_LIMIT }));

// Routes
app.get('/', (req, res) => {
	return res.status(StatusCodes.OK).json({
		statusCodes: StatusCodes.OK,
		status: false,
		message: 'Hello World',
	});
});

module.exports = app;
