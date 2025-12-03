const express = require('express');
const constants = require('./constants');
const { StatusCodes } = require('http-status-codes');

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const SwaggerOptions = require('../swagger.json');
const swaggerDocument = swaggerJsDoc(SwaggerOptions);

const routeNotFoundHandler = require('./middlewares/404.middleware');
const globalErrorHandler = require('./middlewares/error.middleware');

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

// Product Routes
const productRoutes = require('./routes/product.routes');
app.use('/api/products', productRoutes);

//swagger js doc
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 404 handler
app.use(routeNotFoundHandler);

// Error handler
app.use(globalErrorHandler);
module.exports = app;
