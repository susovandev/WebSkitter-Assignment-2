const express = require('express');
const validateSchema = require('../middlewares/validation.middleware');
const productValidation = require('../validations/product.validation');
const productController = require('../controllers/product.controller');

const router = express.Router();

/**
 * @route GET http://localhost:5000/api/products
 * @description Retrieve all products from In-memory database.
 */
router.route('/').get(productController.getProductsHandler);
/**
 * @route GET http://localhost:5000/api/products/:productId
 * @description Get a product by its ID.
 */
router
	.route('/:productId')
	.get(
		validateSchema(productValidation.getProductByIdSchema, 'params'),
		productController.getProductByIdHandler,
	);
/**
 * @route POST http://localhost:5000/api/products
 * @description Save product to In-memory database.
 */
router
	.route('/')
	.post(
		validateSchema(productValidation.createProductSchema, 'body'),
		productController.createProductHandler,
	);
/**
 * @route PUT http://localhost:5000/api/products/:productId
 * @description Update an existing product.
 */
router
	.route('/:productId')
	.put(
		validateSchema(productValidation.getProductByIdSchema, 'params'),
		validateSchema(productValidation.updateProductSchema, 'body'),
		productController.updateProductHandler,
	);

module.exports = router;
